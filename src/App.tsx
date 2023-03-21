import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ItemList from "./components/ItemList/ItemList";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ItemList />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
