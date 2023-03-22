import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  amount: number;
  item: {
    img: string | undefined;
    category: any;
    name: string;
    id: number | string;
    price: string;
    inStock?: boolean;
    str?: number;
    tags?: string[];
    sizeImg?: string;
    descr?: string;
    specs?: {
      size?: string[];
      general?: string[];
      neck?: string[];
      profile?: string[];
    };
  };
}

export interface CartState {
  cartItems: CartItem[];
  totalPrice: string;
}

const calculateTotalPrice = (cart: CartItem[]): string => {
  let totalPrice = 0;
  cart.forEach((item) => {
    for (let i = 1; i <= item.amount; i++) {
      totalPrice += parseInt(
        item.item.price.replace(/[\s.,%]/g, "").slice(0, -2)
      );
    }
  });
  const totalPriceString = `${totalPrice.toString().slice(0, -3)},${totalPrice
    .toString()
    .slice(-3)}.00`;
  return totalPriceString;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: "0.00",
  } as CartState,
  reducers: {
    addItemToCart(state, action: PayloadAction<{ item: CartItem["item"] }>) {
      state.cartItems = [
        ...state.cartItems,
        { amount: 1, item: action.payload.item },
      ];
      state.totalPrice = calculateTotalPrice(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItemFromCart(state, action: PayloadAction<{ id: number | string }>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.item.id !== action.payload.id
      );
      state.totalPrice = calculateTotalPrice(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    amountChange(
      state,
      action: PayloadAction<{ id: number | string; boolean: boolean }>
    ) {
      const index = state.cartItems.findIndex(
        (item) => item.item.id === action.payload.id
      );
      if (action.payload.boolean) {
        state.cartItems[index].amount++;
      } else if (state.cartItems[index].amount > 1) {
        state.cartItems[index].amount--;
      }

      state.totalPrice = calculateTotalPrice(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    getCartFromLocalStorage(
      state,
      action: PayloadAction<{ cart: CartItem[] }>
    ) {
      state.cartItems = action.payload.cart;
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = "0.00";
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  amountChange,
  getCartFromLocalStorage,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
