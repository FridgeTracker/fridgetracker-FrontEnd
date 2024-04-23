import { useEffect, useState } from "react";
import { getUser } from "../Requests/getRequest";
import "./dashboard.css";
import MealRecord from "./mealRecord";
import Notifications from "./notifications";
import Nutrition from "./Nutrition";


function Dashboard(){

    const [user,setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
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
                <div className="itemsWrapper">
                    <div className="rightTopBarItem">
                        <p>Stored Item</p>
                    </div>
                </div>

            </section>

           
        </div>
    
    )
}
export default Dashboard;


