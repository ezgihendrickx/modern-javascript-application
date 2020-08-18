export function getResults(location) {
  console.log(latitude);
  fetch(
    `${api.base}onecall?lat=${latitude}&lon=${longitude}&exlude=hourly&units=metric&APPID=${api.key}` //getting the weather
  )
    .then((weather) => {
      return weather.json(); //from json file
    })
    .then(displayResults);
}
