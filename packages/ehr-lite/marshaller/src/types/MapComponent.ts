import { ClassComponent } from "./ClassComponent";

export class MapComponent extends ClassComponent {
  constructor(
    nullable: boolean = false,
    keyType: ClassComponent,
    valueType: ClassComponent
  ) {
    super(nullable, [keyType, valueType]);
  }

  get keyType(): ClassComponent {
    return this.children![0];
  }

  get valueType(): ClassComponent {
    return this.children![1];
  }

  computeDeserializer(value: string): string {
    return this.nullable
      ? `${value} ? new Map(${value}.map(([k, v]: [any, any]) => [${this.keyType.computeDeserializer(
          "k"
        )}, ${this.valueType.computeDeserializer("v")}])) : undefined`
      : `new Map(${value}.map(([k, v]: [any, any]) => [${this.keyType.computeDeserializer(
          "k"
        )}, ${this.valueType.computeDeserializer("v")}]))`;
  }

  computeSerializer(value: string): string {
    return this.nullable
      ? `!!${value} ? Object.fromEntries([...${value}.entries()].map(([k, v]) => [${this.keyType.computeSerializer(
          "k"
        )}, ${this.valueType.computeSerializer("v")}])) : undefined`
      : `Object.fromEntries([...${value}.entries()].map(([k, v]) => [${this.keyType.computeSerializer(
          "k"
        )}, ${this.valueType.computeSerializer("v")}]))`;
  }
}
