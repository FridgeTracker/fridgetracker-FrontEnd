import "./styles/content.css"
import "./styles/content.css";

import React from "react";

const Fridge = ({ fridge }) => {

    return (
    <div className="fridge1Holder">
        <p>{fridge.fridgeName}</p>
    </div>
    );
}

export default Fridge;