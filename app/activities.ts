import document from "document";
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

const canUseActivities = appbit.permissions.granted("access_activity");
const hasElevationSensor = today.local.elevationGain !== undefined;

let currActivityIcon: Element | null;

let caloriesIcon: Element | null;
let stepsIcon: Element | null;
let distanceIcon: Element | null;
let activeMinIcon: Element | null;

const _pathPrefix = "icons/activities";

const updateActiveMinutes = () => {
  const todayActiveMin = today.adjusted.activeZoneMinutes;
  const goalActiveMinutes = goals.activeZoneMinutes;

  if (!todayActiveMin || !goalActiveMinutes) {
    return;
  }

  if (!activeMinIcon) { 
    return; 
  }

  const reached = todayActiveMin.total >= goalActiveMinutes.total;

  (activeMinIcon as ImageElement).href = reached 
    ? `${_pathPrefix}/active-minutes-fill.png` 
    : `${_pathPrefix}/active-minutes-line.png`;
}

const updatCalories = () => {
  const todayCalories = today.adjusted.calories;
  const goalCalories = goals.calories;

  if (!todayCalories || !goalCalories) {
    return;
  }

  const reached = todayCalories >= goalCalories;

  (activeMinIcon as ImageElement).href = reached 
    ? `${_pathPrefix}/calories-fill.png` 
    : `${_pathPrefix}/calories-line.png`;
}

const updatDistance = () => {
  const todayDistance = today.adjusted.distance;
  const goalDistance = goals.distance;

  if (!todayDistance || !goalDistance) {
    return;
  }

  const reached = todayDistance >= goalDistance;

  (activeMinIcon as ImageElement).href = reached 
    ? `${_pathPrefix}/distance-fill.png` 
    : `${_pathPrefix}/distance-line.png`;
}

const updatSteps = () => {
  const todaySteps = today.adjusted.steps;
  const goalSteps = goals.steps;

  if (!todaySteps || !goalSteps) {
    return;
  }

  const reached = todaySteps >= goalSteps;

  (activeMinIcon as ImageElement).href = reached 
    ? `${_pathPrefix}/steps-fill.png` 
    : `${_pathPrefix}/steps-line.png`;
}

const updateAllGoals = () => {
  updateActiveMinutes();
  updatCalories();
  updatDistance();
  updatSteps();
}

const initAllVar = () => {
  caloriesIcon = document.getElementById("calories-icon");
  stepsIcon = document.getElementById("steps-icon");
  distanceIcon = document.getElementById("distance-icon");
  activeMinIcon = document.getElementById("active-icon");
}

const onReachGoal = (event) => {
  updateAllGoals();
}

export const initActivities = () => {

  if (!canUseActivities) {
    return;
  }

  initAllVar();
  updateAllGoals();

  goals.addEventListener("reachgoal", onReachGoal)
}

export const cleanActivities = () => {
  goals.removeEventListener("reachgoal", onReachGoal);
}
