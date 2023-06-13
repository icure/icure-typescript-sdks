export function mapTo(targetClass: Function) {
    return function (constructor: Function) {
        Reflect.defineMetadata('mapTo', targetClass, constructor)
    }
}

export function ignoreSerialization(target: Function) {

}