const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionareBtn = document.getElementById("show-millionare");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = []; //array of data object

//fetch user

async function addRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}
// double user money{
function doubleUserMoney() {
  data = data.map(currentUser => {
    return { ...currentUser, money: currentUser.money * 2 };
  });
  updateDOM();
}
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function filterMillionare() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

///calcultae wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total money:&nbsp;<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
function addData(obj) {
  data.push(obj);
  updateDOM();
}
function updateDOM(provideData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  provideData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
//formatMoney
function formatMoney(money) {
  return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//Add event Listner

addUserBtn.addEventListener("click", addRandomUser);
doubleBtn.addEventListener("click", doubleUserMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionareBtn.addEventListener("click", filterMillionare);
calculateWealthBtn.addEventListener("click", calculateWealth);
