import React, { useEffect, useState } from "react";
import {
  Container,
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
  const [members, setMembers] = useState([]);

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
    // Fetch members when the component mounts
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await mealService.getMembers();
        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setMembers([]); // Set to an empty array in case of error
      }
    };

    fetchMembers();
  }, []);

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

  const updateMealsState = (categorizedMeals) => {
    // Assuming categorizedMeals object contains arrays for each meal category
    setPreferenceMeals(
      categorizedMeals.preferenceMeals.map((meal) => ({
        ...meal,
        uniqueKey: `${meal.id}-${Date.now()}`, // Assign new keys to force re-render
      }))
    );
    setReadyToEatMeals(
      categorizedMeals.readyToEatMeals.map((meal) => ({
        ...meal,
        uniqueKey: `${meal.id}-${Date.now()}`,
      }))
    );
    setIngredientsNeededMeals(
      categorizedMeals.ingredientsNeededMeals.map((meal) => ({
        ...meal,
        uniqueKey: `${meal.id}-${Date.now()}`,
      }))
    );
  };

  const fetchMeals = async () => {
    try {
      const categorizedMeals = await mealService.getMealsFilteredByMember(
        selectedMemberId
      );
      updateMealsState(categorizedMeals); // Update the state with the new meals
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      setPreferenceMeals([]);
      setReadyToEatMeals([]);
      setIngredientsNeededMeals([]);
    }
  };

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };

  const handleGoBack = () => {
    setSelectedMeal(null); // Deselect the meal and go back to the list
  };

  if (selectedMeal) {
    console.log(selectedMemberId);
    return (
      <MealDetails
        meal={selectedMeal}
        onGoBack={handleGoBack}
        memberName={
          members.find((member) => member.id === selectedMemberId)?.name ||
          "Back to List"
        }
        refreshMeals={fetchMeals} // Pass the fetchMeals function as a prop
        memberId={selectedMemberId}
      />
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ mb: 2, p: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="member-select-label" size="small">
                Select Member
              </InputLabel>
              <Select
                size="small"
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
                            src={require(`../assets/memberIcons/${member.imageURL}`)}
                            sx={{ width: 24, height: 24, marginRight: 1 }}
                          />
                        )}
                        {member.name}
                      </Box>
                    );
                  }
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {members && members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    <ListItemIcon>
                      <Avatar
                        src={require(`../assets/memberIcons/${member.imageURL}`)}
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" size="small">
                Filter Meals
              </FormLabel>
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
          </Grid>
        </Grid>
      </Paper>

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
