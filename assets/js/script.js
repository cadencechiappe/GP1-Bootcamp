// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var breweryContainer = document.getElementById('brewContainer')
var breweryInfo = document.getElementById('brewInfo')



var breweryURL = "https://api.openbrewerydb.org/breweries?"
var weatherURL = "https://weatherdbi.herokuapp.com/data/weather/"

var submitBtn = document.getElementById("submit-btn");

//retrieves user input and attaches it to url as a query string
function breweryQueryString () {
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
    var breweryDataName = document.createElement('p')
    var breweryDataPhone = document.createElement('p')
    var breweryDataStreet = document.createElement('p')
    var breweryDataWebsite = document.createElement('p')
    breweryDataName.textContent = data[i].name
    breweryDataPhone.textContent = data[i].phone
    breweryDataStreet.textContent = data[i].street
    breweryDataWebsite.textContent = data[i].website_URL
    breweryContainer.append(breweryDataName)
    breweryDataName.append(breweryDataPhone)
    breweryDataPhone.append(breweryDataStreet)
    breweryDataStreet.append(breweryDataWebsite)

  }
  })
};


//retrieves user input and attaches it to url as a query string
function weatherQueryString () {
  var locationInputWeather = document.getElementById('location-picker').value
  var locationURLWeather = weatherURL.concat(locationInputWeather)
  console.log(locationURLWeather); 
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



// Datepicker 
//$(function(){
 // $("#datepicker").datepicker({
   // minDate: 0,
   // maxDate: "+1M"
  //});
  
//});




