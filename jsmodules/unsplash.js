// if you press enter, it shows the photo as a background
//Display result import

export function changeBgColor() {
  let city = document.querySelector(".search").value;
  //   document.body.style.backgroundImage = "url('p.jpeg')";
  let unsplashKey = "u1lGkl3nzhoQIFKbEnt0hLcENfHDmq_-kMempCiJ3Xk";

  fetch(
    `https://unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}`
  ).then((photos) => {
    return photos.json();
  });
  // console.log(photos);
}
