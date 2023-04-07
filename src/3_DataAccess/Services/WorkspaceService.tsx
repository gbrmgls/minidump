import WorkspaceDTO from "../../_Common/DTOs/WorkspaceDTO";
import IWorkspaceService from "./IServices/IWorkspaceService";
import WorkspacePouchDBDAO from "../DAOs/PouchDBDAOs/WorkspacePouchDBDAO";
import config from "../../../envconfig.json";

class WorkspaceService implements IWorkspaceService {
  // Use selected DAO to interact with the database
  private WorkspaceDAOs: any = {
    POUCHDB: WorkspacePouchDBDAO,
  };

  private workspaceDAO = this.WorkspaceDAOs[config.DB_TYPE];

  async subscribe(callback: any): Promise<any> {
    return await this.workspaceDAO.subscribe(callback);
  }

  public async getWorkspaces(options?: {}): Promise<WorkspaceDTO[]> {
    return await this.workspaceDAO.getWorkspaces(options);
  }

  public async createWorkspace(workspace: WorkspaceDTO): Promise<WorkspaceDTO> {
    return await this.workspaceDAO.createWorkspace(workspace);
  }

  public async deleteWorkspace(id: string): Promise<boolean> {
    return this.workspaceDAO.deleteWorkspace(id);
  }

  public async updateWorkspace(
    id: string,
    workspace: WorkspaceDTO
  ): Promise<WorkspaceDTO> {
    return await this.workspaceDAO.updateWorkspace(id, workspace);
  }

  public async swapWorkspacesIndexes(
    index1: number,
    index2: number
  ): Promise<WorkspaceDTO[]> {
    return await this.workspaceDAO.swapWorkspacesIndex(index1, index2);
  }
}

export default new WorkspaceService();
