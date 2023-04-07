import NoteEditor from "./NoteEditor";
import NoteFooter from "./NoteFooter";
import NoteHeader from "./NoteHeader/NoteHeader";
import Atoms from "../../../../Atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function NoteWrapper(props: any) {
  const [notes] = useAtom(Atoms.notes);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    let note = notes.find(
      (note) => note.getId() == props.workspace.focusedNote
    );

    if (note?.getContent()) {
      if (note?.getContent().length > 0) {
        setEditing(false);
      }
    }
  }, []);

  return (
    <div
      className="flex flex-col bg-gray-500 h-full w-full md:w-[40rem]"
      onClick={(e) => e.stopPropagation()}
    >
      <NoteHeader
        title={props.title}
        workspace={props.workspace}
        note={notes.find((note) => note.getId() == props.workspace.focusedNote)}
      ></NoteHeader>
      <NoteEditor
        workspace={props.workspace}
        note={notes.find((note) => note.getId() == props.workspace.focusedNote)}
        editing={editing}
        setEditing={setEditing}
      ></NoteEditor>
      <NoteFooter
        workspace={props.workspace}
        note={notes.find((note) => note.getId() == props.workspace.focusedNote)}
        editing={editing}
        setEditing={setEditing}
      ></NoteFooter>
    </div>
  );
}
