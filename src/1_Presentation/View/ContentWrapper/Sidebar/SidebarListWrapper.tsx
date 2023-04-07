export default function SidebarListWrapper(props: any) {
  return (
    <div className="flex flex-col grow gap-1 mt-1 overflow-y-auto">
      {props.children}
    </div>
  );
}
