import { useState } from "react";
import ExpandMoreIconSvg from "@mui/icons-material/ExpandMore";
export default function SidebarList(props: any) {
  let [listOpen, setListStatus] = useState(false);

  let toggleList = () => {
    setListStatus(!listOpen);
  };

  return (
    <div className="flex flex-col gap-0.5">
      <div
        className="flex flex-row justify-between items-center h-[3rem] bg-[#C6C6C6] font-bold p-2 hover:bg-gray-500 cursor-pointer select-none"
        onClick={toggleList}
      >
        <span>{props.title}</span>
        <ExpandMoreIconSvg
          className={`${listOpen ? "rotate-180" : ""}`}
        ></ExpandMoreIconSvg>
      </div>
      <div className="flex flex-col max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3A3A3] scrollbar-track-gray-100">
        {listOpen ? props.children : <></>}
      </div>
    </div>
  );
}
