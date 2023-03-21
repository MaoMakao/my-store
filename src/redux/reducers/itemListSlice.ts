import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockedData } from "../../mockedData";
import { IGuitar } from "./../../components/types/index";

export interface ItemListState {
  fetchedItems: IGuitar[];
  isLoading: boolean;
  err: Error | null;
}

interface PriceSortPayload {
  lowerFirst: boolean;
  higherFirst: boolean;
}

const parsePrice = (price: string): number => {
  return parseInt(price.replace(/[\s.,%]/g, "").slice(0, -2));
};

const itemListSlice = createSlice({
  name: "itemList",
  initialState: {
    fetchedItems: mockedData.items,
    isLoading: false,
    err: null,
  } as ItemListState,
  reducers: {
    // categoryFilter: (state, action: PayloadAction<FilterCategoryPayload>) => {
    //   state.itemsToRender = mockedData.items.filter(
    //     (item) =>
    //       action.payload.category === item.category &&
    //       action.payload.tag === item.tag
    //   );
    //   state.fetchedItems = mockedData.items.filter(
    //     (item) =>
    //       action.payload.category === item.category &&
    //       action.payload.tag === item.tag
    //   );
    //   if (!action.payload.category) {
    //     state.itemsToRender = [...state.fetchedItems];
    //   }
    // },

    // stringsFilter: (state, action: PayloadAction<FilterStringsPayload>) => {
    //   state.itemsToRender = state.fetchedItems.filter((item) =>
    //     action.payload.str.includes(item.str)
    //   );
    //   if (!action.payload.str.length) {
    //     state.itemsToRender = [...state.fetchedItems];
    //   }
    // },

    // inStockFilter: (state) => {
    //   state.itemsToRender = state.itemsToRender.filter((item) => item.inStock);
    // },

    priceSort: (state, action: PayloadAction<PriceSortPayload>) => {
      if (action.payload.lowerFirst) {
        state.fetchedItems.sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
      }
      if (action.payload.higherFirst) {
        state.fetchedItems.sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        );
      }
    },
  },
});

export const {
  // stringsFilter,
  // inStockFilter,
  priceSort,
  // categoryFilter,
} = itemListSlice.actions;

export default itemListSlice.reducer;
