export function createContainer(...types) {
    let container = document.createElement("div")
    types.forEach((type) => container.classList.add(type))
    return container
}

export function createCardThumbnail(src) {
    let thumbnail = document.createElement("img")
    thumbnail.src = src
    thumbnail.classList.add("card-img-top")
    return thumbnail
}

export function createCardData(element, type, text) {
    let data = document.createElement(element)
    if (text.length > 40) data.classList.add("long-title")
    data.classList.add(type)
    data.textContent = text
    return data
}

// Creamos el link a la receta individual
export function createRef(id) {
    return `recipe.html?i=${id}`
}

export function createCardLink(href, ...types) {
    let button = document.createElement("a")
    types.forEach(type => button.classList.add(type))
    button.href = href
    button.textContent = "¡A cocinar!"
    return button
}

export function addRecipes(recipes) {
    let recipesContainer = document.querySelector("#recipes-container")
    // Armamos filas de cuatro recetas
    for(let start = 0; start <= recipes.length - 1; start += 4) {
        let row = createContainer("div", "row")
        let end = start + 4
        let children
        
        // Si quedan más de 4, agarramos 4, si no, agarramos las que queden
        if (recipes.length > end) children = recipes.slice(start, end)
        else children = recipes.slice(start, recipes.length)

        children.forEach((recipe) => row.appendChild(recipe))
        recipesContainer.appendChild(row)
    }
}

export function appendChildren(parent, ...children) {
    children.forEach(child => parent.appendChild(child))
}