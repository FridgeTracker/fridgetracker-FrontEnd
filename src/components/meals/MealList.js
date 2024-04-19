import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  Pagination,
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import MealDetails from "./MealDetails"; // Adjust the import path as necessary

import mealService from "../../services/mealService"; // Adjust the import path as necessary

const MealList = ({userData}) => {

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMemberId, setSelectedMemberId] = useState(1); // Start with the first member
  const [mealsPerPage] = useState(8); // Adjust the number of items per page as needed
  const [members] = useState(userData.members);

  // Find the selected member's details using the selectedMemberId
  const selectedMember = members.find(
    (member) => member.id === selectedMemberId
  );

  useEffect(() => {
    mealService.getMeals().then(setMeals);
  }, []);

  useEffect(() => {
    mealService
      .getMealsFilteredByMemberAllergies(selectedMemberId)
      .then(setMeals);
  }, [selectedMemberId]);

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };

  const handleGoBack = () => {
    setSelectedMeal(null);
  };

  // Calculate the currently displayed meals
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Change page
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the total number of pages
  const pageCount = Math.ceil(meals.length / mealsPerPage);

  if (selectedMeal) {
    return (
      <Container>
        <MealDetails
          meal={selectedMeal}
          onGoBack={handleGoBack}
          memberName={selectedMember.name}
        />
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      {/* Horizontal list of member filters */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          sx={{
            ".MuiButton-root": {
              borderRadius: 0,
              color: "#1b8b60",
              "&.MuiButton-contained": {
                backgroundColor: "#1b8b60",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#15724e",
                },
              },
              "&:hover": {
                backgroundColor: "#1b8b60",
                color: "#fff",
                opacity: 0.8,
              },
            },
          }}
        >
          {members.map((member) => (
            <Button
              key={member.id}
              onClick={() => setSelectedMemberId(member.id)}
              variant={selectedMemberId === member.id ? "contained" : "text"}
            >
              {member.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Grid container spacing={4}>
        {currentMeals.map((meal) => (
          <Grid item key={meal.PlanID} xs={12} sm={6} md={4} lg={3}>
            <Card raised onClick={() => handleMealSelect(meal)}>
              <CardMedia
                component="img"
                height="194"
                image={
                  meal.Image ||
                  "https://hips.hearstapps.com/hmg-prod/images/kfc-nuggets-1-6421f3b4547e8.jpg"
                } // Ensure this points to a valid image or placeholder
                alt={meal.MealName}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{meal.MealName}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          paddingBottom: 3,
        }}
      >
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            ".MuiPaginationItem-root": {
              borderRadius: 0,
            },
            ".Mui-selected": {
              backgroundColor: "#1b8b60",
              "&:hover": {
                backgroundColor: "#15724e",
              },
            },
            ".MuiPaginationItem-ellipsis": {
              color: "text.secondary",
            },
            ".MuiButtonBase-root": {
              color: "#1b8b60",
              "&:hover": {
                backgroundColor: "#1b8b60",
                color: "#fff",
                opacity: 0.8,
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default MealList;
