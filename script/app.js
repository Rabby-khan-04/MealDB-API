// Load Meal Data

const loadData = async (searchTxt) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.meals);
    // console.log(data.meals[0]);

    document.getElementById("view__all__btn").addEventListener("click", () => {
      const mealContainer = document.getElementById("meals-container");
      mealContainer.innerHTML = "";
      const meals = data.meals;
      meals.forEach((meal) => {
        displayMelas(meal, mealContainer);
      });
      document.getElementById("view__all__btn").style.display = "none";
    });
  } catch (error) {
    console.log(error);
  }
};

// Click Event
document.getElementById("search__btn").addEventListener("click", () => {
  const searchText = document.getElementById("search__field").value;
  // console.log(searchText);
  loadData(searchText);
  document.getElementById("view__all__btn").style.display = "inline-block";
});

// Displayl Data
const displayData = (meals) => {
  const mealContainer = document.getElementById("meals-container");
  mealContainer.innerHTML = "";
  let counter = 0;
  meals.forEach((meal) => {
    counter++;
    if (counter < 5) {
      displayMelas(meal, mealContainer);
    }
  });
};

// Display Meals
function displayMelas(meal, mealContainer) {
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("col");
  let instruction = meal.strInstructions;
  let sortInstruction = instruction.substring(0, 250) + "...";
  mealDiv.innerHTML = `
    <div class="card">
        <div class="row g-0">
          <div class="col-md-4">
              <img src="${meal.strMealThumb}" class="img-fluid rounded-start h-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${sortInstruction}</p>
                <a type="button" onclick="displayMealDetails('${meal.idMeal}')" class="view__link fw-medium" data-bs-toggle="modal" 
                data-bs-target="#mealDetails">View Details</a>
          </div>
        </div>
      </div>
     </div>
    `;

  mealContainer.appendChild(mealDiv);
}

const displayMealDetails = async (melaId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${melaId}`;
  const res = await fetch(url);
  const data = await res.json();
  showFullDetails(data.meals[0]);
  console.log(data.meals[0]);
};

const showFullDetails = (meal) => {
  const detailsBody = document.getElementById("meal__Details");
  const mealTitle = document.getElementById("mealDetailsLabel");
  mealTitle.innerText = meal.strMeal;
  detailsBody.innerHTML = `
  <img src="${meal.strMealThumb}" alt="" class="img-fluid w-100 d-block mb-4">
  <p class="fs-5 mb-1"><span class="fw-semibold">Category : </span>${meal.strCategory}</p>
  <p class="fs-5 mb-1"><span class="fw-semibold">Area : </span>${meal.strArea} </p>
  <p class="fs-5 mb-1"><span class="fw-semibold">Instruction :</span>${meal.strInstructions}</p>
  <p class="fs-5 mb-1"><span class="fw-semibold">Youtube</span> <a class="text-info" href="${meal.strYoutube}">${meal.strYoutube}</a></p>
  `;
};

loadData("tomato");
