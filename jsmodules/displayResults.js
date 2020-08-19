import { locationName } from "./calcLonLat.js";
import { dateBuilder } from "./dateBuilder.js";
import { applyIcon } from "./applyIcon.js";
import { FORECAST } from "./setQuery.js";
export let tempArray;
export let dayArray;
import { myChart } from "../mychart.js";
//export let dayArray = new Array();
export function displayResults(weather) {
  //shows everything in HTML
  //   console.log(weather);
  let city = document.querySelector(".location .city");

  city.innerText = locationName;

  let now = new Date();
  // console.log(now);
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now); //show the date

  let temp = document.querySelector(".current .temp");
  // console.log(temp);
  temp.innerHTML = `${Math.round(weather.current.temp)}<span>°c</span>`; //get the temp from json

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.current.weather[0].main; //weather description
  let hilow = document.querySelector(".hi-low"); //feels like?
  hilow.innerText =
    "feels like " + Math.round(weather.current.feels_like) + "°c";
  tempArray = new Array();
  dayArray = new Array();
  weather.daily.forEach((day) => {
    //change this later 5 days, this loop gives me 1 week weatherforecast
    // console.log(day);
    let date = new Date(day.dt * 1000); //to get actual date from it you need to calc
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let name = days[date.getDay()];
    let dayBlock = document.createElement("div");

    dayArray.push(name);
    tempArray.push(day.temp.day);
    console.log(tempArray);
    console.log(dayArray);
    dayBlock.className = "forecast__item"; //for icons temp actions
    dayBlock.innerHTML = `<div class="forecast-item__heading">${name}</div>
          <div class="forecast-item__info"><i class="wi ${applyIcon(
            day.weather[0].icon
          )}"></i> <span class="degrees">${Math.round(
      day.temp.day
    )}<i class="wi wi-degrees"></i></span></div>`;
    FORECAST.appendChild(dayBlock); //puttin in the HTML
  });
  myChart();
}
