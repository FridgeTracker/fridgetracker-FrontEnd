import { useState, useEffect } from 'react';
import axios from 'axios';

function Dash(){

const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const userEmail = localStorage.getItem('userEmail');

                const response = await axios.get('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getUser', {
                    headers: { 'email-tkn': userEmail }
                  });
                  
                setUserData(response.data);

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <p>ID: {userData.id}</p>
                    <p>Email: {userData.email}</p>
                    <p>Rank: {userData.rank}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}


export default Dash;
