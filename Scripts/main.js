"use strict";

// ====== //
// Shared //
// ====== //
let nameRegex = /^[a-zA-Z]{5,}$/;
let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
let phoneNumberRegex = /^(010|011|012|015)[0-9]{8}$/;
let AgeRegex = /^([1-9]|[1-9][0-9]|100)$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let userName = document.querySelector(`#name`);
let userEmail = document.querySelector(`#email`);
let userPhone = document.querySelector(`#phoneNumber`);
let userAge = document.querySelector(`#age`);
let userPassword = document.querySelector(`#password`);
let userRePassword = document.querySelector(`#rePassword`);

let password; // A variable that would hold the value of password to compare the repassword with it //

function fieldValidation(fieldRegex, fieldValue, theComment) {
  if (fieldRegex.test(fieldValue) == false) {
    $(`#${theComment}`).removeClass(`d-none`);
  } else {
    $(`#${theComment}`).addClass(`d-none`);
  }
}

function removingDisplayNone(section) {
  $(`#loading-screen`).addClass(`d-none`);
  $(`#home-section`).addClass(`d-none`);
  $(`#search-section`).addClass(`d-none`);
  $(`#categories-section`).addClass(`d-none`);
  $(`#the-categorie-section`).addClass(`d-none`);
  $(`#meal-section`).addClass(`d-none`);
  $(`#area-section`).addClass(`d-none`);
  $(`#area-meals-section`).addClass(`d-none`);
  $(`#ingredients-section`).addClass(`d-none`);
  $(`#ingredients-meals-section`).addClass(`d-none`);
  $(`#contact-section`).addClass(`d-none`);
  $(section).removeClass(`d-none`);
}

function submitButtonDisable() {
  if (
    nameRegex.test(userName.value) == true &&
    emailRegex.test(userEmail.value) == true &&
    phoneNumberRegex.test(userPhone.value) == true &&
    AgeRegex.test(userAge.value) == true &&
    passwordRegex.test(userPassword.value) == true &&
    userRePassword.value == password
  ) {
    $(`#submitButton`).removeClass(`disabled`);
  } else {
    $(`#submitButton`).addClass(`disabled`);
  }
}
//

//
// ======= //
// sideBar //
// ======= //
function closeSideBar() {
  $(`#side-bar`).animate({ left: `-16rem` }, 700);
  $(`#side-bar-close-btn`).addClass(`d-none`);
  $(`#side-bar-open-btn`).removeClass(`d-none`);
  $(`#side-bar-content ul li`).animate({ top: `100%` }, 400);
}

function slideItemsUP() {
  $(`#side-bar-content ul #search`).animate({ top: 0 }, 750, function () {
    $(`#side-bar-content ul #categories`).animate({ top: 0 }, 200, function () {
      $(`#side-bar-content ul #area`).animate({ top: 0 }, 200, function () {
        $(`#side-bar-content ul #ingredients`).animate(
          { top: 0 },
          200,
          function () {
            $(`#side-bar-content ul #contact`).animate({ top: 0 }, 200);
          }
        );
      });
    });
  });
}

$(`#side-bar-open-btn`).on(`click`, function () {
  $(`#side-bar`).animate({ left: `0` }, 700);
  $(`#side-bar-open-btn`).addClass(`d-none`);
  $(`#side-bar-close-btn`).removeClass(`d-none`);
  slideItemsUP();
});

$(`#side-bar-close-btn`).on(`click`, function () {
  closeSideBar();
});
//

//
// ==== //
// Home //
// ==== //
getHomeMeals();

async function getHomeMeals() {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let thomeResponse = (await myData.json()).meals;
  displayHomeMeals(thomeResponse);
}

function displayHomeMeals(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strMealThumb}" />
    <div onclick="getMealInfo('${list[i].idMeal}')" class="layer rounded-3 d-flex align-items-center text-black p-2">
      <h3>${list[i].strMeal}</h3>
    </div>
  </div>
`;
  }
  document.querySelector(`#home-container`).innerHTML = container;
  removingDisplayNone(`#home-section`);
}
//

//
// ====== //
// Search //
// ====== //
$(`#search`).on(`click`, function () {
  removingDisplayNone(`#search-section`);
  closeSideBar();
});

$(`#search-by-name`).on(`input`, function () {
  if (this.value !== "") {
    getSearchByNameData(this.value);
  }
});

$(`#search-by-first-letter`).on(`input`, function () {
  if (this.value !== "") {
    getSearchByFLetterData(this.value);
  }
});

async function getSearchByNameData(name) {
  $(`#search-loading-screen`).removeClass(`d-none`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let searchResponse = (await myData.json()).meals;
  displaySearchByName(searchResponse);
}

function displaySearchByName(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strMealThumb}" />
    <div onclick="getMealInfo('${list[i].idMeal}')" class="layer rounded-3 d-flex align-items-center text-black p-2">
      <h3>${list[i].strMeal}</h3>
    </div>
  </div>
`;
  }
  document.querySelector(`#search-container`).innerHTML = container;
  $(`#search-loading-screen`).addClass(`d-none`);
}

async function getSearchByFLetterData(letter) {
  $(`#search-loading-screen`).removeClass(`d-none`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let fLettersearchResponse = (await myData.json()).meals;
  displaySearchByFLetter(fLettersearchResponse);
}

function displaySearchByFLetter(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strMealThumb}" />
    <div onclick="getMealInfo('${list[i].idMeal}')" class="layer rounded-3 d-flex align-items-center text-black p-2">
      <h3>${list[i].strMeal}</h3>
    </div>
  </div>
`;
  }
  document.querySelector(`#search-container`).innerHTML = container;
  $(`#search-loading-screen`).addClass(`d-none`);
}

//

//
// ========== //
// Categories //
// ========== //
$(`#categories`).on(`click`, function () {
  removingDisplayNone(`#categories-section`);
  closeSideBar();
  getCategories();
});

async function getCategories() {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let categoriesResponse = (await myData.json()).categories;
  displayCategories(categoriesResponse);
}

function displayCategories(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strCategoryThumb}" />
    <div onclick="getTheCategory('${list[i].strCategory}')" class="layer rounded-3 text-center text-black p-3">
      <h2>${list[i].strCategory}</h2>
      <p class="text-center">${list[i].strCategoryDescription}</p>
    </div>
  </div>
`;
  }
  document.querySelector(`#categories-container`).innerHTML = container;
  removingDisplayNone(`#categories-section`);
}
//

//
// ================ //
// Single Categorie //
// ================ //
removingDisplayNone(`#loading-screen`);
async function getTheCategory(category) {
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let theCategoryResponse = (await myData.json()).meals;
  displayTheCategory(theCategoryResponse);
}

function displayTheCategory(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strMealThumb}" />
    <div onclick="getMealInfo('${list[i].idMeal}')" class="layer rounded-3 d-flex align-items-center text-black p-2">
      <h3>${list[i].strMeal}</h3>
    </div>
  </div>
`;
  }
  document.querySelector(`#the-categorie-container`).innerHTML = container;
  removingDisplayNone(`#the-categorie-section`);
}
//

//
// ========= //
// Meal Info //
// ========= //
async function getMealInfo(id) {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let mealInfo = (await myData.json()).meals;
  displayMealInfo(mealInfo);
}

function displayMealInfo(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div class="col-md-4 text-white">
    <img src="${list[i].strMealThumb}" class="w-100 mb-2" />
    <h2>${list[i].strMeal}</h2>
  </div>
  <div class="col-md-8 text-white">
    <h3>Instructions</h3>
    <p>${list[i].strInstructions}</p>
    <p class="fs-4 fw-bold">
      Area : <span class="fs-4">${list[i].strArea}</span>
    </p>
    <p class="fs-4 fw-bold">
      Category : <span class="fs-4">${list[i].strCategory}</span>
    </p>
    <p class="fs-4 fw-bold">Recipes :</p>
    <div class="mb-2">
      <span class="meal-recipe1 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure1} ${list[i].strIngredient1}</span>
      <span class="meal-recipe2 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure2} ${list[i].strIngredient2}</span>
      <span class="meal-recipe3 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure3} ${list[i].strIngredient3}</span>
      <span class="meal-recipe4 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure4} ${list[i].strIngredient4}</span>
      <span class="meal-recipe5 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure5} ${list[i].strIngredient5}</span>
      <span class="meal-recipe6 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure6} ${list[i].strIngredient6}</span>
      <span class="meal-recipe7 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure7} ${list[i].strIngredient7}</span>
      <span class="meal-recipe8 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure8} ${list[i].strIngredient8}</span>
      <span class="meal-recipe9 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure9} ${list[i].strIngredient9}</span>
      <span class="meal-recipe10 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure10} ${list[i].strIngredient10}</span>
      <span class="meal-recipe11 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure11} ${list[i].strIngredien11}</span>
      <span class="meal-recipe12 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure12} ${list[i].strIngredient12}</span>
      <span class="meal-recipe13 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure13} ${list[i].strIngredient13}</span>
      <span class="meal-recipe14 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure14} ${list[i].strIngredient14}</span>
      <span class="meal-recipe15 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure15} ${list[i].strIngredient15}</span>
      <span class="meal-recipe16 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure16} ${list[i].strIngredient16}</span>
      <span class="meal-recipe17 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure17} ${list[i].strIngredient17}</span>
      <span class="meal-recipe18 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure18} ${list[i].strIngredient18}</span>
      <span class="meal-recipe19 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure19} ${list[i].strIngredient19}</span>
      <span class="meal-recipe20 mb-2 d-inline-block mx-2 p-2 rounded-3 text-black bg-info"
        >${list[i].strMeasure20} ${list[i].strIngredient20}</span>
    </div>
    <p class="fs-4 fw-bold">Tags :</p>
    <div class="mb-4">
    <span class="meal-tags d-inline-block mx-2 p-2 rounded-3 text-black alert alert-danger"
      >${list[i].strTags}</span
    >
    </div>
    <button class="btn btn-success p-0 me-1">
      <a
        class="d-inline-block p-2 text-decoration-none text-white"
        href="${list[i].strSource}"
        target="_blank"
        >Source</a
      >
    </button>
    <button class="btn btn-danger p-0">
      <a
        class="d-inline-block p-2 text-decoration-none text-white"
        href="${list[i].strYoutube}"
        target="_blank"
        >Youtube</a
      >
    </button>
  </div>
`;

    document.querySelector(`#meal-container`).innerHTML = container;
    removingDisplayNone(`#meal-section`);

    if (document.querySelector(`.meal-tags`).innerHTML === `null`) {
      document.querySelector(`.meal-tags`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient1 === " " ||
      list[i].strIngredient1 === "" ||
      list[i].strIngredient1 === `null` ||
      list[i].strIngredient1 === `undefined`
    ) {
      document.querySelector(`.meal-recipe1`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient2 === " " ||
      list[i].strIngredient2 === "" ||
      list[i].strIngredient2 === `null` ||
      list[i].strIngredient2 === `undefined`
    ) {
      document.querySelector(`.meal-recipe2`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient3 === " " ||
      list[i].strIngredient3 === "" ||
      list[i].strIngredient3 === `null` ||
      list[i].strIngredient3 === `undefined`
    ) {
      document.querySelector(`.meal-recipe3`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient4 === " " ||
      list[i].strIngredient4 === "" ||
      list[i].strIngredient4 === `null` ||
      list[i].strIngredient4 === `undefined`
    ) {
      document.querySelector(`.meal-recipe4`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient5 === " " ||
      list[i].strIngredient5 === "" ||
      list[i].strIngredient5 === `null` ||
      list[i].strIngredient5 === `undefined`
    ) {
      document.querySelector(`.meal-recipe5`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient6 === " " ||
      list[i].strIngredient6 === "" ||
      list[i].strIngredient6 === `null` ||
      list[i].strIngredient6 === `undefined`
    ) {
      document.querySelector(`.meal-recipe6`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient7 === " " ||
      list[i].strIngredient7 === "" ||
      list[i].strIngredient7 === `null` ||
      list[i].strIngredient7 === `undefined`
    ) {
      document.querySelector(`.meal-recipe7`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient8 === " " ||
      list[i].strIngredient8 === "" ||
      list[i].strIngredient8 === `null` ||
      list[i].strIngredient8 === `undefined`
    ) {
      document.querySelector(`.meal-recipe8`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient9 === " " ||
      list[i].strIngredient9 === "" ||
      list[i].strIngredient9 === `null` ||
      list[i].strIngredient9 === `undefined`
    ) {
      document.querySelector(`.meal-recipe9`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient10 === " " ||
      list[i].strIngredient10 === "" ||
      list[i].strIngredient10 === `null` ||
      list[i].strIngredient10 === `undefined`
    ) {
      document.querySelector(`.meal-recipe10`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient11 === " " ||
      list[i].strIngredient11 === "" ||
      list[i].strIngredient11 === `null` ||
      list[i].strIngredient11 === `undefined`
    ) {
      document.querySelector(`.meal-recipe11`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient12 === " " ||
      list[i].strIngredient12 === "" ||
      list[i].strIngredient12 === `null` ||
      list[i].strIngredient12 === `undefined`
    ) {
      document.querySelector(`.meal-recipe12`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient13 === " " ||
      list[i].strIngredient13 === "" ||
      list[i].strIngredient13 === `null` ||
      list[i].strIngredient13 === `undefined`
    ) {
      document.querySelector(`.meal-recipe13`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient14 === " " ||
      list[i].strIngredient14 === "" ||
      list[i].strIngredient14 === `null` ||
      list[i].strIngredient14 === `undefined`
    ) {
      document.querySelector(`.meal-recipe14`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient15 === " " ||
      list[i].strIngredient15 === "" ||
      list[i].strIngredient15 === `null` ||
      list[i].strIngredient15 === `undefined`
    ) {
      document.querySelector(`.meal-recipe15`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient16 === " " ||
      list[i].strIngredient16 === "" ||
      list[i].strIngredient16 === `null` ||
      list[i].strIngredient16 === `undefined`
    ) {
      document.querySelector(`.meal-recipe16`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient17 === " " ||
      list[i].strIngredient17 === "" ||
      list[i].strIngredient17 === `null` ||
      list[i].strIngredient17 === `undefined`
    ) {
      document.querySelector(`.meal-recipe17`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient18 === " " ||
      list[i].strIngredient18 === "" ||
      list[i].strIngredient18 === `null` ||
      list[i].strIngredient18 === `undefined`
    ) {
      document.querySelector(`.meal-recipe18`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient19 === " " ||
      list[i].strIngredient19 === "" ||
      list[i].strIngredient19 === `null` ||
      list[i].strIngredient19 === `undefined`
    ) {
      document.querySelector(`.meal-recipe19`).classList.add(`d-none`);
    }

    if (
      list[i].strIngredient20 === " " ||
      list[i].strIngredient20 === "" ||
      list[i].strIngredient20 === `null` ||
      list[i].strIngredient20 === `undefined`
    ) {
      document.querySelector(`.meal-recipe20`).classList.add(`d-none`);
    }
  }
}
//

//
// ==== //
// Area //
// ==== //
$(`#area`).on(`click`, function () {
  removingDisplayNone(`#area-section`);
  closeSideBar();
  getArea();
});

async function getArea() {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let areaNames = (await myData.json()).meals;
  displayArea(areaNames);
}

function displayArea(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div onclick="getAreaMeals('${list[i].strArea}')" class="col-md-3 pointer">
    <div class="text-white text-center fs-rem">
      <i class="fa-solid fa-house-laptop"></i>
    </div>
    <h2 class="text-white text-center">${list[i].strArea}</h2>
  </div>
`;
  }
  document.querySelector(`#area-container`).innerHTML = container;
  removingDisplayNone(`#area-section`);
}
//

// ========== //
// Area Meals //
// ========== //
async function getAreaMeals(area) {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let areaMeals = (await myData.json()).meals;
  displayAreaMeals(areaMeals);
}

function displayAreaMeals(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strMealThumb}" />
    <div onclick="getMealInfo('${list[i].idMeal}')" class="layer rounded-3 d-flex align-items-center text-black p-2">
      <h3>${list[i].strMeal}</h3>
    </div>
  </div>
`;
  }
  document.querySelector(`#area-meals-container`).innerHTML = container;
  removingDisplayNone(`#area-meals-section`);
}
//

// =========== //
// Ingredients //
// =========== //
$(`#ingredients`).on(`click`, function () {
  removingDisplayNone(`#ingredients-section`);
  closeSideBar();
  getIngredients();
});

async function getIngredients() {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let ingredients = (await myData.json()).meals;
  displayIngredients(ingredients);
}

function displayIngredients(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div onclick="getIngredientsMeals('${list[i].strIngredient}')"
    class="col-md-3 pointer">
    <div class="text-white text-center fs-rem">
      <i class="fa-solid fa-drumstick-bite"></i>
    </div>
    <h2 class="text-white text-center">${list[i].strIngredient}</h2>
  </div>
`;
  }
  document.querySelector(`#ingredients-container`).innerHTML = container;
  removingDisplayNone(`#ingredients-section`);
}
//

// ================= //
// Ingredients Meals //
// ================= //
async function getIngredientsMeals(ing) {
  removingDisplayNone(`#loading-screen`);
  let myData = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  let ingredientsMeals = (await myData.json()).meals;
  displayIngredientsMeals(ingredientsMeals);
}

function displayIngredientsMeals(list) {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div
    class="layer-container col-md-3 position-relative overflow-hidden"
  >
    <img class="category-img w-100" src="${list[i].strMealThumb}" />
    <div onclick="getMealInfo('${list[i].idMeal}')" class="layer rounded-3 d-flex align-items-center text-black p-2">
      <h3>${list[i].strMeal}</h3>
    </div>
  </div>
`;
  }
  document.querySelector(`#ingredients-meals-container`).innerHTML = container;
  removingDisplayNone(`#ingredients-meals-section`);
}
//

// ========= //
// Contact Us //
// ========= //
$(`#contact`).on(`click`, function () {
  removingDisplayNone(`#contact-section`);
  closeSideBar();
});

$(`#name`).on(`input`, function () {
  fieldValidation(nameRegex, this.value, `invalidName`);
  submitButtonDisable();
});

$(`#email`).on(`input`, function () {
  fieldValidation(emailRegex, this.value, `invalidEmail`);
  submitButtonDisable();
});

$(`#phoneNumber`).on(`input`, function () {
  fieldValidation(phoneNumberRegex, this.value, `invalidPhoneNumber`);
  submitButtonDisable();
});

$(`#age`).on(`input`, function () {
  fieldValidation(AgeRegex, this.value, `invalidAge`);
  submitButtonDisable();
});

$(`#password`).on(`input`, function () {
  fieldValidation(passwordRegex, this.value, `invalidPassword`);
  password = this.value;
  submitButtonDisable();
});

$(`#rePassword`).on(`input`, function () {
  if (this.value !== password) {
    $(`#invalidRePassword`).removeClass(`d-none`);
  } else {
    $(`#invalidRePassword`).addClass(`d-none`);
  }
  submitButtonDisable();
});
