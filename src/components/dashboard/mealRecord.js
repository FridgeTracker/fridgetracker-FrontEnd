import { useState } from "react";
import "./dashboard.css";


function MealRecord ({user}) {
    const [member, setMember] = useState(null);

    return (
        <div className="mealRecordWrapper">
            <div className="recordTopBar">
                <p>Meal Records</p>
                <select className="memberSelectors" value={member} onChange={(e) => setMember(e.target.value)}>
                    {user && user.members.map((member, index) => (
                        <option key={index}>{member.name}</option>
                    ))}
                </select>
            </div>

            
            <div className="directional_bar">
                <table>
                    <tr>
                        <td>Meal</td>
                        <td>Protein</td>
                        <td>Carb</td>
                        <td>Fats</td>
                        <td>Date</td>
                    </tr>
                </table>
            </div>
        </div>
    )

}

export default MealRecord;