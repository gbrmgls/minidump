import { useEffect, useState } from "react";
import ContentWrapper from "./1_Presentation/View/ContentWrapper/ContentWrapper";
import Navbar from "./1_Presentation/View/Navbar/Navbar";
import { useAtom } from "jotai";
import Atoms from "./1_Presentation/View/Atoms";
import NoteStore from "./1_Presentation/Stores/NoteStore";
import TagStore from "./1_Presentation/Stores/TagStore";
import WorkspaceStore from "./1_Presentation/Stores/WorkspaceStore";
import UIStore from "./1_Presentation/Stores/UIStore";
import NoteActions from "./1_Presentation/Actions/NoteActions";
import WorkspaceActions from "./1_Presentation/Actions/WorkspaceActions";
import TagActions from "./1_Presentation/Actions/TagActions";
import NoteDTO from "./_Common/DTOs/NoteDTO";
import WorkspaceDTO from "./_Common/DTOs/WorkspaceDTO";
import TagDTO from "./_Common/DTOs/TagDTO";

export default function App() {
  const [tags, setTags] = useAtom(Atoms.tags);
  const [notes, setNotes] = useAtom(Atoms.notes);
  const [workspaces, setWorkspaces] = useAtom(Atoms.workspaces);
  const [UIState, setUIState] = useAtom(Atoms.UI);

  useEffect(() => {
    TagStore.subscribe(setTags);
    NoteStore.subscribe(setNotes);
    WorkspaceStore.subscribe(setWorkspaces);
    UIStore.subscribe(setUIState);

    return () => {
      TagStore.unsubscribe(setTags);
      NoteStore.unsubscribe(setNotes);
      WorkspaceStore.unsubscribe(setWorkspaces);
      UIStore.unsubscribe(setUIState);
    };
  }, []);

  useEffect(() => {
    TagActions.getTags();
    NoteActions.getNotes();
    WorkspaceActions.getWorkspaces();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar></Navbar>
        <ContentWrapper></ContentWrapper>
      </div>
    </>
  );
}
