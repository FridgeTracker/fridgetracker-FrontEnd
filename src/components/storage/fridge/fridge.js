import "./fridge.css";
import closeFridge from '../../assets/closeFridge.png';
import openFridge from '../../assets/openedFridge.png';

import React from "react";

const Fridge = ({ fridge, onFridgeClick }) => {

    return (
        <div className={`fridge2Holder ${fridge.selected ? 'selectedFridge' : ''}`} onClick={() => onFridgeClick(fridge)}>
            <img src ={fridge.selected ? openFridge : closeFridge} alt ="c" />
            <span className="fridgeDetails">
                <p id="fridgeDetailsp">FRIDGE</p>
                <p id="fridgeDetailsName">Name</p>
                <p className="caption">{fridge.storageName}</p>
                <p id="fridgeDetailsCapacity">Capacity</p>
                <p className="caption">{fridge.items.length + "/" +fridge.capacity}</p>
            </span>
            
    </div>
    );
}

export default Fridge;