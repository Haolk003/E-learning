import Footer2 from "@/components/Footer2";
import Fotter from "@/components/Fotter";
import Header from "@/components/Header";
import IntructorProfileLayout from "@/components/intructor-profile/IntructorProfileLayout";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <Header />
      <div className="mt-[100px] md:w-[60%] w-full mx-auto">
        <IntructorProfileLayout id={params.id} />
      </div>
      <Fotter />
      <Footer2 />
    </div>
  );
}
