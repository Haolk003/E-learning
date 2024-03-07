"use client";
import { useEffect } from "react";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import { useGetCartQuery } from "@/features/cart/cartApi";
import { useCreatePaymentIntentMutation } from "@/features/order/orderApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLISHABLE_STRIPE_KEY as string
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
