import NoteActions from "../../../Actions/NoteActions";
export default function NoteDashboardCreationButton(props: any) {
  const createNote = () => {
    NoteActions.createNote();
  };

  return (
    <div
      className="flex justify-center items-center h-[4rem] w-[4rem] md:h-[6rem] md:w-[6rem] bg-[#D9D9D9] cursor-pointer select-none hover:bg-[#A3A3A3]"
      onClick={createNote}
    >
      {props.text}
      <props.IconSvg fontSize="large"></props.IconSvg>
    </div>
  );
}
