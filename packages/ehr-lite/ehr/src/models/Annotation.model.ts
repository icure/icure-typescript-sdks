import { ISO639_1 } from "@icure/api";
import { CodingReference } from "./CodingReference.model";

export class Annotation {
  id?: string;
  tags?: CodingReference[];
  author?: string;
  created?: number;
  modified?: number;
  markdown?: Map<ISO639_1, string>;
  target?: string;
  confidential?: boolean;
  encryptedSelf?: string;

  static toJSON(instance: Annotation): any {
    const pojo: any = {};
    pojo["id"] = instance.id;
    pojo["tags"] = instance.tags?.map((item) => CodingReference.toJSON(item));
    pojo["author"] = instance.author;
    pojo["created"] = instance.created;
    pojo["modified"] = instance.modified;
    pojo["markdown"] = !!instance.markdown
      ? Object.fromEntries(
          [...instance.markdown.entries()].map(([k, v]) => [k, v])
        )
      : undefined;
    pojo["target"] = instance.target;
    pojo["confidential"] = instance.confidential;
    pojo["encryptedSelf"] = instance.encryptedSelf;
    return pojo;
  }

  static fromJSON(pojo: any): Annotation {
    const instance = new Annotation();
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["tags"] === undefined) instance.tags = undefined;
    instance.tags = pojo["tags"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["author"] === undefined) instance.author = undefined;
    instance.author = pojo["author"];
    if (pojo["created"] === undefined) instance.created = undefined;
    instance.created = pojo["created"];
    if (pojo["modified"] === undefined) instance.modified = undefined;
    instance.modified = pojo["modified"];
    if (pojo["markdown"] === undefined) instance.markdown = undefined;
    instance.markdown = pojo["markdown"]
      ? new Map(pojo["markdown"].map(([k, v]: [any, any]) => [k, v]))
      : undefined;
    if (pojo["target"] === undefined) instance.target = undefined;
    instance.target = pojo["target"];
    if (pojo["confidential"] === undefined) instance.confidential = undefined;
    instance.confidential = pojo["confidential"];
    if (pojo["encryptedSelf"] === undefined) instance.encryptedSelf = undefined;
    instance.encryptedSelf = pojo["encryptedSelf"];
    return instance;
  }
}
