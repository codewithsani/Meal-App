const searchBtn = document.querySelector("#searchMeal");
const input = document.querySelector("#input");
let meals = document.querySelector("#meals");
searchBtn.addEventListener("click", () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input.value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.meals) {
        meals.innerHTML = "...Loading";
        let html = "";
        data.meals.forEach((element) => {
          let htmlMeal = `<div class="meal">
                <img src="${element.strMealThumb}" alt="" />
                <h2 class="mealTitle">${element.strMeal}</h2>
                <button id="${element.idMeal}" class="mealBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Read More
                </button>
              </div>`;
          html += htmlMeal;
        });
        meals.innerHTML = html;
        const mealBtn = document.querySelectorAll(".mealBtn");
        Array.from(mealBtn).forEach((element) => {
          element.addEventListener("click", (e) => {
            let id = e.target.id;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              .then((book) => {
                return book.json();
              })
              .then((data) => {
                console.log(data);
                let mealTitleModal = document.querySelector("#mealTitleModal");
                let mealPInst = document.querySelector("#mealPInst");
                mealTitleModal.innerText = data.meals[0].strMeal;
                mealPInst.innerText = data.meals[0].strInstructions;
              });
          });
        });
      } else {
        meals.innerHTML =
          "<h2>Sorry!😥 we can't find any meal related to your query </h2>";
      }
    });
});
