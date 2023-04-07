import { useEffect, useState } from "react";
import NoteActions from "../../../../../Actions/NoteActions";
import Latex from "react-latex-next";
import ReactDOMServer from "react-dom/server";
import Markdown from "marked-react";

export default function NoteEditor(props: any) {
  const [noteTitle, setNoteTitle] = useState(props?.note?.title || "");
  const [noteContent, setNoteContent] = useState(props?.note?.content || "");

  const [timeoutId, setTimeoutId] = useState<any>();

  const debounce = (callback: any, delay: number = 100) => {
    clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        callback();
      }, delay)
    );
  };

  useEffect(() => {
    setNoteTitle(props?.note?.title || "");
    setNoteContent(props?.note?.content || "");
  }, [props.note]);

  const updateTitle = (title: string) => {
    debounce(() => {
      let note = props.note;
      note.setTitle(title);
      NoteActions.updateNote(props.workspace.focusedNote, note);
    }, 500);
  };

  const updateContent = (content: string) => {
    debounce(() => {
      let note = props.note;
      note.setContent(content);
      NoteActions.updateNote(props.workspace.focusedNote, note);
    }, 500);
  };

  const editNoteTitle = (title: string) => {
    setNoteTitle(title);
    updateTitle(title);
  };

  const editNoteContent = (content: string) => {
    setNoteContent(content);
    updateContent(content);
  };

  return (
    <div className="flex flex-col grow z-10">
      <input
        value={noteTitle}
        onChange={(e) => editNoteTitle(e.target.value)}
        type="text"
        className="flex flex-row h-[4rem] bg-gray-300 text-center text-2xl outline-none border-gray-400 border-b-2"
      ></input>
      {props.editing ? (
        <textarea
          value={noteContent}
          onChange={(e) => {
            editNoteContent(e.target.value);
          }}
          className="flex flex-row grow p-3 outline-none"
          style={{ backgroundColor: props?.note?.color, resize: "none" }}
        ></textarea>
      ) : (
        <div
          className="p-3 grow"
          style={{ backgroundColor: props?.note?.color, resize: "none" }}
        >
          <Latex>
            {ReactDOMServer.renderToString(
              <Markdown gfm={true} value={props?.note?.content} />
            )}
          </Latex>
        </div>
      )}
    </div>
  );
}
