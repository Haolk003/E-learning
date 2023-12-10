import React, { FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { CourseType } from "@/types/couresContentType";
import CheckoutForm from "./CheckoutForm";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
type Props = {
  clientSecret: string | undefined;
  handleCloseCheckout: () => void;
};
const Checkout: FC<Props> = ({ clientSecret, handleCloseCheckout }) => {
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
          <CheckoutForm handleCloseCheckout={handleCloseCheckout} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
