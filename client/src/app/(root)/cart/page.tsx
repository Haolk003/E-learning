import Header from "@/components/Header";
import CartLayout from "@/components/cart/CartLayout";
import Heading from "@/utils/Heading";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";

export default function page() {
  return (
    <div>
      <LoggedInOnly>
        <Header />
        <Heading
          title="Elearning"
          description="Eleaning is a platform for student to learn and get help form teachers"
          keyword="Programing, MERN, Redux, Machine Learing"
        />
        <div className="mt-[100px]">
          <CartLayout />
        </div>
      </LoggedInOnly>
    </div>
  );
}
