"use client";
import { useSelector } from "react-redux";

const CartSign = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  if (cartQuantity === 0) {
    return <></>;
  }
  return <span className="bg-pink-400 p-1 rounded">{cartQuantity}</span>;
};

export default CartSign;
