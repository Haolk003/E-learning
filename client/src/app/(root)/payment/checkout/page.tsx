import Checkout from "@/components/checkout/Checkout";
import LoggedInOnly from "@/components/hoc/LoggedInOnly";

export default function Page() {
  return (
    <div>
      <LoggedInOnly>
        <Checkout />
      </LoggedInOnly>
    </div>
  );
}
