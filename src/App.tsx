import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ItemList from "./components/ItemList/ItemList";
import Cart from "./components/Cart/Cart";
// import { useDispatch } from "react-redux";
// import { getData } from "./redux/actions/getDataActions";
// import { ThunkDispatch } from "@reduxjs/toolkit";
// import { RootState } from "./redux";

function App() {
  // const dispatch: ThunkDispatch<RootState, unknown, any> = useDispatch();

  // useEffect(() => {
  //   dispatch(getData());
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ItemList />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
