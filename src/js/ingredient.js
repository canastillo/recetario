import {
    createContainer,
    createCardThumbnail,
    createCardData,
    createRef,
    createCardLink,
    addRecipes,
    appendChildren
} from './htmlNodes'

const recipesContainer = document.querySelector("#recipes-container")
const url = window.location.href
const ingredientName = url.split('i=')[1]


fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        if (data["meals"] === null) {
            showNoIngredientMessage()
        } else {
            setIngredientTitle()
            createRecipesNodes(data["meals"])
        }
    })
    .catch(function (error) {
        console.log(error)
    })

// Mensaje de que no existe el ingrediente

const message = document.querySelector("#message")

function showNoIngredientMessage() {
    message.style.display = "block"
}

// Crear y mostrar recetas

function setIngredientTitle() {
    const heading = document.querySelector("h1")
    heading.textContent = capitalize(ingredientName)
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

function createRecipesNodes(meals) {
    let recipes = []

    meals.forEach(meal => {
        // Creamos un card por cada platillo
        let recipe = createContainer("col-sm-12", "col-md-6", "col-lg-3")
        let card = createContainer("card", "mx-auto")
        let body = createContainer("card-body")

        // Creamos los nodos de los datos
        let thumbnail = createCardThumbnail(meal["strMealThumb"])
        let title = createCardData("h2", "card-title", meal["strMeal"])
        let button = createCardLink(createRef(meal["idMeal"]), "btn", "btn-primary")
        let buttonContainer = document.createElement("p")

        // Agregamos los datos a la card
        buttonContainer.classList.add("button-container")
        buttonContainer.appendChild(button)

        appendChildren(body, title, buttonContainer)
        appendChildren(card, thumbnail, body)

        recipe.appendChild(card)

        recipes.push(recipe) // Agregamos la receta al conjunto de recetas
    })

    addRecipes(recipes, recipesContainer)
}