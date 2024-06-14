# Hephaestus

Hephaestus is a TypeScript project that generates mappers and adds serialization and deserialization methods to model
classes. It's a perfect fit for ensuring flexibility and portability of your data within your TypeScript projects.

## Installation

To use Hephaestus in your project, clone the repository as a git submodule:

```bash
git submodule add https://github.com/icure/hephaestus.git
```

## Usage

Hephaestus takes in a `tsconfig.json` file as input along with several command-line options that allow you to configure
the mapper and marshaller generation process.

Here's how to use Hephaestus in your project:

```bash
yarn run start --tsconfig path/to/tsconfig.json [--model-regex your_model_regex] [--mapper-regex your_mapper_regex] [--mapper-generator] [--mapper-location your_mapper_location] [--marshaller-generator]
```

The available command-line options are as follows:

-   `--tsconfig`: Path to your project's `tsconfig.json` file. This option is mandatory.
-   `--model-regex`: Regular expression used to determine which files are considered as models. By default, Hephaestus
    considers any file that matches `^(.*[\\/])?([\w-]+)\.model\.ts$` as a model.
-   `--mapper-regex`: Regular expression used to determine which files are considered as mappers. By default, Hephaestus
    considers any file that matches `^(.*[\\/])?([\w-]+)\.mapper\.ts$` as a mapper.
-   `--mapper-generator`: Tells Hephaestus to generate mappers for your models. If you use this option, you also need to
    provide the `--mapper-location`.
-   `--mapper-location`: Path where the generated mappers should be placed. This option is mandatory
    if `--mapper-generator` is used.
-   `--marshaller-generator`: Tells Hephaestus to generate marshallers for your models.

## Examples

To generate mappers for your models using the default regular expressions and place them in a specific location, you can
use the following command:

```bash
yarn run start --tsconfig path/to/tsconfig.json --mapper-generator --mapper-location path/to/mapper/location
```

To generate marshallers for your models using custom regular expressions, you can use the following command:

```bash
yarn run start --tsconfig path/to/tsconfig.json --model-regex "^(.*[\\/])?myModel\.ts$" --mapper-regex "^(.*[\\/])?myMapper\.ts$" --marshaller-generator
```
