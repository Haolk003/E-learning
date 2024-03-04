import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/features/order/orderApi";
import toast from "react-hot-toast";
import { CourseType } from "@/types/couresContentType";
import { UserType } from "@/types/userType";

import useSocket from "@/hooks/useSocket";
const CheckoutForm = ({
  handleCloseCheckout,
  courseData,
  user,
  refesh,
}: {
  handleCloseCheckout: () => void;
  courseData: CourseType;
  user: UserType;
  refesh: () => void;
}) => {
  const socket = useSocket();
  const params = useParams();

  const [createOrder, { isSuccess, error }] = useCreateOrderMutation();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message as string);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await createOrder({
        courseId: params.id,
        payment_intent_id: paymentIntent.id,
      });
    }
  };

  useEffect(() => {
    if (error && "data" in error) {
      const errorMesasge = error.data as any;
      toast.error(errorMesasge.message);
    } else if (isSuccess) {
      if (socket) {
        socket.emit("notification", {
          message: `purchased ${courseData.title.slice(0, 40)} course`,
          sender: {
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
          },
          receiver: courseData.author._id,
          createdAt: new Date(),
        });
      }
      handleCloseCheckout();
      refesh();
      toast.success("Purchase Course Successfully");
    }
  }, [error, isSuccess]);

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="text-white">
      <PaymentElement id="payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
};

export default CheckoutForm;
