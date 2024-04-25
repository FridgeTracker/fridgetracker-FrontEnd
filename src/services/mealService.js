// src/services/mealService.js
let base_url = "https://agile-atoll-76917-ba182676f53b.herokuapp.com/";

//Mock data for members
const members = [
  {
    id: "6f3cbbd0-8f99-479f-8ad3-e0761db5ec81",
    name: "Ranko",
    age: 20,
    allergies: [],
    preference: [],
    height: 170,
    weight: 60,
    imageURL: "https://api.dicebear.com/8.x/adventurer/svg?seed=Lilly",
  },
  {
    id: "5ea8e200-e60b-49ff-9223-2858b06bbe43",
    name: "Poh",
    age: 20,
    allergies: [],
    preference: [],
    height: 170,
    weight: 60,
    imageURL: "https://api.dicebear.com/8.x/adventurer/svg?seed=Lily",
  },
  {
    id: "c03b3300-fe16-4617-8b41-77ba3fd87baa",
    name: "Sreeram",
    age: 20,
    allergies: [],
    preference: [],
    height: 170,
    weight: 60,
    imageURL: "https://api.dicebear.com/8.x/adventurer/svg?seed=Bandit",
  },
  {
    id: "27eaabf4-e2df-4bd3-b6c3-38b08aa3e796",
    name: "Christine",
    age: 20,
    allergies: [],
    preference: [],
    height: 170,
    weight: 60,
    imageURL: "https://api.dicebear.com/8.x/adventurer/svg?seed=Callie",
  },
  {
    id: "bb159d3a-f464-44d4-a8c5-9b334e12d8a8",
    name: "Thomas",
    age: 20,
    allergies: ["Duck"],
    preference: ["Chicken breast", "Peanuts"],
    height: 170,
    weight: 60,
    imageURL: "https://api.dicebear.com/8.x/adventurer/svg?seed=Nala",
  },
];

// Mock data for fridges and freezers
const mockFridges = [
  {
    id: "2176cb2a-81f3-445a-9e21-2b35ebaff56c",
    storageName: "F1",
    capacity: 1,
    type: "Fridge",
    items: [
      {
        itemID: 90,
        foodName: "Applesauce",
        quantity: 10,
        expiryDate: "2024-04-25",
        foodID: {
          id: 1,
          per100grams: "100g",
          foodCategory: "CannedFruit",
          foodItem: "Applesauce",
          cals_per100grams: "62 cal",
          kj_per100grams: "260 kJ",
        },
      },
      {
        itemID: 101,
        foodName: "Chicken breast",
        quantity: 5,
        expiryDate: "2024-04-30",
        foodID: {
          id: 562,
          per100grams: "100g",
          foodCategory: "ColdCuts&LunchMeat",
          foodItem: "Chicken breast",
          cals_per100grams: "79 cal",
          kj_per100grams: "332 kJ",
        },
      },
      {
        itemID: 102,
        foodName: "Peanuts",
        quantity: 2,
        expiryDate: "2024-05-15",
        foodID: {
          id: 1547,
          per100grams: "100g",
          foodCategory: "Legumes",
          foodItem: "Peanuts",
          cals_per100grams: "567 cal",
          kj_per100grams: "2381 kJ",
        },
      },
      {
        itemID: 103,
        foodName: "Bell peppers",
        quantity: 3,
        expiryDate: "2024-04-28",
        foodID: {
          id: 2149,
          per100grams: "100g",
          foodCategory: "Vegetables",
          foodItem: "Bell peppers",
          cals_per100grams: "260 cal",
          kj_per100grams: "1224 kJ",
        },
      },
      {
        itemID: 104,
        foodName: "Dried chili peppers",
        quantity: 1,
        expiryDate: "2024-06-01",
        foodID: {
          id: 2171,
          per100grams: "100g",
          foodCategory: "Vegetables",
          foodItem: "Dried chili peppers",
          cals_per100grams: "100 cal",
          kj_per100grams: "985 kJ",
        },
      },
      {
        itemID: 105,
        foodName: "Soy sauce",
        quantity: 1,
        expiryDate: "2024-07-01",
        foodID: {
          id: 2210,
          per100grams: "100g",
          foodCategory: "Condiments",
          foodItem: "Soy sauce",
          cals_per100grams: "275 cal",
          kj_per100grams: "627 kJ",
        },
      },
    ],
  },
  // ... (other fridges)
];

const mockFreezers = [
  {
    id: "3062e7e8-6a83-4729-aeec-a35576930949",
    storageName: "Freezer 1",
    capacity: 10,
    type: "Freezer",
    items: [
      {
        itemID: 94,
        foodName: "Applesauce",
        quantity: 9,
        expiryDate: "2024-04-23",
        foodID: {
          id: 1,
          per100grams: "100g",
          foodCategory: "CannedFruit",
          foodItem: "Applesauce",
          cals_per100grams: "62 cal",
          kj_per100grams: "260 kJ",
        },
      },
    ],
  },
  // ... (other freezers)
];

const getMeals = async () => {
  try {
    const response = await fetch(base_url + "meal_plans");
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Malformed response: expected an array");
    }
    return data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    // Handle error, e.g., display a user-friendly error message or redirect to an error page
    return [];
  }
};

const getMealsFilteredByMemberAllergies = (memberId) => {
  const member = members.find((m) => m.id === memberId);
  if (!member) return Promise.resolve(getMeals()); // Return all meals if member not found

  return getMeals().then((meals) => {
    // Filter meals by checking that none of the member's allergies are in the meal's ingredients
    const memberAllergies = member.allergies.map((allergy) =>
      allergy.toLowerCase()
    );
    const filteredMeals = meals.filter(
      (meal) =>
        !meal.ingredients.some((ingredient) =>
          memberAllergies.includes(ingredient.toLowerCase())
        )
    );

    return Promise.resolve(filteredMeals);
  });
};

const getMealById = (mealId) => {
  return getMeals().then((meals) => {
    const meal = meals.find((meal) => meal.id === mealId);
    return Promise.resolve(meal); // Return the found meal or undefined
  });
};

// Assuming that we have an `ingredientAvailability` function that checks if ingredients are available
// For the sake of simulation, we'll just assume all ingredients are available if they are not allergens
// Simulated function; need toreplace with actual availability check
/*
const ingredientAvailability = (ingredients) => {
  // Simulated check; replace with actual availability check
  return ingredients.length <= 5;
};
*/
const ingredientAvailability = (ingredients) => {
  // Check if all ingredients are available in the fridges and freezers
  const availableIngredients = new Set();

  // Check fridges
  mockFridges.forEach((fridge) => {
    fridge.items.forEach((item) => {
      availableIngredients.add(item.foodName.toLowerCase());
    });
  });

  // Check freezers
  mockFreezers.forEach((freezer) => {
    freezer.items.forEach((item) => {
      availableIngredients.add(item.foodName.toLowerCase());
    });
  });

  // Check if all ingredients are available
  return ingredients.every((ingredient) =>
    availableIngredients.has(ingredient.toLowerCase())
  );
};
const getMealsFilteredByMember = (memberId) => {
  const member = members.find((m) => m.id === memberId);
  if (!member) {
    return Promise.resolve({
      preferenceMeals: [],
      readyToEatMeals: [],
      ingredientsNeededMeals: [],
    });
  }

  const allergies = member.allergies.map((allergy) => allergy.toLowerCase());
  const preferences = (member.preference || []).map((preference) =>
    preference.toLowerCase()
  );

  return getMeals().then((meals) => {
    // Separate meals into categories
    let preferenceMeals = [];
    let readyToEatMeals = [];
    let ingredientsNeededMeals = [];

    meals.forEach((meal) => {
      const mealIngredients = meal.ingredients.map((ingredient) =>
        ingredient.toLowerCase()
      );
      const hasAllergen = mealIngredients.some((ingredient) =>
        allergies.includes(ingredient)
      );
      const isReadyToEat = ingredientAvailability(mealIngredients);
      const hasPreference = mealIngredients.some((ingredient) =>
        preferences.includes(ingredient)
      );

      if (!hasAllergen) {
        if (hasPreference) {
          preferenceMeals.push(meal);
        }
        if (isReadyToEat) {
          readyToEatMeals.push(meal);
        } else {
          ingredientsNeededMeals.push(meal);
        }
      }
    });

    // Use a timestamp or another method for unique keys if needed
    preferenceMeals = preferenceMeals.map((meal) => ({ ...meal }));
    readyToEatMeals = readyToEatMeals.map((meal) => ({ ...meal }));
    ingredientsNeededMeals = ingredientsNeededMeals.map((meal) => ({
      ...meal,
    }));

    return Promise.resolve({
      preferenceMeals,
      readyToEatMeals,
      ingredientsNeededMeals,
    });
  });
};

const mealService = {
  members,
  ingredientAvailability,
  getMeals,
  getMealsFilteredByMemberAllergies,
  getMealsFilteredByMember,
  getMealById,
};

export default mealService;
