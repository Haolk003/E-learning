"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useNewOrderCartMutation } from "@/features/order/orderApi";
import { cartItemType, cartType } from "@/types/cartType";
import Image from "next/image";
import { useStarPercentageQuery } from "@/features/review/reviewApi";
import toast from "react-hot-toast";

import useSocket from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hook";

type Props = {
  cart: cartType;
  clientSecretStripe: string;
};
const CheckoutLayout: React.FC<Props> = ({ cart, clientSecretStripe }) => {
  const socket = useSocket();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [newOrder, { error, isLoading, isSuccess }] = useNewOrderCartMutation();

  const stripe = useStripe();
  const [message, setMessage] = useState("");
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      toast.error("Card valid");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await newOrder(paymentIntent.id);
    }
  };

  useEffect(() => {
    if (error && "data" in error) {
      const errorMesasge = error.data as any;
      toast.error(errorMesasge.message);
    }
    if (isSuccess) {
      if (socket && user) {
        cart.items.forEach((item, index) => {
          socket.emit("notification", {
            message: `purchased ${item.courseId.title.slice(0, 40)} course`,
            sender: {
              firstName: user.firstName,
              lastName: user.lastName,
              _id: user._id,
            },
            status: "unread",
            receiver: item.courseId.author._id,
            createdAt: new Date(),
          });
        });
      }

      router.push("/payment/success");
    }
  }, [error, isSuccess]);
  return (
    <div className="h-screen text-black dark:text-white">
      <div className="flex ">
        <div className="w-[50%] mt-[100px] px-20">
          <h2 className="text-4xl mb-10 font-semibold">Checkout</h2>

          <div className="border border-gray8 p-5 shadow-sm shadow-black flex items-center justify-center bg-gray12 rounded-md dark:bg-gray5">
            {clientSecretStripe && (
              <form onSubmit={handleSubmit} className="w-[500px] text-white">
                <PaymentElement id="payment-element" />
              </form>
            )}
          </div>
          <h3 className="text-2xl font-semibold mt-5 mb-3">Order details</h3>
          <ul className="flex flex-col gap-5">
            {cart &&
              cart.items.map((item: cartItemType, index: number) => {
                return (
                  <li
                    key={item.courseId._id}
                    className="flex items-center gap-10"
                  >
                    <Image
                      src={item.courseId.thumbnail.url}
                      alt=""
                      className="w-[50px] h-[50px] object-cover"
                      width={50}
                      height={50}
                    />
                    <h4 className="text-[16px] font-semibold w-[60%]  whitespace-wrap  overflow-ellipsis overflow-hidden line-clamp-2 ">
                      {item.courseId.title}
                    </h4>
                    <p className="font-semibold text-[20px]">
                      $ {item.courseId.price}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="w-[50%] dark:bg-gray5 bg-gray9 text-white min-h-screen pt-[150px] px-20">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="flex items-center justify-between w-[300px]">
            <p>Original Price:</p>
            <p className="font-semibold text-xl">
              $
              {cart
                ? cart.applyCoupon
                  ? (
                      (cart.totalPrice * 100) /
                      cart.applyCoupon.discount
                    ).toFixed(2)
                  : cart.totalPrice.toFixed(2)
                : 0.0}
            </p>
          </div>
          <div className="flex items-center justify-between w-[300px] mt-4">
            <p>Discounts:</p>
            <p className="font-semibold text-xl text-red10">
              - $
              {cart && cart.applyCoupon
                ? (
                    -cart.totalPrice +
                    (cart.totalPrice * 100) / cart.applyCoupon.discount
                  ).toFixed(2)
                : 0.0}
            </p>
          </div>

          <div className="flex items-center justify-between w-[300px] mt-4 border-gray10 border-t">
            <p className="text-[18px]">Total:</p>
            <p className="font-semibold text-2xl text-green-green10 py-3">
              $ {cart ? cart.totalPrice.toFixed(2) : 0}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !stripe || !elements}
            className="w-[300px] h-[50px] bg-violet10 mt-5 font-semibold"
          >
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Complete Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
