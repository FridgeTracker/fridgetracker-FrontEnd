// src/services/mealService.js

const members = [
  {
    id: 1,
    memberName: "Member 1",
    age: 25,
    allergies: ["chicken"],
  },
  {
    id: 2,
    memberName: "Member 2",
    age: 30,
    allergies: ["peanuts", "shellfish", "Bread"],
  },
  { id: 3, memberName: "Member 3", age: 28, allergies: [] },
  { id: 4, memberName: "Member 4", age: 22, allergies: ["gluten"] },
  { id: 5, memberName: "Member 5", age: 35, allergies: ["bee stings"] },
  { id: 6, memberName: "Member 6", age: 40, allergies: ["dairy", "soy"] },
];

let mockMeals = [
  {
    PlanID: 1,
    MealType: "Breakfast",
    MealName: "Roast Turkey",
    Image:
      "https://hips.hearstapps.com/hmg-prod/images/kfc-nuggets-1-6421f3b4547e8.jpg",
    NutritionalInformation: {
      Calories: "500",
      Protein: "42g",
      Carbs: "0g",
      Fat: "35g",
    },
    Ingredients: [
      "Whole chicken",
      "Extra-virgin olive oil",
      "Italian seasoning",
      "Kosher salt",
      "Freshly ground black pepper",
    ],
    PreparationMethod:
      "Preheat the oven to 425°F (220°C), place a baking rack in the lower ⅓ of the oven, and bring the chicken to room temperature. Pat the chicken dry with paper towels. Place the chicken breast side up in an oven-safe pan (I prefer cast iron). Truss the legs. Drizzle with oil and use your hands to rub it.",
  },
  {
    PlanID: 2,
    MealType: "Lunch",
    MealName: "Quinoa Salad",
    Image: "quinoa-salad.jpg",
    NutritionalInformation: {
      Calories: "350",
      Protein: "8g",
      Carbs: "45g",
      Fat: "15g",
    },
    Ingredients: [
      "Quinoa",
      "Cucumbers",
      "Cherry tomatoes",
      "Feta cheese",
      "Lemon vinaigrette",
    ],
    PreparationMethod:
      "Rinse quinoa under cold running water. Cook quinoa as directed on package. Allow to cool. Combine with diced cucumbers, cherry tomatoes, crumbled feta cheese, and dress with lemon vinaigrette.",
  },
  {
    PlanID: 3,
    MealType: "Dinner",
    MealName: "Grilled Salmon",
    Image: "grilled-salmon.jpg",
    NutritionalInformation: {
      Calories: "470",
      Protein: "50g",
      Carbs: "0g",
      Fat: "28g",
    },
    Ingredients: [
      "Salmon fillets",
      "Extra-virgin olive oil",
      "Lemon slices",
      "Dill",
      "Salt and pepper",
    ],
    PreparationMethod:
      "Preheat grill to medium-high heat. Brush salmon fillets with olive oil and season with salt and pepper. Grill skin-side down for 6-8 minutes. Flip over onto lemon slices and grill for an additional 3-4 minutes.",
  },
  {
    PlanID: 4,
    MealType: "Snack",
    MealName: "Greek Yogurt with Honey",
    Image: "greek-yogurt-honey.jpg",
    NutritionalInformation: {
      Calories: "180",
      Protein: "10g",
      Carbs: "24g",
      Fat: "6g",
    },
    Ingredients: ["Greek yogurt", "Honey", "Almond slices", "Blueberries"],
    PreparationMethod:
      "Spoon Greek yogurt into a bowl, drizzle with honey, and top with almond slices and blueberries.",
  },
  {
    PlanID: 5,
    MealType: "Breakfast",
    MealName: "Avocado Toast",
    Image: "avocado-toast.jpg",
    NutritionalInformation: {
      Calories: "320",
      Protein: "9g",
      Carbs: "30g",
      Fat: "20g",
    },
    Ingredients: [
      "Whole grain bread",
      "Ripe avocado",
      "Lemon juice",
      "Salt and pepper",
      "Red pepper flakes",
    ],
    PreparationMethod:
      "Toast whole grain bread to your liking. Mash ripe avocado with lemon juice, salt, and pepper. Spread on toast and sprinkle with red pepper flakes.",
  },
  {
    PlanID: 6,
    MealType: "Lunch",
    MealName: "Chicken Caesar Wrap",
    Image: "chicken-caesar-wrap.jpg",
    NutritionalInformation: {
      Calories: "560",
      Protein: "36g",
      Carbs: "40g",
      Fat: "30g",
    },
    Ingredients: [
      "Grilled chicken breast",
      "Romaine lettuce",
      "Caesar dressing",
      "Parmesan cheese",
      "Whole wheat wraps",
    ],
    PreparationMethod:
      "Chop grilled chicken breast and romaine lettuce. Toss with Caesar dressing and Parmesan cheese. Fill whole wheat wraps with the mixture and roll tightly.",
  },
  {
    PlanID: 7,
    MealType: "Dinner",
    MealName: "Beef Stir-Fry",
    Image: "beef-stir-fry.jpg",
    NutritionalInformation: {
      Calories: "610",
      Protein: "55g",
      Carbs: "20g",
      Fat: "35g",
    },
    Ingredients: [
      "Sliced beef",
      "Broccoli florets",
      "Carrot slices",
      "Soy sauce",
      "Ginger",
    ],
    PreparationMethod:
      "Heat a pan over high heat. Add sliced beef and vegetables. Stir-fry until beef is browned. Add soy sauce and ginger, cook for an additional minute.",
  },
  {
    PlanID: 8,
    MealType: "Snack",
    MealName: "Protein Smoothie",
    Image: "protein-smoothie.jpg",
    NutritionalInformation: {
      Calories: "220",
      Protein: "20g",
      Carbs: "18g",
      Fat: "8g",
    },
    Ingredients: [
      "Scoop of protein powder",
      "Almond milk",
      "Frozen berries",
      "Spinach",
      "Chia seeds",
    ],
    PreparationMethod:
      "Blend protein powder, almond milk, frozen berries, spinach, and chia seeds until smooth.",
  },
  {
    PlanID: 9,
    MealType: "Breakfast",
    MealName: "Omelette",
    Image: "omelette.jpg",
    NutritionalInformation: {
      Calories: "400",
      Protein: "22g",
      Carbs: "2g",
      Fat: "34g",
    },
    Ingredients: [
      "Eggs",
      "Milk",
      "Shredded cheese",
      "Diced tomatoes",
      "Spinach",
    ],
    PreparationMethod:
      "Whisk eggs and milk together. Pour into a heated skillet. Add cheese, tomatoes, and spinach before the eggs set. Fold omelette in half and cook until set.",
  },
  {
    PlanID: 10,
    MealType: "Dinner",
    MealName: "Pasta Primavera",
    Image: "pasta-primavera.jpg",
    NutritionalInformation: {
      Calories: "480",
      Protein: "15g",
      Carbs: "75g",
      Fat: "15g",
    },
    Ingredients: [
      "Pasta",
      "Assorted vegetables (zucchini, bell peppers, carrots)",
      "Olive oil",
      "Garlic",
      "Parmesan cheese",
    ],
    PreparationMethod:
      "Cook pasta according to package directions. Sauté vegetables in olive oil and garlic until tender. Toss cooked pasta with vegetables and top with Parmesan cheese.",
  },
];

const getMeals = async () => {
  return Promise.resolve(mockMeals);
};

const getMealsFilteredByMemberAllergies = (memberId) => {
  const member = members.find((m) => m.id === memberId);
  if (!member) return Promise.resolve(mockMeals); // If member not found, return all meals

  // Lowercase all member allergies for case-insensitive comparison
  const memberAllergies = member.allergies.map((allergy) =>
    allergy.toLowerCase()
  );

  // Filter meals where ingredients do not include any of the member's allergies
  const filteredMeals = mockMeals.filter((meal) => {
    return !meal.Ingredients.some((ingredient) =>
      memberAllergies.includes(ingredient.toLowerCase())
    );
  });

  return Promise.resolve(filteredMeals);
};

const getMealById = (planId) => {
  const meal = mockMeals.find((meal) => meal.PlanID === planId);
  return Promise.resolve(meal); // Wrapping in a promise to simulate async operation
};

// Update your mealService object to include the new function
const mealService = {
  members,
  getMeals,
  getMealsFilteredByMemberAllergies,
  getMealById, // Include the new function here
};

export default mealService;
