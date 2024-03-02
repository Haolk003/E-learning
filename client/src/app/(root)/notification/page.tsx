import Header from "@/components/Header";
import NotificationLayout from "@/components/notification/NotificationLayout";

export default function page() {
  return (
    <div>
      <Header />
      <div className="mt-[100px] w-[60%] mx-auto">
        <NotificationLayout />
      </div>
    </div>
  );
}
