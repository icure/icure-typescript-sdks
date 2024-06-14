import { PropertyDeclaration, Type } from 'ts-morph'
import { ClassComponent } from '../types/ClassComponent'
import { DefaultComponent } from '../types/DefaultComponent'
import { ClassEntityComponent } from '../types/ClassEntityComponent'
import { SetComponent } from '../types/SetComponent'
import { ArrayComponent } from '../types/ArrayComponent'
import { MapComponent } from '../types/MapComponent'
import { ArrayBufferComponent } from '../types/ArrayBufferComponent'
import { RecordComponent } from '../types/RecordComponent'
import { EntityIdComponent } from '../types/EntityIdComponent'

export function classComponentFactory(propertyType: Type, property?: PropertyDeclaration): ClassComponent {
    let nullable = false
    let optional = !!property?.getInitializer()
    let type = propertyType

    if (type === undefined) {
        return new DefaultComponent(nullable)
    }

    if ((type.isUnion() && type.isNullable()) || type.getText() === 'any') {
        nullable = true
        type = type.getNonNullableType()
    }

    if (property?.getText().match(/.+:\s*EntityId/)) {
        return new EntityIdComponent(nullable, optional)
    }

    if (type.isClass()) {
        return new ClassEntityComponent(type.getSymbol()!.compilerSymbol.escapedName!, nullable, optional)
    }

    if (type.isObject()) {
        const typeType = type.getSymbol()!.compilerSymbol.escapedName

        if (typeType === 'Set') {
            return new SetComponent(nullable, optional, [classComponentFactory(type.getTypeArguments()[0])])
        }

        if (typeType === 'Array') {
            return new ArrayComponent(nullable, optional, [classComponentFactory(type.getTypeArguments()[0])])
        }
        type.getBaseTypeOfLiteralType().getText()
        if (typeType === '__type') {
            const regex = /Record<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/
            const match = type.getText().match(regex)
            const valueTypeName = match![2]
            const keyTypeName = match![1]
            const shortKeyTypeName = keyTypeName.match(/import\(".+?"\).(.+)/)?.[1] ?? keyTypeName

            let valueType: ClassComponent
            let shortType: string | undefined
            if ((shortType = valueTypeName.match(/import\(".+?"\).(.+)/)?.[1]) && !shortType.endsWith('Enum')) {
                if (shortType.endsWith('[]')) {
                    valueType = new ArrayComponent(false, false, [new ClassEntityComponent(shortType.slice(0, -2), false, false)])
                } else {
                    valueType = new ClassEntityComponent(shortType, false, false)
                }
            } else {
                valueType = new DefaultComponent(false, false, valueTypeName)
            }

            return new RecordComponent(nullable, optional, new DefaultComponent(false, false, keyTypeName), valueType)
        }

        if (typeType === 'Map') {
            const regex = /Map<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/
            const typeArguments = type.getTypeArguments()
            const match = type.getText().match(regex)
            const keyTypeName = match![1]
            const keyType = typeArguments.find((type) => type.getText() === keyTypeName)!
            const valueType = typeArguments.find((type) => type.getText() !== keyTypeName)!

            return new MapComponent(nullable, optional, classComponentFactory(keyType), classComponentFactory(valueType))
        }

        if (typeType === 'ArrayBuffer') {
            return new ArrayBufferComponent(nullable, optional)
        }

        throw new Error('Not implemented for type: ' + type.getSymbol()!.compilerSymbol.escapedName)
    }

    return new DefaultComponent(nullable, optional, type.getText())
}
