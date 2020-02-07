const currElem_one = document.getElementById("currency-one");
const currElem_two = document.getElementById("currency-two");
const amountElem_one = document.getElementById("amount-one");
const amountElem_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currency_one = currElem_one.value;
  const currency_two = currElem_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one}=${rate} ${currency_two}`;
      amountElem_two.value = (amountElem_one.value * rate).toFixed(2);
    });
}

//  Event listner
currElem_one.addEventListener("change", calculate);
currElem_two.addEventListener("change", calculate);
amountElem_one.addEventListener("input", calculate);
amountElem_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currElem_one.value;
  currElem_one.value = currElem_two.value;
  currElem_two.value = temp;
  calculate();
});
calculate();
