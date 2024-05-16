import { useEffect, useState } from "react";
import "./dashboard.css";


function Nutrition ({user}) {

    const [member] = useState(null);
    const [mealRecords, setMealRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [meals, setMeals] = useState([]);

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
        fetchMealRecords();
      }, []);
    
     
      useEffect(() => {
        const records = member
          ? mealRecords.filter((record) => record.memberId === member)
          : mealRecords;
        setFilteredRecords(records);
      }, [member, mealRecords]);
    
    
      const calculateTotalCaloriesByMember = () => {
        if (!user || !user.members || !Array.isArray(user.members)) {
            return {}; 
        }

        const today = new Date().toISOString().split('T')[0];
    
        const totalCaloriesByMember = {};
        user.members.forEach(member => {
            totalCaloriesByMember[member.id] = 0;
    
            const memberRecordsToday = filteredRecords.filter(record => record.memberId === member.id && record.recordedAt.split('T')[0] === today);
    
            memberRecordsToday.forEach(record => {
                const mealNutrition = getMealNutrition(record.mealId);
                const calories = parseInt(mealNutrition.Calories);
                totalCaloriesByMember[member.id] += calories;
            });
        });
    
        return totalCaloriesByMember;
    };
    
    const getMealNutrition = (mealId) => {
        const meal = meals.find((m) => m.id === mealId);
        return meal
            ? meal.nutritionalInformation
            : { Protein: "N/A", Calories: "N/A", Fat: "N/A" };
    };
    
    const totalCaloriesByMember = calculateTotalCaloriesByMember();


    const calculateBMR = (member) => {
        const BMR = 88.362 + (13.397 * member.weight) + (4.799 * member.height) - (5.677 * member.age);
        return BMR.toFixed(0);
    }

    return (
        <div className="nutritionWrapper">
            <div className="rightTopBar">
                <p>Today's Calories</p>
            </div>
            <div className="nutritionContents">
                {user && user.members.map((member, index) => {
                        const icon = require(`../assets/memberIcons/${member.imageURL}`);
                        return (
                            <div key={index} className="nutritionMember">
                                    <img src={icon} alt={`${member.name} icon`} className="nutIcon"/>
                                    <p id="nutMember">{member.name}</p>
                                    <span>
                                        <p>{totalCaloriesByMember[member.id]}/{calculateBMR(member)}</p>
                                        <p id="calories_nut"> Calories</p>
                                    </span>
                            </div>
                        );
                })}
            </div>
        </div>
    )

}

export default Nutrition;