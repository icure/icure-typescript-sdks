import { Project } from 'ts-morph'
import { mapperGenerator } from './mapperGenerator'
import { marshallerGenerator } from './marshallerGenerator'
import process from 'process';

const args = process.argv

const getArg = (arg: string) => {
    const index = args.indexOf(arg)
    if (index === -1) {
        return undefined
    }
    return args[index + 1]
}

enum Arg {
    tsConfig = '--tsconfig',
    modelRegex = '--model-regex',
    mapperRegex = '--mapper-regex',
    mapperGenerator = '--mapper-generator',
    mapperLocation = '--mapper-location',
    marshallerGenerator = '--marshaller-generator',
}


const tsConfig = getArg(Arg.tsConfig)
if (tsConfig === undefined) {
    throw new Error('No tsconfig file specified')
}

const project = new Project({
    tsConfigFilePath: tsConfig,
})

export const modelRegex = args.includes(Arg.modelRegex) ? new RegExp(getArg(Arg.modelRegex)!) : /^(.*[\\/])?([\w-]+)\.model\.ts$/
export const mapperRegex = args.includes(Arg.mapperRegex) ? new RegExp(getArg(Arg.mapperRegex)!) : /^(.*[\\/])?([\w-]+)\.mapper\.ts$/

if (args.includes(Arg.mapperGenerator)) {

    if (!args.includes(Arg.mapperLocation)) {
        throw new Error('No mapper location specified')
    }

    console.log('Generating mappers...')
    mapperGenerator(project, getArg(Arg.mapperLocation)!)
}

if (args.includes(Arg.marshallerGenerator)) {
    console.log('Generating marshallers...')
    marshallerGenerator(project)
}
