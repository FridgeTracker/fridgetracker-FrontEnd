import './shoppingList.css';
import {useState} from 'react';
import sausage from '../assets/sausage.png';
import React, { CSSProperties } from 'react';

function ShoppingList(){

    

    const [selectedListName, setSelectedListName] = useState("SHOPPING LIST _1");

    return (
        
        <div className='shoppingList'>
            <div><img className="sausageImage" src={sausage} alt="Logo" /></div>


            <div className='shoppingListHolder'>
                <div className="shoppingListNameHolder">
                    <div className="listNameTitle">Shopping List</div>
                    <div className="listName">{selectedListName}</div>
                    <div className="createNewS_list">Create New List</div>


                </div>
                <div className="individual_shoppingList">
                    <div className='individualS_listTitle'>{selectedListName}</div>
                    <div className='s_listItem'>
                    <div className='ItemTitle'>
                        <table id="titleTable">
                            <tr >
                                <td id="foodName">Food Name</td>
                                <td id="quantity">Quantity</td>
                                <td id="type">Type</td>
                            </tr>
                        </table>  
                    </div>
                    <div className='eachItem'> 
                    <table id="eachItemTable">
                            <tr >
                                <td id="foodName">Apple</td>
                                <td id="quantity">3</td>
                                <td id="type">Fruit</td>
                            </tr>
                        </table> 
                    </div>

                    </div>
                    <div className='s_listOptions'>
                        <div id="edit">Edit List</div>
                        <div id="delete">Delete List</div>
                        <div id="import">Import/Export</div>
                    </div>

                </div>
        </div>
        </div>
        

    )
}export default ShoppingList;