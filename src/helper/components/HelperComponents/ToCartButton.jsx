import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { addItemToCart } from "../../redux/reducers/cartSlice";
import { removeMessage, setMessage } from "../../redux/reducers/notificationSlice";
import { useAuth } from "./../../hoc/user-auth";

const ToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cartItems);

  const { isAuth } = useAuth();
  const addToCart = () => {
    if (isAuth) {
      dispatch(
        addItemToCart({
          id: item.id,
          price: item.price,
          img: item.img[0],
          category: item.category,
          name: item.name,
        })
      );
    } else { 
        dispatch(setMessage('Чтобы добавить товар в корзину, Вам нужно (авторизоваться - ссылка на страницу авторизации/регистрации);'))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
    }
  };
  return item.inStock ? (
    <button
      disabled={cart.find((cartItem) => cartItem.item.id === item.id)}
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
