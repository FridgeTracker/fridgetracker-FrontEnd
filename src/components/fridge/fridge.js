
import "../styles/content.css";

import React from "react";

const Fridge = ({ fridge, onFridgeClick }) => {

    return (
    <div className="fridge2Holder" onClick={() => onFridgeClick(fridge)}>
        <p>{fridge.fridgeName}</p>
    </div>
    );
}

export default Fridge;