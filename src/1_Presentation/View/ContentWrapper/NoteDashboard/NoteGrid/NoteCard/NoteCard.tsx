import Markdown from "marked-react";
import Latex from "react-latex-next";
import ReactDOMServer from "react-dom/server";
import { useAtom } from "jotai";
import CloseIconSvg from "@mui/icons-material/Close";
import Atoms from "../../../../Atoms";
import NoteActions from "../../../../../Actions/NoteActions";
import WorkspaceActions from "../../../../../Actions/WorkspaceActions";
import { useEffect, useRef, useState } from "react";
import NoteCardContextMenu from "./NoteCardContextMenu";
import NoteDTO from "../../../../../../_Common/DTOs/NoteDTO";
import WorkspaceDTO from "../../../../../../_Common/DTOs/WorkspaceDTO";
import CheckBoxOutlineBlankIconSvg from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIconSvg from "@mui/icons-material/CheckBox";
import UIActions from "../../../../../Actions/UIActions";

export default function NoteCard(props: any) {
  const [tags] = useAtom(Atoms.tags);
  const [UIState] = useAtom(Atoms.UI);
  const [workspaces] = useAtom(Atoms.workspaces);
  const [contextMenuState, setContextMenuState] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const [selectedNote, setSelectedNote] = useState(false);

  const openNoteInWorkspace = (note: NoteDTO, workspace: WorkspaceDTO) => {
    setContextMenuState({ show: false, x: 0, y: 0 });
    WorkspaceActions.openNotes([note.getId()], workspace.getId());
  };

  const openNote = () => {
    setContextMenuState({ show: false, x: 0, y: 0 });
    WorkspaceActions.openNotes([props.note.id]);
  };

  const openNoteInNewWorkspace = (note: NoteDTO) => {
    setContextMenuState({ show: false, x: 0, y: 0 });
    WorkspaceActions.openNotesInNewWorkspace([props.note.id]);
  };

  const deleteNote = () => {
    NoteActions.deleteNotes([props.note.id]);
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setContextMenuState({
      show: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const toggleSelectNote = (note: NoteDTO) => {
    if (selectedNote) {
      setSelectedNote(false);
      UIActions.removeSelectedNote(note.getId());
    } else {
      setSelectedNote(true);
      UIActions.addSelectedNote(note.getId());
    }
  };

  useEffect(() => {
    if (
      !UIState.selectedNotes.find(
        (selectedNoteId: string) => selectedNoteId == props.note.id
      )
    ) {
      setSelectedNote(false);
    }
  }, [UIState]);

  return (
    <div
      className={`relative flex flex-col bg-transparent break-words cursor-pointer group border-black ${
        selectedNote ? "border-[3px]" : "border-[1px]"
      } min-h-[10rem]`}
      onDragStart={() => props.onDragStart(props.note.index)}
      onDragEnter={() => props.onDragEnter(props.note.index)}
      onDragEnd={() => props.onDragEnd()}
      onDragOver={(e: any) => e.preventDefault()}
      onContextMenu={(e) => handleContextMenu(e)}
      onClick={openNote}
      draggable
    >
      {contextMenuState.show && (
        <NoteCardContextMenu
          x={contextMenuState.x}
          y={contextMenuState.y}
          close={() => setContextMenuState({ show: false, x: 0, y: 0 })}
          openNoteInWorkspace={openNoteInWorkspace}
          openNoteInNewWorkspace={openNoteInNewWorkspace}
          workspaces={workspaces}
          note={props.note}
        ></NoteCardContextMenu>
      )}
      <div
        className={`absolute justify-center items-center ${
          !selectedNote && "hidden"
        } w-[2rem] h-[2rem] ${
          selectedNote ? "flex" : "group-hover:flex"
        } hover:cursor-default`}
        onClick={(e: any) => (
          e.stopPropagation(), toggleSelectNote(props.note)
        )}
      >
        {selectedNote ? (
          <CheckBoxIconSvg fontSize={"medium"}></CheckBoxIconSvg>
        ) : (
          <CheckBoxOutlineBlankIconSvg
            fontSize={"medium"}
          ></CheckBoxOutlineBlankIconSvg>
        )}
      </div>
      <div
        className={`absolute justify-center items-center hidden right-0 w-[2rem] h-[2rem] group-hover:flex hover:cursor-default`}
        onClick={(e: any) => (e.stopPropagation(), deleteNote())}
      >
        <CloseIconSvg fontSize={"medium"}></CloseIconSvg>
      </div>
      <div
        className={`p-3 text-inherit h-full`}
        style={{ backgroundColor: props.note.color }}
      >
        {props.note.title && (
          <h2 className="flex justify-center items-center px-4 pt-3 overflow-hidden border-b border-b-black">
            {props.note.title}
          </h2>
        )}

        <div className="p-1 pt-4 line-clamp-3">
          <Latex>
            {ReactDOMServer.renderToString(
              <Markdown gfm={true} value={props.note.content} />
            )}
          </Latex>
        </div>
      </div>
      <div
        className="flex items-center p-3 gap-2 w-full h-[4rem] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-500 overflow-y-hidden oveflow-x-auto"
        style={{ backgroundColor: props.note.color }}
      >
        {props.note.tags.map((noteTag: string) => (
          <div
            className="bg-gray-500  p-1 text-sm cursor-pointer select-none rounded-md"
            key={noteTag}
          >
            {tags.find((tag) => noteTag == tag.getId())?.getName()}
          </div>
        ))}
      </div>
    </div>
  );
}
