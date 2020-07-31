var x = document.getElementById("demo");
let posi;
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}

function showPosition(position) {
  // console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
  posi = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;

  console.log("posi: ");
  console.log(posi);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // console.log("User denied the request for Geolocation.");
      posi = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      // console.log("Location information is unavailable.");
      posi = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      // console.log("The request to get user location timed out.");
      posi = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      // console.log("An unknown error occurred.");
      posi = "An unknown error occurred.";
      break;
  }

  console.log("posi: ");
  console.log(posi);
}
