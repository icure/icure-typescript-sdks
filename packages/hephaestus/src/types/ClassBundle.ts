import { ClassComponent } from './ClassComponent'
import { ImportDeclaration, SourceFile } from 'ts-morph'

export class ClassBundle {
    readonly declaration: string
    readonly components: Map<string, ClassComponent>

    constructor(declaration: string, components: Map<string, ClassComponent>) {
        this.declaration = declaration
        this.components = components
    }

    public computeSerializer(variableName: string, instanceName: string): string[] {
        return [...this.components.entries()].map(([propertyName, component]) => {
            if (component.nullable) {
                return `if (${instanceName}.${propertyName} !== undefined) ${variableName}["${propertyName}"] = ${component.computeSerializer(`${instanceName}.${propertyName}`)}`
            }
            return `${variableName}["${propertyName}"] = ${component.computeSerializer(`${instanceName}.${propertyName}`)}`
        })
    }

    public computeDeserializer(variableName: string): string[] {
        return [...this.components.entries()].flatMap(([propertyName, component]) => {
            if (component.nullable) {
                return [`if (${variableName}["${propertyName}"] !== undefined) {`, `    obj['${propertyName}'] = ${component.computeDeserializer(`${variableName}["${propertyName}"]`)}`, '}']
            }

            return [`obj['${propertyName}'] = ${component.computeDeserializer(`${variableName}["${propertyName}"]`)}`]
        })
    }

    public imports(sourceFile: SourceFile): ImportDeclaration[] {
        return [...this.components.values()].flatMap((component) => component.imports(sourceFile))
    }
}
