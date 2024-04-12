import "./freezer.css";
import '../../styles/content.css';
import closeFridge from '../../assets/closeFridge.png';
import openFridge from '../../assets/openedFridge.png';

import React from "react";

function Freezer({freezer, onFreezerClick}){
    return (
    
        <div className={`freezerHolder ${freezer.selected ? 'selectedfreezer' : ''}`} onClick={() => onFreezerClick(freezer)}>

            <img src ={freezer.selected ? openFridge : closeFridge} alt ="c" />
            <span className="fridgeDetails">
                <p id="fridgeDetailsp">FREEZER</p>
                <p id="fridgeDetailsName">Name</p>
                <p className="caption">{freezer.storageName}</p>
                <p id="fridgeDetailsCapacity">Capacity</p>
                <p className="caption">{freezer.items.length + "/" +freezer.capacity}</p>
            </span>
            
        </div>

    )
}
export default Freezer;
