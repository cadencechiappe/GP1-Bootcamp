// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




var breweryURL = "https://api.openbrewerydb.org/breweries?"
var weatherURL = "https://weatherdbi.herokuapp.com/data/weather/"

var submitBtn = document.getElementById("submit-btn");

//retrieves user input and attaches it to url as a query string
function breweryQueryString () {
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
};


//retrieves user input and attaches it to url as a query string
function weatherQueryString () {
  var locationInputWeather = document.getElementById('location-picker').value
  var locationURLWeather = weatherURL.concat(locationInputWeather)
  console.log(locationURLWeather)
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




