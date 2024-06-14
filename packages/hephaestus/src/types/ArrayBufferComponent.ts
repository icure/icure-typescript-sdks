import { ClassComponent } from './ClassComponent'
import { ImportDeclaration, SourceFile } from 'ts-morph'

export class ArrayBufferComponent extends ClassComponent {
    override get name(): string {
        return 'ArrayBuffer'
    }

    public notNullable(): ArrayBufferComponent {
        return new ArrayBufferComponent(false, this.optional, this.children)
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `!!${value} ? b64_2ab(${value}) : undefined` : `b64_2ab(${value})`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `!!${value} ? ua2b64(${value}) : undefined` : `ua2b64(${value})`
    }

    imports(sourceFile: SourceFile): ImportDeclaration[] {
        return [
            sourceFile.addImportDeclaration({
                namedImports: ['b64_2ab', 'ua2b64'],
                moduleSpecifier: '@icure/api',
            }),
        ]
    }
}
