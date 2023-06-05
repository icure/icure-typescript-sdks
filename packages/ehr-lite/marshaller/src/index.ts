import { Project } from 'ts-morph'
import { mapperGenerator } from './mapperGenerator'
import { marshallerGenerator } from './marshallerGenerator'

const project = new Project({
    tsConfigFilePath: '../ehr/tsconfig.json',
})

export const modelRegex = /^(.*[\\/])?([\w-]+)\.model\.ts$/
export const mapperRegex = /^(.*[\\/])?([\w-]+)\.mapper\.ts$/

console.log('Generating mappers...')
mapperGenerator(project)

console.log('Generating marshallers...')
marshallerGenerator(project)
