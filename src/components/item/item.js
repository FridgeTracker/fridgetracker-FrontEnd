import React, { useState,useEffect } from "react";
import "./item.css";
import ComboBox from "./searchSuggestion";
import itemService from "./itemService";
import { getFoodDataValue } from "../Requests/getRequest";

const Item = ({Item, storageId, updateFridge}) => {

    // Edit Item Section
    const [editedItem, setEditedItem] = useState({
        foodName: "",
        quantity: "",
        foodID: [],
        expiryDate: ""
      });
      
      useEffect(() => {
        if (Item) {
          setEditedItem({
            ...Item
          });
        }
      }, [Item]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedItem({
            ...editedItem,
            [name]: value
        });
    };

    //Save updated item in fridge
    const handleSave = async (event) => {
        itemService.handleSave(event, Item, storageId, updateFridge);
    }
    
    //Delete Item from fridge
    const removeItemHandler = async () => {
        itemService.removeItemHandler(Item, storageId, updateFridge);
    }
    
    // Add Item Section
    const handleSubmit = async (selectedItem,event) => {
        itemService.handleSubmit(selectedItem, event, storageId, updateFridge);
    };


    return (
    <div className= "itemCardContainer">
        {Item ? (
            <>
                <div className="cardTitle">
                    <p><u>  {Item.foodName}  </u></p>
                </div>
                
                <div className="cardContent">
                    <form onSubmit={handleSave}>
                        <table className="cardTable">
                            <tbody>
                                <tr><td>Category: </td><td>{Item.foodID.foodCategory}</td></tr>
                                <tr><td>Calories: </td><td>{Item.foodID.cals_per100grams}</td></tr>
                                <tr><td>Kilojules: </td><td>{Item.foodID.kj_per100grams}</td></tr>
                                <tr><td>Per Grams: </td><td>{Item.foodID.per100grams}</td></tr>
                                <tr><td>Quantity: </td><td><input type="text" name="quantity" value={editedItem.quantity} onChange={handleInputChange}/></td></tr>
                                <tr><td>Expiry Date: </td><td><input id="addItem" type="date" name="expiryDate" value={editedItem.expiryDate} onChange={handleInputChange}/></td></tr>
                                
                            </tbody>
                        </table>
                        <div className="submitEditButton">   
                            <input type="submit" name="submitButton" value="Save"/>
                        </div>
                    </form>
                    <div className="submitRemoveButton">   
                            < button value="Remove" className="removeItemButton" onClick={removeItemHandler}>Remove</button>
                        </div>
                </div>
            </>
        ) 
        : 
        (
            <>
                <div className="cardTitle">
                    <p><u> Add Item  </u></p>
                </div>
                <div className="itemFormContainer">
                   <ComboBox handleSubmit={handleSubmit} foodData={getFoodDataValue()}/>
                </div>
            </>
        )
        }
    </div>
    );
}

export default Item;