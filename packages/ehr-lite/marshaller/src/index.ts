import {Project} from "ts-morph";
import {toJSONGenerator} from "./generators/toJSONGenerator";
import {fromJSONGenerator} from "./generators/fromJSONGenerator";
import {ClassComponent} from "./types/ClassComponent";
import {ClassBundle} from "./types/ClassBundle";
import {classComponentFactory} from "./generators/classComponentFactory";

const project = new Project({
  tsConfigFilePath: "../ehr/tsconfig.json",
});

const sourceFiles = project.addSourceFilesAtPaths(
  "../ehr/src/models/*.model.ts"
);

for (const sourceFile of sourceFiles) {
  console.log("Source file path: ", sourceFile.getFilePath());
  const classes = sourceFile.getClasses();
  for (const classDeclaration of classes) {
    console.log("Class: ", classDeclaration.getName());

    const classComponents: [string, ClassComponent][] = classDeclaration
      .getProperties()
      .map((property) => {
        return [property.getName(), classComponentFactory(property.getType())];
      });

    const bundle = new ClassBundle(
      classDeclaration.getName()!,
      new Map(classComponents)
    );

    toJSONGenerator(classDeclaration, bundle);
    fromJSONGenerator(classDeclaration, bundle);

    bundle.imports(sourceFile);
    sourceFile.organizeImports();
  }
  sourceFile.saveSync();
}
