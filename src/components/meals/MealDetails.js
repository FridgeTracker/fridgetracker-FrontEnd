import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  List,
  ListItem,
  Typography,
  Grid,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const MealDetails = ({ meal, onGoBack, memberName }) => {
  // Define a reusable card container component for layout consistency
  const CardContainer = ({ children }) => (
    <Card sx={{ bgcolor: "background.paper", mb: 2, p: 2 }}>{children}</Card>
  );

  return (
    <Container>
      <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={onGoBack}
          sx={{ color: "text.primary", mb: 2 }}
        >
          {memberName}
        </Button>
      </Box>
      <Grid container spacing={4}>
        {/* Image and Meal Name */}
        <Grid item xs={12} md={6}>
          <CardContainer>
            <CardMedia
              component="img"
              image={meal.Image || "defaultMealImage.jpg"}
              alt={meal.MealName}
              sx={{ maxHeight: 300, objectFit: "contain", mb: 2 }}
            />
            <Typography variant="h4" component="div" gutterBottom>
              {meal.MealName}
            </Typography>
          </CardContainer>
        </Grid>

        {/* Ingredients List */}
        <Grid item xs={12} md={6}>
          <CardContainer>
            <Typography gutterBottom variant="h6" component="div">
              Ingredients
            </Typography>
            <List dense>
              {meal.Ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1b8b60",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "#15724e",
                  },
                }}
                startIcon={<AddShoppingCartIcon />}
              >
                Add to List
              </Button>
            </Box>
          </CardContainer>
        </Grid>

        {/* Nutrition Information */}
        <Grid item xs={12} md={6}>
          <CardContainer>
            <Typography gutterBottom variant="h6" component="div">
              Nutrition Information
            </Typography>
            <List dense>
              {Object.entries(meal.NutritionalInformation).map(
                ([key, value]) => (
                  <ListItem key={key}>{`${key}: ${value}`}</ListItem>
                )
              )}
            </List>
          </CardContainer>
        </Grid>

        {/* Preparation Method */}
        <Grid item xs={12} md={6}>
          <CardContainer>
            <Typography gutterBottom variant="h6" component="div">
              Method
            </Typography>
            <Typography variant="body1" paragraph>
              {meal.PreparationMethod}
            </Typography>
          </CardContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealDetails;
