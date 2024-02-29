import Header from "@/components/Header";
import IntructorProfileLayout from "@/components/intructor-profile/IntructorProfileLayout";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <Header />
      <div className="mt-[100px] w-[60%] mx-auto">
        <IntructorProfileLayout id={params.id} />
      </div>
    </div>
  );
}
