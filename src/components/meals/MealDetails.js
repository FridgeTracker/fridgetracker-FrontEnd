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
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material/styles";

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

/*Simulated function; need to replace with actual availability check
const MealDetails = ({ meal, onGoBack }) => {
  const hasAllIngredientsAvailable = meal.ingredients.every((ingredient) =>
    ingredientAvailability(ingredient)
  );
  */
const MealDetails = ({ meal, onGoBack }) => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    const checkAvailability = async () => {
      const availabilityResults = {};
      for (const ingredient of meal.ingredients) {
        availabilityResults[ingredient] =
          await mealService.ingredientAvailability([ingredient]); // Assuming ingredientAvailability takes an array
      }
      setAvailability(availabilityResults);
    };

    checkAvailability();
  }, [meal.ingredients]);

  // Calculate if all ingredients are available
  const hasAllIngredientsAvailable = meal.ingredients.every(
    (ingredient) => availability[ingredient]
  );

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
                  <AvailabilityIndicator
                    available={availability[ingredient] || false}
                  />
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
              >
                Add to List
              </Button>
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

// Simulated function; need to replace with actual availability check
/*
const ingredientAvailability = (ingredient) => {
  // Simulated check; replace with actual availability check
  console.log(ingredient);
  return Math.random() > 0.3; // 70% chance of ingredient being available
};
*/

export default MealDetails;
