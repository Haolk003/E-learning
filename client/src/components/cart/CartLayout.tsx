"use client";

import React, { useEffect, useState } from "react";
import {
  useDeleteCourseInCartMutation,
  useGetCartQuery,
} from "@/features/cart/cartApi";
import { cartItemType } from "@/types/cartType";
import CartItemPage from "../card/CartItemPage";
import {
  useApplyCouponCartMutation,
  useDeleteCouponInCartMutation,
} from "@/features/cart/cartApi";

import { useAppSelector } from "@/store/hook";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
const CartLayout = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const [
    applyCoupon,
    { isSuccess: isSuccessApplyCoupon, error: errorApplyCoupon },
  ] = useApplyCouponCartMutation();
  const [
    deleteCoupon,
    { isSuccess: isSuccessDeleteCouponInCart, error: errorDeleteCouponInCart },
  ] = useDeleteCouponInCartMutation();

  const { data, isLoading, refetch } = useGetCartQuery("");

  const [codeInput, setCodeInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteCartItem, { isSuccess, isLoading: loadingDeleteCartItem }] =
    useDeleteCourseInCartMutation();

  const handleDeleteCartItem = async (courseId: string) => {
    await deleteCartItem(courseId);
  };
  const handleApplyCoupon = async () => {
    setErrorMessage("");
    await applyCoupon(codeInput);
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const handleChangeInput = (value: string) => {
    setCodeInput(value);
  };

  const handleDeleteCouponInCart = async (couponId: string) => {
    setErrorMessage("");
    await deleteCoupon(couponId);
  };

  useEffect(() => {
    if (isSuccessDeleteCouponInCart || isSuccessApplyCoupon) {
      refetch();
    }
  }, [isSuccessDeleteCouponInCart, isSuccessApplyCoupon]);

  useEffect(() => {
    if (errorDeleteCouponInCart && "data" in errorDeleteCouponInCart) {
      const errorMessage = errorDeleteCouponInCart.data as any;
      setErrorMessage(errorMessage.message);
    }
    if (errorApplyCoupon && "data" in errorApplyCoupon) {
      const errorMessage = errorApplyCoupon.data as any;
      setErrorMessage(errorMessage.message);
    }
  }, [errorApplyCoupon, errorDeleteCouponInCart]);
  return (
    <div className="w-[90%] mx-auto flex  gap-8">
      <div className="w-[70%]">
        <h2 className="text-2xl font-bold mb-7">Shopping Cart</h2>

        <p className="font-semibold text-[17px] mb-2">
          {cart ? cart.items.length : 0} Courses in Cart
        </p>
        <div>
          {cart &&
            cart.items.map((item: cartItemType, index: number) => {
              const totalLecture = item.courseId.courseData.reduce(
                (total, lecture) => {
                  return total + lecture.lectures.length;
                },
                0
              );
              const totalLenghVideo = item.courseId.courseData.reduce(
                (total, item) => {
                  return total + item.videoLength;
                },
                0
              );
              return (
                <CartItemPage
                  key={item.courseId._id}
                  _id={item.courseId._id}
                  author={
                    item.courseId.author.lastName +
                    "" +
                    item.courseId.author.firstName
                  }
                  level={item.courseId.level}
                  price={item.courseId.price}
                  ratings={item.courseId.ratings}
                  sale={item.courseId.sale}
                  thumbnail={item.courseId.thumbnail.url}
                  title={item.courseId.title}
                  totalReviews={item.courseId.reviews.length || 0}
                  totalLectures={totalLecture}
                  totalLenghtVideo={Math.ceil(totalLenghVideo / 3600)}
                  handleDeleteCartItem={handleDeleteCartItem}
                />
              );
            })}
        </div>
      </div>
      <div className="bg-[rgb(26,28,30)] w-[30%]  py-5 mt-10">
        {cart && cart.applyCoupon && (
          <div className="border-dotted border-gray8 border mb-3 mx-5 rounded-md px-3 p-1 text-gray8">
            <div className="text-[14px] flex items-center justify-between">
              <div>
                {cart.applyCoupon.code}
                <span className="text-[12px]">is applied</span>
              </div>
              <button
                className="text-xl flex items-center justify-center"
                onClick={() =>
                  handleDeleteCouponInCart(
                    cart.applyCoupon ? cart.applyCoupon._id : ""
                  )
                }
              >
                <IoIosClose />
              </button>
            </div>
          </div>
        )}

        <div className="border-b border-dashed px-5 border-gray5 py-4">
          <div className="flex h-[40px] border border-gray8 w-full rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Coupon Code"
              onChange={(e) => handleChangeInput(e.target.value)}
              value={codeInput}
              className="w-[80%] h-full px-4 outline-none bg-transparent "
            />
            <button
              className="w-[20%] bg-violet10 h-full "
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>
          <p className="text-red11 text-[13px]">{errorMessage}</p>
          {/* <p className="text-[14px] text-green-green11 mt-2 mb-3">
            10% off on first purchase
          </p> */}
        </div>
        <div className="flex flex-col gap-3 px-5 pt-5 border-b border-dashed pb-3 border-gray5 ">
          <div className="flex justify-between items-center">
            <h4 className="text-gray7 font-semibold text-[15px]">Sub Total</h4>
            <p className="font-semibold text-[16px]">
              $
              {cart &&
                cart.items
                  .reduce((total, item) => {
                    return total + item.price;
                  }, 0)
                  .toFixed(2)}
            </p>
          </div>
          {cart && cart.applyCoupon && (
            <div className="flex items-center justify-between">
              <h4 className="text-gray7 font-semibold text-[15px]">Discount</h4>
              <p className="font-semibold text-[16px] text-green-green11">
                {cart.applyCoupon.discount}% - $
                {(
                  (cart.items.reduce((total, item) => {
                    return total + item.price;
                  }, 0) *
                    cart.applyCoupon.discount) /
                  100
                ).toFixed(2)}
              </p>
            </div>
          )}

          {/* <div className="flex items-center justify-between">
            <h4 className="text-gray7 font-semibold text-[15px]">
              Service Tax (10%)
            </h4>
            <p className="font-semibold text-[16px] text-red9">- $169</p>
          </div> */}
          <div className="flex items-center justify-between">
            <h4 className="text-gray7 font-semibold text-[15px]">Total:</h4>
            <p className="font-semibold text-[16px] text-blue11">
              ${cart && cart.totalPrice}
            </p>
          </div>
        </div>
        <div className="pt-4 px-5">
          <Link
            href="/payment/checkout"
            className="w-full flex items-center justify-center h-[40px] bg-cyan-700 rounded-md"
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
