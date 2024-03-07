import Header from "@/components/Header";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";
import MyLearningLayout from "@/components/my-courses/my-learning/MyLearningLayout";
import MyCouresNavbar from "@/components/my-courses/MyCoursesNavbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LoggedInOnly>
        <Header />
        <MyCouresNavbar />
        <div className="mt-[100px]">{children}</div>
      </LoggedInOnly>
    </div>
  );
}
