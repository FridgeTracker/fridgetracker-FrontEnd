import { useEffect, useState, useMemo, useCallback } from "react";
import mealService from "../../services/mealService";

class MealListObserver {
  constructor() {
    this.renderMealList = null;
  }

  setRenderMealList(renderFunction) {
    this.renderMealList = renderFunction;
  }

  update() {
    if (this.renderMealList) {
      this.renderMealList();
    }
  }
}

export const useMealListObserver = () => {
  const [, setRerender] = useState({});

  const renderMealList = useCallback(() => {
    setRerender({});
  }, []);

  const observer = useMemo(() => {
    const observerInstance = new MealListObserver();
    observerInstance.setRenderMealList(renderMealList);
    return observerInstance;
  }, [renderMealList]);

  useEffect(() => {
    mealService.addObserver(observer);
    return () => {
      mealService.removeObserver(observer);
    };
  }, [observer]);

  return observer;
};
