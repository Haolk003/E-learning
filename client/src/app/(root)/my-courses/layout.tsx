import Header from "@/components/Header";
import MyLearningLayout from "@/components/my-courses/my-learning/MyLearningLayout";
import MyCouresNavbar from "@/components/my-courses/MyCoursesNavbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <MyCouresNavbar />
      <div className="mt-[100px]">{children}</div>
    </div>
  );
}
