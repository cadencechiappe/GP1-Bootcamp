// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//setting global variables and grabbing HTML elements
var instructions = document.getElementById("instructions")
var breweryContainer = document.getElementById('brewContainer')
var breweryInfo = document.getElementById('brewInfo')
var weatheryContainer = document.getElementById('weatherContainer')
var breweryURL = "https://api.openbrewerydb.org/breweries?"
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
var submitBtn = document.getElementById("submit-btn");
var locationInput = document.getElementById('location-picker').value
var specialChars = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "\:", "\;", " < ", "=", " > ", " ? ", "@", "[", "\\", "]", " ^ ", "_", "`", "{", "|", "}", "~"];
var newLocationBtn = document.getElementById("newLocationBtn")
var apiKey = "126e4065d97fedad97742cdb5c363ca9"

// checks to see if input is bad before executing other functions
function checkInvalidInput () {
  btn.style.display = "none"
  instructions.style.display = "none"
  modal.style.display = "none"
  newLocationBtn.classList.remove('hide')
  var locationInput = document.getElementById('location-picker').value
  if (!locationInput) { // checks if there is no input
  var emptyError = document.createElement('p')
  emptyError.textContent = "Please enter a location!"
  breweryContainer.append(emptyError)
  } else if (specialChars.indexOf(locationInput) !== -1) { // checks for the presence of invalid characters
    var specialCharsError = document.createElement('p')
    specialCharsError.textContent = "Invalid characters detected! Please enter your location again."
    breweryContainer.append(specialCharsError)
  } else { // executes fetch API functions
    fetchBreweryData(); 
    fetchWeatherData();
  }}

// Brewery API function
function fetchBreweryData () { //retrieves user input and attaches it to url as a query string
  instructions.style.display = "none"
  modal.style.display = "none"
  var locationInput = document.getElementById('location-picker').value
  console.log(typeof locationInput)
  if (!isNaN(locationInput)) { // checks if input is a postal code
  var postalCodeParam = breweryURL.concat("by_postal=");
  var locationURL =postalCodeParam.concat(locationInput);
  console.log(locationURL);
  }
  else { // checks if input is a city
   var cityParam = breweryURL.concat("by_city=");
   var locationURL = cityParam.concat(locationInput); 
   console.log(locationURL); 
  }
  fetch(locationURL) // fetches data from API
  .then(function (response){
  return response.json();
  })
  .then(function (data) {
  for (var i = 0; i < data.length; i++) { // displays data on the page
    var breweryName = document.createElement('p')
    breweryName.textContent = data[i].name 
    breweryName.classList.add('breweryName')

    var breweryDataUL = document.createElement('ul')

    var breweryStreet = document.createElement('li')
    breweryStreet.textContent = data[i].street 
    breweryStreet.classList.add('breweryStreet')

    var breweryPhone = document.createElement('li')
    breweryPhone.textContent = data[i].phone
    breweryPhone.classList.add('breweryPhone')

    var breweryWebsite = document.createElement('a', 'li')
    breweryWebsite.textContent = data[i].website_url 
    breweryWebsite.classList.add('breweryWebsite')
    breweryWebsite.href = data[i].website_url
    breweryWebsite.setAttribute("target", "_blank")

    breweryContainer.append(breweryName)
    breweryName.append(breweryDataUL)
    breweryDataUL.append(breweryStreet, breweryPhone, breweryWebsite)
  }
  ; if (data.length === 0) { // checks to see if there are no breweries in the given area
    var noBrewery = document.createElement('p')
    var sadFace = '\u{1F622}'
    noBrewery.textContent = "There are no breweries in this area! " + sadFace + " Please enter another location."
    breweryContainer.append(noBrewery) // displays message on page
  }
  })
};


// weather API function
function fetchWeatherData () { //retrieves user input and attaches it to url as a query string
  var locationInputWeather = document.getElementById('location-picker').value 
  var locationURLWeather = weatherURL.concat(locationInputWeather) + "&Appid=" + apiKey + "&units=imperial"
  console.log(locationURLWeather)
fetch(locationURLWeather) // fetches data from API
.then(res => res.json())
.then(function (data){
  var forecast = data.main
  var icon = data.weather[0].icon
  console.log(data)
    var weatherDate = document.createElement('p')
    var weatherCurrentTemp = document.createElement('p')
    var weatherHumidity = document.createElement('p')
    var weatherMaxTemp = document.createElement('p')
    var weatherMinTemp = document.createElement('p')
    var weatherIcon = document.createElement('img')
    
    weatherDate.textContent = moment().format("dddd, MMMM Do")
    weatherDate.classList.add("weather-date")

    weatherCurrentTemp.textContent = "Current Temp: " + forecast.temp
    weatherCurrentTemp.classList.add("weather-current-temp");
    weatherHumidity.textContent = "Humidity: " + forecast.humidity
    weatherHumidity.classList.add("weather-humidity");

    weatherMaxTemp.textContent =  "High: " + forecast.temp_max + "° F"
    weatherMaxTemp.classList.add("weather-max-temp");

    weatherMinTemp.textContent = "Low: " + forecast.temp_min + "° F"
    weatherMinTemp.classList.add("weather-min-temp");

    var iconURL = "https://openweathermap.org/img/wn/"
    iconimport = iconURL.concat(icon)
    weatherIcon.setAttribute("src" , iconimport+".png")
    weatherIcon.classList.add("weather-icon");

    weatheryContainer.append(weatherDate, weatherCurrentTemp, weatherHumidity, weatherMaxTemp, weatherMinTemp)
   weatheryContainer.append(weatherIcon)

})
};

newLocationBtn.onclick=function(){
  window.location.reload()
}

//When the User clicks on <btn>, opens the modal
btn.onclick = function() {
  modal.classList.remove('hide')
  modal.style.display = "block";
}

// hides modal on page load
window.onload = function() {
  modal.classList.add('hide')
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

//When the user clicks outside the open modal, close the modal
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

localStorage.setItem('https://code.jquery.com/jquery-1.12.4.js', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js');

