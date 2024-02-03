import {
  addItemToCart,
  calculateTotalPrice,
  removeItemFromCart,
} from "@/lib/store/Features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const { name: title, quantity, total, price, slug, image } = props.item;
  const dispatch = useDispatch();
  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        slug,
        title,
        price,
      })
    );
    dispatch(calculateTotalPrice());
  };
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(slug));
    dispatch(calculateTotalPrice());
  };
  return (
    <tr>
      <td>
        <Link href={`/product/${slug}`} className="flex items-center">
          <Image src={image} alt={title} width={50} height={50}></Image>
          <span className="px-2">{title}</span>
        </Link>
      </td>
      <td>
        <button className="btn" type="button" onClick={removeItemHandler}>
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button className="btn" type="button" onClick={addItemHandler}>
          +
        </button>
      </td>
      <td>${price}</td>
      <td>${total}</td>
    </tr>
  );
};

export default CartItem;
