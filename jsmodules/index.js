import { getLocation } from "./getLocation.js";
import { calcLonLat } from "./calcLonLat.js";
import { setQuery } from "./setQuery.js";
import { getResults } from "./getResults.js";
import { displayResults } from "./displayResults.js";
import { dateBuilder } from "./dateBuilder.js";
import { applyIcon } from "./applyIcon.js";
import {
  api,
  FORECAST,
  searchbox,
  locationName,
  hereAPIKey,
  latitude,
  longitude,
} from "./setQuery.js";
searchbox.addEventListener("keypress", setQuery); //when you enter of this input this function
