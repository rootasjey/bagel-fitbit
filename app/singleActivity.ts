import document from "document";
import { me as appbit } from "appbit";
import { today, goals, minuteHistory } from "user-activity";

const canUseActivities = appbit.permissions.granted("access_activity");
const hasElevationSensor = today.local.elevationGain !== undefined;

let currActivityIcon: Element | null;

const _pathPrefix = "icons/activities";

let currentActivityIndex = 0;

const goToNextActivity = () => {
  currentActivityIndex =  (currentActivityIndex + 1) % 5;
}

const updateSingleActivity = () => {
  switch (currentActivityIndex) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
  
    default:
      break;
  }
}
