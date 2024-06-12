import { Annotation as AnnotationDto } from '@icure/api/icc-api/model/Annotation'
import { Annotation } from '../models/Annotation.model'
import { CodeStub, ISO639_1 } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from './CodingReference.mapper'
import { forceUuid } from '../utils/uuidUtils'

function toAnnotationDtoId(domain: Annotation): string | undefined {
    return forceUuid(domain.id)
}

function toAnnotationDtoAuthor(domain: Annotation): string | undefined {
    return domain.author
}

function toAnnotationDtoCreated(domain: Annotation): number | undefined {
    return domain.created
}

function toAnnotationDtoModified(domain: Annotation): number | undefined {
    return domain.modified
}

function toAnnotationDtoText(domain: Annotation): string | undefined {
    return undefined
}

function toAnnotationDtoMarkdown(domain: Annotation):
    | {
          ab?: string | undefined
          aa?: string | undefined
          af?: string | undefined
          ak?: string | undefined
          sq?: string | undefined
          am?: string | undefined
          ar?: string | undefined
          an?: string | undefined
          hy?: string | undefined
          av?: string | undefined
          ae?: string | undefined
          ay?: string | undefined
          az?: string | undefined
          as?: string | undefined
          bm?: string | undefined
          ba?: string | undefined
          eu?: string | undefined
          be?: string | undefined
          bn?: string | undefined
          bi?: string | undefined
          bs?: string | undefined
          br?: string | undefined
          bg?: string | undefined
          my?: string | undefined
          ca?: string | undefined
          ch?: string | undefined
          ce?: string | undefined
          ny?: string | undefined
          zh?: string | undefined
          cu?: string | undefined
          cv?: string | undefined
          kw?: string | undefined
          co?: string | undefined
          cr?: string | undefined
          hr?: string | undefined
          cs?: string | undefined
          da?: string | undefined
          dv?: string | undefined
          nl?: string | undefined
          dz?: string | undefined
          en?: string | undefined
          eo?: string | undefined
          et?: string | undefined
          ee?: string | undefined
          fo?: string | undefined
          fj?: string | undefined
          fi?: string | undefined
          fr?: string | undefined
          fy?: string | undefined
          ff?: string | undefined
          gd?: string | undefined
          gl?: string | undefined
          lg?: string | undefined
          ka?: string | undefined
          de?: string | undefined
          el?: string | undefined
          kl?: string | undefined
          gn?: string | undefined
          gu?: string | undefined
          ht?: string | undefined
          ha?: string | undefined
          he?: string | undefined
          hz?: string | undefined
          hi?: string | undefined
          ho?: string | undefined
          hu?: string | undefined
          is?: string | undefined
          io?: string | undefined
          ig?: string | undefined
          id?: string | undefined
          ia?: string | undefined
          ie?: string | undefined
          iu?: string | undefined
          ik?: string | undefined
          ga?: string | undefined
          it?: string | undefined
          ja?: string | undefined
          jv?: string | undefined
          kn?: string | undefined
          kr?: string | undefined
          ks?: string | undefined
          kk?: string | undefined
          km?: string | undefined
          ki?: string | undefined
          rw?: string | undefined
          ky?: string | undefined
          kv?: string | undefined
          kg?: string | undefined
          ko?: string | undefined
          kj?: string | undefined
          ku?: string | undefined
          lo?: string | undefined
          la?: string | undefined
          lv?: string | undefined
          li?: string | undefined
          ln?: string | undefined
          lt?: string | undefined
          lu?: string | undefined
          lb?: string | undefined
          mk?: string | undefined
          mg?: string | undefined
          ms?: string | undefined
          ml?: string | undefined
          mt?: string | undefined
          gv?: string | undefined
          mi?: string | undefined
          mr?: string | undefined
          mh?: string | undefined
          mn?: string | undefined
          na?: string | undefined
          nv?: string | undefined
          nd?: string | undefined
          nr?: string | undefined
          ng?: string | undefined
          ne?: string | undefined
          no?: string | undefined
          nb?: string | undefined
          nn?: string | undefined
          ii?: string | undefined
          oc?: string | undefined
          oj?: string | undefined
          or?: string | undefined
          om?: string | undefined
          os?: string | undefined
          pi?: string | undefined
          ps?: string | undefined
          fa?: string | undefined
          pl?: string | undefined
          pt?: string | undefined
          pa?: string | undefined
          qu?: string | undefined
          ro?: string | undefined
          rm?: string | undefined
          rn?: string | undefined
          ru?: string | undefined
          se?: string | undefined
          sm?: string | undefined
          sg?: string | undefined
          sa?: string | undefined
          sc?: string | undefined
          sr?: string | undefined
          sn?: string | undefined
          sd?: string | undefined
          si?: string | undefined
          sk?: string | undefined
          sl?: string | undefined
          so?: string | undefined
          st?: string | undefined
          es?: string | undefined
          su?: string | undefined
          sw?: string | undefined
          ss?: string | undefined
          sv?: string | undefined
          tl?: string | undefined
          ty?: string | undefined
          tg?: string | undefined
          ta?: string | undefined
          tt?: string | undefined
          te?: string | undefined
          th?: string | undefined
          bo?: string | undefined
          ti?: string | undefined
          to?: string | undefined
          ts?: string | undefined
          tn?: string | undefined
          tr?: string | undefined
          tk?: string | undefined
          tw?: string | undefined
          ug?: string | undefined
          uk?: string | undefined
          ur?: string | undefined
          uz?: string | undefined
          ve?: string | undefined
          vi?: string | undefined
          vo?: string | undefined
          wa?: string | undefined
          cy?: string | undefined
          wo?: string | undefined
          xh?: string | undefined
          yi?: string | undefined
          yo?: string | undefined
          za?: string | undefined
          zu?: string | undefined
          xx?: string | undefined
      }
    | undefined {
    return !!domain.markdown ? domain.markdown : undefined
}

function toAnnotationDtoTags(domain: Annotation): CodeStub[] | undefined {
    return [...domain.tags].map((t) => mapCodingReferenceToCodeStub(t))
}

function toAnnotationDtoLocation(domain: Annotation): string | undefined {
    return domain.target
}

function toAnnotationDtoEncryptedSelf(domain: Annotation): string | undefined {
    return domain.encryptedSelf
}

function toAnnotationId(dto: AnnotationDto): string {
    return dto.id!
}

function toAnnotationTags(dto: AnnotationDto): Array<CodingReference> {
    return (dto.tags?.map((t) => mapCodeStubToCodingReference(t))) ?? []
}

function toAnnotationAuthor(dto: AnnotationDto): string | undefined {
    return dto.author
}

function toAnnotationCreated(dto: AnnotationDto): number | undefined {
    return dto.created
}

function toAnnotationModified(dto: AnnotationDto): number | undefined {
    return dto.modified
}

function toAnnotationMarkdown(dto: AnnotationDto): Record<ISO639_1, string> {
    return Object.fromEntries(Object.entries(dto.markdown ?? {})) as Record<ISO639_1, string>
}

function toAnnotationTarget(dto: AnnotationDto): string | undefined {
    return dto.location
}
function toAnnotationEncryptedSelf(dto: AnnotationDto): string | undefined {
    return dto.encryptedSelf
}

export function mapAnnotationDtoToAnnotation(dto: AnnotationDto): Annotation {
    return new Annotation({
        id: toAnnotationId(dto),
        tags: toAnnotationTags(dto),
        author: toAnnotationAuthor(dto),
        created: toAnnotationCreated(dto),
        modified: toAnnotationModified(dto),
        markdown: toAnnotationMarkdown(dto),
        target: toAnnotationTarget(dto),
        encryptedSelf: toAnnotationEncryptedSelf(dto),
    })
}

export function mapAnnotationToAnnotationDto(domain: Annotation): AnnotationDto {
    return new AnnotationDto({
        id: toAnnotationDtoId(domain),
        author: toAnnotationDtoAuthor(domain),
        created: toAnnotationDtoCreated(domain),
        modified: toAnnotationDtoModified(domain),
        text: toAnnotationDtoText(domain),
        markdown: toAnnotationDtoMarkdown(domain),
        tags: toAnnotationDtoTags(domain),
        location: toAnnotationDtoLocation(domain),
        encryptedSelf: toAnnotationDtoEncryptedSelf(domain),
    })
}
