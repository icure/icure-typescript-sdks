import { Type } from 'ts-morph'
import { ClassComponent } from '../types/ClassComponent'
import { DefaultComponent } from '../types/DefaultComponent'
import { ClassEntityComponent } from '../types/ClassEntityComponent'
import { SetComponent } from '../types/SetComponent'
import { ArrayComponent } from '../types/ArrayComponent'
import { MapComponent } from '../types/MapComponent'
import { ArrayBufferComponent } from '../types/ArrayBufferComponent'
import { RecordComponent } from '../types/RecordComponent'

export function classComponentFactory(propertyType: Type): ClassComponent {
    let nullable = false
    let type = propertyType

    if (type === undefined) {
        return new DefaultComponent(nullable)
    }

    if (type.isUnion() && type.isNullable()) {
        nullable = true
        type = type.getNonNullableType()
    }

    if (type.isClass()) {
        return new ClassEntityComponent(type.getSymbol()!.compilerSymbol.escapedName!, nullable)
    }

    if (type.isObject()) {
        const typeType = type.getSymbol()!.compilerSymbol.escapedName

        if (typeType === 'Set') {
            return new SetComponent(nullable, [classComponentFactory(type.getTypeArguments()[0])])
        }

        if (typeType === 'Array') {
            return new ArrayComponent(nullable, [classComponentFactory(type.getTypeArguments()[0])])
        }

        if (typeType === 'Record' || typeType === '__type') {
            const regex = /Record<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/
            const typeArguments = type.getTypeArguments()
            const match = type.getText().match(regex)
            const keyTypeName = match![1]
            const keyType = typeArguments.find((type) => type.getText() === keyTypeName)!
            const valueType = typeArguments.find((type) => type.getText() !== keyTypeName)!

            return new RecordComponent(nullable, classComponentFactory(keyType), classComponentFactory(valueType))
        }

        if (typeType === 'Map') {
            const regex = /Map<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/
            const typeArguments = type.getTypeArguments()
            const match = type.getText().match(regex)
            const keyTypeName = match![1]
            const keyType = typeArguments.find((type) => type.getText() === keyTypeName)!
            const valueType = typeArguments.find((type) => type.getText() !== keyTypeName)!

            return new MapComponent(nullable, classComponentFactory(keyType), classComponentFactory(valueType))
        }

        if (typeType === 'ArrayBuffer') {
            return new ArrayBufferComponent(nullable)
        }

        throw new Error('Not implemented for type: ' + type.getSymbol()!.compilerSymbol.escapedName)
    }

    return new DefaultComponent(nullable)
}
