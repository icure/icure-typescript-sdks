import {Project, Type} from "ts-morph";

const project = new Project({
    tsConfigFilePath: "../ehr/tsconfig.json",
});

const sourceFiles = project.addSourceFilesAtPaths("../ehr/src/models/*.model.ts");

const typeSerializer: (type: Type, value: string) => string = (type: Type, value: string) => {

    if (type === undefined) {
        return value
    }

    if (type.isUnion() && type.isNullable()) {
        const nonNullableType = type.getNonNullableType()

        if (nonNullableType.isClass()) {
            return `!!${value} ? ${nonNullableType.getSymbol()!.compilerSymbol.escapedName}.toJSON(${value}) : undefined`;
        } else if (nonNullableType.isObject()) {
            if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Set") {
                return `Array.from([...${value} ?? []]?.map(item => ${typeSerializer(nonNullableType.getTypeArguments()[0], "item")}) ?? [])`;
            } else if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Array") {
                return `${value}?.map(item => ${typeSerializer(nonNullableType.getTypeArguments()[0], "item")})`;
            } else if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Map") {
                const typeArguments = nonNullableType.getTypeArguments()
                const regex = /Map<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/
                const match = nonNullableType.getText().match(regex)
                const keyTypeName = match![1]

                const keyType = typeArguments.find(type => type.getText() === keyTypeName)!
                const valueType = typeArguments.find(type => type.getText() !== keyTypeName)!

                return `!!${value} ? Object.fromEntries([...${value}.entries()].map(([k, v]) => [${typeSerializer(keyType, "k")}, ${typeSerializer(valueType, "v")}])) : undefined`;
            } else if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Date") {
                return `${value}?.toISOString()`;
            } else {
                throw new Error("Not implemented for type: " + nonNullableType.getSymbol()!.compilerSymbol.escapedName)
            }
        }
    }

    if (type.getSymbol() !== undefined) {
        if (type.getSymbol()!.compilerSymbol.escapedName === 'Set') {
            return `Array.from([...${value}].map(item => ${typeSerializer(type.getTypeArguments()[0], "item")}))`;
        } else if (type.getSymbol()!.compilerSymbol.escapedName === 'Array') {
            return `${value}.map(item => ${typeSerializer(type.getTypeArguments()[0], "item")})`;
        } else if (type.getSymbol()!.compilerSymbol.escapedName === 'Map') {
            return `Object.fromEntries([...${value}.entries()].map(([k, v]) => [${typeSerializer(type.getTypeArguments()[1], "k")}, ${typeSerializer(type.getTypeArguments()[0], "v")}]))`;
        } else if (type.getSymbol()!.compilerSymbol.escapedName === 'Date') {
            return `${value}.toISOString()`;
        } else if (type.isClass()) {
            return `${type.getSymbol()!.compilerSymbol.escapedName}.toJSON(${value})`;
        }
    }

    return value
}

const typeDeserializer: (type: Type, value: string) => string = (type: Type, value: string) => {

    if (type === undefined) {
        return value;
    }

    if (type.isUnion() && type.isNullable()) {
        const nonNullableType = type.getNonNullableType();

        if (nonNullableType.isClass()) {
            return `!!${value} ? ${nonNullableType.getSymbol()!.compilerSymbol.escapedName}.fromJSON(${value}) : undefined`;
        } else if (nonNullableType.isObject()) {
            if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Set") {
                return `new Set(${value}?.map((item: any) => ${typeDeserializer(nonNullableType.getTypeArguments()[0], "item")}) ?? [])`;
            } else if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Array") {
                return `${value}?.map((item: any) => ${typeDeserializer(nonNullableType.getTypeArguments()[0], "item")})`;
            } else if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Map") {
                const regex = /Map<\s*((?:string|number|boolean|bigint|symbol|import\("[^"]+"\)\.[^,\s]+))\s*,\s*([\s\S]+)\s*>/
                const typeArguments = nonNullableType.getTypeArguments()
                const match = nonNullableType.getText().match(regex)
                const keyTypeName = match![1]
                const keyType = typeArguments.find(type => type.getText() === keyTypeName)!
                const valueType = typeArguments.find(type => type.getText() !== keyTypeName)!

                return `new Map(${value}?.map(([k, v]: [any, any]) => [${typeDeserializer(keyType, "k")}, ${typeDeserializer(valueType, "v")}]) ?? [])`;
            } else if (nonNullableType.getSymbol()!.compilerSymbol.escapedName === "Date") {
                return `new Date(${value})`;
            } else {
                throw new Error("Not implemented for type: " + nonNullableType.getSymbol()!.compilerSymbol.escapedName);
            }
        }
    }

    if (type.getSymbol() !== undefined) {
        if (type.getSymbol()!.compilerSymbol.escapedName === 'Set') {
            return `new Set(${value}.map((item: any) => ${typeDeserializer(type.getTypeArguments()[0], "item")}))`;
        } else if (type.getSymbol()!.compilerSymbol.escapedName === 'Array') {
            return `${value}.map((item: any) => ${typeDeserializer(type.getTypeArguments()[0], "item")})`;
        } else if (type.getSymbol()!.compilerSymbol.escapedName === 'Map') {
            return `new Map(${value}.map(([k, v]: [any, any]) => [${typeDeserializer(type.getTypeArguments()[0], "k")}, ${typeDeserializer(type.getTypeArguments()[1], "v")}]))`;
        } else if (type.getSymbol()!.compilerSymbol.escapedName === 'Date') {
            return `new Date(${value})`;
        } else if (type.isClass()) {
            return `${type.getSymbol()!.compilerSymbol.escapedName}.fromJSON(${value})`;
        }
    }

    return value;
};



for (const sourceFile of sourceFiles) {
    console.log("Source file path: ", sourceFile.getFilePath())
    const classes = sourceFile.getClasses();
    for (const classDeclaration of classes) {
        console.log("Class: ", classDeclaration.getName())

        // Remove existing toJSON method
        classDeclaration.getMethod("toJSON")?.remove()

        // Add new toJSON method
        classDeclaration.addMethod({
            name: "toJSON",
            isStatic: true,
            isAbstract: false,
            returnType: "any",
            parameters: [{ name: "instance", type: classDeclaration.getName() }],
            statements: writer => {
                // write the method body
                writer.writeLine("const pojo: any = {}");
                for (const property of classDeclaration.getProperties()) {
                    const propertyName = property.getName();
                    const propertyType = property.getType();

                    writer.writeLine(`pojo["${propertyName}"] = ${typeSerializer(propertyType, `instance.${propertyName}`)}`);
                }
                writer.writeLine("return pojo");
            }
        })

        // Remove existing fromJSON method
        classDeclaration.getMethod("fromJSON")?.remove()

        // Add new fromJSON method
        classDeclaration.addMethod({
            name: "fromJSON",
            isStatic: true,
            isAbstract: false,
            parameters: [{ name: "pojo", type: "any" }],
            returnType: classDeclaration.getName(),
            statements: writer => {
                // write the method body
                writer.writeLine(`const instance = new ${classDeclaration.getName()}()`);
                for (const property of classDeclaration.getProperties()) {
                    const propertyName = property.getName();
                    const propertyType = property.getType();

                    writer.writeLine(`if (pojo["${propertyName}"] === undefined) instance.${propertyName} = undefined`);
                    writer.writeLine(`else instance.${propertyName} = ${typeDeserializer(propertyType, `pojo["${propertyName}"]`)}`);
                }
                writer.writeLine("return instance");
            }
        })
    }
    sourceFile.saveSync();
}

