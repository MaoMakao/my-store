import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockedData } from "../../mockedData";
import { IGuitar } from "./../../components/types/index";
import { getData } from "./../actions/getDataActions";

export interface ItemListState {
  fetchedItems: IGuitar[];
  isLoading: boolean;
  err: Error | null;
}

interface PriceSortPayload {
  lowerFirst: boolean;
  higherFirst: boolean;
}

interface FetchedItemsPayload {
  items: IGuitar[];
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
    addItemsToRenderList: (
      state,
      action: PayloadAction<FetchedItemsPayload>
    ) => {
      if (action.payload.items) {
        state.fetchedItems = [...state.fetchedItems, ...action.payload.items];
      }
    },
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
  extraReducers: {
    [getData.pending.toString()]: (state: ItemListState) => {
      state.err = null;
      state.isLoading = true;
    },
    [getData.fulfilled.toString()]: (state: ItemListState, action: PayloadAction<IGuitar[]>) => {
      state.fetchedItems = action.payload;
      state.err = null;
      state.isLoading = false;
    },
    [getData.rejected.toString()]: (state: ItemListState, action: PayloadAction<Error>) => {
      state.err = action.payload;
      state.fetchedItems = [];
      state.isLoading = false;
    },
  }
});

export const { addItemsToRenderList, priceSort } = itemListSlice.actions;

export default itemListSlice.reducer;
