import { useState, useEffect } from 'react';

import "./fridge/fridge.css";
import "../item/item.css";

import Fridge from './fridge/fridge.js';
import Item from '../item/item.js';

import addImage from '../assets/addIcon.png';
import accessItem from '../assets/accessItem.png';
import deleteIcon from '../assets/deleteIcon.png';
import Freezer from './freezer/freezer.js';

import { getUser } from '../Requests/getRequest.js';
import { deleteStorageRequest } from '../Requests/postRequests.js';
import { storageService } from './storageService.js';

function Storage() {

  const [userData, setUserData] = useState({});
  const [selectedStorage, setselectedStorage] = useState(null);
  const [selectedItem, setItem] = useState(null);
  const [addItem, setAdd] = useState(false);
  const [addFridge,setAddFridge] = useState(false);
  const [addFreezer, setAddFreezer] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setUserData(await getUser());
    };
    fetchUserData();
  }, []); 


  const storageHandler = (clickedStorage) => {
    setItem(null);
    setAdd(false);
    setAddFridge(false);
    setAddFreezer(false);
    storageService.storageHandler(clickedStorage,selectedStorage,setselectedStorage,setUserData);
  };

  const handleUpdateFridge = async () => {
    storageService.handleUpdateStorage(selectedStorage, setUserData, setselectedStorage, setItem, setAdd);
  };

  const handleAddStorage = async (event, storageType) => {
    event.preventDefault();
    setAddFridge(false);
    const formData = new FormData(event.target);
    storageService.handleAddStorage(formData,storageType,handleUpdateFridge)
  };

const handleDeleteStorage = async (deleteFridge) => {
  await deleteStorageRequest(deleteFridge, handleUpdateFridge);
}

  return (

    <div className="fridge">
      <div className="fridgeListWrapper">
        <div className="fridgeListHolder">

          {userData.fridges && userData.fridges.map((fridge) => (
            <Fridge key={fridge.id} fridge={fridge} onFridgeClick={storageHandler} />
          ))}

          {userData.fridges && userData.fridges.length < 3 && (
            <div className='addFridgeButtonWrapper'>
              {addFridge ? (
                <div className='submitAddFridgeWrapper'>
                  <form onSubmit={(event) => handleAddStorage(event,"fridge")} className='addFridgeForm'>
                    <input type="text" name="fridgeName" placeholder='Enter fridge Name' />
                    <input type="number" name="capacity" placeholder='Enter fridge Capacity' />
                    <input type="submit" placeholder='Add Fridge' className='addFridgeSubmit'/>
                  </form>
                </div>
              ) :
              (
                <div className='addFridgeButton' onClick={() => {setAddFridge(true)}}>
                  <img src={addImage} alt="plus"/>
                  <p>Add Fridge</p>
                </div>
              )}
            </div>
          )}

        </div>

        <div className='storageDivider'></div>

        <div className="freezerListHolder">
            {userData.freezers && userData.freezers.map((freezer) => (
            <Freezer key={freezer.id} freezer={freezer} onFreezerClick={storageHandler} />
            ))}

            {userData.freezers && userData.freezers.length < 3 && (
              <div className='addFridgeButtonWrapper'>
                {addFreezer ? (
                  <div className='submitAddFridgeWrapper'>
                    <form onSubmit={handleAddStorage} className='addFridgeForm'>
                      <input type="text" name="freezerName" placeholder='Enter Freezer Name' />
                      <input type="number" name="capacity" placeholder='Enter Fridge Capacity' />
                      <input type="submit" placeholder='Add Freezer' className='addFridgeSubmit'/>
                    </form>
                  </div>
                ) :
                (
                  <div className="addFridgeButton" onClick={() => {setAddFreezer(true)}}>
                    <img src={addImage} alt="plus"/>
                    <p>Add Freezer</p>
                  </div>
                )}
              </div>
            )}

        </div>

      </div>

      <div className='itemContainer'>
        <div className='itemListContainer'>
            <p id="storageTitle">Name: {selectedStorage ? selectedStorage.storageName : 'Not Selected'}
            {selectedStorage && <img id="deleteFridge" onClick={() => {handleDeleteStorage(selectedStorage); setselectedStorage(null)}} src={deleteIcon} alt="delete" />}
            </p>
            <div className = "itemWrapper">
              <div className='itemListHolder'>

              {selectedStorage && 
                <>
                  {selectedStorage.items.map((item, index) => (
                    <div key={index} className={`itemButton ${selectedItem === item ? 'selected' : ''}`} onClick={() => {setItem(item); setAdd(false)}}>
                      <p>Name: {item.foodName} | Quantity: {item.quantity}</p>
                      <img src={accessItem} alt="a"/>
                    </div>
                  ))}
                  {selectedStorage.items.length < selectedStorage.capacity &&
                    <div className="addItemButton" onClick={() => {setAdd(true); setItem(null);}}>
                      <p><img src={addImage} alt='add' className='addItem' /></p>
                    </div>
                  }
                </>
              }

              </div>
            </div> 
        </div>

        <div className='itemDetailWrapper'>
          {addItem ? (
            <>
                  <div className='itemCard'>
                      <Item storageId={selectedStorage.id} updateFridge={handleUpdateFridge}></Item>
                  </div>
            </>
          ) : (
              <>
                {selectedItem && 
                <>
                  <div className='itemCard'>
                    <Item key={selectedItem.id} storageId={selectedStorage.id} Item={selectedItem} updateFridge={handleUpdateFridge}/>
                  </div>
                </>
                }
              </>
            )}
        </div>

      </div>

    </div>
  );
}

export default Storage;
