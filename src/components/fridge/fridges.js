import { useState, useEffect } from 'react';

import "./fridge.css";

import axios from 'axios';

import Fridge from './fridge.js';
import Item from '../item/item.js';
import plus_sign from "../assets/plus_sign.png";


function Fridges() {
  const [userData, setUserData] = useState({});
  const [selectedFridge, setSelectedFridge] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/ec32fc96-5939-46af-992f-69e19b974e54');
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

  const fridgeHandler = (fridgeName) => {
    const clickedFridge = userData.fridges.find(fridge => fridge.id === fridgeName.id);
    setSelectedFridge(clickedFridge);
  }

  return (
    <div className="fridge">
      
      <div className="fridgeListWrapper">
        <div className="fridgeListHolder">

          {userData.fridges && userData.fridges.map((fridge) => (
          <Fridge key={fridge.id} fridge={fridge} onFridgeClick={fridgeHandler} />
          ))}

          <div className="fridge1Holder">
              <img src = {plus_sign} alt = "plus sign"/>
          </div>

        </div>
      </div>

      <div className='itemContainer'>

        <div className='itemListContainer'>
            <div className = "itemWrapper">
              <div className='itemListHolder'>
                {selectedFridge && selectedFridge.items.map((item) =>
                  <Item key={item.fridgeid} Item={item}/>
                  )}
              </div>
            </div>
          
        </div>

      </div>

    </div>
  );
}

export default Fridges;
