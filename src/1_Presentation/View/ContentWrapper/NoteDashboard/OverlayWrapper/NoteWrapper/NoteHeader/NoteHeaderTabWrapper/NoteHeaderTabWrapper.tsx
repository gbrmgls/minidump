import NoteHeaderTab from "./NoteHeaderTab";
import { useAtom } from "jotai";
import Atoms from "../../../../../../Atoms";

export default function NoteHeaderTabWrapper(props: any) {
  const [notes] = useAtom(Atoms.notes);

  return (
    <div className="flex flex-row h-[2rem] hover:h-[2rem] grow overflow-x-hidden hover:overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      {props.workspace?.notes?.map((workspaceNote: string) => (
        <NoteHeaderTab
          id={workspaceNote}
          key={workspaceNote}
          workspace={props.workspace}
          active={props.workspace.focusedNote == workspaceNote}
        >
          {notes.find((openNote) => openNote.id == workspaceNote)?.title ||
            notes.find((openNote) => openNote.id == workspaceNote)?.index}
        </NoteHeaderTab>
      ))}
    </div>
  );
}
