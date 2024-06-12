import { ClassComponent } from './ClassComponent'
import { ImportDeclaration } from 'ts-morph'

export class SetComponent extends ClassComponent {
    public notNullable(): ClassComponent {
        return new SetComponent(false, this.children)
    }

    computeDeserializer(value: string): string {
        return this.nullable ? `(${value}?.map((item: any) => ${this.children![0].computeDeserializer('item')}) ?? [])` : `(${value}.map((item: any) => ${this.children![0].computeDeserializer('item')}))`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `([...${value} ?? []]?.map(item => ${this.children![0].computeSerializer('item')}) ?? [])` : `([...${value}].map(item => ${this.children![0].computeSerializer('item')}))`
    }
}
