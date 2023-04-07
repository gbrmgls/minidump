import CloseIconSvg from "@mui/icons-material/Close";
import WorkspaceActions from "../../../../../../../Actions/WorkspaceActions";

export default function NoteHeaderTab(props: any) {
  const closeNote = () => {
    WorkspaceActions.closeNotes([props.id], props.workspace.id);
  };

  const focusOnNote = () => {
    WorkspaceActions.focusOnNote(props.id, props.workspace.id);
  };

  return (
    <div
      className={`flex flex-row ${
        props.active ? "bg-gray-300" : "bg-gray-400"
      } items-center select-none mr-0.5 whitespace-nowrap`}
      draggable
    >
      <div
        className="flex flex-row h-full items-center p-2 pr-0 max-w-[10rem] overflow-hidden"
        onClick={focusOnNote}
      >
        {props.children}
      </div>
      <div
        className="flex flex-row h-[2rem] w-[2rem] justify-center items-center cursor-pointer"
        onClick={closeNote}
      >
        <CloseIconSvg fontSize="medium"></CloseIconSvg>
      </div>
    </div>
  );
}
