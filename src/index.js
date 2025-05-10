let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchbar");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}
