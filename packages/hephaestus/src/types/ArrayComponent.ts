import { ClassComponent } from './ClassComponent'

export class ArrayComponent extends ClassComponent {
    override get typeName(): string {
        return `${this.children![0].typeName}[]`
    }

    override get interfaceName(): string {
        return `${this.children![0].interfaceName}[]`
    }

    public notNullable(): ClassComponent {
        return new ArrayComponent(false, this.optional, this.children)
    }

    computeSerializer(value: string): string {
        return this.nullable ? `${value}?.map(item => ${this.children![0].computeSerializer('item')})` : `${value}.map(item => ${this.children![0].computeSerializer('item')})`
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `${value}?.map((item: any) => ${this.children![0].computeDeserializer('item')})` : `${value}.map((item: any) => ${this.children![0].computeDeserializer('item')})`
    }
}
