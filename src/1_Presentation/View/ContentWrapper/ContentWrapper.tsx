import NoteDashboardWrapper from "./NoteDashboard/NoteDashboardWrapper";
import Sidebar from "./Sidebar/Sidebar";

export default function ContentWrapper(props: any) {
  return (
    <div className="flex flex-row grow overflow-y-hidden h-full">
      <Sidebar></Sidebar>
      <NoteDashboardWrapper></NoteDashboardWrapper>
    </div>
  );
}
