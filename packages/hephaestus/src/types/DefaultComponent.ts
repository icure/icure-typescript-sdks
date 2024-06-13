import { ClassComponent } from './ClassComponent'

export class DefaultComponent extends ClassComponent {
    public notNullable(): ClassComponent {
        return new DefaultComponent(false, this.children)
    }

    computeDeserializer(value: string): string {
        return value
    }

    computeSerializer(value: string): string {
        return value
    }
}
