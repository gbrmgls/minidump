import WorkspaceDTO from "../../../../_Common/DTOs/WorkspaceDTO";
import SidebarList from "./SidebarList";
import SidebarListItem from "./SidebarListItem/SidebarListItem";
import SidebarListWrapper from "./SidebarListWrapper";
import { useAtom } from "jotai";
import TagDTO from "../../../../_Common/DTOs/TagDTO";
import Atoms from "../../Atoms";
import NoteActions from "../../../Actions/NoteActions";
import WorkspaceActions from "../../../Actions/WorkspaceActions";
import UIActions from "../../../Actions/UIActions";
import { useEffect } from "react";
import TagActions from "../../../Actions/TagActions";
import InfoIconSvg from "@mui/icons-material/Info";

export default function Sidebar(props: any) {
  const [UIState] = useAtom(Atoms.UI);
  const [tags] = useAtom(Atoms.tags);
  const [workspaces] = useAtom(Atoms.workspaces);

  const toggleWorkspace = (workspace: WorkspaceDTO) => {
    if (workspace.getOpen()) {
      WorkspaceActions.closeWorkspaces([workspace.getId()]);
    } else {
      let currentOpenWorkspaces = workspaces
        .filter(
          (includedWorkspace: WorkspaceDTO) =>
            includedWorkspace.getId() != workspace.getId()
        )
        .map((includedWorkspace: WorkspaceDTO) => includedWorkspace.getId());

      if (currentOpenWorkspaces.length > 0) {
        WorkspaceActions.closeWorkspaces(currentOpenWorkspaces);
      }

      NoteActions.getNotes();
      WorkspaceActions.openWorkspaces([workspace.getId()]);
    }
  };

  const toggleExtraWorkspace = (workspace: WorkspaceDTO) => {
    if (workspace.getOpen()) {
      WorkspaceActions.closeWorkspaces([workspace.getId()]);
    } else {
      NoteActions.getNotes();
      WorkspaceActions.openWorkspaces([workspace.getId()]);
    }
  };

  useEffect(() => {
    NoteActions.getNotes({
      filter: {
        or: {
          tags: UIState.searchingTags,
        },
      },
    });
  }, [UIState]);

  const searchNotesWithTag = (tag: TagDTO) => {
    UIActions.closeOverlay();
    if (!UIState.searchingTags.includes(tag.getId() as never)) {
      UIActions.addSearchingTag(tag.getId());
    } else {
      UIActions.removeSearchingTag(tag.getId());
    }
  };

  const checkSelectedTag = (tag: TagDTO) => {
    return UIState.searchingTags.includes(tag.getId() as never);
  };

  const checkOpenWorkspace = (workspace: WorkspaceDTO) => {
    return workspace.getOpen();
  };

  const editTag = (tag: TagDTO, newTagName: string) => {
    tag.setName(newTagName);
    TagActions.updateTag(tag.getId(), tag);
  };

  const editWorkspace = (workspace: WorkspaceDTO, newWorkspaceName: string) => {
    workspace.setName(newWorkspaceName);
    WorkspaceActions.updateWorkspace(workspace.getId(), workspace);
  };

  const deleteTag = (tag: TagDTO) => {
    TagActions.deleteTags([tag.getId()]);
  };

  const deleteWorkspace = (workspace: WorkspaceDTO) => {
    WorkspaceActions.deleteWorkspace(workspace.getId());
  };

  return UIState.sidebarOpen ? (
    <div className="absolute z-40 xl:relative flex flex-col bg-[#A3A3A3] w-[12rem]">
      <SidebarListWrapper>
        <SidebarList title="Tags">
          {tags.map((tag: TagDTO) => (
            <SidebarListItem
              title={tag.getName()}
              type={"tag"}
              item={tag}
              key={tag.getId()}
              itemAction={searchNotesWithTag}
              itemEdit={editTag}
              checkSelected={checkSelectedTag}
              itemDelete={deleteTag}
            ></SidebarListItem>
          ))}
        </SidebarList>
        <SidebarList title="Workspaces">
          {workspaces.map((workspace: WorkspaceDTO, index: number) => (
            <SidebarListItem
              key={workspace.getId()}
              type={"workspace"}
              item={workspace}
              title={workspace.getName() || "Workspace " + (index + 1)}
              itemAction={toggleWorkspace}
              itemContextMenuAction={toggleExtraWorkspace}
              itemEdit={editWorkspace}
              checkSelected={checkOpenWorkspace}
              itemDelete={deleteWorkspace}
            ></SidebarListItem>
          ))}
        </SidebarList>
      </SidebarListWrapper>
    </div>
  ) : (
    <></>
  );
}
