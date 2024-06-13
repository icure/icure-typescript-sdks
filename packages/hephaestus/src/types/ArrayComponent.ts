import { ClassComponent } from './ClassComponent'

export class ArrayComponent extends ClassComponent {
    public notNullable(): ClassComponent {
        return new ArrayComponent(false, this.children)
    }
    computeSerializer(value: string): string {
        return this.nullable ? `${value}?.map(item => ${this.children![0].computeSerializer('item')})` : `${value}.map(item => ${this.children![0].computeSerializer('item')})`
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `${value}?.map((item: any) => ${this.children![0].computeDeserializer('item')})` : `${value}.map((item: any) => ${this.children![0].computeDeserializer('item')})`
    }
}
