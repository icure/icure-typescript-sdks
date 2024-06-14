import { ClassComponent } from './ClassComponent'

export class RecordComponent extends ClassComponent {
    override get name(): string {
        return `{ [${this.keyType.name}]: ${this.valueType.name} }`
    }
    override get iname(): string {
        return `{ [${this.keyType.name}]: ${this.valueType.iname} }`
    }

    constructor(nullable: boolean = false, optional: boolean = false, keyType: ClassComponent, valueType: ClassComponent) {
        super(nullable, optional, [keyType, valueType])
    }

    public notNullable(): ClassComponent {
        return new RecordComponent(false, this.optional, this.keyType, this.valueType)
    }

    get keyType(): ClassComponent {
        return this.children![0]
    }

    get valueType(): ClassComponent {
        return this.children![1]
    }

    computeDeserializer(value: string): string {
        let keyDeserializer = this.keyType.computeDeserializer('k')
        let valueDeserializer = this.valueType.computeDeserializer('v')

        let mapper = keyDeserializer === 'k' && valueDeserializer === 'v' ? `{...${value}}` : `Object.fromEntries(Object.entries(${value}).map(([k, v]: [${this.keyType.name}, ${this.valueType.iname}]) => [${keyDeserializer}, ${valueDeserializer}]))`

        return this.nullable ? `${value} ? ${mapper} : undefined` : mapper
    }

    computeSerializer(value: string): string {
        let keySerializer = this.keyType.computeSerializer('k')
        let valueSerializer = this.valueType.computeSerializer('v')

        let mapper = keySerializer === 'k' && valueSerializer === 'v' ? `{...${value}}` : `Object.fromEntries(Object.entries(${value}).map(([k, v]: [${this.keyType.name}, ${this.valueType.name}]) => [${keySerializer}, ${valueSerializer}]))`

        return this.nullable ? `${value} ? ${mapper} : undefined` : mapper
    }
}
