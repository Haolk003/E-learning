"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentMutation } from "@/features/order/orderApi";
import React, { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51NVtbtCMmhi1B7dqSi1E779o0KyxapInxFc8HLaz7l0TnJMUSZRDptnGoOYpeufkSCG7mZMPO8lHsKO7pwJfodEI00nmMP2ihh"
);

function App({ children }: { children: React.ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default App;
