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
const carbsInputField = document.getElementById("carbsInput");
const addCarbsButton = document.getElementById("addCarbsButton");
const carbsList = document.getElementById("carbsList");
const summa = document.getElementById("insulineAmount");
const clearCarbs = document.getElementById("clearCarbs");
const clearList = document.getElementById("clearList");
let currentCarbs = 0;
let totalCarb = 0;
let carbs = [];

addCarbsButton.addEventListener("click", () => {
  const value = carbsInputField.value.trim();
  if (value === "") return;

  carbs.push(Number(value));
  carbsInputField.value = "";
  renderList();
});

clearList.addEventListener("click", () => {
  carbs = [];
  renderList();
});

clearCarbs.addEventListener("click", () => {
  carbsIn100g.value = "";
  foodAmount.value = "";
});




function renderList() {
  carbsList.innerHTML = "";
  carbs.forEach((num, index) => {
    const li = document.createElement("li");
    li.textContent = `${num} g`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Poista";
    delBtn.classList.add("delete-btn");
    delBtn.onclick = () => {
      carbs.splice(index, 1);
      renderList();
    };

    li.appendChild(delBtn);
    carbsList.appendChild(li);
  });

  let sum = 0;
  for (let i = 0; i < carbs.length; i++) {
    sum += carbs[i];
  }

  totalCarbs.textContent = `Yhteensä: ${sum} g`;
  totalCarb = sum;
}

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

addToList.addEventListener("click", () => {

  const value = currentCarbs;
  if (value === 0) return;

  carbs.push(Number(value));
  carbsInputField.value = "";
  renderList();
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

insulineResistance.addEventListener("carbInput", saveUserData);
insulineNeed.addEventListener("carbInput", saveUserData);

window.addEventListener("load", () => {
  insulineResistance.value = localStorage.getItem("insulineResistance") || "";
  insulineNeed.value = localStorage.getItem("insulineNeed") || "";
});
