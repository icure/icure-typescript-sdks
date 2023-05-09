import { ClassComponent } from "./ClassComponent";

export class DefaultComponent extends ClassComponent {
  computeDeserializer(value: string): string {
    return value;
  }

  computeSerializer(value: string): string {
    return value;
  }
}
