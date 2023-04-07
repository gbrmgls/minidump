import NoteHeaderActions from "./NoteHeaderActions";
import NoteHeaderTab from "./NoteHeaderTabWrapper/NoteHeaderTab";
import NoteHeaderTabWrapper from "./NoteHeaderTabWrapper/NoteHeaderTabWrapper";

export default function NoteHeader(props: any) {
  return (
    <div className="flex flex-row h-[2rem] bg-gray-500">
      <NoteHeaderTabWrapper workspace={props.workspace}></NoteHeaderTabWrapper>
      <div className="flex flex-row justify-end items-center px-2 whitespace-nowrap">
        {props.title}
      </div>
      <NoteHeaderActions workspace={props.workspace}></NoteHeaderActions>
    </div>
  );
}
