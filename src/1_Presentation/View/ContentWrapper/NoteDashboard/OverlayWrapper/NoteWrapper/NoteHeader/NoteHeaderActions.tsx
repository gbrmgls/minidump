import CloseIconSvg from "@mui/icons-material/Close";
import MinimizeIconSvg from "@mui/icons-material/Minimize";
import WorkspaceActions from "../../../../../../Actions/WorkspaceActions";

export default function NoteHeaderActions(props: any) {
  const closeWorkspace = () => {
    WorkspaceActions.deleteWorkspace(props.workspace.id);
  };

  const minimizeWorkspace = () => {
    WorkspaceActions.closeWorkspaces([props.workspace.id]);
  };

  return (
    <div className="flex flex-row h-[2rem] cursor-pointer">
      <div
        className="flex flex-row h-[2rem] w-[2rem] hover:bg-gray-600 justify-center items-center pb-2"
        onClick={minimizeWorkspace}
      >
        <MinimizeIconSvg fontSize="large"></MinimizeIconSvg>
      </div>
      <div
        className="flex flex-row h-[2rem] w-[2rem] hover:bg-gray-600 justify-center items-center"
        onClick={closeWorkspace}
      >
        <CloseIconSvg fontSize="large"></CloseIconSvg>
      </div>
    </div>
  );
}
