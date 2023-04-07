import CloseIconSvg from "@mui/icons-material/Close";
import PostAddIconSvg from "@mui/icons-material/PostAdd";
import VisibilityIconSvg from "@mui/icons-material/Visibility";
import { useEffect, useRef } from "react";

export default function SidebarListItemContextMenu(props: any) {
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
      <div
        className="flex flex-row justify-start items-center hover:bg-gray-600 whitespace-nowrap"
        onClick={() => (props.action(props.item), props.close())}
      >
        <div>
          <VisibilityIconSvg fontSize={"small"}></VisibilityIconSvg>
        </div>
        <div className="px-2">Toggle</div>
      </div>
    </div>
  );
}
