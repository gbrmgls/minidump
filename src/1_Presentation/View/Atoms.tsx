import { atom } from "jotai";
import TagDTO from "../../_Common/DTOs/TagDTO";
import NoteDTO from "../../_Common/DTOs/NoteDTO";
import WorkspaceDTO from "../../_Common/DTOs/WorkspaceDTO";

const Atoms = {
  tags: atom<TagDTO[]>([]),
  notes: atom<NoteDTO[]>([]),
  workspaces: atom<WorkspaceDTO[]>([]),
  UI: atom({
    sidebarOpen: false,
    overlayOpen: false,
    searchingTags: [],
    selectedNotes: [],
  }),
};

export default Atoms;
