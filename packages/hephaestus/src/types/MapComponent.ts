import { ClassComponent } from './ClassComponent'

export class MapComponent extends ClassComponent {
    override get name(): string {
        return `Map<${this.keyType.name}, ${this.valueType.name}>`
    }
    override get iname(): string {
        return `Map<${this.keyType.name}, ${this.valueType.iname}>`
    }
    constructor(nullable: boolean = false, optional: boolean = false, keyType: ClassComponent, valueType: ClassComponent) {
        super(nullable, optional, [keyType, valueType])
    }

    public notNullable(): ClassComponent {
        return new MapComponent(false, this.optional, this.keyType, this.valueType)
    }

    get keyType(): ClassComponent {
        return this.children![0]
    }

    get valueType(): ClassComponent {
        return this.children![1]
    }

    computeDeserializer(value: string): string {
        return this.nullable
            ? `${value} ? new Map(Object.entries(${value}).map(([k, v]: [any, any]) => [${this.keyType.computeDeserializer('k')}, ${this.valueType.computeDeserializer('v')}])) : undefined`
            : `new Map(Object.entries(${value}).map(([k, v]: [any, any]) => [${this.keyType.computeDeserializer('k')}, ${this.valueType.computeDeserializer('v')}]))`
    }

    computeSerializer(value: string): string {
        return this.nullable
            ? `!!${value} ? Object.fromEntries([...${value}.entries()].map(([k, v]) => [${this.keyType.computeSerializer('k')}, ${this.valueType.computeSerializer('v')}])) : undefined`
            : `Object.fromEntries([...${value}.entries()].map(([k, v]) => [${this.keyType.computeSerializer('k')}, ${this.valueType.computeSerializer('v')}]))`
    }
}
