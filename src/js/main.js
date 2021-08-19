let recetasContenedor = document.querySelector("#recetas-container");

let ingredientesContenedor = document.querySelector("#ingredientes-container");

///Recuperación de lista de recetas

fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => {
        data['meals'].forEach(receta => {
            console.log(receta)
            let card = createCardCategoria(receta);
            recetasContenedor.appendChild(card);
        })
    })
    .catch(error => console.log(error));

const createCardCategoria = (receta) =>{
    let card = document.createElement("div")
    card.classList.add("card");

    let imagenReceta = document.createElement("img")
    imagenReceta.src = receta["strMealThumb"]

    let nombrePlatillo = document.createElement("h2");
    nombrePlatillo.textContent = receta["strMeal"];

    card.appendChild(imagenReceta);
    card.appendChild(nombrePlatillo);

    return card
}

//Recuperación de lista de ingredientnes

fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(response => response.json())
    .then(data => {
        for(let i=0; i<4; i++){
            let ingrediente = data['meals'][i];
            let card = createCardIngrediente(ingrediente)
            ingredientesContenedor.appendChild(card);
        }
    })
    .catch(error => console.log(error));

const createCardIngrediente = (ingrediente) =>{
    let card = document.createElement("div")
    card.classList.add("card");

    let nombreIngrediente = document.createElement("h2");
    nombreIngrediente.textContent = ingrediente["strIngredient"];


    card.appendChild(nombreIngrediente);

    return card
}



/*
const recipesResponseMeal = await fetch('www.themealdb.com/api/json/v1/1/random.php');
const recipes = await recipesResponseMeal.json();

const recipesResponseIngredients = await fetch('www.themealdb.com/api/json/v1/1/list.php?i=list');
const recipes = await recipesResponseIngredients.json();


const recipeList = document.querySelector('.RecetasAPI');

const recipesHTML = '';
for (let i=0; i < data.length; i+=1 ) {
    const recipe = data[i];
    recipesHTML += `<div class="recipe">
<img class="recipe__image" src="${recipe.strMealThumb}" />
<p class="recipe__title">${recipe.strMeal}</>
</div>`;
}

recipeList.innerHTML = recipesHTML;

 */