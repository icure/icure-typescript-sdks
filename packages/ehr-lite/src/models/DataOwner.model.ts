import {Practitioner} from "./Practitioner.model";
import {Patient} from "./Patient.model";
import {Organisation} from "./Organisation.model";

export type DataOwner = Practitioner | Organisation | Patient

export enum DataOwnerTypeEnum {
    PATIENT = 'Patient',
    PRACTITIONER = 'Practitioner',
    ORGANISATION = 'Organisation',
}

export type DataOwnerWithType =
    | { type: DataOwnerTypeEnum.PRACTITIONER, dataOwner: Practitioner }
    | { type: DataOwnerTypeEnum.ORGANISATION, dataOwner: Organisation }
    | { type: DataOwnerTypeEnum.PATIENT, dataOwner: Patient }

/*
class UseDataOwner implements DataOwnerLikeApi<DataOwnerWithType, DataOwnerType> {
    getDataOwner(ownerId: string): Promise<DataOwnerWithType> {
        throw "TODO"
    }

    getDataOwnerIdOf(user: User): string {
        throw "TODO"
    }

    getPublicKeysOf(dataOwner: DataOwnerWithType): string[] {
        throw "TODO"
    }

    giveAccessBackTo(ownerId: string, ownerNewPublicKey: string): Promise<void> {
        throw "TODO"
    }

    sampleMethodWithSplit(_dataOwnerType: DataOwnerType, _dataOwnerActual: DataOwner): void {
        throw "TODO"
    }
}*/
