import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard/NoteCard";
import { useAtom } from "jotai";
import Atoms from "../../../Atoms";
import NoteActions from "../../../../Actions/NoteActions";

export default function NoteGrid(props: any) {
  let [notes, setNotes] = useAtom(Atoms.notes);

  // Drag and drop note swap
  let draggedItemIndex = 0;
  let draggedOverItemIndex = 0;
  const onDragStart = (index: number) => {
    draggedItemIndex = index;
  };
  const onDragEnter = (index: number) => {
    draggedOverItemIndex = index;
  };
  const onDragEnd = () => {
    NoteActions.swapNotesIndexes(draggedItemIndex, draggedOverItemIndex);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 md:gap-2 xl:gap-2 p-1 md:p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#A3A3A3] scrollbar-track-gray-100">
      {notes.map((note: any) => (
        <NoteCard
          key={note.id}
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          note={note}
          size={1}
        ></NoteCard>
      ))}
    </div>
  );
}
