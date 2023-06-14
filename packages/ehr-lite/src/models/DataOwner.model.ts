import {Practitioner} from "./Practitioner.model";
import {Patient} from "./Patient.model";
import {Organisation} from "./Organisation.model";
import {DataOwnerLikeApi} from "../../../common/src/apis/DataOwnerLikeApi";
import {User} from "@icure/api";

export enum DataOwnerType {
    PRACTITIONER = 'Practitioner',
    ORGANISATION = 'Organisation',
    PATIENT = 'Patient'
}

export type DataOwner = Practitioner | Organisation | Patient

export type DataOwnerWithType =
    | { type: DataOwnerType.PRACTITIONER, dataOwner: Practitioner }
    | { type: DataOwnerType.ORGANISATION, dataOwner: Organisation }
    | { type: DataOwnerType.PATIENT, dataOwner: Patient }

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
