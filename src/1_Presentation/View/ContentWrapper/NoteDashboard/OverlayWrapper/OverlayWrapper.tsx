import WorkspaceDTO from "../../../../../_Common/DTOs/WorkspaceDTO";
import NoteWrapper from "./NoteWrapper/NoteWrapper";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Atoms from "../../../Atoms";
import WorkspaceActions from "../../../../Actions/WorkspaceActions";

export default function OverlayWrapper(props: any) {
  const [UIState] = useAtom(Atoms.UI);
  const [workspaces] = useAtom(Atoms.workspaces);

  const minimizeAllWorkspaces = async () => {
    WorkspaceActions.closeWorkspaces(
      workspaces
        .filter((workspace) => workspace.getOpen())
        .map((workspace) => workspace.getId())
    );
  };

  return UIState.overlayOpen ? (
    <div
      className={` z-20 flex justify-center bg-gray-900 bg-opacity-50 absolute bottom-0 top-[3rem] right-0 left-0 ${
        UIState.sidebarOpen ? "xl:ml-[12rem]" : "ml-0"
      }`}
      onClick={minimizeAllWorkspaces}
    >
      <div className="hidden xl:flex h-full grow"></div>
      <div className="flex flex-row gap-10 w-full md:w-fit overflow-y-hidden overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-400 px-2">
        {workspaces
          .filter((workspace) => workspace.getOpen())
          .map((workspace: WorkspaceDTO, index: number) => (
            <div
              key={workspace.getId()}
              className={`${
                index == 0 ? "flex" : "hidden"
              } xl:flex h-full justify-center w-full md:w-[35rem] items-center`}
            >
              <NoteWrapper
                workspace={workspace}
                title={workspace.getName() || `Workspace ${workspaces.length}`}
              ></NoteWrapper>
            </div>
          ))}
      </div>
      <div className={` hidden xl:flex grow h-full`}></div>
    </div>
  ) : (
    <></>
  );
}
