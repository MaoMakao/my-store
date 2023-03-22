import React, { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux/es/exports";
import {
    priceSort,
} from "../../redux/reducers/itemListSlice";
import styles from "./FiltersBar.module.scss";


const FiltersBar:FC = () => {
    const [lowerFirst, setLowerFirst] = useState(false);
    const [higherFirst, setHigherFirst] = useState(false);

    const dispatch = useDispatch();

    const sortLower = () => {
        setLowerFirst(!lowerFirst);
        setHigherFirst(false);
    };

    const sortHigher = () => {
        setHigherFirst(!higherFirst);
        setLowerFirst(false);
    };

    const buttonStyles = (isFiltered: boolean) => {
        return `${styles.filter__item} ${
            isFiltered
                ? "bg-green-600 hover:bg-green-500 text-white"
                : "bg-neutral-800 hover:bg-green-900 twxt-white"
        }`;
    };

    useEffect(() => {
        if (lowerFirst || higherFirst)
            dispatch(priceSort({ lowerFirst, higherFirst }));
    }, [lowerFirst, higherFirst]);

    return (
        <div className={styles.filter__wrapper}>
            <div onClick={sortLower} className={buttonStyles(lowerFirst)}>
                Price<i className="caret up icon"></i>
            </div>
            <div onClick={sortHigher} className={buttonStyles(higherFirst)}>
                Price<i className="caret down icon"></i>
            </div>
        </div>
    );
};

export default FiltersBar;
