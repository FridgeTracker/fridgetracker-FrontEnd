import { useEffect, useState } from "react";
import { getAlerts, getUser } from "../Requests/getRequest";
import "./dashboard.css";
import MealRecord from "./mealRecord";
import Notifications from "./notifications";
import Nutrition from "./Nutrition";
import StoredItems from "./storedItems";


function Dashboard(){

    const [user,setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await getAlerts();
            setUser(await getUser());
        }
        fetchData();
    }, []);

    // Assuming mealRecords and meals are state variables managed by useState

    
    return(

        <div className="dashboard">

            {user && <><section className="leftSides">
                <MealRecord user={user}/>
                <Notifications user={user}/>
            </section>

            <section className="rightSides">
                <Nutrition user={user}/>
                <StoredItems user={user}/>
            </section> </>}

           
        </div>
    
    )
}
export default Dashboard;


