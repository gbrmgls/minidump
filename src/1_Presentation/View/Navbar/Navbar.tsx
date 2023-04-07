import { useAtom } from "jotai";
import NavbarMenuButtonWrapper from "./NavbarMenuButtonWrapper";
import NavbarSearch from "./NavbarSearch";
import Atoms from "../Atoms";
import TagDTO from "../../../_Common/DTOs/TagDTO";

export default function Navbar(props: any) {
  const [UIState] = useAtom(Atoms.UI);
  const [tags] = useAtom(Atoms.tags);

  return (
    <div className="flex flex-row items-center h-[3rem] relative">
      <NavbarMenuButtonWrapper></NavbarMenuButtonWrapper>
      <div className="flex flex-row grow items-center justify-end md:justify-center bg-[#D9D9D9] h-[3rem] px-1">
        <NavbarSearch></NavbarSearch>
      </div>
      {/* <div className="flex flex-row h-[100%] items-center absolute right-0 mr-2"> */}
      <div className="flex flex-row justify-end h-[100%] w-[15rem] md:w-[18rem] items-center absolute right-0 top-[2.5rem] lg:top-0 mr-2 overflow-y-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-[#A3A3A3] scrollbar-track-gray-100">
        {UIState.searchingTags.map((tagId: string) => (
          <div
            className="flex bg-gray-500 p-1 ml-1 text-sm select-none rounded-md whitespace-nowrap"
            key={tagId}
          >
            {tags.find((tag: TagDTO) => tag.getId() == tagId)?.getName()}
          </div>
        ))}
      </div>
    </div>
  );
}
