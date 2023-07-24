import { ClassComponent } from './ClassComponent'
import { ImportDeclaration } from 'ts-morph'

export class SetComponent extends ClassComponent {
    computeDeserializer(value: string): string {
        return this.nullable ? `new Set(${value}?.map((item: any) => ${this.children![0].computeDeserializer('item')}) ?? [])` : `new Set(${value}.map((item: any) => ${this.children![0].computeDeserializer('item')}))`
    }

    computeSerializer(value: string): string {
        return this.nullable ? `Array.from([...${value} ?? []]?.map(item => ${this.children![0].computeSerializer('item')}) ?? [])` : `Array.from([...${value}].map(item => ${this.children![0].computeSerializer('item')}))`
    }
}
