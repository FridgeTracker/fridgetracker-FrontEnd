import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Box,
  Pagination,
  Select,
  MenuItem,
  Avatar,
  ListItemIcon,
  InputLabel,
} from "@mui/material";
import MealDetails from "./MealDetails";
import mealService from "../../services/mealService";
import MealCard from "./MealCard"; 

const MealList = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [members] = useState(mealService.members);

  const [preferenceMeals, setPreferenceMeals] = useState([]);
  const [readyToEatMeals, setReadyToEatMeals] = useState([]);
  const [ingredientsNeededMeals, setIngredientsNeededMeals] = useState([]);

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const mealsPerPage = 8;

  const allMeals = [
    ...preferenceMeals,
    ...readyToEatMeals,
    ...ingredientsNeededMeals,
  ];
  const filteredMeals =
    filter === "preference"
      ? preferenceMeals
      : filter === "ready"
      ? readyToEatMeals
      : filter === "needed"
      ? ingredientsNeededMeals
      : allMeals;

  const pageCount = Math.ceil(filteredMeals.length / mealsPerPage);
  const paginatedMeals = filteredMeals.slice(
    (page - 1) * mealsPerPage,
    page * mealsPerPage
  );

  useEffect(() => {
    if (selectedMemberId) {
      mealService
        .getMealsFilteredByMember(selectedMemberId)
        .then((categorizedMeals) => {
          // Assign a new unique identifier for each meal
          const updatedPreferenceMeals = categorizedMeals.preferenceMeals.map(
            (meal) => ({
              ...meal,
              uniqueKey: `${meal.id}-${Date.now()}`,
            })
          );
          const updatedReadyToEatMeals = categorizedMeals.readyToEatMeals.map(
            (meal) => ({
              ...meal,
              uniqueKey: `${meal.id}-${Date.now()}`,
            })
          );
          const updatedIngredientsNeededMeals =
            categorizedMeals.ingredientsNeededMeals.map((meal) => ({
              ...meal,
              uniqueKey: `${meal.id}-${Date.now()}`,
            }));

          setPreferenceMeals(updatedPreferenceMeals);
          setReadyToEatMeals(updatedReadyToEatMeals);
          setIngredientsNeededMeals(updatedIngredientsNeededMeals);
        });
    } else {
      setPreferenceMeals([]);
      setReadyToEatMeals([]);
      setIngredientsNeededMeals([]);
    }
  }, [selectedMemberId]);

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };

  const handleGoBack = () => {
    setSelectedMeal(null); // Deselect the meal and go back to the list
  };

  if (selectedMeal) {
    return (
      <MealDetails
        meal={selectedMeal}
        onGoBack={handleGoBack}
        memberName={
          members.find((member) => member.id === selectedMemberId)?.name ||
          "Back to List"
        }
      />
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ mb: 2, p: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="member-select-label">Select Member</InputLabel>
          <Select
            labelId="member-select-label"
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            displayEmpty
            label="Select Member" 
            renderValue={(selected) => {
              if (selected) {
                const member = members.find((m) => m.id === selected);
                return (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {member.imageURL && (
                      <Avatar
                        src={member.imageURL}
                        sx={{ width: 24, height: 24, marginRight: 1 }}
                      />
                    )}
                    {member.name}
                  </Box>
                );
              }
              return <em>None</em>;
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {members.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                <ListItemIcon>
                  <Avatar
                    src={member.imageURL}
                    sx={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Filter Meals</FormLabel>
          <RadioGroup
            row
            aria-label="meal-filter"
            name="row-radio-buttons-group"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1); 
            }}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="preference"
              control={<Radio />}
              label="Preferences"
            />
            <FormControlLabel
              value="ready"
              control={<Radio />}
              label="Ready to Eat"
            />
            <FormControlLabel
              value="needed"
              control={<Radio />}
              label="Ingredients Needed"
            />
          </RadioGroup>
        </FormControl>
      </Paper>

      <Typography variant="h4" gutterBottom>
        {filter.charAt(0).toUpperCase() + filter.slice(1)} Meals
      </Typography>
      <Grid container spacing={4}>
        {paginatedMeals.map((meal, index) => (
          <MealCard
            key={`${filter}-meal-${meal.id}-page-${page}-index-${index}`}
            meal={meal}
            onSelect={handleMealSelect}
          />
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          pb: 3,
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          sx={{ ".MuiPaginationItem-root": { borderRadius: 0 } }}
        />
      </Box>
    </Container>
  );
};

export default MealList;
