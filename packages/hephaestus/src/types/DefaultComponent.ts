import { ClassComponent } from './ClassComponent'

export class DefaultComponent extends ClassComponent {
    override get name(): string {
        return 'any'
    }
    public notNullable(): ClassComponent {
        return new DefaultComponent(false, this.optional, this.children)
    }

    computeDeserializer(value: string): string {
        return value
    }

    computeSerializer(value: string): string {
        return value
    }
}
