import axios from "axios";

let base_url = "";

const axiosInstance = axios.create({
  baseURL: base_url,
});

let cache = {
  userData: null,
};

const getUser = async () => {
  if (cache.userData) {
    return cache.userData;
  }
  try {
    const response = await axiosInstance.get(
      `/api/user/${localStorage.getItem("UUID")}`
    );
    cache.userData = response.data;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMembers = async () => {
  try {
    const data = await getUser();
    return data.members;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

const getMeals = async () => {
  try {
    const response = await axiosInstance.get("meal_plans");
    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
};

const getMealsFilteredByMemberAllergies = async (memberId) => {
  try {
    const members = await getMembers();
    const member = members.find((m) => m.id === memberId);
    if (!member) {
      return await getMeals();
    }

    const memberAllergies = new Set(
      member.allergies.map((allergy) => allergy.toLowerCase())
    );
    return (await getMeals()).filter((meal) => {
      const ingredients = meal.ingredients.map((ingredient) =>
        ingredient.toLowerCase()
      );
      return !ingredients.some((ingredient) => memberAllergies.has(ingredient));
    });
  } catch (error) {
    console.error("Error in getMealsFilteredByMemberAllergies:", error);
    throw error;
  }
};

const getMealById = async (mealId) => {
  try {
    const meals = await getMeals();
    return meals.find((meal) => meal.id === mealId);
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    throw error;
  }
};

const ingredientAvailability = async (ingredients) => {
  try {
    const userData = await getUser();

    const allItems = [
      ...userData.fridges.flatMap((fridge) => fridge.items),
      ...userData.freezers.flatMap((freezer) => freezer.items),
    ];

    return ingredients.every((ingredient) =>
      allItems.some(
        (item) => item.foodName.toLowerCase() === ingredient.toLowerCase()
      )
    );
  } catch (error) {
    console.error("Error checking ingredient availability:", error);
    throw error;
  }
};

const updateItemQuantity = async (itemId, quantity, storageId) => {
  const updatedItem = {
    itemID: itemId,
    quantity: quantity,
    expiryDate: "2024-04-02",
    id: storageId,
  };

  console.log(
    "Updating item:",
    updatedItem.itemID,
    updatedItem.quantity,
    updatedItem.id
  );

  try {
    const response = await axios.post(
      "https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateItem",
      updatedItem
    );

    console.log("Item updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update item:", error.response.data);
    throw error;
  }
};

const consumeMeal = async (meal) => {
  if (!meal || !meal.ingredients) {
    throw new Error("Invalid meal data");
  }

  try {
    const userData = await mealService.getUser();

    const updatePromises = meal.ingredients.map(async (ingredientName) => {
      let updated = false;

      for (const storageType of [userData.fridges, userData.freezers]) {
        for (const storage of storageType) {
          const ingredient = storage.items.find(
            (item) =>
              item.foodName.toLowerCase() === ingredientName.toLowerCase()
          );

          if (ingredient && ingredient.quantity > 0) {
            const newQuantity = ingredient.quantity - 1;
            console.log(
              `Updating ${ingredientName} quantity to ${newQuantity} in storage ID ${storage.id}`
            );
            await mealService.updateItemQuantity(
              ingredient.itemID,
              newQuantity,
              storage.id
            );
            updated = true;
            break;
          }
        }
        if (updated) break;
      }

      if (!updated) {
        console.error(
          `Ingredient not found or quantity is zero: ${ingredientName}`
        );
      }
    });

    await Promise.all(updatePromises);

    mealService.clearCache();
  } catch (error) {
    console.error("Failed to consume meal:", error);
    throw error;
  }
};

const getMealsFilteredByMember = async (memberId) => {
  try {
    const members = await getMembers();
    const member = members.find((m) => m.id === memberId);
    if (!member) {
      return {
        preferenceMeals: [],
        readyToEatMeals: [],
        ingredientsNeededMeals: [],
      };
    }

    const allergies = Array.isArray(member.allergies)
      ? member.allergies.map((allergy) => allergy.toLowerCase())
      : [];
    const preferences = Array.isArray(member.preference)
      ? member.preference.map((preference) => preference.toLowerCase())
      : [];

    const meals = await getMeals();
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

    preferenceMeals = preferenceMeals.map((meal) => ({ ...meal }));
    readyToEatMeals = readyToEatMeals.map((meal) => ({ ...meal }));
    ingredientsNeededMeals = ingredientsNeededMeals.map((meal) => ({
      ...meal,
    }));

    return {
      preferenceMeals,
      readyToEatMeals,
      ingredientsNeededMeals,
    };
  } catch (error) {
    console.error("Error in getMealsFilteredByMember:", error);
    return {
      preferenceMeals: [],
      readyToEatMeals: [],
      ingredientsNeededMeals: [],
    };
  }
};

const clearCache = () => {
  cache.userData = null;
};

const mealService = {
  getUser,
  getMembers,
  ingredientAvailability,
  getMeals,
  getMealsFilteredByMemberAllergies,
  getMealsFilteredByMember,
  getMealById,
  clearCache,
  updateItemQuantity,
  consumeMeal,
};

export default mealService;
