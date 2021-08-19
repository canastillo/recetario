let recetasContenedor = document.querySelector("#recetas-container");
let ingredientesContenedor = document.querySelector("#ingredientes-container");

///Recuperación de lista de recetas

fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => {
        let row = document.createElement("div")
        row.classList.add("row")

        data['meals'].forEach(receta => {
            let card = createCardCategoria(receta)
            row.appendChild(card)
        })
        recetasContenedor.appendChild(row)

    })
    .catch(error => console.log(error))

const createCardCategoria = (receta) =>{
    let container = document.createElement("div")
    let card = document.createElement("div")

    container.classList.add("col-sm-12")
    container.classList.add("col-md-6")
    container.classList.add("col-lg-3")

    card.classList.add("card")
    card.classList.add("card-recipe")
    card.classList.add("mx-auto")

    card.style.minHeight = "450px"

    let imagenReceta = document.createElement("img")
    imagenReceta.style.maxWidth = "100%"
    imagenReceta.src = receta["strMealThumb"]

    let nombrePlatillo = document.createElement("h2")
    nombrePlatillo.textContent = receta["strMeal"]
    nombrePlatillo.classList.add("title-index")
    nombrePlatillo.style.textAlign = "center"


    let button = document.createElement("a")
    button.href = createRef(receta["idMeal"])
    button.classList.add("btn")
    button.classList.add("btn-primary")
    button.textContent = "¡A cocinar!"

    let buttonContainer = document.createElement("p")

    buttonContainer.classList.add("button-container")
    buttonContainer.appendChild(button)

    card.appendChild(imagenReceta)
    card.appendChild(nombrePlatillo)
    card.appendChild(buttonContainer)
    container.appendChild(card)

    return container
}

function createRef(id) {
    return `recipe.html?i=${id}`
}

//Recuperación de lista de ingredientnes

fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(response => response.json())
    .then(data => {
        
        for(let i=0; i<4; i++){
            let ingrediente = data['meals'][i]
            let card = createCardIngrediente(ingrediente)
            ingredientesContenedor.appendChild(card)
        }
    })
    .catch(error => console.log(error));

const createCardIngrediente = (ingrediente) =>{
    let card = document.createElement("div")
    let nombreIngrediente = ingrediente["strIngredient"]

    card.classList.add("card")
    card.classList.add("card-ingredient")
    card.style.marginTop = "35px"

    let link = document.createElement("a")
    link.href = `ingredient.html?i=${nombreIngrediente}`
    link.classList.add("text-decoration-none")
    link.classList.add("text-reset")

    let tituloIngrediente = document.createElement("h2")
    tituloIngrediente.textContent = nombreIngrediente

    let imagenIngrediente = document.createElement("img")
    let urlImagen = `https://www.themealdb.com/images/ingredients/${nombreIngrediente}.png`
    imagenIngrediente.src = urlImagen
    imagenIngrediente.style.maxWidth = "100%"


    link.appendChild(imagenIngrediente)
    link.appendChild(tituloIngrediente)
    card.appendChild(link)

    return card
}

// Funcionamiento del botón random

const randomButton = document.querySelector("#random-button")

randomButton.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let meal = data.meals[0] //obtiene primer elem de array
            let id = meal["idMeal"]

            location.href = `./recipe.html?i=${id}`

        })
})

const btnRecipes = document.querySelector("#btn-recipes")
const btnIngredients = document.querySelector("#btn-ingredients")

btnRecipes.addEventListener('click', () => {
    location.href = "./recipes.html"
})

btnIngredients.addEventListener('click', () => {
    location.href = "./ingredients.html"
})