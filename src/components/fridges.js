import { useState, useEffect } from 'react';
import "./styles/content.css";

import axios from 'axios';

import Fridge from './fridge.js';
import plus_sign from "../assets/plus_sign.png";


function Fridges() {
  const [showFridge1, setFridge1] = useState(false);
  const [userData, setUserData] = useState({});

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

  const fridge1Handler = () => {
    setFridge1(true);
    console.log("button pressed");
  };

  useEffect(() => {
    console.log(userData); // Log userData when it changes
  }, [userData]);

  return (
    <div className="fridge">
      
      <div className="fridgeListWrapper">
        <div className="fridgeListHolder">

          {userData.fridges && userData.fridges.map((fridge) =>
          <Fridge key={userData.id} fridge={fridge}/>)}

          <div className="fridge1Holder">
              <img src = {plus_sign} alt = "plus sign"/>
          </div>

        </div>
      </div>

      <div className='itemListHolder'>
        {showFridge1 && <Fridge />}
      </div>

    </div>
  );
}

export default Fridges;
