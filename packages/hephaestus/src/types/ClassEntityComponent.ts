import { ClassComponent } from './ClassComponent'

export class ClassEntityComponent extends ClassComponent {
    public notNullable(): ClassComponent {
        return new ClassEntityComponent(this.typeName, false, this.optional)
    }

    override readonly typeName: string

    override get interfaceName(): string {
        return `I${this.typeName}`
    }

    constructor(name: string, nullable: boolean, optional: boolean) {
        super(nullable, optional)
        this.typeName = name
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `!!${value} ? new ${this.typeName}(${value}) : undefined` : `new ${this.typeName}(${value})`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `!!${value} ? ${value}.toJSON() : undefined` : `${value}.toJSON()`
    }
}
