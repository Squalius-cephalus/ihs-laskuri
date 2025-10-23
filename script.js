const carbsIn100g = document.getElementById("carbsIn100g");
const foodAmount = document.getElementById("foodAmount");
const unit = document.getElementById("unit");
const addToList = document.getElementById("addToList");
const result = document.getElementById("result");
const totalCarbs = document.getElementById("totalCarbs");
const insulineResistance = document.getElementById("insulineResistance");
const insulineNeed = document.getElementById("insulineNeed");
const calculateInsulineAmount = document.getElementById(
  "calculateInsulineAmount"
);
const carbsInput = document.getElementById("carbsInput");
const addCarbsButton = document.getElementById("addCarbsButton");
const carbsList = document.getElementById("carbsList");
const insulineAmount = document.getElementById("insulineAmount");
const clearCarbs = document.getElementById("clearCarbs");
const clearList = document.getElementById("clearList");

let currentCarbs = 0;
let totalCarb = 0;
let carbs = [];

addCarbsButton.addEventListener("click", () => {
  const value = carbsInput.value.trim();
  if (value === "") return;
toList(value);
});

addToList.addEventListener("click", () => {
  const value = currentCarbs;
  if (value === 0) return;

toList(value);
});

carbsInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
  const value = carbsInput.value.trim();
  if (value === 0) return;

toList(value);
  }
});


function toList(value){

  carbs.push(Number(value));
  carbsInput.value = "";
  renderList();
}

function renderList() {
  carbsList.innerHTML = "";
  carbs.forEach((num, index) => {
    const li = document.createElement("li");
    li.textContent = `${num} g`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Poista";
    delBtn.classList.add("deleteButton");
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

carbsIn100g.addEventListener("input", calculateCarbs);
foodAmount.addEventListener("input", calculateCarbs);
unit.addEventListener("input", calculateCarbs);

function calculateCarbs (){
  const in100g = parseFloat(carbsIn100g.value) || 0;
  const amount = parseFloat(foodAmount.value) || 0;
  if (unit.value === "gram") {
    currentCarbs = Math.round((in100g / 100) * amount);
  }
  if (unit.value === "kilo") {
    currentCarbs = Math.round((in100g / 100) * (amount * 1000));
  }

  result.textContent = `Hiilihydraatteja:  ${currentCarbs} g`;
}


calculateInsulineAmount.addEventListener("click", () => {
  
  const totalInsuline =
    totalCarb / (500 / insulineNeed.value / insulineResistance.value);
    if(totalInsuline == 0){
      insulineAmount.textContent = `Lista on tyhjä!`;
      return;
    }
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

// Maybe I should make just one button to clear fields etc, maybe.

clearList.addEventListener("click", () => {
  carbs = [];
  insulineAmount.textContent = `Ei laskettu`;
  renderList();
});

clearCarbs.addEventListener("click", () => {
  carbsIn100g.value = "";
  foodAmount.value = "";
  calculateCarbs();

});
