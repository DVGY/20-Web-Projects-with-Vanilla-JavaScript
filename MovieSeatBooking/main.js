const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const clearSeats = document.querySelector(".btn");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value);
//Save selected movie index and price
populateUI();
//delete selectedSeats Index or Key
function deleteSelectedSeats() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  //   if (selectedSeats !== null && selectedSeats.length > 0) {
  //     seats.forEach((seat, index) => {
  //       if (selectedSeats.indexOf(index) > -1) {
  //         seat.classList.remove("selected");
  //       }
  //     });
  //   }
  localStorage.removeItem("selectedSeats");
  location.reload();
}
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMovieValue", moviePrice);
}
//update total and count
function updateSelectedCount() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = selectedSeat.length;

  const seatsIndex = [...selectedSeat].map(currSeat =>
    [...seats].indexOf(currSeat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}
//populate Ui

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//clear seat event
clearSeats.addEventListener("click", e => {
  deleteSelectedSeats();
});
//Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
//seat event listen
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
//upodate on page reload
updateSelectedCount();
