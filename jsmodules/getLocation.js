export function getLocation(city) {
  fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apiKey=${hereAPIKey}` //getting the location of the city
  )
    .then((items) => {
      return items.json();
    })
    .then(calcLonLat);
  // console.log(calcLonLat());
}
