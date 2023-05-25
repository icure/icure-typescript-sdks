import {HumanName} from "../../src/models/HumanName.model";
import {HumanNameUseEnum} from "../../src/models/enums/HumanNameUse.enum";

export function generateHumanName(): HumanName {
    const humanName = {
        lastName: 'Doe',
        firstNames: ['John'],
        start: 1621845600,
        end: 1621845600,
        prefix: ['Mr.'],
        suffix: ['Jr.'],
        text: 'John Doe',
        use: HumanNameUseEnum.official,
    }

    return new HumanName(humanName)
}