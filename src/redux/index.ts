import { configureStore } from "@reduxjs/toolkit";
import itemListSlice from "./reducers/itemListSlice";
import cartSlice from "./reducers/cartSlice";
import { EmptyObject } from "redux";
import { ItemListState } from './reducers/itemListSlice';
import { CartState } from './reducers/cartSlice';

const rootReducer = configureStore({
  reducer: {
    itemList: itemListSlice,
    cart: cartSlice,
  },
});

export type RootState = EmptyObject & {
  itemList: ItemListState;
  cart: CartState;
}

export default rootReducer;
