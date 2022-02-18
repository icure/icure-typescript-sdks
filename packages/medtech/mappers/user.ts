import { User as UserDto} from "@icure/api";
import {User} from "../models/User";
import {forceUuid, map, mapReduce, mapSet, toMapSet} from "./utils";
import { PropertyStubMapper } from "./property";

export namespace UserMapper {
  import toPropertyStubDto = PropertyStubMapper.toPropertyStubDto;
  import toProperty = PropertyStubMapper.toProperty;

  export const toUser = (obj?: UserDto) => obj ?
      new User({
        id: obj.id,
        properties: new Set(map(obj.properties, toProperty)),
        roles: new Set(obj.roles),
        autoDelegations: toMapSet(obj.autoDelegations),
        rev: obj.rev,
        deletionDate: obj.deletionDate,
        created: obj.created,
        name: obj.name,
        login: obj.login,
        passwordHash: obj.passwordHash,
        secret: obj.secret,
        use2fa: obj.use2fa,
        groupId: obj.groupId,
        healthcarePartyId: obj.healthcarePartyId,
        patientId: obj.patientId,
        deviceId: obj.deviceId,
        email: obj.email,
        mobilePhone: obj.mobilePhone,
      }) : null;

  export const toUserDto = (obj?: User) => obj ?
      new UserDto({
        id: forceUuid(obj.id),
        properties: mapSet(obj.properties, toPropertyStubDto),
        roles: obj.roles,
        autoDelegations: obj.autoDelegations,
        authenticationTokens: mapReduce(obj.authenticationTokens, toAuthenticationTokenDto),
        rev: obj.rev,
        deletionDate: obj.deletionDate,
        created: obj.created,
        name: obj.name,
        login: obj.login,
        passwordHash: obj.passwordHash,
        secret: obj.secret,
        use2fa: obj.use2fa,
        groupId: obj.groupId,
        healthcarePartyId: obj.healthcarePartyId,
        patientId: obj.patientId,
        deviceId: obj.deviceId,
        email: obj.email,
        mobilePhone: obj.mobilePhone,
      }) : null;
}
