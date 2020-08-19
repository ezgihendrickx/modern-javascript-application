import { tempArray, dayArray } from "./jsmodules/displayResults.js";
var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: dayArray,
    datasets: [
      {
        label: "Ezgi's Chart",
        backgroundColor: "rgb(132, 99, 255)",
        borderColor: "rgb(132, 99, 255)",
        data: tempArray,
      },
    ],
  },

  // Configuration options go here
  options: {},
});
