import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ItemCard.module.scss";
import ToCartButton from "./../ToCartButton";
import { IGuitar } from './../types/index';

interface Props {
  guitar: IGuitar;
}

const ItemCard: FC<Props> = ({ guitar }) => {
  const { category } = useParams();
  return (
    <div className={styles.item}>
      <div className={styles.item__card}>
        <Link
          to={`/list/${category}/item/${guitar.id}`}
          className={styles.item__img}
        >
          <img src={guitar.img[0]} alt="img" />
          <div>{guitar.name}</div>
        </Link>
        <div
          className={
            guitar.inStock ? styles.item__instock : styles.item__soldout
          }
        >
          {guitar.inStock ? "In Stock" : "Sold out"}
        </div>
      </div>
      <div className={styles.item__tocart}>
        <div>${guitar.price}</div>
        <ToCartButton item={guitar} />
      </div>
    </div>
  );
};

export default ItemCard;
