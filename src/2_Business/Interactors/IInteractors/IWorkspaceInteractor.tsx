import WorkspaceDTO from "../../../_Common/DTOs/WorkspaceDTO";

export default interface IWorkspaceInteractor {
  getWorkspaces(options?: {}): Promise<WorkspaceDTO[]>;
  createWorkspace(workspace: WorkspaceDTO): Promise<WorkspaceDTO>;
  deleteWorkspace(id: string): Promise<boolean>;
  updateWorkspace(id: string, workspace: WorkspaceDTO): Promise<WorkspaceDTO>;
  swapWorkspacesIndexes(
    index1: number,
    index2: number
  ): Promise<WorkspaceDTO[]>;
  openNotes(notesIds: string[], workspaceId?: string): Promise<WorkspaceDTO>;
  closeNotes(noteIds: string[], workspaceId: string): Promise<boolean>;
  focusOnNote(noteId: string, workspaceId: string): Promise<WorkspaceDTO>;
  openWorkspaces(id: string[]): Promise<WorkspaceDTO[]>;
  closeWorkspaces(ids: string[]): Promise<WorkspaceDTO[]>;
}
