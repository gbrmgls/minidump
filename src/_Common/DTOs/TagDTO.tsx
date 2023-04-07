import IDTO from "./IDTOs/IDTO";

export default class TagDTO implements IDTO {
  private id: string;
  private name: string;
  private createdAt: string;
  private updatedAt: string;

  constructor(id = "", name = "", createdAt = "", updatedAt = "") {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static fromJSON(json: any): TagDTO {
    return new TagDTO(json.id, json.name, json.createdAt, json.updatedAt);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public setId(id: string) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: string): void {
    this.updatedAt = updatedAt;
  }
}
