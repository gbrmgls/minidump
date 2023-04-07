import WorkspaceDTO from "../../../_Common/DTOs/WorkspaceDTO";

export default interface IWorkspaceService {
  getWorkspaces(options?: {}): Promise<WorkspaceDTO[]>;
  createWorkspace(workspace: WorkspaceDTO): Promise<WorkspaceDTO>;
  deleteWorkspace(id: string): Promise<boolean>;
  updateWorkspace(id: string, workspace: WorkspaceDTO): Promise<WorkspaceDTO>;
  swapWorkspacesIndexes(
    index1: number,
    index2: number
  ): Promise<WorkspaceDTO[]>;
}
