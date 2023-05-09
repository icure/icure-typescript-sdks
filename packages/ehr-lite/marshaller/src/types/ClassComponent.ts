import { ImportDeclaration, SourceFile } from "ts-morph";

export abstract class ClassComponent {
  readonly children?: ClassComponent[];
  readonly nullable: boolean = false;
  constructor(nullable: boolean = false, children?: ClassComponent[]) {
    this.nullable = nullable;
    this.children = children;
  }
  public abstract computeSerializer(value: string): string;
  public abstract computeDeserializer(value: string): string;
  public imports(sourceFile: SourceFile): ImportDeclaration[] {
    return this.children?.flatMap((child) => child.imports(sourceFile)) ?? [];
  }
}
