import Header from "@/components/Header";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";
import NotificationLayout from "@/components/notification/NotificationLayout";

export default function page() {
  return (
    <div>
      <LoggedInOnly>
        <Header />
        <div className="mt-[100px] w-[60%] mx-auto">
          <NotificationLayout />
        </div>
      </LoggedInOnly>
    </div>
  );
}
