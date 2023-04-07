import { useEffect, useState } from "react";
import SearchIconSvg from "@mui/icons-material/Search";
import CloseIconSvg from "@mui/icons-material/Close";
import { useAtom } from "jotai";
import NoteActions from "../../Actions/NoteActions";
import Atoms from "../Atoms";
import UIActions from "../../Actions/UIActions";
import TagDTO from "../../../_Common/DTOs/TagDTO";
export default function NavbarSearch() {
  const [timeoutId, setTimeoutId] = useState<any>();

  const [searchInput, setSearchInput] = useState("");
  const [UIState] = useAtom(Atoms.UI);

  useEffect(() => {
    executeSearch(searchInput);
  }, [UIState]);

  const debounce = (callback: any, delay: number = 100) => {
    clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        callback();
      }, delay)
    );
  };

  const executeSearch = (searchText: string) => {
    debounce(() =>
      NoteActions.getNotes({
        filter: {
          and: {
            tags: UIState.searchingTags,
            text: searchText,
          },
        },
      })
    );
  };

  const inputSearchText = (searchText: string) => {
    setSearchInput(searchText);
    executeSearch(searchText);
  };

  const clearSearch = () => {
    UIActions.clearSearchingTags();
    setSearchInput("");
  };

  return (
    <div className="flex flex-row items-center bg-[#FFFFFF] h-[2.5rem] w-[15rem] md:w-[25.5rem] pr-2">
      <SearchIconSvg className="mx-2"></SearchIconSvg>
      <input
        value={searchInput}
        onChange={(e) => inputSearchText(e.target.value)}
        type="text"
        className="w-full outline-none"
      ></input>
      <CloseIconSvg
        className="ml-2 cursor-pointer select-none"
        onClick={() => clearSearch()}
      ></CloseIconSvg>
    </div>
  );
}
