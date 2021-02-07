const searchInput = document.querySelector("#search-input");
const submit = document.querySelector("#submit");
const foods = document.querySelector("#meals");
const availResult = document.querySelector("#availResult")
const single_mealEl = document.querySelector("#single-meal");

//-------searchMeal function-----------
const searchMeal = event => {
  event.preventDefault();
  const foodName = searchInput.value;
  if (foodName.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)//---API----
      .then((response) => response.json())
      .then((data) => {
        availResult.innerHTML = `<h2 class="search-result">Search results for '${foodName}':</h2>`;
        if (data.meals === null || "") {
          availResult.innerHTML = `<p class="no-result">Not Meals found, please try anouther meal.</p>`;
        } else {
          foods.innerHTML = data.meals.map((meal) => `
          <div class="meal-area">
            <div onclick="showMealDitails('${meal.strMeal}')" class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="food-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3></div>
            </div> </div>`
          )
            .join("");
        }
      });
    searchInput.value = "";
  }
}
const showMealDitails = mealName => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`; //----API---
  fetch(url)
    .then(res => res.json())
    .then((data) => getMeals(data.meals[0]))
}

function getMeals(mealData) {
  const setMealDitails = document.querySelector('.showClickedMeal');
  setMealDitails.innerHTML = `
    <img src="${mealData.strMealThumb}"/>
    <h3>${mealData.strMeal}</h3>
    <h6>-Ingredients</h6>
    <ul>
      <li>${mealData.strCategory}</li>
      <li>${mealData.strArea}</li>
      <li>${mealData.strTags}</li>
      <li>${mealData.strIngredient1}</li>
      <li>${mealData.strIngredient2}</li>
      <li>${mealData.strIngredient3}</li>
      <li>${mealData.strIngredient4}</li>
    </ul>
  `
  setMealDitails.style.border = "1px solid #c7c7c7";
}
submit.addEventListener("submit", searchMeal);