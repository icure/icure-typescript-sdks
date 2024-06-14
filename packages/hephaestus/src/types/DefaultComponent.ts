import { ClassComponent } from './ClassComponent'

export class DefaultComponent extends ClassComponent {
    constructor(nullable: boolean = false, optional: boolean = false, name?: string) {
        super(nullable, optional)

        if (name?.startsWith('import(')) {
            this.typeName = name!.split(').').slice(-1)[0]
        } else {
            this.typeName = name ?? 'any'
        }
    }

    override readonly typeName: string

    public notNullable(): ClassComponent {
        return new DefaultComponent(false, this.optional, this.typeName)
    }

    computeDeserializer(value: string): string {
        return value
    }

    computeSerializer(value: string): string {
        return value
    }
}
