import TagDTO from "../../_Common/DTOs/TagDTO";
import IEntity from "./IEntity";

export default class TagEntity implements IEntity {
  private id?: string;
  private name: string;
  private createdAt: string;
  private updatedAt: string;

  constructor(
    id: string = "",
    name: string = "",
    createdAt: string = "",
    updatedAt: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toDTO(): TagDTO {
    return new TagDTO(this.id, this.name, this.createdAt, this.updatedAt);
  }

  public static fromDTO(tag: TagDTO): TagEntity {
    return new TagEntity(tag.getId(), tag.getName());
  }

  public setName(name: string) {
    this.name = name;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
}
