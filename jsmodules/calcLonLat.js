//import { searchbox } from "./setQuery.js";
import { getResults } from "./getResults.js";
const searchbox = document.querySelector(".search");
export let locationName = searchbox.value;
export let latitude;
export let longitude;
export function calcLonLat(items) {
  //check it out above link  line 2
  latitude = items.items[0].position.lat;
  longitude = items.items[0].position.lng;
  locationName = items.items[0].title;
  getResults(latitude, longitude);
}
