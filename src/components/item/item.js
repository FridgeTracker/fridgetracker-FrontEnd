
import "./item.css";

import React from "react";
import axios from 'axios';

const Item = ({Item, fridgeId, updateFridge}) => {

    const handleSubmit = async (event) => {

        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);

        const itemToAdd = {
            item: {
                fridgeID: formData.get('id'),
                foodName: formData.get('foodName'),
                quantity: formData.get('quantity'),
                calories: formData.get('calories'),
                type: formData.get('type')
            },
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


    return (

    <div className= "itemCardContainer">
        {Item ? (
            <>
            <div className="cardTitle">
                <p><u>  {Item.foodName}  </u></p>
            </div>
            
            <div className="cardContent">
                <table className="cardTable">
                    <td>Name: </td><td> <input type="text" placeholder={Item.foodName}/></td>
                    <tr><td>Quantity: </td><td>{Item.quantity}</td></tr>
                    <tr><td>Calories: </td><td>{Item.calories}</td></tr>
                    <tr><td>Type:</td><td> {Item.type}</td></tr>
                </table>
            </div>
            
            </>
        ) 
        : (
            <>
                <form className="addItemForm" onSubmit={handleSubmit}>

                    <input type="number" name="id" placeholder="Enter id"/>
                    <input type="text" name="foodName" placeholder="Enter Food Name"/>
                    <input type="number" name="quantity" placeholder="Enter Quantity"/>
                    <input type="number" name="calories" placeholder="Enter calories"/>
                    <input type="text" name="type" placeholder="Enter Food Type"/>

                    <input type="submit" value="Submit"/>

                </form>
            </>
        )
            
        }
    </div>
    );
}

export default Item;