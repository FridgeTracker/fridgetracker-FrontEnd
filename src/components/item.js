
import "./styles/content.css";

import React from "react";

const Item = ({Item}) => {

    return (
    <div className= "itemButton">
        <p>{Item.foodName}</p>
    </div>
    );
}

export default Item;