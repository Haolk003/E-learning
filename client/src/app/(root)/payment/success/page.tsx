import Image from "next/image";
import Link from "next/link";
export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <h2 className="text-[#26bf94] text-2xl">Payment Successfully... 🙌</h2>
      <Image src="/assets/24.png" alt="" width={100} height={100} />
      <p className="text-gray10 text-[14px]">Thankyou for shopping with us.</p>
      <Link
        href={"/"}
        className="bg-[#26bf94] text-white w-[200px] h-[50px] rounded-md flex items-center justify-center"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
