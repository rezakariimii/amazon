"use client";

import Image from "next/image";
import Link from "next/link";
import { addItemToCart, calculateTotalPrice, removeItemFromCart } from "@/lib/store/Features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import data from "@/lib/data";

const ProductDetail = ({ params }) => {
  const product = data.products.find((p) => p.slug === params.slug);
  const { slug, name: title, price, image } = product;
  const dispatch = useDispatch();
  const existItme = useSelector(state => state.cart.items.find(item => item.slug === slug));
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(slug));
  };
  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        slug,
        title,
        price,
        image,
      })
    );
    dispatch(calculateTotalPrice());
  };
  if (!product) {
    return <p>Product does not exist!</p>;
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">Back to Products</Link>
      </div>
      <div className="grid md:grid-col-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description : <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="flex mb-2 justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="flex mb-2 justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>
              <div className="card-actions justify-center">
                {existItme ? (<div className="flex gap-2 items-center justify-center">
                  <button className="btn" type="button" onClick={removeItemHandler}>-</button>
                  {existItme?.quantity}
                  <button className="btn" type="button" onClick={addItemHandler}>+</button>
                </div>) : (<button
                  className="btn btn-primary w-full"
                  type="button"
                  onClick={addItemHandler}
                >
                  Add to Card
                </button>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
