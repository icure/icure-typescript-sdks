import { ClassDeclaration, Project, SourceFile, SyntaxKind } from 'ts-morph'
import { mapperRegex, modelRegex } from './index'

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
                .blankLine()
        })
    })

    const mapperFiles: [string, SourceFile, string, ClassDeclaration?][] = getMapperSourceFiles()
        .map(([mapperClassName, mapperSourceFile]) => {
            const modelClass = modelClassesWithMapToDecorator.find((modelClass) => modelClass.getName() === mapperClassName)

            return [mapperClassName, mapperSourceFile, `initialize${mapperClassName}Mapper`, modelClass]
        })
        .filter(([, , , modelClass]) => modelClass !== undefined) as [string, SourceFile, string, ClassDeclaration][]

    mapperFiles.forEach(([mapperClassName, mapperSourceFile, functionName, modelClass]) => {
        const mapToDecorator = modelClass!.getDecorators().find((d) => d.getName() === 'mapTo')!
        const mapToDecoratorArg = mapToDecorator.getArguments()[0].asKind(SyntaxKind.Identifier)!
        const iCureTargetClassDeclaration = mapToDecoratorArg.getSymbol()!.isAlias()
            ? mapToDecoratorArg.getSymbol()!.getAliasedSymbol()!.getDeclarations()[0].asKind(SyntaxKind.ClassDeclaration)
            : mapToDecoratorArg.getSymbol()!.getDeclarations()[0].asKind(SyntaxKind.ClassDeclaration)
        const iCureTargetClassName = mapToDecoratorArg.getText()
        const className = modelClass!.getName()!

        // Remove initialize${mapperClassName}Mapper function
        mapperSourceFile
            .getFunctions()
            .find((f) => f.getName() === functionName)
            ?.remove()

        const toDtoFunctions = iCureTargetClassDeclaration
            ?.getProperties()
            .map((p) => {
                return {
                    name: p.getName().replace(/['"]/gi, ''),
                    type: p
                        .getType()
                        .getText()
                        .replace(/(import\(.*\)\.)?(.*)/, '$2'),
                }
            })
            .map(({ name, type }) => {
                return {
                    functionName: `to${iCureTargetClassName}${name.slice(0, 1).toUpperCase()}${name.slice(1)}`,
                    propertyName: name,
                    type,
                }
            })
        const toDomainFunctions = modelClass
            ?.getProperties()
            .map((p) => {
                return {
                    name: p.getName().replace(/['"]/gi, ''),
                    type: p
                        .getType()
                        .getText()
                        .match(/(import\(.*\)\.)?(.*)/)![2],
                }
            })
            .map(({ name, type }) => {
                return {
                    functionName: `to${className}${name.slice(0, 1).toUpperCase()}${name.slice(1)}`,
                    propertyName: name,
                    type,
                }
            })

        // Temporary remove functions
        /*        toDomainFunctions?.forEach(({functionName, propertyName, type}) => {
            mapperSourceFile.getFunctions().find((f) => f.getName() === functionName)?.remove()
        })

        toDtoFunctions?.forEach(({functionName, propertyName, type}) => {
            mapperSourceFile.getFunctions().find((f) => f.getName() === functionName)?.remove()
        })*/
        // End of temporary remove functions

        const mapperFileFunctions = mapperSourceFile.getFunctions()
        const toDtoFunctionsToCreate = toDtoFunctions?.filter(({ functionName }) => !mapperFileFunctions.some((mff) => mff.getName() === functionName))
        const toDomainFunctionsToCreate = toDomainFunctions?.filter(({ functionName }) => !mapperFileFunctions.some((mff) => mff.getName() === functionName))

        toDtoFunctionsToCreate?.forEach(({ functionName, type }) => {
            mapperSourceFile.addFunction({
                name: functionName,
                parameters: [
                    {
                        name: 'domain',
                        type: className,
                    },
                ],
                returnType: type,
                statements: (writer) => {
                    writer.writeLine(`throw new Error('Not implemented')`)
                },
            })
        })

        toDomainFunctionsToCreate?.forEach(({ functionName, type }) => {
            mapperSourceFile.addFunction({
                name: functionName,
                parameters: [
                    {
                        name: 'dto',
                        type: iCureTargetClassName,
                    },
                ],
                returnType: type,
                statements: (writer) => {
                    writer.writeLine(`throw new Error('Not implemented')`)
                },
            })
        })

        const toDomainName = `map${iCureTargetClassName}To${className}`
        const toDtoName = `map${className}To${iCureTargetClassName}`

        mapperSourceFile.getFunction(toDomainName)?.remove()
        mapperSourceFile.addFunction({
            name: toDomainName,
            isExported: true,
            parameters: [
                {
                    name: 'dto',
                    type: iCureTargetClassName,
                },
            ],
            returnType: className,
            statements: (writer) => {
                writer.writeLine(`return new ${className}({`)

                toDomainFunctions?.forEach(({ propertyName, functionName }) => {
                    writer.writeLine(`${propertyName}: ${functionName}(dto),`)
                })

                writer.writeLine(`})`)
            },
        })

        mapperSourceFile.getFunction(toDtoName)?.remove()
        mapperSourceFile.addFunction({
            name: toDtoName,
            isExported: true,
            parameters: [
                {
                    name: 'domain',
                    type: className,
                },
            ],
            returnType: iCureTargetClassName,
            statements: (writer) => {
                writer.writeLine(`return new ${iCureTargetClassName}({`)

                toDtoFunctions?.forEach(({ propertyName, functionName }) => {
                    writer.writeLine(`${propertyName}: ${functionName}(domain),`)
                })

                writer.writeLine(`})`)
            },
        })
    })

    const mapperSourceFile = project.getSourceFile('mapper.ts')
    mapperSourceFile?.getFunction('initializeMapper')?.remove()

    mapperSourceFile?.organizeImports()

    project.saveSync()
}
