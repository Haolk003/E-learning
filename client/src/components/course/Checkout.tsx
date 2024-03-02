import React, { FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { CourseType } from "@/types/couresContentType";
import CheckoutForm from "./CheckoutForm";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { UserType } from "@/types/userType";
type Props = {
  clientSecret: string | undefined;
  handleCloseCheckout: () => void;
  courseData: CourseType;
  user: UserType;
};
const Checkout: FC<Props> = ({
  clientSecret,
  handleCloseCheckout,
  courseData,
  user,
}) => {
  const stripePromise = loadStripe(
    "pk_test_51NVtbtCMmhi1B7dqSi1E779o0KyxapInxFc8HLaz7l0TnJMUSZRDptnGoOYpeufkSCG7mZMPO8lHsKO7pwJfodEI00nmMP2ihh"
  );
  console.log(`${process.env.NEXT_PUBLISHABLE_STRIPE_KEY}`);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("first");
  };
  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            handleCloseCheckout={handleCloseCheckout}
            courseData={courseData}
            user={user}
          />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
