import MenuIconSvg from "@mui/icons-material/Menu";
import { useAtom } from "jotai";
import UIActions from "../../Actions/UIActions";
import Atoms from "../Atoms";
import { useEffect } from "react";

export default function NavbarMenuButtonWrapper(props: any) {
  const [UIState] = useAtom(Atoms.UI);

  return (
    <div
      className={`flex flex-row items-center bg-[#D9D9D9] h-[3rem] ${
        UIState.sidebarOpen ? "xl:w-[12rem]" : "xl:w-0"
      }`}
    >
      <div
        className={`absolute h-[3rem] w-[3rem] hover:bg-[#A3A3A3] cursor-pointer ${
          UIState.sidebarOpen ? "bg-[#A3A3A3]" : ""
        }`}
        onClick={() => UIActions.toggleSidebar()}
      >
        <div className="flex justify-center items-center grow h-[3rem] w-[3rem]">
          <MenuIconSvg></MenuIconSvg>
        </div>
      </div>
    </div>
  );
}
