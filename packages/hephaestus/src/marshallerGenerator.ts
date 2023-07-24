import { Project } from 'ts-morph'
import { ClassComponent } from './types/ClassComponent'
import { classComponentFactory } from './generators/classComponentFactory'
import { ClassBundle } from './types/ClassBundle'
import { toJSONGenerator } from './generators/toJSONGenerator'
import { fromJSONGenerator } from './generators/fromJSONGenerator'
import { modelRegex } from './index'

export function marshallerGenerator(project: Project) {
    const sourceFiles = project
        .getSourceFiles()
        .filter((sourceFile) => {
            return modelRegex.test(sourceFile.getFilePath())
        })
        .filter((sourceFile) => !sourceFile.getFullText().includes('hephaestus-ignore-file'))

    for (const sourceFile of sourceFiles) {
        const classes = sourceFile.getClasses().filter((classDeclaration) => !classDeclaration.getDecorators().find((d) => d.getName() === 'ignoreSerialization')!)

        for (const classDeclaration of classes) {
            console.log('Marshalling ', classDeclaration.getName())

            const classComponents: [string, ClassComponent][] = classDeclaration.getProperties().map((property) => {
                return [property.getName().replace(/['"]/gi, ''), classComponentFactory(property.getType())]
            })

            const bundle = new ClassBundle(classDeclaration.getName()!, new Map(classComponents))

            toJSONGenerator(classDeclaration, bundle)
            fromJSONGenerator(classDeclaration, bundle)

            bundle.imports(sourceFile)
            sourceFile.organizeImports()
        }
        sourceFile.saveSync()
    }
}
