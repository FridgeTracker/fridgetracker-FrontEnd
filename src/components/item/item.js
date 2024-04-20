import React, { useState,useEffect } from "react";
import "./item.css";
import axios from 'axios';
import Example from "./searchSuggestion";

const Item = ({Item, storageId, updateFridge}) => {

    console.log(Item);
    // Edit Item Section
    const [editedItem, setEditedItem] = useState({
        foodName: "",
        quantity: "",
        foodID:[]
    });
    
    useEffect(() => {
        if(Item){
            setEditedItem({
                foodName: Item.foodName,
                quantity: Item.quantity,
                foodID:Item.foodID,
                expiryDate: Item.expiryDate
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
    // End of edit item section



    //Save updated item in fridge
    const handleSave = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);

        const savedItem = {

            itemID: Item.itemID,
            quantity: formData.get('quantity'),
            expiryDate: formData.get('expiryDate'),
            id: storageId // Set the id value here

        };

        try {

            await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateItem`,savedItem);
            updateFridge(savedItem.id);
            
          } catch (error) {
            console.error('Failed to save data:', error);
        } 
    }
    

    //Delete Item from fridge
    const removeItemHandler = async () => {

            const deleteItem = {
                itemID:Item.itemID,
                id: storageId 
            }

        try {

            await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/deleteItem`,deleteItem);
            updateFridge(deleteItem.id);
    
          } catch (error) {
            console.error('Failed to delete data:', error);
        } 

    }
    

    // Add Item Section
    const handleSubmit = async (selectedItem,event) => {

        event.preventDefault(); 
        const formData = new FormData(event.target);

        console.log(selectedItem);

        const itemToAdd = {
            foodName: selectedItem.foodItem,
            quantity: formData.get('quantity'),
            expiryDate: formData.get('expiryDate'),
            foodID: selectedItem.id,
            id: storageId // Set the id value here
        };
 
        try {

            await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addItem`,itemToAdd);
            updateFridge(itemToAdd.id);

    
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          } 
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
        : (
            <>

                <div className="cardTitle">
                    <p><u> Add Item  </u></p>
                </div>
                <div className="itemFormContainer">

                   <Example handleSubmit={handleSubmit}/>
                   
                </div>
            </>
        )
            
        }
    </div>
    );
}

export default Item;