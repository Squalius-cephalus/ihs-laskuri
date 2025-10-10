const carbsIn100g = document.getElementById("carbsIn100g");
const foodAmount = document.getElementById("foodAmount");
const unit = document.getElementById("unit");
const calculateCarbs = document.getElementById("calculateCarbs");
const addToList = document.getElementById("addToList");
const result = document.getElementById("result");
const sumList = document.getElementById("sumList");
const totalButton = document.getElementById("totalButton");
const totalCarbs = document.getElementById("totalCarbs");
const insulineResistance = document.getElementById("insulineResistance");
const insulineNeed = document.getElementById("insulineNeed");
const insulineAmount = document.getElementById("insulineAmount");
const calculateInsulineAmount = document.getElementById(
  "calculateInsulineAmount"
);

let currentCarbs = 0;
let totalCarb = 0;

calculateCarbs.addEventListener("click", () => {
  const in100g = parseFloat(carbsIn100g.value) || 0;
  const amount = parseFloat(foodAmount.value) || 0;
  if (unit.value === "gram") {
    currentCarbs = Math.round((in100g / 100) * amount);
  }
  if (unit.value === "kilo") {
    currentCarbs = Math.round((in100g / 100) * (amount * 1000));
  }

  result.textContent = `Yhteensä:  ${currentCarbs} g`;
});
// todo, tee sumlististä oma funktio :) 
addToList.addEventListener("click", () => {
  if (carbsIn100g.value || foodAmount.value) {
    sumList.value += `${currentCarbs}\n`;
    const lines = sumList.value.trim().split("\n");
    const numbers = lines
      .map((line) => parseFloat(line))
      .filter((num) => !isNaN(num));
    const total = numbers.reduce((a, b) => a + b, 0);
    totalCarb = total;
    totalCarbs.textContent = `Yhteensä: ${total} g`;
  }
});

sumList.addEventListener("input", () => {
  const lines = sumList.value.trim().split("\n");
  const numbers = lines
    .map((line) => parseFloat(line))
    .filter((num) => !isNaN(num));
  const total = numbers.reduce((a, b) => a + b, 0);
  totalCarbs.textContent = `Yhteensä: ${total} g`;
  totalCarb = total;
});

calculateInsulineAmount.addEventListener("click", () => {
  console.log(insulineNeed);
  const totalInsuline =
    totalCarb / (500 / insulineNeed.value / insulineResistance.value);
  insulineAmount.textContent = `${Math.round(totalInsuline)}`;
});

function saveUserData() {
  localStorage.setItem("insulineResistance", insulineResistance.value);
  localStorage.setItem("insulineNeed", insulineNeed.value);
}

insulineResistance.addEventListener("input", saveUserData);
insulineNeed.addEventListener("input", saveUserData);

window.addEventListener("load", () => {
  insulineResistance.value = localStorage.getItem("insulineResistance") || "";
  insulineNeed.value = localStorage.getItem("insulineNeed") || "";
});
