import axios from "axios";

// Subject class for the Observer pattern
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// MealService class with the Singleton pattern and Observer pattern
class MealService extends Subject {
  // Private properties and methods
  #base_url = "https://agile-atoll-76917-ba182676f53b.herokuapp.com";
  #axiosInstance = axios.create({
    baseURL: this.#base_url,
  });
  #cache = {
    userData: null,
  };

  // Private constructor to prevent creating new instances
  constructor() {
    super(); // Call the Subject constructor

    if (!MealService.instance) {
      MealService.instance = this;
    }

    return MealService.instance;
  }

  // Static method to get the singleton instance
  static getInstance() {
    if (!MealService.instance) {
      MealService.instance = new MealService();
    }

    return MealService.instance;
  }

  async getUser(forceRefresh = false) {
    if (this.#cache.userData && !forceRefresh) {
      return this.#cache.userData;
    }

    try {
      const response = await this.#axiosInstance.get(
        `${this.#base_url}/api/user/${localStorage.getItem("UUID")}`
      );
      const newUserData = response.data;
      this.#cache.userData = newUserData;
      this.notifyObservers(newUserData); // Notify observers
      return newUserData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMembers() {
    try {
      const data = await this.getUser();
      return data.members;
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }

  async getMeals() {
    try {
      const response = await this.#axiosInstance.get(
        `${this.#base_url}/meal_plans`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching meals:", error);
      throw error;
    }
  }

  async getMealsFilteredByMemberAllergies(memberId) {
    try {
      const members = await this.getMembers();
      const member = members.find((m) => m.id === memberId);
      if (!member) {
        return await this.getMeals();
      }

      const memberAllergies = new Set(
        member.allergies.map((allergy) => allergy.toLowerCase())
      );
      return (await this.getMeals()).filter((meal) => {
        const ingredients = meal.ingredients.map((ingredient) =>
          ingredient.toLowerCase()
        );
        return !ingredients.some((ingredient) =>
          memberAllergies.has(ingredient)
        );
      });
    } catch (error) {
      console.error("Error in getMealsFilteredByMemberAllergies:", error);
      throw error;
    }
  }

  async getMealById(mealId) {
    try {
      const meals = await this.getMeals();
      return meals.find((meal) => meal.id === mealId);
    } catch (error) {
      console.error("Error fetching meal by ID:", error);
      throw error;
    }
  }

  async ingredientAvailability(ingredients) {
    try {
      const userData = await this.getUser();

      const allItems = [
        ...userData.fridges.flatMap((fridge) => fridge.items),
        ...userData.freezers.flatMap((freezer) => freezer.items),
      ];

      return ingredients.every((ingredientName) =>
        allItems.some(
          (item) =>
            item.foodName &&
            item.foodName.toLowerCase() === ingredientName.toLowerCase() &&
            item.quantity >= 1
        )
      );
    } catch (error) {
      console.error("Error checking ingredient availability:", error);
      throw error;
    }
  }

  async updateItemQuantity(itemId, quantity, expiryDate, storageId) {
    const updatedItem = {
      itemID: itemId,
      quantity: quantity,
      expiryDate: expiryDate,
      id: storageId,
    };

    console.log(
      "Updating item:",
      updatedItem.itemID,
      updatedItem.quantity,
      updatedItem.expiryDate,
      updatedItem.id
    );

    try {
      const response = await axios.post(
        `${this.#base_url}/api/updateItem`,
        updatedItem
      );

      console.log(response.data);
      // Update the cached user data
      const updatedUserData = await this.getUser(true);
      this.#cache.userData = updatedUserData;
      return response.data;
    } catch (error) {
      console.error("Failed to update item:", error.response.data);
    }
  }

  async consumeMeal(meal, memberId) {
    if (!meal || !meal.ingredients || !memberId) {
      throw new Error("Meal data or Member ID is missing.");
    }

    const userData = await this.getUser();

    // Update ingredient quantities
    const updatePromises = meal.ingredients.map(async (ingredientName) => {
      let updated = false;

      for (const storageType of ["fridges", "freezers"]) {
        for (const storage of userData[storageType]) {
          const ingredient = storage.items.find(
            (item) =>
              item.foodName.toLowerCase() === ingredientName.toLowerCase()
          );

          if (ingredient && ingredient.quantity > 0) {
            const newQuantity = ingredient.quantity - 1;
            await this.updateItemQuantity(
              ingredient.itemID,
              newQuantity,
              ingredient.expiryDate,
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
    await this.recordMealConsumption(meal.id, memberId);

    // Update the cached user data
    const updatedUserData = await this.getUser(true);
    this.#cache.userData = updatedUserData;
  }

  async getMealsFilteredByMember(memberId) {
    try {
      const members = await this.getMembers();
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

      let meals = await this.getMeals();

      // Use Promise.all to wait for all the ingredientAvailability checks
      const mealsWithAvailability = await Promise.all(
        meals.map(async (meal) => {
          const mealIngredients = meal.ingredients.map((ingredient) =>
            ingredient.toLowerCase()
          );
          const hasAllergen = mealIngredients.some((ingredient) =>
            allergies.includes(ingredient)
          );
          const hasPreference = mealIngredients.some((ingredient) =>
            preferences.includes(ingredient)
          );
          const isReadyToEat = await this.ingredientAvailability(
            mealIngredients
          ); // Await the availability check

          return {
            ...meal,
            hasAllergen,
            hasPreference,
            isReadyToEat,
          };
        })
      );

      // Now filter the meals based on the computed properties
      let preferenceMeals = [];
      let readyToEatMeals = [];
      let ingredientsNeededMeals = [];

      mealsWithAvailability.forEach((meal) => {
        if (!meal.hasAllergen) {
          if (meal.hasPreference) {
            preferenceMeals.push(meal);
          }
          if (meal.isReadyToEat) {
            readyToEatMeals.push(meal);
          } else {
            ingredientsNeededMeals.push(meal);
          }
        }
      });

      // Map the meals to ensure they're fresh objects (if needed)
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
  }

  async recordMealConsumption(mealId, memberId) {
    const mealRecord = {
      memberId: memberId,
      mealId: mealId,
      recordedAt: new Date().toISOString(),
    };

    console.log(
      "Recording meal consumption:",
      mealRecord.mealId +
        " by " +
        mealRecord.memberId +
        " at " +
        mealRecord.recordedAt
    );

    try {
      const response = await this.#axiosInstance.post(
        `${this.#base_url}/api/mealRecords`,
        mealRecord,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Meal consumption recorded:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error recording meal consumption:", error);
      throw error;
    }
  }

  async checkIngredientsAvailabilityAfterConsumption(ingredients) {
    try {
      const availabilityResults = {};
      const availabilityPromises = ingredients.map((ingredient) =>
        this.ingredientAvailability([ingredient])
      );
      const availabilityArray = await Promise.all(availabilityPromises);
      ingredients.forEach((ingredient, index) => {
        availabilityResults[ingredient] = availabilityArray[index];
      });
      return availabilityResults;
    } catch (error) {
      console.error(
        "Error checking ingredient availability after consumption:",
        error
      );
      throw error;
    }
  }

  clearCache() {
    this.#cache.userData = null;
  }
}

// Export the singleton instance
const mealService = MealService.getInstance();
export default mealService;

class UserDataObserver {
  update(userData) {
    console.log("User data updated:", userData);
  }
}

// Create an observer instance
const userDataObserver = new UserDataObserver();

// Add the observer to the MealService
mealService.addObserver(userDataObserver);
