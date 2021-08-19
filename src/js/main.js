let recetasContenedor = document.querySelector("#recetas-container");
let ingredientesContenedor = document.querySelector("#ingredientes-container");

const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', search);

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

    let imgReceta = document.createElement("img")

    imgReceta.style.maxWidth = "100%"
    imgReceta.src = receta["strMealThumb"]
    let link = document.createElement("a")
    link.href = `recipe.html?i=${receta.idMeal}`
    link.classList.add("text-decoration-none")
    link.classList.add("text-reset")

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

    card.appendChild(imgReceta)
    card.appendChild(nombrePlatillo)
    card.appendChild(buttonContainer)
    container.appendChild(card)

    let imagenReceta = document.createElement("img")
    imagenReceta.classList.add("mw-100")
    imagenReceta.src = receta["strMealThumb"]

    return container
    link.appendChild(imagenReceta)
    link.appendChild(nombrePlatillo)
    card.appendChild(link)

    return card
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


// busqueda

function search() {
    let searchInput = document.getElementById('searchInput').value;


    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data)

            let meals = data.meals
            let bloques = []

            if(meals == null){
                results.innerHTML = '<h3 class="mt-4 mb-5">No se encontraron resultados</h3>'
            }
            else{

                let gridHTML = `<h3 class="mt-4 mb-5">Resultados de la busqueda</h3>    
                                <div class="row row-cols-1 row-cols-md-4 g-4" id= "grid">`

                bloques.push(gridHTML)

                for (let i = 0; i < meals.length; i++) {

                    let meal = meals[i]
                    let id = meal.idMeal //id
                    let title = meal.strMeal //titulo
                    let img = meal.strMealThumb //imagen

                    let currentHTML =
                        `
                <div class="mb-4 col">
                <div class="card border-0 rounded-3 bg-light text-center h-100">
                    <a href="./recipe.html?i=${id}" class="text-decoration-none text-reset">
                        <img src="${img}" class="card-img-top"
                            alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                        </div>
                    </a>
                </div>
            </div>
                            `
                    bloques.push(currentHTML)
                }

                gridHTML ='</div>'
                 bloques.push(gridHTML)

            results.innerHTML = bloques.join('')
            }
               
        })

    }

