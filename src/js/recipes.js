let letters = document.querySelectorAll(".page-link")
let recipesContainer = document.querySelector("#recipes-container")

letters.forEach(letter => {
    letter.addEventListener('click', (e) => {

        showLoadingBar()
        hideNoRecipesMessage()
        setActive(e.target)

        let letterChar = e.target.textContent.toLowerCase()

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterChar}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
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




function showLoadingBar() {
    let loader = document.querySelector("#loader")
    let rows = document.querySelectorAll(".row")

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




const message = document.querySelector("#message")

function showNoRecipesMessage() {
    message.style.display = "block"
}

function hideNoRecipesMessage() {
    message.style.display = "none"
}



function setActive(button) {
let letters = document.querySelectorAll(".page-item")

    letters.forEach(letter => {
        if (letter.classList.contains("active")) {
            letter.classList.remove("active")
        }
    })

    button.parentNode.classList.add("active")
}




function createRecipesNodes(meals) {
    let recipes = []

    meals.forEach(meal => {
        let recipe = createContainer("col-6", "col-lg-3")
        let card = createContainer("card")
        let body = createContainer("card-body")
        
        let thumbnail = createCardThumbnail(meal["strMealThumb"])
        let title = createCardData("h2", "card-title", meal["strMeal"])
        let category = createCardData("p","card-text", `Category: ${meal["strCategory"]}` )
        let area = createCardData("p","card-text", `Region: ${meal["strArea"]}`)
        let tags = createCardData("p","card-text", meal["strTags"])
        let button = createCardLink(createRef(meal["idMeal"]), "btn", "btn-primary")

        let buttonContainer = document.createElement("p")
        buttonContainer.classList.add("button-container")
        buttonContainer.appendChild(button)

        body.appendChild(title)
        body.appendChild(category)
        body.appendChild(area)
        body.appendChild(tags)
        body.appendChild(buttonContainer)
        
        card.appendChild(thumbnail)
        card.appendChild(body)
        
        recipe.appendChild(card)
        
        recipes.push(recipe)
    }) 

    hideLoadingBar()
    addRecipes(recipes)
}

function createContainer(...types) {
    let container = document.createElement("div")
    types.forEach((type) => container.classList.add(type))
    return container
}

function createCardThumbnail(src) {
    let thumbnail = document.createElement("img")
    thumbnail.src = src
    thumbnail.classList.add("card-img-top")
    return thumbnail
}

function createCardData(element, type, text) {
    let data = document.createElement(element)
    data.classList.add(type)
    data.textContent = text
    return data
}

function createRef(id) {
    return `recipe.html?i=${id}`
}

function createCardLink(href, ...types) {
    let button = document.createElement("a")
    types.forEach(type => button.classList.add(type))
    button.href = href
    button.textContent = "¡A cocinar!"
    return button
}

function addRecipes(recipes) {
    // Hacer rows de cuatro recipes
    for(let start = 0; start <= recipes.length - 1; start += 4) {
        let row = createContainer("div", "row")
        let end = start + 4
        row.style.animationIterationCount

        if (recipes.length > end) children = recipes.slice(start, end)
        else children = recipes.slice(start, recipes.length)

        children.forEach((recipe) => row.appendChild(recipe))
        recipesContainer.appendChild(row)
    }
}



const recipesA = document.querySelector("#a-button")
const click = new Event('click')
recipesA.dispatchEvent(click)

// ¿Debo agregar mis estilos a un css diferente?
// ¿Hacer chunks para que cada página tenga sólo el script necesario?
// ¿Dropdown para escoger ver por país o alfabeticamente? (Eliminar página country.html)