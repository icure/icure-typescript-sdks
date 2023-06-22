import { ClassDeclaration, Project, SourceFile, SyntaxKind } from 'ts-morph'
import {mapperRegex, modelRegex} from './index'

type Mapper = {
    className: string
    mapperFilePath: string
    modelClass: ClassDeclaration
}

export const mapperGenerator = (project: Project, mapperLocation: string) => {
    const modelClassesWithMapToDecorator = project
        .getSourceFiles()
        .filter((sourceFile) => sourceFile.getFilePath().match(modelRegex) !== null)
        .flatMap((sourceFile) => sourceFile.getClasses())
        .filter((classDeclaration) => classDeclaration.getDecorators().some((d) => d.getName() === 'mapTo'))

    function getMapperSourceFiles(): [string, SourceFile][] {
        return project
            .getSourceFiles()
            .filter((sourceFile) => {
                return mapperRegex.test(sourceFile.getFilePath())
            })
            .map((sourceFile) => {
                return [sourceFile.getFilePath().match(mapperRegex)![2], sourceFile]
            })
    }

    const mapperSourceFiles: [string, SourceFile][] = getMapperSourceFiles()

    const mapperFilesToCreate: [ClassDeclaration, string][] = modelClassesWithMapToDecorator
        .filter((modelClass) => {
            return !mapperSourceFiles.some(([mapperClassName]) => {
                return mapperClassName === modelClass.getName()
            })
        })
        .map((modelClass) => {
            return [modelClass, `${mapperLocation}/${modelClass.getName()}.mapper.ts`]
        })

    mapperFilesToCreate.map(([modelClass, mapperFilePath]: [ClassDeclaration, string]) => {
        const mapToDecorator = modelClass.getDecorators().find((d) => d.getName() === 'mapTo')!
        const mapToDecoratorArg = mapToDecorator.getArguments()[0].asKind(SyntaxKind.Identifier)!
        const iCureTargetClassName = mapToDecoratorArg.getText()
        const className = modelClass.getName()!
        const isSameName = iCureTargetClassName === className + 'Entity' || iCureTargetClassName === className + 'Dto' || iCureTargetClassName === className

        return project.createSourceFile(mapperFilePath, (writer) => {
            writer
                .writeLine(`import { ${className} } from "../models/${className}.model"`)
                .conditionalWriteLine(!isSameName, `import { ${iCureTargetClassName} } from "@icure/api"`)
                .conditionalWriteLine(isSameName, `import { ${className} as ${iCureTargetClassName} } from "@icure/api"`)
                .writeLine(`import { createMap, forMember, Mapper } from "@automapper/core"`)
                .blankLine()
        })
    })

    const mapperFiles: [string, SourceFile, string, ClassDeclaration?][] = getMapperSourceFiles().map(([mapperClassName, mapperSourceFile]) => {
        const modelClass = modelClassesWithMapToDecorator.find((modelClass) => modelClass.getName() === mapperClassName)
        return [mapperClassName, mapperSourceFile, `initialize${mapperClassName}Mapper`, modelClass]
    })

    mapperFiles.forEach(([mapperClassName, mapperSourceFile, functionName, modelClass]) => {
        const mapToDecorator = modelClass!.getDecorators().find((d) => d.getName() === 'mapTo')!
        const mapToDecoratorArg = mapToDecorator.getArguments()[0].asKind(SyntaxKind.Identifier)!
        const iCureTargetClassDeclaration = mapToDecoratorArg.getSymbol()!.isAlias()
            ? mapToDecoratorArg.getSymbol()!.getAliasedSymbol()!.getDeclarations()[0].asKind(SyntaxKind.ClassDeclaration)
            : mapToDecoratorArg.getSymbol()!.getDeclarations()[0].asKind(SyntaxKind.ClassDeclaration)
        const iCureTargetClassName = mapToDecoratorArg.getText()
        const className = modelClass!.getName()!

        mapperSourceFile
            .getFunctions()
            .find((f) => f.getName() === functionName)
            ?.remove()

        const ehrClassToICureClassFunctions = iCureTargetClassDeclaration
            ?.getProperties()
            .map((p) => p.getName().replace(/['"]/gi, ""))
            .map((p) => `forMember_${iCureTargetClassName}_${p}`)
        const iCureClassToEhrClassFunctions = modelClass
            ?.getProperties()
            .map((p) => p.getName().replace(/['"]/gi, ""))
            .map((p) => `forMember_${className}_${p}`)

        const mapperFileFunctions = mapperSourceFile.getFunctions()
        const ehrClassToICureClassFunctionsToCreate = ehrClassToICureClassFunctions?.filter((f) => !mapperFileFunctions.some((mff) => mff.getName() === f))
        const iCureClassToEhrClassFunctionsToCreate = iCureClassToEhrClassFunctions?.filter((f) => !mapperFileFunctions.some((mff) => mff.getName() === f))

        ehrClassToICureClassFunctionsToCreate?.forEach((f) => {
            mapperSourceFile.addFunction({
                name: f,
                statements: (writer) => {
                    writer.writeLine(`return forMember<${className}, ${iCureTargetClassName}>(v => v.${f.split('_')[2]}, throw new Error('Not implemented'))`)
                },
            })
        })

        iCureClassToEhrClassFunctionsToCreate?.forEach((f) => {
            mapperSourceFile.addFunction({
                name: f,
                statements: (writer) => {
                    writer.writeLine(`return forMember<${iCureTargetClassName}, ${className}>(v => v.${f.split('_')[2]}, throw new Error('Not implemented'))`)
                },
            })
        })

        mapperSourceFile.addFunction({
            name: 'initialize' + mapperClassName + 'Mapper',
            parameters: [
                {
                    name: 'mapper',
                    type: 'Mapper',
                }
            ],
            isExported: true,
            statements: (writer) => {
                writer
                    .writeLine(`createMap(mapper, ${className}, ${iCureTargetClassName}, ${ehrClassToICureClassFunctions?.map((f) => `${f}()`).join(', ')})`)
                    .blankLine()
                    .writeLine(`createMap(mapper, ${iCureTargetClassName}, ${className}, ${iCureClassToEhrClassFunctions?.map((f) => `${f}()`).join(', ')})`)
            },
        })

        const toDomainName = `map${iCureTargetClassName}To${className}`
        const toDtoName = `map${className}To${iCureTargetClassName}`

        mapperSourceFile.getFunction('toDomain')?.remove()
        mapperSourceFile.getFunction(toDomainName)?.remove()
        // mapperSourceFile.addFunction({
        //     name: toDomainName,
        //     isExported: true,
        //     parameters: [
        //         {
        //             name: 'entity',
        //             type: iCureTargetClassName,
        //         }
        //     ],
        //     returnType: className,
        //     statements: (writer) => {
        //         writer.writeLine(`return mapper.map(entity, ${iCureTargetClassName}, ${className})`)
        //     }
        // })

        mapperSourceFile.getFunction('toDto')?.remove()
        mapperSourceFile.getFunction(toDtoName)?.remove()
        // mapperSourceFile.addFunction({
        //     name: toDtoName,
        //     isExported: true,
        //     parameters: [
        //         {
        //             name: 'model',
        //             type: className,
        //         }
        //     ],
        //     returnType: iCureTargetClassName,
        //     statements: (writer) => {
        //         writer.writeLine(`return mapper.map(model, ${className}, ${iCureTargetClassName})`)
        //
        //     }
        // })
    })

    const mapperSourceFile = project.getSourceFile('mapper.ts')
    mapperSourceFile?.getFunction('initializeMapper')?.remove()
    mapperSourceFile?.addFunction({
        name: 'initializeMapper',
        parameters: [
            {
                name: 'mapper',
                type: 'Mapper',
            }
        ],
        isExported: true,
        statements: (writer) => {
            mapperFiles.forEach(([_mapperClassName, _mapperSourceFile, functionName]) => {
                writer.writeLine(`${functionName}(mapper)`)
            })
        },
    })

    mapperSourceFile?.addImportDeclarations(
        [...mapperFiles.map(([mapperClassName, _msf, functionName]) => {
            return {
                moduleSpecifier: `./${mapperClassName}.mapper`,
                namedImports: [
                    {
                        name: functionName,
                    },
                ],
            }
        }), {
            moduleSpecifier: `@automapper/core`,
            namedImports: [
                {
                    name: 'Mapper',
                },
            ],
        }]
    )

    mapperSourceFile?.organizeImports()

    project.saveSync()
}
