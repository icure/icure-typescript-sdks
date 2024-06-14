import { ImportDeclaration, SourceFile } from 'ts-morph'

export abstract class ClassComponent {
    readonly children?: ClassComponent[]
    readonly nullable: boolean = false
    readonly optional: boolean = false

    abstract get typeName(): string

    get interfaceName(): string {
        return this.typeName
    }

    constructor(nullable: boolean = false, optional: boolean = false, children?: ClassComponent[]) {
        this.nullable = nullable
        this.optional = optional
        this.children = children
    }

    public abstract notNullable(): ClassComponent

    public abstract computeSerializer(value: string): string

    public abstract computeDeserializer(value: string): string

    public imports(sourceFile: SourceFile): ImportDeclaration[] {
        return this.children?.flatMap((child) => child.imports(sourceFile)) ?? []
    }
}
