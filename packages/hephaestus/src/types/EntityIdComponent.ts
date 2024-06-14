import { ClassComponent } from './ClassComponent'
import { ImportDeclaration, SourceFile } from 'ts-morph'

export class EntityIdComponent extends ClassComponent {
    override get name(): string {
        return 'EntityId'
    }
    public notNullable(): ClassComponent {
        return new EntityIdComponent(false, this.optional, this.children)
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `${value}` : `forceUuid(${value})`
    }

    computeSerializer(value: string): string {
        return value
    }

    imports(sourceFile: SourceFile): ImportDeclaration[] {
        return [

            sourceFile.addImportDeclaration({
                namedImports: ['forceUuid'],
                moduleSpecifier: sourceFile.getDirectoryPath().includes('packages/common/') ? '../utils/uuidUtils' : '@icure/typescript-common',
            }),
        ]
    }
}
