"use client";
import { useEffect } from "react";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import { useGetCartQuery } from "@/features/cart/cartApi";
import { useCreatePaymentIntentMutation } from "@/features/order/orderApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NVtbtCMmhi1B7dqSi1E779o0KyxapInxFc8HLaz7l0TnJMUSZRDptnGoOYpeufkSCG7mZMPO8lHsKO7pwJfodEI00nmMP2ihh"
);

const Checkout = () => {
  const { data: cart } = useGetCartQuery("");
  const [createPaymentIntent, { data: paymentIntent }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (cart) {
      createPaymentIntent({
        amount: Math.round(cart.data.totalPrice * 100),
        currency: "USD",
      });
    }
  }, [cart]);
  return (
    <div className="">
      {paymentIntent && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntent.data }}
        >
          {cart && (
            <CheckoutLayout
              cart={cart.data}
              clientSecretStripe={paymentIntent.data}
            />
          )}
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
