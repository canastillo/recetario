import {
    createContainer, 
    createCardThumbnail,
    createCardData,
    createRef,
    createCardLink,
    addRecipes,
    appendChildren
} from './htmlNodes'

let letters = document.querySelectorAll(".page-link")
let recipesContainer = document.querySelector("#recipes-container")

letters.forEach(letter => {
    letter.addEventListener('click', (e) => {

        // Actualizamos la UI para comunicar al usuario que se recibió su indicación
        showLoadingBar()
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

// Barra de carga (cuando se hacen peticiones)

function showLoadingBar() {
    let loader = document.querySelector("#loader")
    let rows = document.querySelectorAll(".row")

    // Quitamos las recetas que estaban
    rows.forEach(row => recipesContainer.removeChild(row))

    if (loader) {
        loader.style.animationIterationCount = "infinite"
        loader.style.display = "block"
    } else 
        createLoadingBar()
}

function createLoadingBar() {
    let loader = document.createElement("div")

    loader.classList.add("loader")
    loader.id = "loader"
    recipesContainer.appendChild(loader)
}

function hideLoadingBar() {
    let loader = document.querySelector("#loader")
    loader.style.display = "none"
    loader.style.animationIterationCount = "0"
}

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
        let card = createContainer("card", "mx-auto")
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
        // body.appendChild(title)
        // body.appendChild(category)
        // body.appendChild(area)
        // body.appendChild(buttonContainer)
        
        appendChildren(card, thumbnail, body)
        // card.appendChild(thumbnail)
        // card.appendChild(body)
        
        recipe.appendChild(card)
        
        recipes.push(recipe) // Agregamos la receta al conjunto de recetas
    }) 

    hideLoadingBar()
    addRecipes(recipes)
}

// function createContainer(...types) {
//     let container = document.createElement("div")
//     types.forEach((type) => container.classList.add(type))
//     return container
// }

// function createCardThumbnail(src) {
//     let thumbnail = document.createElement("img")
//     thumbnail.src = src
//     thumbnail.classList.add("card-img-top")
//     return thumbnail
// }

// function createCardData(element, type, text) {
//     let data = document.createElement(element)
//     if (text.length > 40) data.classList.add("long-title")
//     data.classList.add(type)
//     data.textContent = text
//     return data
// }

// // Creamos el link a la receta individual
// function createRef(id) {
//     return `recipe.html?i=${id}`
// }

// function createCardLink(href, ...types) {
//     let button = document.createElement("a")
//     types.forEach(type => button.classList.add(type))
//     button.href = href
//     button.textContent = "¡A cocinar!"
//     return button
// }

// function addRecipes(recipes) {
//     // Armamos filas de cuatro recetas
//     for(let start = 0; start <= recipes.length - 1; start += 4) {
//         let row = createContainer("div", "row")
//         let end = start + 4
        
//         // Si quedan más de 4, agarramos 4, si no, agarramos las que queden
//         if (recipes.length > end) children = recipes.slice(start, end)
//         else children = recipes.slice(start, recipes.length)

//         children.forEach((recipe) => row.appendChild(recipe))
//         recipesContainer.appendChild(row)
//     }
// }

// Mostrar las recetas con "A" al ingresar a la página

const recipesA = document.querySelector("#a-button")
const click = new Event('click')
recipesA.dispatchEvent(click)