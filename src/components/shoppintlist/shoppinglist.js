import './shoppingList.css';
import {useState} from 'react';

function ShoppingList(){

    const [selectedListName, setSelectedListName] = useState("SHOPPING LIST _1");

    return (
        <div className='shoppingList'>
            <div className="shoppingListNameHolder">
                <div className="listNameTitle">Shopping List</div>
                <div className="listName">{selectedListName}</div>
                <div className="createNewS_list">Create New List</div>


            </div>
            <div className="individual_shoppingList">individual_shoppingList-1</div>
        </div>
    )
}export default ShoppingList;