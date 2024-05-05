import { useState, useEffect } from "react";
import "./dashboard.css";

function MealRecord({ user }) {
  const [member, setMember] = useState(null);
  const [mealRecords, setMealRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [meals, setMeals] = useState([]);

  // Fetch all meal records
  useEffect(() => {
    const fetchMealRecords = async () => {
      try {
        const response = await fetch(
          "https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/mealRecords"
        );
        const data = await response.json();
        setMealRecords(data);
      } catch (error) {
        console.error("Error fetching meal records:", error);
      }
    };

    fetchMealRecords();
  }, []);

  // Fetch meal plans
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://agile-atoll-76917-ba182676f53b.herokuapp.com/meal_plans"
        );
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  // Filter records whenever the selected member changes
  useEffect(() => {
    const records = member
      ? mealRecords.filter((record) => record.memberId === member)
      : mealRecords;
    setFilteredRecords(records);
  }, [member, mealRecords]);

  const getMealName = (mealId) => {
    const meal = meals.find((m) => m.id === mealId);
    return meal ? meal.mealName : "Unknown";
  };

  const getMealNutrition = (mealId) => {
    const meal = meals.find((m) => m.id === mealId);
    return meal
      ? meal.nutritionalInformation
      : { Protein: "N/A", Calories: "N/A", Fat: "N/A" };
  };

  return (
    <div className="mealRecordWrapper">
      <div className="recordTopBar">
        <p>Meal Records</p>
        <select
          className="memberSelectors"
          value={member || ""}
          onChange={(e) => setMember(e.target.value)}
        >
          <option value="">All Members</option>
          {user &&
            user.members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
        </select>
      </div>
      <div className="directional_bar_noti">
          <table className="notiTableMeal">
              <tr>
                <th>Meal</th>
                <th>Protein</th>
                <th>Fats</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
          </table>
      </div>

      <div className="notiContent">
      <table className="meal-record-table">
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td>{getMealName(record.mealId)}</td>
              <td>{getMealNutrition(record.mealId).Protein}</td>
              <td>{getMealNutrition(record.mealId).Fat}</td>
              <td>{getMealNutrition(record.mealId).Calories}</td> 
              <td>{new Date(record.recordedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default MealRecord;
