import NoteDTO from "../../_Common/DTOs/NoteDTO";
import WorkspaceDTO from "../../_Common/DTOs/WorkspaceDTO";
import IEntity from "./IEntity";
import NoteEntity from "./NoteEntity";
import TagEntity from "./TagEntity";

export default class WorkspaceEntity implements IEntity {
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

  public toDTO(): WorkspaceDTO {
    return new WorkspaceDTO(
      this.id,
      this.index,
      this.name,
      this.notes,
      this.focusedNote,
      this.open,
      this.createdAt,
      this.updatedAt
    );
  }

  public static fromDTO(workspace: WorkspaceDTO): WorkspaceEntity {
    return new WorkspaceEntity(
      workspace.getId(),
      workspace.getIndex(),
      workspace.getName(),
      workspace.getNotes(),
      workspace.getFocusedNote(),
      workspace.getOpen(),
      workspace.getCreatedAt(),
      workspace.getUpdatedAt()
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

  public setIndex(index: number = 0) {
    this.index = index;
  }

  public setName(name: string = "") {
    this.name = name;
  }

  public setNotes(notes: string[] = []) {
    this.notes = notes;
  }

  public addNotes(notes: string[] = []) {
    this.notes = [...this.notes, ...notes];
  }

  public removeNotes(notes: string[] = []) {
    this.notes = [
      ...this.notes.filter((note: string) => !notes.includes(note)),
    ];
  }

  public setFocusedNote(focusedNote: string = "") {
    this.focusedNote = focusedNote;
  }

  public setOpen(open: boolean = false) {
    this.open = open;
  }
}
