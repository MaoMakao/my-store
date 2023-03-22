import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export const getData = createAsyncThunk(
    "itemList/getData",
    async function ({}, { rejectWithValue, dispatch, getState }) {
        try {
            const response = await axios.get('There will be your URL');
            return response.data;
        } catch (err) {
            return rejectWithValue((err as AxiosError).message);
        }
    }
);
