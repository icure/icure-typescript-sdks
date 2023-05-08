import {initializeMapper, mapper} from "./mappings/mapper";
import {Condition} from "./models/Condition.model";
import {Annotation as AnnotationEntity, CodeStub, HealthElement, Identifier as IdentifierEntity} from "@icure/api";

initializeMapper()



// const he2 = mapper.map(condition, Condition, HealthElement);
//
// console.log(JSON.stringify(he2));
