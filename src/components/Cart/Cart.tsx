import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styles from "./Cart.module.scss";
import {
  amountChange,
  removeItemFromCart,
} from "../../redux/reducers/cartSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Cart: FC = () => {
  const cart = useTypedSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <div className={styles.cart__wrapper}>
      {cart.cartItems.length ? (
        cart.cartItems.map((item) => (
          <div className={styles.cart__item} key={item.item.id}>
            <div className={styles.item__details}>
              <div>
                <img alt="img" src={item.item.img} />
              </div>
              <div>
                <div className={styles.item__name}>{item.item.name}</div>
                <div className={styles.item__price}>${item.item.price}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className={styles.item__amount}>
                <i
                  onClick={() =>
                    dispatch(
                      amountChange({
                        boolean: true,
                        id: item.item.id,
                      })
                    )
                  }
                  className="plus icon"
                ></i>
                <span>{item.amount} pcs</span>
                <i
                  onClick={() =>
                    dispatch(
                      amountChange({
                        boolean: false,
                        id: item.item.id,
                      })
                    )
                  }
                  className="minus icon"
                ></i>
              </div>
              <div
                onClick={() =>
                  dispatch(removeItemFromCart({ id: item.item.id }))
                }
                className={styles.item__remove}
              >
                <i className="trash icon"></i>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.cart__empty}>Your cart is empty</div>
      )}
      <div className={styles.cart__checkout}>
        <div className={styles.cart__total}>Total: ${cart.totalPrice}</div>
        {cart.cartItems.length ? (
          <button className={styles.cart__button}>
            Checkout
            <i className="long arrow alternate right icon" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
