import Footer2 from "@/components/Footer2";
import Fotter from "@/components/Fotter";
import Header from "@/components/Header";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";

import MyCouresNavbar from "@/components/my-courses/MyCoursesNavbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" relative">
      <LoggedInOnly>
        <Header />
        <MyCouresNavbar />
        <div className="mt-[100px] md:pb-[200px]">{children}</div>

        <div className="">
          <Fotter />
          <Footer2 />
        </div>
      </LoggedInOnly>
    </div>
  );
}
