import { ClassDeclaration } from 'ts-morph'
import { ClassBundle } from '../types/ClassBundle'

export function toJSONGenerator(classDeclaration: ClassDeclaration, bundle: ClassBundle) {
    // Remove existing toJSON method
    classDeclaration.getMethod('toJSON')?.remove()

    // Add new toJSON method
    classDeclaration.addMethod({
        name: 'toJSON',
        isStatic: true,
        isAbstract: false,
        returnType: 'any',
        parameters: [{ name: 'instance', type: classDeclaration.getName() }],
        statements: (writer) => {
            // write the method body
            writer.writeLine('const pojo: any = {}')

            bundle.computeSerializer('pojo', 'instance').forEach((line) => writer.writeLine(line))

            writer.writeLine('return pojo')
        },
    })
}
