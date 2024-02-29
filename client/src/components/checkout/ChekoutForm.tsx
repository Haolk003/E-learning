import React from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const ChekoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {};
  return (
    <form onSubmit={handleSubmit} className="w-[500px] text-white">
      <PaymentElement id="payment-element" options={{}} />
    </form>
  );
};

export default ChekoutForm;
