import CloseIconSvg from "@mui/icons-material/Close";
import WorkspaceDTO from "../../../../../../_Common/DTOs/WorkspaceDTO";
import PostAddIconSvg from "@mui/icons-material/PostAdd";
import AddIconSvg from "@mui/icons-material/Add";
import InventoryIconSvg from "@mui/icons-material/Inventory";

import { useEffect, useRef } from "react";

export default function NoteCardContextMenu(props: any) {
  let contextMenuRef = useRef<any>();

  const clickOutsideHandler = (e: any) => {
    if (contextMenuRef.current) {
      if (!contextMenuRef.current.contains(e.target)) {
        props.close();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => clickOutsideHandler(e));

    return () => {
      document.removeEventListener("mousedown", (e) => clickOutsideHandler(e));
    };
  }, []);

  return (
    <div
      ref={contextMenuRef}
      className="fixed bg-gray-500 border-black border-[1px] text-sm"
      style={{ top: `${props.y}px`, left: `${props.x}px`, zIndex: 40 }}
      onClick={(e) => e.stopPropagation()}
    >
      {props.workspaces.map((workspace: WorkspaceDTO, index: number) => {
        return (
          <div
            key={workspace.getId()}
            className="flex flex-row justify-start items-center hover:bg-gray-600 whitespace-nowrap"
            onClick={() => props.openNoteInWorkspace(props.note, workspace)}
          >
            <div>
              <PostAddIconSvg fontSize={"small"}></PostAddIconSvg>
            </div>
            <div className="px-2">
              {workspace.getName() || "Workspace " + (index + 1)}
            </div>
          </div>
        );
      })}

      <div
        className="flex flex-row justify-start items-center hover:bg-gray-600 whitespace-nowrap"
        onClick={() => props.openNoteInNewWorkspace(props.note)}
      >
        <div>
          <AddIconSvg fontSize={"small"}></AddIconSvg>
        </div>
        <div className="px-2">New workspace</div>
      </div>
    </div>
  );
}
