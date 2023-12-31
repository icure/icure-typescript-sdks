import { ClassDeclaration } from 'ts-morph'
import { ClassBundle } from '../types/ClassBundle'

export function fromJSONGenerator(classDeclaration: ClassDeclaration, bundle: ClassBundle) {
    // Remove existing fromJSON method
    classDeclaration.getMethod('fromJSON')?.remove()

    // Add new fromJSON method
    classDeclaration.addMethod({
        name: 'fromJSON',
        isStatic: true,
        isAbstract: false,
        parameters: [{ name: 'pojo', type: 'any' }],
        returnType: classDeclaration.getName(),
        statements: (writer) => {
            // write the method body
            const lines = bundle.computeDeserializer('pojo')

            writer.write(`const obj = {} as I${classDeclaration.getName()}`).newLine().write(lines.join('\n')).newLine().write(`return new ${classDeclaration.getName()}(obj)`)
        },
    })
}
