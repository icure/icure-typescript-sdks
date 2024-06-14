import { ClassComponent } from './ClassComponent'

export class SetComponent extends ClassComponent {
    override get typeName(): string {
        return `Set<${this.children![0].typeName}>`
    }

    override get interfaceName(): string {
        return `Set<${this.children![0].interfaceName}>`
    }

    public notNullable(): ClassComponent {
        return new SetComponent(false, this.optional, this.children)
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `(${value}?.map((item: any) => ${this.children![0].computeDeserializer('item')}) ?? [])` : `(${value}.map((item: any) => ${this.children![0].computeDeserializer('item')}))`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `([...${value} ?? []]?.map(item => ${this.children![0].computeSerializer('item')}) ?? [])` : `([...${value}].map(item => ${this.children![0].computeSerializer('item')}))`
    }
}
