import "./fridge.css";
import closeFridge from '../assets/closedFridge.png';
import openFridge from '../assets/openedFridge.png';

import React from "react";

const Fridge = ({ fridge, onFridgeClick }) => {

    return (
        <div className={`fridge2Holder ${fridge.selected ? 'selectedFridge' : ''}`}
        onClick={() => onFridgeClick(fridge)}>
        <img src ={fridge.selected ? openFridge : closeFridge} alt ="c" />
        <p className="caption">{fridge.storageName}</p>
    </div>
    );
}

export default Fridge;