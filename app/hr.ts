import { me as appbit } from "appbit";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";

const hrIcon = document.getElementById("hr-icon");
const hrLabel = document.getElementById("hr-label");
let hrm: HeartRateSensor;

const canUseHr = HeartRateSensor && appbit.permissions.granted("access_heart_rate");

export const initHr = () => {
  if (hrIcon) {
    hrIcon.style.fill = "red";
  }

  if (!canUseHr || !hrLabel) {
    return;
  }
  
  if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
      hrLabel.text = `${hrm.heartRate}`;
    });
    
    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      display.on ? hrm.start() : hrm.stop();

      if (!display.on && hrLabel) {
        hrLabel.text = "-";
      }
    });

    hrm.start();
  }  
}

if (BodyPresenceSensor && canUseHr) {
  const body = new BodyPresenceSensor();
  body.addEventListener("reading", () => {
    if (!body.present) {
      hrm?.stop();
      
      if (hrLabel) {
        hrLabel.text = "-";
      }
    } else {
      hrm?.start();
    }
  });

  body.start();
}
