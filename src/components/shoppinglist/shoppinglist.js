import './shoppinglist.css';
import sausage from '../assets/sausage.png';
import React, { useEffect, useState } from 'react';
import { getUser } from '../Requests/getRequest';
import { changeListRequest, deleteListRequest } from '../Requests/postRequests';

import editIcon from "../assets/editIcon.png";
import binIcon from "../assets/binIcon.png";
import conmfirmIcon from "../assets/confirmIcon.png";
import shoppingListService from './shoppingListService';


function ShoppingList(){

  const[user,setUser] = useState(null);
  const[selectedList, setSelectedList] = useState(null);
  const[editMode,setEditMode] = useState(null);
  const[updatedListName , setUpdatedListName] = useState(null);

  const handleInputChange = (e, index, type) => {
    const { value } = e.target;
    setSelectedList(prevList => {
      prevList.items[index][type] = value;
      setEditMode(prevList.items[index]);
      return { ...prevList };
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getUser());
    };
    fetchUser();
  }, []);

  const handleChange = (event) => {
    setUpdatedListName(event.target.value);
  };

  const createShoppingList = async () => {
    shoppingListService.createShoppingList(setUser, user);
    setUser(await getUser());
  }

  const addListItem = async () => {
    shoppingListService.addListItem(selectedList, setUser, setSelectedList);
  };

  const saveNewList = async () => {
    shoppingListService.saveNewList(editMode, selectedList, setUser, setSelectedList);
  }

  const deleteItem = async (deletedSelection) => {
    shoppingListService.deleteItem(deletedSelection, selectedList, setUser, setSelectedList);
  }

  const deleteList = async (selectedList) => {
    const form = {
      id:selectedList.id,
      type:"SHOPPING"
    };
    await deleteListRequest(form,setUser,setSelectedList);
  }
  
    
  const changeListName = async (updatedListName) => { 
    const form = {
      id: selectedList.id,
      storageName: updatedListName
    };
    await changeListRequest(form, setUser);
  }
  
    return (
        <div className='shoppingList'>
            <div><img className="sausageImage" src={sausage} alt="sausage" /></div>

            <div className='shoppingListHolder'>
            <div className="shoppingListNameHolder">
              <div className="listNameTitle">Shopping List</div>

                {user && user.shoppingLists.map((list) => 
                  <div className='listName' onClick={() => {setSelectedList(list); setUpdatedListName(list.storageName)}}>{list.storageName}</div>
                )}

              <div className="createNewS_list" onClick={() => createShoppingList()}>Create New List</div>
            </div>

            <div className="individual_shoppingList">
                <div className='individualS_listTitle' onClick={() => changeListName(selectedList)}>
                  {selectedList && (
                  <>
                    <input type="text" onChange={handleChange} id="listNameTitle" value={updatedListName}/>
                    <img id="confirmImg" src={conmfirmIcon} alt="confirm" onClick={() => changeListName(updatedListName)}/>
                  </>
                )}
                </div>
                    <div className='s_listItem'>
                        <div className='ItemTitle'>
                            <table id="titleTable">
                                <tr>
                                    <td id="foodName">Food Name</td>
                                    <td id="quantity">Quantity</td>
                                    <td id="type">Edit</td>
                                </tr>
                            </table>  
            </div>
            <div className='eachItem'> 

            <table id="eachItemTable">
              {selectedList && selectedList.items.map((item, index) => (
                <tr key={index}>
                  {editMode && editMode === item ? (
                    <>
                  <td id="foodName">

                    <input 
                      type="text" 
                      value={item.foodName}
                      onChange={(e) => handleInputChange(e, index, 'foodName')}
                    />
                  </td>
                  <td id="quantity">
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => handleInputChange(e, index, 'quantity')}
                    />
                  </td>
                  <td id="type"> <img id="editIcon" src={binIcon} alt="edit" onClick={() => deleteItem(item)}/>
                    <img id="editIcon" src={editIcon} alt="edit" onClick={() => setEditMode(item)}/></td> 
                  </>
                  )
                  :
                  (
                  <>
                  <td id="foodName">
                    
                    {item.foodName}
                  </td>
                  <td id="quantity">
                    {item.quantity}
                  </td>
                  <td id="type"> 
                    <img id="editIcon" src={binIcon} alt="edit" onClick={() => deleteItem(item)}/>
                    <img id="editIcon" src={editIcon} alt="edit" onClick={() => setEditMode(item)}/>
                  </td> 
                  </>
                  )}
                  
                </tr>
              ))}
            </table>

            </div>

            </div>
            <div className='s_listOptions'>   
                  <div id="edit" onClick={() => addListItem()}>Add Item</div>        
                  <div id="import" onClick={() => saveNewList()} >Save Item</div>
                  <div id="delete" onClick={() => selectedList && deleteList(selectedList)}>Delete List</div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default ShoppingList;