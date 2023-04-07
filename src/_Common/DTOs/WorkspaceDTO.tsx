import IDTO from "./IDTOs/IDTO";

export default class WorkspaceDTO implements IDTO {
  private id: string;
  private index: number;
  private name: string;
  private notes: string[];
  private focusedNote: string;
  private open: boolean;
  private createdAt: string;
  private updatedAt: string;

  constructor(
    id: string = "",
    index: number = 0,
    name: string = "",
    notes: string[] = [],
    focusedNote: string = "",
    open: boolean = false,
    createdAt: string = "",
    updatedAt: string = ""
  ) {
    this.id = id;
    this.index = index;
    this.name = name;
    this.notes = notes;
    this.focusedNote = focusedNote;
    this.open = open;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJSON(): any {
    return {
      id: this.id,
      index: this.index,
      name: this.name,
      notes: this.notes,
      focusedNote: this.focusedNote,
      open: this.open,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static fromJSON(json: any): WorkspaceDTO {
    return new WorkspaceDTO(
      json.id,
      json.name,
      json.index,
      json.notes,
      json.focusedNote,
      json.open,
      json.createdAt,
      json.updatedAt
    );
  }

  public getId(): string {
    return this.id;
  }

  public getIndex(): number {
    return this.index;
  }

  public getName(): string {
    return this.name;
  }

  public getNotes(): string[] {
    return this.notes;
  }

  public getFocusedNote(): string {
    return this.focusedNote;
  }

  public getOpen(): boolean {
    return this.open;
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

  public setIndex(index: number) {
    this.index = index;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setNotes(notes: string[]) {
    this.notes = notes;
  }

  public setFocusedNote(focusedNote: string) {
    this.focusedNote = focusedNote;
  }

  public setOpen(open: boolean) {
    this.open = open;
  }

  public setCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: string) {
    this.updatedAt = updatedAt;
  }
}
