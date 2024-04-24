import { useEffect, useState } from "react";
import { getUser } from "../Requests/getRequest";
import "./dashboard.css";
import MealRecord from "./mealRecord";
import Notifications from "./notifications";
import Nutrition from "./Nutrition";
import StoredItems from "./storedItems";
import axios from "axios";
import { getAuthToken } from "../authService";


function Dashboard(){

    const [user,setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getAlerts/${getAuthToken()}`);
            console.log(response);
            setUser(await getUser());
        }
        fetchData();
    }, []);


    
    return(

        <div className="dashboard">

            <section className="leftSides">
                <MealRecord user={user}/>
                <Notifications user={user}/>
            </section>

            <section className="rightSides">

                <Nutrition user={user}/>
                <StoredItems user={user}/>

            </section>

           
        </div>
    
    )
}
export default Dashboard;


