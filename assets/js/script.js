// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var instructions = document.getElementById("instructions")
var breweryContainer = document.getElementById('brewContainer')
var breweryInfo = document.getElementById('brewInfo')
var weatheryContainer = document.getElementById('weatherContainer')
var breweryURL = "https://api.openbrewerydb.org/breweries?"
var weatherURL = "https://weatherdbi.herokuapp.com/data/weather/"
var submitBtn = document.getElementById("submit-btn");
var locationInput = document.getElementById('location-picker').value
var invalidChars = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "\:", "\;", " < ", "=", " > ", " ? ", "@", "[", "\\", "]", " ^ ", "_", "`", "{", "|", "}", "~"];


function invalidInput () {
  instructions.style.display = "none"
  modal.style.display = "none"
  var locationInput = document.getElementById('location-picker').value
  if (!locationInput) {
  var emptyError = document.createElement('p')
  emptyError.textContent = "Please enter a location!"
  breweryContainer.append(emptyError)
  } else if (invalidChars.indexOf(locationInput) !== -1) {
    var invalidError = document.createElement('p')
    invalidError.textContent = "Invalid characters detected. Please enter your location again!"
    breweryContainer.append(invalidError)
  } else {
    breweryQueryString(); 
    weatherQueryString();
  }}

//retrieves user input and attaches it to url as a query string
function breweryQueryString () {
  instructions.style.display = "none"
  modal.style.display = "none"
  var locationInput = document.getElementById('location-picker').value
  console.log(typeof locationInput)
  if (!isNaN(locationInput)) {
  var locationSearchParam = breweryURL.concat("by_postal=");
  var locationURL =locationSearchParam.concat(locationInput);
  console.log(locationURL);
  }
  else {
   var locationSearchParam = breweryURL.concat("by_city=");
   var locationURL =locationSearchParam.concat(locationInput); 
   console.log(locationURL); 
  }
  fetch(locationURL)
  .then(function (response){
  return response.json();
  })
  .then(function (data) {
  for (var i = 0; i < data.length; i++) { 
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
    // var breweryData = [ data[i].name, data[i].phone, data[i].street, data[i].website_url]
    // for (var j=0; j< breweryData.length; j++){
    //   var dataText = document.createElement('p')
    //   dataText.textContent = breweryData[j]
    //   breweryContainer.append(dataText)
    // } 
  }
  })
};


//retrieves user input and attaches it to url as a query string
function weatherQueryString () {
  var locationInputWeather = document.getElementById('location-picker').value
  var locationURLWeather = weatherURL.concat(locationInputWeather)
  console.log(locationURLWeather)
fetch(locationURLWeather)
.then(res => res.json())
.then(function (data){
  var nextDays = data.next_days
  console.log(data)
  for (var i = 0; i < nextDays.length; i++){
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

    weatherMaxTemp.textContent = nextDays[i].max_temp.f
    hightemp.textContent = "High: " + weatherMaxTemp.textContent + "° F";
    hightemp.classList.add("weather-max-temp");

    weatherMinTemp.textContent = nextDays[i].min_temp.f
    lowtemp.textContent = "Low: " + weatherMinTemp.textContent + "° F";
    lowtemp.classList.add("weather-min-temp");

    weatherIcon.textContent = nextDays[i].iconURL
    weatherIcon.classList.add("weather-icon");

    weatheryContainer.append(weatherDay)
    weatheryContainer.append(weatherComment)
    weatheryContainer.append(hightemp)
    weatheryContainer.append(lowtemp)
    weatheryContainer.append(weatherIcon)

  }
})
};

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

