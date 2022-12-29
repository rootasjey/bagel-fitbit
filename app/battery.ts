import document from "document";
import { battery, charger } from "power";

const batteryIcon = document.getElementById("battery-icon");
const batteryLabel = document.getElementById("battery-label");

const _pathPrefix = "icons/battery/battery";

const updateUi = () => {
  if (!batteryIcon || !batteryLabel) {
    return;
  }

  batteryLabel.text = Math.floor(battery.chargeLevel) + "%";

  let iconHref = `${_pathPrefix}/battery-full.png`;

  if (battery.chargeLevel >= 70) {
    iconHref = `${_pathPrefix}-full.png`;
  } else if (battery.chargeLevel >= 30) {
    iconHref = `${_pathPrefix}-half.png`;
  } else {
    iconHref = `${_pathPrefix}-empty.png`;
  }
  
  if (battery.charging) {
    iconHref = `${_pathPrefix}-charging.png`;
  }

  (batteryIcon as ImageElement).href = iconHref;
  // (batteryIcon as ImageElement).style.fill = "red";
}

export const initBattery = () => {
  if (!batteryIcon || !batteryLabel) {
    return;
  }

  updateUi();
  battery.addEventListener("change", updateUi);
}

export const clean = () => {
  battery.removeEventListener("change", updateUi);
}
