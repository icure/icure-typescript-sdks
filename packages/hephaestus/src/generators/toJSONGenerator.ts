import { ClassDeclaration } from 'ts-morph'
import { ClassBundle } from '../types/ClassBundle'

export function toJSONGenerator(classDeclaration: ClassDeclaration, bundle: ClassBundle) {
    // Remove existing toJSON method
    classDeclaration.getMethod('toJSON')?.remove()

    // Add new toJSON method
    classDeclaration.addMethod({
        name: 'toJSON',
        isStatic: false,
        isAbstract: false,
        returnType: `I${classDeclaration.getName()}`,
        parameters: [],
        statements: (writer) => {
            // write the method body
            writer.writeLine(`return {`)

            bundle.computeSerializer('this').forEach((line) => writer.writeLine(line))

            writer.writeLine('}')
        },
    })
}
