import React, { useState, useEffect } from "react";
import mealService from "../../services/mealService";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  List,
  Typography,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material/styles";
import { getUser } from "../Requests/getRequest";
import { addItemRequest } from "../Requests/postRequests";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 400,
  width: 400,
  borderRadius: "50%",
  margin: "0 auto",
}));

const MealTitle = styled(Typography)(({ theme }) => ({
  backgroundColor: "#1b8b60",
  color: "#fff",
  padding: theme.spacing(1),
  textAlign: "right",
}));

const IngredientsList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  alignItems: "flex-end",
}));

const AvailabilityIndicator = styled("span")(({ theme, available }) => ({
  height: "15px",
  width: "15px",
  borderRadius: "50%",
  display: "inline-block",
  marginLeft: theme.spacing(1),
  backgroundColor: available
    ? theme.palette.success.main
    : theme.palette.error.main,
}));

const IngredientItem = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "8px",
});

const NutritionInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  lineHeight: "2",
  justifyContent: "space-between",
  borderTop: "1px solid #ccc",
  borderBottom: "1px solid #ccc",
  "& > div": {
    borderRight: "1px solid #ccc",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:last-child": {
      borderRight: "none",
    },
  },
}));

const NutritionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const MealDetails = ({ meal, onGoBack, refreshMeals, memberId }) => {
  const [availability, setAvailability] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = async (list) => {
    meal.ingredients.forEach((element) => {
      const itemToAdd = {
        foodName: element,
        quantity: 1,
        id: list.id,
      };
      addItemRequest(itemToAdd);
    });

    handleClose();
  };

  useEffect(() => {
    const checkAvailability = async () => {
      const availabilityResults = {};
      try {
        setUser(await getUser());
        const availabilityPromises = meal.ingredients.map((ingredient) =>
          mealService.ingredientAvailability([ingredient])
        );
        const availabilityArray = await Promise.all(availabilityPromises);
        meal.ingredients.forEach((ingredient, index) => {
          availabilityResults[ingredient] = availabilityArray[index];
        });
        setAvailability(availabilityResults);
      } catch (error) {
        console.error("Error checking availability:", error);
      }
    };

    checkAvailability();
  }, [meal.ingredients, refreshMeals]);

  const handleConsumeMeal = async () => {
    try {
      await mealService.consumeMeal(meal, memberId);
      await updateAvailabilityAfterConsumption(meal);

      if (refreshMeals) {
        refreshMeals();
      }

      console.log("Meal consumed successfully.");
    } catch (error) {
      console.error("Failed to consume meal:", error);
    }
  };

  const updateAvailabilityAfterConsumption = async (consumedMeal) => {
    const availabilityResults = {};
    const availabilityPromises = consumedMeal.ingredients.map((ingredient) =>
      mealService.ingredientAvailability([ingredient])
    );
    const availabilityArray = await Promise.all(availabilityPromises);
    consumedMeal.ingredients.forEach((ingredient, index) => {
      availabilityResults[ingredient] = availabilityArray[index];
    });
    setAvailability(availabilityResults);
  };

  const hasAllIngredientsAvailable = Object.values(availability).every(Boolean);
  return (
    <Container sx={{ maxWidth: "none" }}>
      <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={onGoBack}
          sx={{ color: "text.primary", mb: 2 }}
        >
          Back to Meals
        </Button>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ flexWrap: "nowrap", alignContent: "center" }}
      >
        <Grid item xs={12} md={4}>
          <StyledCard>
            <MealTitle variant="h4" component="div" gutterBottom>
              {meal.mealName}
            </MealTitle>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"right"}
            >
              {meal.description}
            </Typography>
            <IngredientsList>
              {meal.ingredients.map((ingredient, index) => (
                <IngredientItem key={index}>
                  <Typography variant="body1">{ingredient}</Typography>
                  <AvailabilityIndicator available={availability[ingredient]} />
                </IngredientItem>
              ))}
            </IngredientsList>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                disabled={hasAllIngredientsAvailable}
                sx={{
                  backgroundColor: hasAllIngredientsAvailable
                    ? "rgba(0, 0, 0, 0.12)"
                    : "#1b8b60",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: hasAllIngredientsAvailable
                      ? "rgba(0, 0, 0, 0.12)"
                      : "#15724e",
                  },
                }}
                onClick={handleClick}
              >
                Add to List
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user &&
                  user.shoppingLists.map((list) => (
                    <MenuItem onClick={() => handleMenuItemClick(list)}>
                      {list.storageName}
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4.5}>
          <StyledCard>
            <StyledCardMedia
              component="img"
              image={meal.mealImage || "defaultMealImage.jpg"}
              alt={meal.mealName}
            />
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ color: "#1b8b60" }}
            >
              Nutritional Facts
            </Typography>
            <NutritionInfo>
              <div>
                <NutritionLabel>Fat:</NutritionLabel>
                <Typography>
                  {meal.nutritionalInformation?.Fat || "N/A"}
                </Typography>
              </div>
              <div>
                <NutritionLabel>Calories:</NutritionLabel>
                <Typography>
                  {meal.nutritionalInformation?.Calories || "N/A"}
                </Typography>
              </div>
              <div>
                <NutritionLabel>Protein:</NutritionLabel>
                <Typography>
                  {meal.nutritionalInformation?.Protein || "N/A"}
                </Typography>
              </div>
            </NutritionInfo>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleConsumeMeal}
                disabled={!hasAllIngredientsAvailable}
                sx={{
                  backgroundColor: !hasAllIngredientsAvailable
                    ? "rgba(0, 0, 0, 0.12)"
                    : "#1b8b60",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: !hasAllIngredientsAvailable
                      ? "rgba(0, 0, 0, 0.12)"
                      : "#15724e",
                  },
                }}
              >
                Consume
              </Button>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealDetails;
