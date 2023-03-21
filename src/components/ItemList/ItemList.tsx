import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import FiltersBar from "./FiltersBar";
import { useTypedSelector } from "./../../hooks/useTypedSelector";

const ItemList = () => {
  const itemsToRender = useTypedSelector(
    (store) => store.itemList.fetchedItems
  );

  return (
    <div className="min-h-screen">
      <FiltersBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-7 justify-items-center">
        {itemsToRender.length
          ? itemsToRender.map((item) => {
              return <ItemCard key={item.id} guitar={item} />;
            })
          : null}
      </div>
    </div>
  );
};

export default ItemList;
