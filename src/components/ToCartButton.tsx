import React, {FC} from "react";
import { useDispatch } from "react-redux/es/exports";
import { addItemToCart } from "../redux/reducers/cartSlice";
import { useTypedSelector } from './../hooks/useTypedSelector';
import { IGuitar } from './types/index';

interface Props {
  item: IGuitar;
}

const ToCartButton:FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useTypedSelector((store) => store.cart.cartItems);

  const addToCart = () => {
    dispatch(
      addItemToCart({item: {
        id: item.id,
        price: item.price,
        img: item.img[0],
        category: item.category,
        name: item.name,
      }})
    );
  };
  return item.inStock ? (
    <button
      disabled={!!cart.find((cartItem) => cartItem.item.id === item.id)}
      onClick={addToCart}
    >
      {cart.find((cartItem) => cartItem.item.id === item.id)
        ? "IN CART"
        : "ADD TO CART"}
      <i className="cart arrow down icon"></i>
    </button>
  ) : (
    <button disabled className="!bg-stone-800 hover:!border-stone-800">
      SOLD OUT
    </button>
  );
};

export default ToCartButton;
