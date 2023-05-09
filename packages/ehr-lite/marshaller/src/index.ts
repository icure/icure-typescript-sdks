import { Project, ts, Type } from "ts-morph";
import { toJSONGenerator } from "./generators/toJSONGenerator";
import { fromJSONGenerator } from "./generators/fromJSONGenerator";
import { DefaultComponent } from "./types/DefaultComponent";
import { ClassEntityComponent } from "./types/ClassEntityComponent";
import { SetComponent } from "./types/SetComponent";
import { ClassComponent } from "./types/ClassComponent";
import { ArrayComponent } from "./types/ArrayComponent";
import { MapComponent } from "./types/MapComponent";
import { ClassBundle } from "./types/ClassBundle";
import { ArrayBufferComponent } from "./types/ArrayBufferComponent";

const project = new Project({
  tsConfigFilePath: "../ehr/tsconfig.json",
});

const sourceFiles = project.addSourceFilesAtPaths(
  "../ehr/src/models/*.model.ts"
);

function typeAnalyser(type: Type): ClassComponent {
  let nullable = false;

  if (type === undefined) {
    return new DefaultComponent(nullable);
  }

  if (type.isUnion() && type.isNullable()) {
    nullable = true;
    type = type.getNonNullableType();
  }

  if (type.isClass()) {
    return new ClassEntityComponent(
      type.getSymbol()!.compilerSymbol.escapedName!,
      nullable
    );
  }

  if (type.isObject()) {
    const typeType = type.getSymbol()!.compilerSymbol.escapedName;

    if (typeType === "Set") {
      return new SetComponent(nullable, [
        typeAnalyser(type.getTypeArguments()[0]),
      ]);
    }

    if (typeType === "Array") {
      return new ArrayComponent(nullable, [
        typeAnalyser(type.getTypeArguments()[0]),
      ]);
    }

    if (typeType === "Map") {
      const regex =
        /Map<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/;
      const typeArguments = type.getTypeArguments();
      const match = type.getText().match(regex);
      const keyTypeName = match![1];
      const keyType = typeArguments.find(
        (type) => type.getText() === keyTypeName
      )!;
      const valueType = typeArguments.find(
        (type) => type.getText() !== keyTypeName
      )!;

      return new MapComponent(
        nullable,
        typeAnalyser(keyType),
        typeAnalyser(valueType)
      );
    }

    if (typeType === "ArrayBuffer") {
      return new ArrayBufferComponent(nullable);
    }

    throw new Error(
      "Not implemented for type: " +
        type.getSymbol()!.compilerSymbol.escapedName
    );
  }

  return new DefaultComponent();
}

for (const sourceFile of sourceFiles) {
  console.log("Source file path: ", sourceFile.getFilePath());
  const classes = sourceFile.getClasses();
  for (const classDeclaration of classes) {
    console.log("Class: ", classDeclaration.getName());

    // toJSONGenerator(classDeclaration);
    // fromJSONGenerator(classDeclaration);

    const classComponents: [string, ClassComponent][] = classDeclaration
      .getProperties()
      .map((property) => {
        let type = property.getType();

        return [property.getName(), typeAnalyser(type)];
      });

    const bundle = new ClassBundle(
      classDeclaration.getName()!,
      new Map(classComponents)
    );

    toJSONGenerator(classDeclaration, bundle);
    fromJSONGenerator(classDeclaration, bundle);

    const imports = bundle.imports(sourceFile);
    sourceFile.organizeImports();
  }
  sourceFile.saveSync();
}
