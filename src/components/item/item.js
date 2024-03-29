
import "./item.css";

import React from "react";

const Item = ({Item}) => {

    return (
    <div className= "itemButton">
        <p>Name: {Item.foodName} | Quantity: {Item.quantity}</p>
    </div>
    );
}

export default Item;