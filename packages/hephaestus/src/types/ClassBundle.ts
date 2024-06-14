import { ClassComponent } from './ClassComponent'
import { ImportDeclaration, SourceFile } from 'ts-morph'

export class ClassBundle {
    readonly declaration: string
    readonly components: Map<string, ClassComponent>

    constructor(declaration: string, components: Map<string, ClassComponent>) {
        this.declaration = declaration
        this.components = components
    }

    public computeSerializer(instanceName: string): string[] {
        return [...this.components.entries()].map(([propertyName, component]) => {
            return `${propertyName}: ${component.computeSerializer(`${instanceName}.${propertyName}`)},`
        })
    }

    public computeDeserializer(variableName: string, instanceName: string): string[] {
        return [...this.components.entries()].flatMap(([propertyName, component]) => {
            if (component.nullable || component.optional) {
                return [`if (${variableName}["${propertyName}"] !== undefined) {`, `    ${instanceName}.${propertyName} = ${component.notNullable().computeDeserializer(`${variableName}["${propertyName}"]!`)}`, '}']
            }

            return [`${instanceName}.${propertyName} = ${component.computeDeserializer(`${variableName}["${propertyName}"]!`)}`]
        })
    }

    public imports(sourceFile: SourceFile): ImportDeclaration[] {
        return [...this.components.values()].flatMap((component) => component.imports(sourceFile))
    }
}
