import {
    createContainer, 
    createCardThumbnail,
    createCardData,
    createRef,
    createCardLink,
    addRecipes,
    appendChildren,
} from './htmlNodes'

import { showLoadingBar, hideLoadingBar } from './loadingBar'

let letters = document.querySelectorAll(".page-link")

letters.forEach(letter => {
    letter.addEventListener('click', (e) => {

        // Actualizamos la UI para comunicar al usuario que se recibió su indicación
        showLoadingBar("#recipes-container")
        hideNoRecipesMessage()
        setActive(e.target)

        // Obtenemos la letra y realizamos la petición
        let letterChar = e.target.textContent.toLowerCase()

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterChar}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // Mostramos las recetas o informamos al usuario de que no hay
            if(data["meals"] === null) {
                hideLoadingBar()
                showNoRecipesMessage()
            } else createRecipesNodes(data["meals"])
        })
        .catch(function (error) {
            console.log(error)
        })
    })
})

// Mensaje de que no se encontraron recetas

const message = document.querySelector("#message")

function showNoRecipesMessage() {
    message.style.display = "block"
}

function hideNoRecipesMessage() {
    message.style.display = "none"
}

// Activar botón de letra seleccionada

function setActive(button) {
let letters = document.querySelectorAll(".page-item")

    // Desactivamos las demás 
    letters.forEach(letter => {
        if (letter.classList.contains("active")) {
            letter.classList.remove("active")
        }
    })

    button.parentNode.classList.add("active")
}

// Crear y mostrar las recetas

function createRecipesNodes(meals) {
    let recipes = []

    meals.forEach(meal => {
        // Creamos un card por cada platillo
        let recipe = createContainer("col-sm-12","col-md-6", "col-lg-3")
        let card = createContainer("card", "card-long", "mx-auto")
        let body = createContainer("card-body")

        // Creamos los nodos de los datos
        let thumbnail = createCardThumbnail(meal["strMealThumb"])
        let title = createCardData("h2", "card-title", meal["strMeal"])
        let category = createCardData("p","card-text", meal["strCategory"])
        let area = createCardData("p","card-text", meal["strArea"])
        let button = createCardLink(createRef(meal["idMeal"]), "btn", "btn-primary")
        let buttonContainer = document.createElement("p")

        // Agregamos los datos a la card
        buttonContainer.classList.add("button-container")
        buttonContainer.appendChild(button)

        appendChildren(body, title, category, area, buttonContainer)
        appendChildren(card, thumbnail, body)
        
        recipe.appendChild(card)
        
        recipes.push(recipe) // Agregamos la receta al conjunto de recetas
    }) 

    hideLoadingBar()
    addRecipes(recipes)
}

// Mostrar las recetas con "A" al ingresar a la página

const recipesA = document.querySelector("#a-button")
const click = new Event('click')
recipesA.dispatchEvent(click)