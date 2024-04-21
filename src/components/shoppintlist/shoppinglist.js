import './shoppingList.css';
import {useState} from 'react';
import sausage from '../assets/sausage.png';

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
                    <div className='s_listItem'>All the shopping list items are in here</div>
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