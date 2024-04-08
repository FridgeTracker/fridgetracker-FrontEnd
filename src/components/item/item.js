import React, { useState,useEffect } from "react";
import "./item.css";
import axios from 'axios';

const Item = ({Item, storageId, updateFridge}) => {


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



    //Save updated item in fridge
    const handleSave = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const savedItem = {
            itemID: Item.itemID,
            foodName: formData.get('foodName'),
            quantity: formData.get('quantity'),
            calories: formData.get('calories'),
            type: formData.get('type'),
            id: storageId // Set the id value here
        };

        try {
            const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateItem`,savedItem);
            console.log(response);
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
            const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/deleteItem`,deleteItem);
            console.log(response);
            updateFridge(deleteItem.id);
    
          } catch (error) {
            console.error('Failed to delete data:', error);
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
            id: storageId // Set the id value here
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
                        <tbody>
                            <tr><td>Name: </td><td> <input type="text" name="foodName" value={editedItem.foodName} onChange={handleInputChange}/></td></tr>
                            <tr><td>Quantity: </td><td><input type="text" name="quantity" value={editedItem.quantity} onChange={handleInputChange}/></td></tr>
                            <tr><td>Calories: </td><td><input type="text" name="calories" value={editedItem.calories} onChange={handleInputChange}/></td></tr>
                            <tr><td>Type:</td><td>  <select name="type" value={editedItem.type} onChange={handleInputChange}>
                                                        <option value="fruit">Fruit</option>
                                                        <option value="vegetable">Vegetable</option>
                                                        <option value="grain">Grain</option>
                                                        <option value="protein">Protein</option>
                                                        <option value="dairy">Dairy</option>
                                                        <option value="other">Other</option>
                                                    </select>
                            </td></tr>
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
                    <form className="addItemForm" onSubmit={handleSubmit}>
                        <p>Food Name</p>
                        <input id="addItem" type="text" name="foodName" placeholder="Enter Food Name"/>
                        <p>Quantity</p>
                        <input id="addItem" type="number" name="quantity" placeholder="Enter Quantity"/>
                        <p>Calories</p>
                        <input id="addItem" type="number" name="calories" placeholder="Enter calories"/>
                        <p>Food Type</p>
                        <select name="type">
                            <option value="fruit">Fruit</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="grain">Grain</option>
                            <option value="protein">Protein</option>
                            <option value="dairy">Dairy</option>
                            <option value="other">Other</option>
                        </select>

                        <input type="submit" value="Submit" className="submitButtonItem"/>

                    </form>
                </div>
            </>
        )
            
        }
    </div>
    );
}

export default Item;