import { ClassDeclaration } from 'ts-morph'
import { ClassBundle } from '../types/ClassBundle'

export function fromJSONGenerator(classDeclaration: ClassDeclaration, bundle: ClassBundle) {
    // Remove existing fromJSON method
    classDeclaration.getMethod('fromJSON')?.remove()
    classDeclaration.getConstructors().forEach((constructor) => { constructor.remove() })

    // Add new toJSON method
    classDeclaration.addConstructor({
        parameters: [{ name: 'json', type: `Partial<I${classDeclaration.getName()}>` }],
        returnType: classDeclaration.getName(),
        statements: (writer) => {
            // write the method body
            const lines = bundle.computeDeserializer('json', 'this')

            writer.write(lines.join('\n'))
        },
    })
}
