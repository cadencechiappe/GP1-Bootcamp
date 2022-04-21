// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var dateInput = document.getElementById('datepicker').value
var locationInput = document.getElementById('location-picker').value

var breweryURL = "https://api.openbrewerydb.org/breweries?"
var weatherURL = "https://weatherdbi.herokuapp.com/data/weather/"



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
$(function(){
  $("#datepicker").datepicker({
    minDate: 0,
    maxDate: "+1M"
  });
  
});




