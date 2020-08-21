// if you press enter, it shows the photo as a background
//Display result import

export function changeBgColor() {
  let city = document.querySelector(".search").value;

  let unsplashKey = "u1lGkl3nzhoQIFKbEnt0hLcENfHDmq_-kMempCiJ3Xk";

  fetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}`
  )
    .then((photos) => {
      return photos.json();
    })
    .then(displayImage);
}

function displayImage(photos) {
  console.log(photos);
  let photoURL = photos.results[4].urls.regular;
  let fullURL = `url('${photoURL}')`;
  //console.log(photoURL);
  //console.log(fullURL);
  document.body.style.backgroundImage = fullURL; // if you do styling in JS just use 1 var or text don't combine things
}
