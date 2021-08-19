const recipeURL = window.location.href
const id = recipeURL.split('i=')[1]
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

const containerMain = document.getElementById("containerMain");

const containerMeal = document.getElementById("containerMeal");
const imgMeal = document.getElementById("imgMeal");
const textMeal = document.getElementById("textMeal");

const containerIngredients = document.getElementById("containerIngredients");
const textIngredients = document.getElementById("textIngredients");

const containerInstructions = document.getElementById("containerInstructions");
const textInstructions = document.getElementById("textInstructions");
const instructions = document.getElementById("instructions");


function consumeAPI(url){
  fetch(url)
  .then( response => response.json()) 
  .then( data => {
      const meal = data.meals[0];
      addMeal(meal);
      addIngredients(meal);
      addInstructions(meal);
    });
}

function addMeal(meal){
  textMeal.textContent = `${meal.strMeal}`;
  imgMeal.src = `${meal.strMealThumb}`;
}

function addIngredients(meal){

  textIngredients.textContent = "Ingredientes";

  // arreglo vacio para guardar los ingredientes
  // y las imagenes de los ingredientes
  const ingredients = []
  const imagesIngredients = []

  // en total son 20 ingredientes
  for (let i = 1; i <= 20; i++) {

    if (meal[`strIngredient${i}`]) {
      let ingredient = meal[`strIngredient${i}`]
       ingredients.push(ingredient);
       imagesIngredients.push(`https://www.themealdb.com/images/ingredients/${ingredient}.png`);
    } else {
       break;
     }
    
  }

  // crear un list Item por cada ingrediente que exista
  // y agregarle el texto de el ingrediente
  imagesIngredients.forEach( (image, position) => {

    const ingredientContainer = document.createElement('div');
    ingredientContainer.classList.add("w-50")
    ingredientContainer.classList.add("mx-auto")

    const ingredientText = document.createElement('p');
    ingredientText.style.textAlign = "center"
    
    const ingredientImg = document.createElement("img");
    ingredientImg.classList.add("mx-auto")
    ingredientImg.style.display = "block"
    ingredientImg.src = image;
    ingredientImg.height = 80

    ingredientText.textContent = ingredients[position]

    ingredientContainer.appendChild(ingredientImg);
    ingredientContainer.appendChild(ingredientText);

    containerIngredients.appendChild(ingredientContainer);
  });

}

function addInstructions(meal){
  meal.strInstructions.split(".").map(paragraph => {
    let li = document.createElement("li")
    li.textContent = `${paragraph}.`
    return li
  }).forEach(paragraph => instructions.appendChild(paragraph))

  instructions.removeChild(instructions.lastChild)
}

consumeAPI(url)

