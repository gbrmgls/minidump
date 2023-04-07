import NoteDTO from "../../_Common/DTOs/NoteDTO";
import IEntity from "./IEntity";

export default class NoteEntity implements IEntity {
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
    color: string = "#a9a9a9",
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

  public toDTO(): NoteDTO {
    return new NoteDTO(
      this.id,
      this.index,
      this.title,
      this.content,
      this.color,
      this.tags,
      this.createdAt,
      this.updatedAt
    );
  }

  public static fromDTO(note: NoteDTO): NoteEntity {
    return new NoteEntity(
      note.getId(),
      note.getIndex(),
      note.getTitle(),
      note.getContent(),
      note.getColor(),
      note.getTags(),
      note.getCreatedAt(),
      note.getUpdatedAt()
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

  public getTags(): any[] {
    return this.tags;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public setIndex(index: number = 0) {
    this.index = index;
  }

  public setTitle(title: string = "") {
    this.title = title;
  }

  public setContent(content: string = "") {
    this.content = content;
  }

  public setColor(color: string = "") {
    if (color == "") {
      throw new Error("No value passed to set.");
    }
    this.color = color;
  }

  public setTags(tags: string[] = []) {
    this.tags = tags;
  }

  public addTags(tagsIds: string[]): void {
    tagsIds.map((tagId) => {
      if (!this.tags.includes(tagId)) {
        this.tags.push(tagId);
      }
    });
  }

  public removeTags(tagsIds: string[]): void {
    this.tags = this.tags.filter((tagId) => !tagsIds.includes(tagId));
  }
}
