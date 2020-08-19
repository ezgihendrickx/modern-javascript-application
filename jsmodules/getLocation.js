import { calcLonLat } from "./calcLonLat.js";
let hereAPIKey = "HY42AIbJoZSVlGRz0Dn-eea-HjU-Kj1GWDLq3pp1GH4"; // heremaps for the location
export function getLocation(city) {
  document.getElementById("spinner").style.display = "block";
  fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apiKey=${hereAPIKey}` //getting the location of the city
  )
    .then((items) => {
      document.getElementById("spinner").style.display = "none";
      return items.json();
    })
    .then(calcLonLat);
  // console.log(calcLonLat());
}
