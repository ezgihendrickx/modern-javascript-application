export function calcLonLat(items) {
  //check it out above link  line 2
  latitude = items.items[0].position.lat;
  longitude = items.items[0].position.lng;
  locationName = items.items[0].title;
  getResults(latitude, longitude);
}
