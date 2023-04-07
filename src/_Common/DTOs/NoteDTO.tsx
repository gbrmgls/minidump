import IDTO from "./IDTOs/IDTO";

export default class NoteDTO implements IDTO {
  private id: string;
  private index: number;
  private title: string;
  private content: string;
  private color: string;
  private tags: string[];
  private createdAt: string;
  private updatedAt: string;

  constructor(
    id: string = "",
    index: number = 0,
    title: string = "",
    content: string = "",
    color: string = "",
    tags: string[] = [],
    createdAt: string = "",
    updatedAt: string = ""
  ) {
    this.id = id;
    this.index = index;
    this.title = title;
    this.content = content;
    this.color = color;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJSON(): any {
    return {
      id: this.id,
      index: this.index,
      title: this.title,
      content: this.content,
      color: this.color,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static fromJSON(json: any): NoteDTO {
    return new NoteDTO(
      json.id,
      json.index,
      json.title,
      json.content,
      json.color,
      json.tags,
      json.createdAt
    );
  }

  public getId(): string {
    return this.id;
  }

  public getIndex(): number {
    return this.index;
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }

  public getColor(): string {
    return this.color;
  }

  public getTags(): string[] {
    return this.tags;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setIndex(index: number): void {
    this.index = index;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public setTags(tags: string[]): void {
    this.tags = tags;
  }

  public setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: string): void {
    this.updatedAt = updatedAt;
  }
}
