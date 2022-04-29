//setting global variables and grabbing HTML elements
var instructions = document.getElementById("instructions")
var breweryContainer = document.getElementById('brewContainer')
var breweryInfo = document.getElementById('brewInfo')
var weatheryContainer = document.getElementById('weatherContainer') 
var submitBtn = document.getElementById("submit-btn");
var locationInput = document.getElementById('location-picker').value
var newLocationBtn = document.getElementById("newLocationBtn")
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
var btn = document.getElementById("myBtn"); // Get the button that opens the modal
var modal = document.getElementById("myModal"); // Get the modal

//URLs for side server APIs
var breweryURL = "https://api.openbrewerydb.org/breweries?"
var weatherURL = "https://weatherdbi.herokuapp.com/data/weather/"

//input characters that are invalid
var specialChars = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "\:", "\;", " < ", "=", " > ", " ? ", "@", "[", "\\", "]", " ^ ", "_", "`", "{", "|", "}", "~"];

// retrieves the location from local storage on page load
localStorage.getItem ('location-picker')
document.getElementById("location-picker").placeholder = "Ex: Austin or 78702";

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
  if (!isNaN(locationInput)) { // checks if input is a postal code
  var postalCodeParam = breweryURL.concat("by_postal=");
  var locationURL =postalCodeParam.concat(locationInput);
  }
  else { // checks if input is a city
   var cityParam = breweryURL.concat("by_city=");
   var locationURL = cityParam.concat(locationInput);   
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
  ; if (data.length === 0) { // checks if there are no breweries in the given area
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
  var locationURLWeather = weatherURL.concat(locationInputWeather)
  window.localStorage.setItem('location', locationInputWeather)
fetch(locationURLWeather) // fetches data from API
.then(res => res.json())
.then(function (data){
  var nextDays = data.next_days
  for (var i = 0; i < nextDays.length; i++){ // displays data on the page
    var weatherDay = document.createElement('p')
    var weatherComment = document.createElement('p')
    var weatherMaxTemp = document.createElement('p')
    var weatherMinTemp = document.createElement('p')
    var weatherIcon = document.createElement('img')
    var hightemp = document.createElement('p')
    var lowtemp = document.createElement('p')

    weatherDay.textContent = nextDays[i].day
    weatherDay.classList.add("weather-day");
    weatherComment.textContent = nextDays[i].comment
    weatherComment.classList.add("weather-comment");

    weatherMaxTemp.textContent = "High: " + nextDays[i].max_temp.f + "° F";
    weatherMaxTemp.classList.add("weather-max-temp");

    weatherMinTemp.textContent = "Low: " + nextDays[i].min_temp.f + "° F";
    weatherMinTemp.classList.add("weather-min-temp");

    weatherIcon.setAttribute("src" , nextDays[i].iconURL)
    weatherIcon.classList.add("weather-icon");

    weatheryContainer.append(weatherDay, weatherComment, weatherMaxTemp, weatherMinTemp, weatherIcon)
  }
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