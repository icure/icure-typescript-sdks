import { ClassComponent } from './ClassComponent'

export class ClassEntityComponent extends ClassComponent {
    public notNullable(): ClassComponent {
        return new ClassEntityComponent(this.name, false, this.optional)
    }
    override readonly name: string
    override get iname(): string {
        return `I${this.name}`
    }
    constructor(name: string, nullable: boolean, optional: boolean) {
        super(nullable, optional)
        this.name = name
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `!!${value} ? new ${this.name}(${value}) : undefined` : `new ${this.name}(${value})`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `!!${value} ? ${value}.toJSON() : undefined` : `${value}.toJSON()`
    }
}
