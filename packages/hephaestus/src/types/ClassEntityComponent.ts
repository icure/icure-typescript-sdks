import { ClassComponent } from './ClassComponent'

export class ClassEntityComponent extends ClassComponent {
    readonly name: string

    constructor(name: string, nullable: boolean) {
        super(nullable)
        this.name = name
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `!!${value} ? ${this.name}.fromJSON(${value}) : undefined` : `${this.name}.fromJSON(${value})`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `!!${value} ? ${this.name}.toJSON(${value}) : undefined` : `${this.name}.toJSON(${value})`
    }
}
