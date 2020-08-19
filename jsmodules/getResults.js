import { latitude, longitude } from "./calcLonLat.js";
import { displayResults } from "./displayResults.js";
const api = {
  key: "254457a64f43903cef73c88f6d1f45fa",
  base: "https://api.openweathermap.org/data/2.5/",
};
export function getResults(location) {
  // console.log(latitude);
  fetch(
    `${api.base}onecall?lat=${latitude}&lon=${longitude}&exlude=hourly&units=metric&APPID=${api.key}` //getting the weather
  )
    .then((weather) => {
      return weather.json(); //from json file
    })
    .then(displayResults);
}
