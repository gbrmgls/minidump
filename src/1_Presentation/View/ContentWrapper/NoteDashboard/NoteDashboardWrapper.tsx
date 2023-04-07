import NoteGrid from "./NoteGrid/NoteGrid";
import NoteDashboardOptions from "./NoteDashboardOptions";
import NoteDashboardCreationButton from "./NoteDashboardCreationButton";
import OverlayWrapper from "./OverlayWrapper/OverlayWrapper";
import AddIconSvg from "@mui/icons-material/Add";
import CloseIconSvg from "@mui/icons-material/Close";
import DeleteIconSvg from "@mui/icons-material/Delete";
import PostAddIconSvg from "@mui/icons-material/PostAdd";
import ArrowBackIconSvg from "@mui/icons-material/ArrowBack";
import InventoryIconSvg from "@mui/icons-material/Inventory";

import { useAtom } from "jotai";
import Atoms from "../../Atoms";
import WorkspaceDTO from "../../../../_Common/DTOs/WorkspaceDTO";
import { useEffect, useState } from "react";
import UIActions from "../../../Actions/UIActions";
import WorkspaceActions from "../../../Actions/WorkspaceActions";
import NoteActions from "../../../Actions/NoteActions";

export default function NoteDashboardWrapper(props: any) {
  const [UIState] = useAtom(Atoms.UI);
  const [workspaces] = useAtom(Atoms.workspaces);
  const [showWorkspaces, setShowWorkspaces] = useState(false);

  const openSelectedNotesInNewWorkspace = () => {
    WorkspaceActions.openNotesInNewWorkspace(UIState.selectedNotes);
    UIActions.clearSelectedNotes();
  };

  const openSelectedNotesInWorkspace = (workspace: WorkspaceDTO) => {
    WorkspaceActions.openNotes(UIState.selectedNotes, workspace.getId());
    UIActions.clearSelectedNotes();
  };

  const deleteSelectedNotes = () => {
    NoteActions.deleteNotes(UIState.selectedNotes);
    UIActions.clearSelectedNotes();
  };

  useEffect(() => {
    if (UIState.selectedNotes.length == 0) {
      setShowWorkspaces(false);
    }
  }, [UIState]);

  return (
    <div className="flex flex-col grow bg-[#FFFFFF] overflow-hidden">
      <OverlayWrapper></OverlayWrapper>
      <NoteDashboardOptions>
        {UIState.selectedNotes.length > 0 && showWorkspaces && (
          <>
            {workspaces.map((workspace: WorkspaceDTO, index: number) => (
              <div
                key={workspace.getId()}
                className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
                onClick={() => openSelectedNotesInWorkspace(workspace)}
              >
                <PostAddIconSvg></PostAddIconSvg>
                <span>
                  {workspace.getName() || `Workspace ${workspaces.length}`}
                </span>
              </div>
            ))}
            <div
              className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
              onClick={() => setShowWorkspaces(false)}
            >
              <ArrowBackIconSvg></ArrowBackIconSvg>
              <span>Return</span>
            </div>
            <div
              className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
              onClick={() => UIActions.clearSelectedNotes()}
            >
              <CloseIconSvg></CloseIconSvg>
              <span>Clear selection</span>
            </div>
          </>
        )}

        {UIState.selectedNotes.length > 0 && !showWorkspaces && (
          <>
            <div
              className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
              onClick={openSelectedNotesInNewWorkspace}
            >
              <AddIconSvg></AddIconSvg>
              <span>Open in new workspace</span>
            </div>
            {workspaces.length > 0 && (
              <div
                className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
                onClick={() => setShowWorkspaces(true)}
              >
                <PostAddIconSvg></PostAddIconSvg>
                <span>Send to workspace</span>
              </div>
            )}
            <div
              className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
              onClick={deleteSelectedNotes}
            >
              <DeleteIconSvg></DeleteIconSvg>
              <span>Delete</span>
            </div>

            <div
              className="flex flex-row justify-center items-start bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3] p-3"
              onClick={() => UIActions.clearSelectedNotes()}
            >
              <CloseIconSvg></CloseIconSvg>
              <span>Clear selection</span>
            </div>
          </>
        )}

        {UIState.selectedNotes.length == 0 && !showWorkspaces && (
          <NoteDashboardCreationButton
            IconSvg={AddIconSvg}
          ></NoteDashboardCreationButton>
        )}
      </NoteDashboardOptions>
      <NoteGrid></NoteGrid>
    </div>
  );
}
