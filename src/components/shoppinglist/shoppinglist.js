import './shoppinglist.css';
import {useState} from 'react';
import sausage from '../assets/sausage.png';
import React from 'react';


function ShoppingList(){
    const [selectedListName, setSelectedListName] = useState("SHOPPING LIST - 1");
    const [lists, setLists] = useState(["SHOPPING LIST - 1"]);
    const [listItems, setListItems] = useState({
        "SHOPPING LIST - 1": [
            {name: "Apple", quantity: 3, type: "Fruit"}
        ]
    });

    const createNewList = () => {
        const newListName = `SHOPPING LIST - ${lists.length + 1}`;
        setLists([...lists, newListName]);
        setSelectedListName(newListName);
        setListItems({...listItems, [newListName]: []});
    }
    return (
        <div className='shoppingList'>
            <div><img className="sausageImage" src={sausage} alt="sausage" /></div>

            <div className='shoppingListHolder'>
            <div className="shoppingListNameHolder">
            <div className="listNameTitle">Shopping List</div>
                {lists.map((listName, index) => (
                    <div key={listName} className={`listName ${selectedListName === listName? "active" : ""}`} onClick={() => setSelectedListName(listName)}>{listName}</div>
                ))}
            <div className="createNewS_list" onClick={createNewList}>Create New List</div>
            </div>

            <div className="individual_shoppingList">
                <div className='individualS_listTitle'>{selectedListName}</div>
                    <div className='s_listItem'>
                        <div className='ItemTitle'>
                            <table id="titleTable">
                                <tr>
                                    <td id="foodName">Food Name</td>
                                    <td id="quantity">Quantity</td>
                                    <td id="type">Type</td>
                                </tr>
                            </table>  
            </div>
            <div className='eachItem'> 
              <table id="eachItemTable">
                {listItems[selectedListName].map((item, index) => (
                  <tr key={index}>
                    <td id="foodName">{item.name}</td>
                    <td id="quantity">{item.quantity}</td>
                    <td id="type">{item.type}</td>
                  </tr>
                ))}
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
}

export default ShoppingList;