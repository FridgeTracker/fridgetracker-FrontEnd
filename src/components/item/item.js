import React, { useState,useEffect } from "react";
import "./item.css";
import axios from 'axios';

const Item = ({Item, fridgeId, updateFridge}) => {

    // Edit Item Section

    const [editedItem, setEditedItem] = useState({
        foodName: "",
        quantity: "",
        calories: "",
        type: ""
    });
    
    useEffect(() => {
        if(Item){
            setEditedItem({
                foodName: Item.foodName,
                quantity: Item.quantity,
                calories: Item.calories,
                type: Item.type
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

    const handleSave = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const savedItem = {
            itemID: Item.fridgeID,
            foodName: formData.get('foodName'),
            quantity: formData.get('quantity'),
            calories: formData.get('calories'),
            type: formData.get('type'),
            id: fridgeId // Set the id value here
        };

        try {
            const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateItem`,savedItem);
            console.log(response);
            updateFridge(savedItem.id);
    
          } catch (error) {
            console.error('Failed to save data:', error);
          } 
    }


    // Add Item Section
    const handleSubmit = async (event) => {

        event.preventDefault(); 
        const formData = new FormData(event.target);

        const itemToAdd = {
            foodName: formData.get('foodName'),
            quantity: formData.get('quantity'),
            calories: formData.get('calories'),
            type: formData.get('type'),
            id: fridgeId // Set the id value here
        };
 
        try {
            const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addItem`,itemToAdd);
            console.log(response);
            updateFridge(itemToAdd.id);
    
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          } 
        };
    //End of add item


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
                        <td>Name: </td><td> <input type="text" name="foodName" value={editedItem.foodName} onChange={handleInputChange}/></td>
                        <tr><td>Quantity: </td><td><input type="text" name="quantity" value={editedItem.quantity} onChange={handleInputChange}/></td></tr>
                        <tr><td>Calories: </td><td><input type="text" name="calories" value={editedItem.calories} onChange={handleInputChange}/></td></tr>
                        <tr><td>Type:</td><td><input type="text" name="type" value={editedItem.type} onChange={handleInputChange}/></td></tr>
                    </table>
                    <div className="submitEditButton">
                        <input type="submit" name="submitButton" value="Save"/>
                    </div>
                </form>
            </div>
            
            </>
        ) 
        : (
            <>
                <form className="addItemForm" onSubmit={handleSubmit}>

                    <input id="addItem" type="text" name="foodName" placeholder="Enter Food Name"/>
                    <input id="addItem" type="number" name="quantity" placeholder="Enter Quantity"/>
                    <input id="addItem" type="number" name="calories" placeholder="Enter calories"/>
                    <input id="addItem" type="text" name="type" placeholder="Enter Food Type"/>

                    <input type="submit" value="Submit"/>

                </form>
            </>
        )
            
        }
    </div>
    );
}

export default Item;