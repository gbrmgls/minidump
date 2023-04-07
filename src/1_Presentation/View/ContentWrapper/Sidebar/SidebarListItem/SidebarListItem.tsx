import Atoms from "../../../Atoms";
import { useAtom } from "jotai";
import WorkspaceActions from "../../../../Actions/WorkspaceActions";
import { useEffect, useState } from "react";
import EditIconSvg from "@mui/icons-material/Edit";
import SaveIconSvg from "@mui/icons-material/Save";
import CloseIconSvg from "@mui/icons-material/Close";
import SidebarListItemContextMenu from "./SidebarListItemContextMenu";

export default function SidebarListItem(props: any) {
  const [contextMenuState, setContextMenuState] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const [editing, setEditing] = useState(false);
  const [newItemValue, setNewItemValue] = useState(props.title);

  const itemAction = async () => {
    props.itemAction(props.item);
  };

  const itemEdit = async () => {
    if (editing) {
      setEditing(false);
      props.itemEdit(props.item, newItemValue);
    } else {
      setEditing(true);
    }
  };

  const itemDelete = async () => {
    props.itemDelete(props.item);
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setContextMenuState({
      show: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  return (
    <div
      className={`flex flex-row items-center h-[3rem] ${
        props.checkSelected(props.item) ? "bg-gray-400" : "bg-[#D9D9D9]"
      } hover:bg-gray-500 cursor-pointer select-none oveflow-x-hidden`}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      {contextMenuState.show && props.type == "workspace" && (
        <SidebarListItemContextMenu
          x={contextMenuState.x}
          y={contextMenuState.y}
          close={() => setContextMenuState({ show: false, x: 0, y: 0 })}
          action={props.itemContextMenuAction}
          item={props.item}
        ></SidebarListItemContextMenu>
      )}
      {editing ? (
        <div className="flex flex-row grow items-center p-2">
          <input
            type="input"
            className="w-full"
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
          ></input>
        </div>
      ) : (
        <div
          className="flex flex-row grow items-center oveflow-hidden h-[3rem] scrollbar-thin scrollbar-thumb-[#A3A3A3]  scrollbar-track-gray-100 p-2"
          onClick={itemAction}
        >
          <span>{props.title}</span>
        </div>
      )}
      <div className="flex flex-row justify-center items-center min-h-[3rem] min-w-[3rem]">
        {editing ? (
          <>
            <SaveIconSvg onClick={() => itemEdit()}></SaveIconSvg>
            <CloseIconSvg onClick={() => itemDelete()}></CloseIconSvg>
          </>
        ) : (
          <EditIconSvg onClick={() => itemEdit()}></EditIconSvg>
        )}
      </div>
    </div>
  );
}
