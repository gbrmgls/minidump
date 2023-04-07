import WorkspaceDTO from "../../../_Common/DTOs/WorkspaceDTO";

export default interface IWorkspaceDAO {
  getWorkspaces(options?: {
    page: number;
    ammount: number;
    filter: {
      and: {
        ids: string[];
        name: string;
        open: boolean;
        notes: string[];
      };
      or: {
        ids: string[];
        name: string;
        open: boolean;
        notes: string[];
      };
    };
  }): Promise<WorkspaceDTO[]>;
  createWorkspace(workspace: WorkspaceDTO): Promise<WorkspaceDTO>;
  deleteWorkspace(id: string): Promise<boolean>;
  updateWorkspace(id: string, workspace: WorkspaceDTO): Promise<WorkspaceDTO>;
  swapWorkspacesIndex(index1: number, index2: number): Promise<WorkspaceDTO[]>;
}
