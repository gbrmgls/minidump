import LabelIconSvg from "@mui/icons-material/Label";
import PaletteIconSvg from "@mui/icons-material/Palette";
import SaveIconSvg from "@mui/icons-material/Save";
import VisibilityIconSvg from "@mui/icons-material/Visibility";
import CreateIconSvg from "@mui/icons-material/Create";
import { useAtom } from "jotai";
import { useState } from "react";
import Atoms from "../../../../Atoms";
import TagDTO from "../../../../../../_Common/DTOs/TagDTO";
import NoteActions from "../../../../../Actions/NoteActions";
import UIActions from "../../../../../Actions/UIActions";

export default function NoteFooter(props: any) {
  const [tags, setTags] = useAtom(Atoms.tags);
  const [insertingTag, setInsertingTag] = useState(false);
  const [pickingColor, setPickingColor] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [UIState] = useAtom(Atoms.UI);

  const changeStatus = (status: string) => {
    if (status == "insertingTag") {
      setShowOptions(false);
      setShowSave(true);
      setInsertingTag(true);
    } else if (status == "pickingColor") {
      setShowOptions(false);
      setPickingColor(true);
      setShowSave(true);
    } else if (status == "editing") {
      props.setEditing(!props.editing);
    }
  };

  const saveChanges = () => {
    if (insertingTag) {
      NoteActions.createTagsFromNote(props?.note?.id, [
        TagDTO.fromJSON({ name: tagValue }),
      ]);
      setTagValue("");
      setInsertingTag(false);
    }
    setShowOptions(true);
    setShowSave(false);
    setPickingColor(false);
  };

  const selectColor = (color: string) => {
    let note = props?.note;
    note.setColor(color);
    NoteActions.updateNote(props?.note?.id, note);
  };

  return (
    <div className="flex flex-row h-[4rem] bg-gray-300 border-gray-400 border-t-2 items-center justify-between">
      <div className="flex flex-row h-[100%] items-center overflow-y-hidden overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#A3A3A3] scrollbar-track-gray-100 px-2">
        {props?.note?.tags.map((tagId: any) => (
          <div
            className="bg-gray-400 p-1 text-sm select-none rounded-md m-1"
            key={tagId}
          >
            {tags.find((tag1) => tag1.getId() == tagId)?.getName()}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center">
        {insertingTag ? (
          <input
            type="text"
            onChange={(e) => setTagValue(e.target.value)}
          ></input>
        ) : (
          <></>
        )}

        {pickingColor ? (
          <>
            <div
              className="flex flex-row bg-red-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
              onClick={() => selectColor("#f87171")}
            ></div>
            <div
              className="flex flex-row bg-green-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
              onClick={() => selectColor("#4ade80")}
            ></div>
            <div
              className="flex flex-row bg-blue-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
              onClick={() => selectColor("#60a5fa")}
            ></div>
          </>
        ) : (
          <></>
        )}

        {showOptions ? (
          <>
            <div
              className="flex flex-row hover:bg-gray-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
              onClick={() => changeStatus("insertingTag")}
            >
              <LabelIconSvg fontSize="large"></LabelIconSvg>
            </div>
            <div
              className="flex flex-row hover:bg-gray-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
              onClick={() => changeStatus("pickingColor")}
            >
              <PaletteIconSvg fontSize="large"></PaletteIconSvg>
            </div>
            <div
              className="flex flex-row hover:bg-gray-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
              onClick={() => changeStatus("editing")}
            >
              {props.editing ? (
                <VisibilityIconSvg fontSize="large"></VisibilityIconSvg>
              ) : (
                <CreateIconSvg fontSize="large"></CreateIconSvg>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        {showSave ? (
          <div
            className="flex flex-row hover:bg-gray-400 min-h-[4rem] min-w-[4rem] cursor-pointer justify-center items-center"
            onClick={() => saveChanges()}
          >
            <SaveIconSvg fontSize="large"></SaveIconSvg>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
