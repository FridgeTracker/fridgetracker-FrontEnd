import { useState, useEffect } from 'react';

import "./fridge.css";
import "../item/item.css";

import axios from 'axios';

import Fridge from './fridge.js';
import Item from '../item/item.js';
import { getAuthToken } from '../authService.js';

import addImage from '../assets/plus_sign.png';


function Fridges() {

  const [userData, setUserData] = useState({});
  const [selectedFridge, setSelectedFridge] = useState(null);
  const [selectedItem, setItem] = useState(null);
  const [addItem, setAdd] = useState(false);
  const [addFridge,setAddFridge] = useState(false);

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
  }, []); // Empty dependency array ensures the effect runs only once on mount


  useEffect(() => {
    console.log(userData); // Log userData when it changes
  }, [userData]);

  const fridgeHandler = (clickedFridge) => {
    setItem(null);
    setAdd(false);
    setAddFridge(false);
  
    if (!selectedFridge || selectedFridge.id !== clickedFridge.id) {
      setSelectedFridge(clickedFridge);
      setUserData((prevUserData) => ({
        ...prevUserData,
        fridges: prevUserData.fridges.map((fridge) => ({
          ...fridge,
          selected: fridge.id === clickedFridge.id,
        })),
      }));
    }
  };


const handleUpdateFridge = async () => {
  try {
      const UUID = getAuthToken();
      const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);
      setUserData(response.data);

      if (selectedFridge) {
        const updatedFridge = response.data.fridges.find(fridge => fridge.id === selectedFridge.id);
        setSelectedFridge(updatedFridge); // Update selectedFridge with the new data
        setUserData((userData) => ({
          ...userData,
          fridges: userData.fridges.map((fridge) => ({
            ...fridge,
            selected: fridge.id === selectedFridge.id,
          })),
        }));
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


  return (

    <div className="fridge">
      
      <div className="fridgeListWrapper">

        <div className="fridgeListHolder">

          {userData.fridges && userData.fridges.map((fridge) => (
          <Fridge key={fridge.id} fridge={fridge} onFridgeClick={fridgeHandler} />
          ))}

          {userData.fridges && userData.fridges.length < 3 && (
            <div className='addFridgeButtonWrapper'>
              {addFridge ? (
                <div className='submitAddFridgeWrapper'>
                  <form onSubmit={handleAddFridge}>
                    <input type="text" name="fridgeName" placeholder='Enter fridge Name Here' />
                    <input type="number" name="capacity" placeholder='Enter fridge Capacity Here' />
                    <input type="submit" placeholder='Add Fridge' />
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

      </div>

      <div className='itemContainer'>

        <div className='itemListContainer'>
            <div className = "itemWrapper">
              <div className='itemListHolder'>

              {selectedFridge && 
                <>
                  {selectedFridge.items.map((item) => (
                    <div className={`itemButton ${selectedItem === item ? 'selected' : ''}`} onClick={() => {setItem(item); setAdd(false)}}>
                      <p>Name: {item.foodName} | Quantity: {item.quantity}</p>
                    </div>
                  ))}
                  <div className="addItemButton" onClick={() => setAdd(true)}>
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
                      <Item fridgeId={selectedFridge.id} updateFridge={handleUpdateFridge}></Item>
                  </div>
            </>
          ) : (
              <>
                {selectedItem && 
                <>
                  <div className='itemCard'>
                    <Item key={selectedItem.id} fridgeId={selectedFridge.id} Item={selectedItem} updateFridge={handleUpdateFridge}/>
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

export default Fridges;
