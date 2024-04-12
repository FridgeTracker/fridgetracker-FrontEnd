import { useState, useEffect } from 'react';

import "./fridge/fridge.css";
import "../item/item.css";

import axios from 'axios';

import Fridge from './fridge/fridge.js';
import Item from '../item/item.js';
import { getAuthToken } from '../authService.js';

import addImage from '../assets/addIcon.png';
import accessItem from '../assets/accessItem.png';
import Freezer from './freezer/freezer.js';


function Storage() {

  const [userData, setUserData] = useState({});
  const [selectedStorage, setselectedStorage] = useState(null);
  const [selectedItem, setItem] = useState(null);
  const [addItem, setAdd] = useState(false);
  const [addFridge,setAddFridge] = useState(false);
  const[addFreezer, setAddFreezer] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const UUID = getAuthToken();
        const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);
        setUserData(response.data);

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []); 


  const storageHandler = (clickedStorage) => {
    
    setItem(null);
    setAdd(false);
    setAddFridge(false);
    setAddFreezer(false);
  
  
    if (!selectedStorage || selectedStorage.id !== clickedStorage.id) {

      setselectedStorage(clickedStorage);

      setUserData((prevUserData) => ({
        ...prevUserData,
        fridges: prevUserData.fridges.map((fridge) => ({
          ...fridge,
          selected: fridge.id === clickedStorage.id,
        })),
      }));
    }

    if (!selectedStorage || selectedStorage.id !== clickedStorage.id) {

      setselectedStorage(clickedStorage);

      setUserData((prevUserData) => ({
        ...prevUserData,
        freezers: prevUserData.freezers.map((freezer) => ({
          ...freezer,
          selected: freezer.id === clickedStorage.id,
        })),
      }));
    }

    console.log(selectedStorage);

  };


const handleUpdateFridge = async () => {

  try {
      const UUID = getAuthToken();
      const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);
      setUserData(response.data);

      if (selectedStorage) {

        const updatedStorage = response.data.fridges.find(storage => storage.id === selectedStorage.id) || response.data.freezers.find(storage => storage.id === selectedStorage.id);

        if (updatedStorage) {
          setselectedStorage(updatedStorage); // Update selectedStorage with the new data

          if (response.data.fridges.find(storage => storage.id === selectedStorage.id)) {
            setUserData((userData) => ({
              ...userData,
              fridges: userData.fridges.map((fridge) => ({
                ...fridge,
                selected: fridge.id === updatedStorage.id,
              })),
            }));
          } 
          else if (response.data.freezers.find(storage => storage.id === selectedStorage.id)) {
            setUserData((userData) => ({
              ...userData,
              freezers: userData.freezers.map((freezer) => ({
                ...freezer,
                selected: freezer.id === updatedStorage.id,
              })),
            }));
          }
        }
      }
      
    setItem(null);

  } catch (error) {
      console.error('Failed to fetch user data:', error);
  }
};

const handleAddFridge = async (event) => {

  setAddFridge(false);
  event.preventDefault(); 

  const formData = new FormData(event.target);

  const addFridge = {
      storageName:formData.get("fridgeName"),
      capacity:formData.get("capacity"),
      userID:getAuthToken()
  };

  try {
      const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addFridge`,addFridge);
      console.log(response);
      handleUpdateFridge();

    } catch (error) {
      console.error('Failed to save data:', error);
    } 

}

const handleAddFreezer = async (event) => {

  setAddFridge(false);
  event.preventDefault(); 

  const formData = new FormData(event.target);

  const addFreezer = {
      storageName:formData.get("freezerName"),
      capacity:formData.get("capacity"),
      userID:getAuthToken()
  };

  try {
      const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addFreezer`,addFreezer);
      console.log(response);
      handleUpdateFridge();

    } catch (error) {
      console.error('Failed to save data:', error);
    } 

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
                  <form onSubmit={handleAddFridge} className='addFridgeForm'>
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
                    <form onSubmit={handleAddFreezer} className='addFridgeForm'>
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
            <p id="storageTitle">Name: {selectedStorage ? selectedStorage.storageName : 'Not Selected'}</p>
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
                  <div className="addItemButton" onClick={() => {setAdd(true); setItem(null);}}>
                    <p><img src={addImage} alt='add' className='addItem' /></p>
                  </div>
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
