import clock from "clock";
import document from "document";

import * as format from "../common/format";
import { initActivities } from "./activities";
import { initBattery } from "./battery";
import { initHr } from "./hr";
clock.granularity = "minutes"; // seconds, minutes, or hours

const clockLabel = document.getElementById("clock-label");

clock.addEventListener("tick", (evt) => {
  // tick every minute
  if (!clockLabel) { return; }
  
  const hours = format.zeroPad(evt.date.getHours());
  const minutes = format.zeroPad(evt.date.getMinutes());
  clockLabel.text = `${hours}:${minutes}`;
});

initHr();
initBattery();
// initActivities();
