export { FORECAST, searchbox };
import { getLocation } from "./getLocation.js";

const FORECAST = document.getElementsByClassName("component__forecast-box")[0]; // <div class="component__forecast-box"></div> getting this from HTML
const searchbox = document.querySelector(".search");

export function setQuery(evt) {
  //if you press the enter
  if (evt.keyCode == 13) {
    FORECAST.innerHTML = ""; //empty the html forecast table

    getLocation(searchbox.value); // check line 7 for that
    // console.log(searchbox.value);
  }
}
