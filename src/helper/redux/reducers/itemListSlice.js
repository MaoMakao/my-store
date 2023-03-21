import { createSlice } from "@reduxjs/toolkit";
import { mockedData } from "../../mockedData";

const parsePrice = (price) => {
  return parseInt(price.replace(/[\s.,%]/g, "").slice(0, -2));
};

const itemListSlice = createSlice({
  name: "itemList",
  initialState: {
    fetchedItems: mockedData.items,
    itemsToRender: mockedData.items,
    isLodaing: false,
    err: null,
  },
  reducers: {
    categoryFilter(state, action) {
      state.itemsToRender = mockedData.items.filter(
        (item) =>
          action.payload.category === item.category &&
          action.payload.tag === item.tag
      );
      state.fetchedItems = mockedData.items.filter(
        (item) =>
          action.payload.category === item.category &&
          action.payload.tag === item.tag
      );
      if (!action.payload.category)
        state.itemsToRender = [...state.fetchedItems];
    },

    stringsFilter(state, action) {
      state.itemsToRender = state.fetchedItems.filter((item) =>
        action.payload.str.includes(item.str)
      );
      if (!action.payload.str.length)
        state.itemsToRender = [...state.fetchedItems];
    },

    inStockFilter(state) {
      state.itemsToRender = state.itemsToRender.filter((item) => item.inStock);
    },

    priceSort(state, action) {
      if (action.payload.lowerFirst) {
        state.itemsToRender.sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
      }
      if (action.payload.higherFirst) {
        state.itemsToRender.sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        );
      }
    },
  },

});

export const { stringsFilter, inStockFilter, priceSort, categoryFilter } =
  itemListSlice.actions;

export default itemListSlice.reducer;
