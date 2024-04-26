import './shoppinglist.css';
import sausage from '../assets/sausage.png';
import React, { useEffect, useState } from 'react';
import { getUser } from '../Requests/getRequest';
import { addItemRequest, createListRequest, deleteItemRequest, deleteListRequest, updateItemRequest } from '../Requests/postRequests';

import editIcon from "../assets/editIcon.png";
import binIcon from "../assets/binIcon.png";
import conmfirmIcon from "../assets/confirmIcon.png";


function ShoppingList(){

    const[user,setUser] = useState(null);
    const[selectedList, setSelectedList] = useState(null);
    const[editMode,setEditMode] = useState(null);
    const[updatedListName , setUpdatedListName] = useState(null);

    const handleChange = (event) => {
      setUpdatedListName(event.target.value);
    };

    useEffect(() => {
      const fetchUser = async () => {
        setUser(await getUser());
      };
      fetchUser();
    }, []);

    const createShoppingList = async () => {

        const formData = {
          s_listName:"New List 1",
          userID:user.id
        };
        if(user.shoppingLists.length < 8){
          await createListRequest(formData,setUser);
        }
    }

    const addListItem = async () => {
      const itemToAdd = {
          foodName: "Food Name",
          quantity: 0,
          id: selectedList.s_listId // Set the id value here
      };
  
      try {
          // Send request to add item
          await addItemRequest(itemToAdd);
  
          // Update user data
          const updatedUser = await getUser();
          setUser(updatedUser);
  
          // No need to find and set selectedList again
          setSelectedList(updatedUser.shoppingLists.find(list => list.s_listId === selectedList.s_listId));
      } catch (error) {
          console.error('Failed to fetch user data:', error);
      } 
  };
  
  const handleInputChange = (e, index, type) => {
    const { value } = e.target;
    setSelectedList(prevList => {
      const updatedItems = [...prevList.items];
      if (type === 'foodName') {
        updatedItems[index].foodName = value;
      } else if (type === 'quantity') {
        updatedItems[index].quantity = value;
      }
      setEditMode(updatedItems[index]);
      return { ...prevList, items: updatedItems };
    });
  };

  const saveNewList = async () => {

    const savedItem = {

      foodName:editMode.foodName,
      itemID: editMode.itemID,
      quantity: editMode.quantity,
      id: selectedList.s_listId // Set the id value here

  };

    try {
          await updateItemRequest(savedItem);
          const updatedUser = await getUser();
          setUser(updatedUser);
          setSelectedList(updatedUser.shoppingLists.find(list => list.s_listId === selectedList.s_listId));
      } 
      catch (error) {
          console.error('Error:', error.response.data); // Log response data
      }
  }


  const deleteItem = async (deletedSelection) => {
    const deleteItem = {
      itemID:deletedSelection.itemID,
      id: selectedList.s_listId
    }

    try {
      await deleteItemRequest(deleteItem);
      const updatedUser = await getUser();
      setUser(updatedUser);
      setSelectedList(updatedUser.shoppingLists.find(list => list.s_listId === selectedList.s_listId));
    } 
    catch (error) {
      console.error('Failed to delete data:', error);
    } 
  }

  const deleteList = async (selectedList) => {
    const form = {
      s_listId:selectedList.s_listId
    };
    await deleteListRequest(form,setUser,setSelectedList);
  }
  
    
  const changeListName = async (updatedListName) => {
    
    const form = {
      s_listId: selectedList.s_listId,
      s_listName: updatedListName
    };
  
    await changeListName(form,setUser);
  }
  
    return (
        <div className='shoppingList'>
            <div><img className="sausageImage" src={sausage} alt="sausage" /></div>

            <div className='shoppingListHolder'>
            <div className="shoppingListNameHolder">
              <div className="listNameTitle">Shopping List</div>

                {user && user.shoppingLists.map((list) => 
                  <div className='listName' onClick={() => {setSelectedList(list); setUpdatedListName(list.s_listName)}}>{list.s_listName}</div>
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