import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import mealService from "../../services/mealService";

const MealCard = ({ meal, onSelect }) => {
  const isReadyToEat = mealService.ingredientAvailability(meal.ingredients);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card raised onClick={() => onSelect(meal)}>
        <CardMedia
          component="img"
          height="194"
          image={meal.mealImage}
          alt={meal.mealName}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6">{meal.mealName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {isReadyToEat ? "Ready to Eat" : "Ingredients Needed"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MealCard;
