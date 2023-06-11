// call the elements 
var map = L.map('mapid').setView([51.505, 167.2], 13); 
const locations = document.getElementById("location");
const times = document.getElementById("time");
const isps = document.getElementById("isp");
const inputElement = document.getElementById("ip-input");
const validationMessageElement = document.getElementById("validation-message");
const submitButton = document.getElementById("submit-button");
const ip = document.getElementById("ip");
// this reg ex to validate the input 
const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
// ip address
var ipAddress = "192.212.174.101";
var ipifyApiKey = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_szq6m2u0VFInEaYnXApI2qXSVZ0Gl&ipAddress=8.8.8.8";

var apiUrl = 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_szq6m2u0VFInEaYnXApI2qXSVZ0Gl&ipAddress=8.8.8.8' + ipifyApiKey + '&ipAddress=' + ipAddress;

// send a request to the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // extract latitude and longitude coordinates from the geocoding response
    var lat = data.location.lat;
    var lon = data.location.lng;
    locations.innerHTML = data.location.city
    times.innerHTML = `UTC` + data.location.timezone
    isps.innerHTML = data.isp
    console.log(data)
    // create a marker for the IP location and add it to the map
    L.marker([lat, lon]).addTo(map)
      .bindPopup('This is the IP location: ' + data.location.city + ', ' + data.location.timezone)
      .openPopup();

    map.setView([lat, lon], 13);
  })
  .catch(error => console.error(error));
submitButton.addEventListener("click", () => {
  const inputValue = inputElement.value;
  if (ipRegex.test(inputValue)) {
    validationMessageElement.style.display = "none";
    inputElement.style.border = "2px solid green";

    var ipifyApiKey = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_szq6m2u0VFInEaYnXApI2qXSVZ0Gl&ipAddress=8.8.8.8";

    var ipAddress = inputElement.value;

    var apiUrl = 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_szq6m2u0VFInEaYnXApI2qXSVZ0Gl&ipAddress=8.8.8.8' + ipifyApiKey + '&ipAddress=' + ipAddress;

    // send a request to the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // extract latitude and longitude coordinates from the geocoding response
        var lat = data.location.lat;
        var lon = data.location.lng;
        locations.innerHTML = data.location.city
        times.innerHTML = `UTC` + data.location.timezone
        isps.innerHTML = data.isp
        ip.innerHTML = inputElement.value
        console.log(data)
        L.marker([lat, lon]).addTo(map)
          .bindPopup('This is the IP location: ' + data.location.city + ', ' + data.location.timezone)
          .openPopup();

        map.setView([lat, lon], 13);
      })
      .catch(error => console.error(error));

  } else {
    validationMessageElement.style.display = "inline";
    inputElement.style.border = "2px solid red";
  }
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
  .bindPopup('search ip')
  .openPopup();
