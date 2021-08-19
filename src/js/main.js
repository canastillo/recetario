let recetasContenedor = document.querySelector("#recetas-container");
let ingredientesContenedor = document.querySelector("#ingredientes-container");

const searchButton = document.getElementById('searchBtn');

searchButton.addEventListener('click', search);

///Recuperación de lista de recetas

fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => {
        data['meals'].forEach(receta => {
            let card = createCardCategoria(receta)
            recetasContenedor.appendChild(card)
        })
    })
    .catch(error => console.log(error))

const createCardCategoria = (receta) =>{
    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("card-recipe")

    let imagenReceta = document.createElement("img")
    imagenReceta.src = receta["strMealThumb"]

    let nombrePlatillo = document.createElement("h2")
    nombrePlatillo.textContent = receta["strMeal"]

    card.appendChild(imagenReceta)
    card.appendChild(nombrePlatillo)

    return card
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

    let link = document.createElement("a")
    link.href = `ingredient.html?i=${nombreIngrediente}`
    link.classList.add("text-decoration-none")
    link.classList.add("text-reset")

    let tituloIngrediente = document.createElement("h2")
    tituloIngrediente.textContent = nombreIngrediente

    let imagenIngrediente = document.createElement("img")
    let urlImagen = `https://www.themealdb.com/images/ingredients/${nombreIngrediente}.png`
    imagenIngrediente.src = urlImagen

    link.appendChild(imagenIngrediente)
    link.appendChild(tituloIngrediente)
    card.appendChild(link)

    return card
}

<<<<<<< HEAD
// Funcionamiento del botón random

const randomButton = document.querySelector("#random-button")

randomButton.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
=======

function search() {
    let searchInput = document.getElementById('searchInput').value;


    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
>>>>>>> adev
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
<<<<<<< HEAD
            let meal = data.meals[0] //obtiene primer elem de array
            let id = meal["idMeal"]

            location.href = `./recipe.html?i=${id}`

        })
})
=======
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
                    let title = meal.strMeal //titulo
                    let img = meal.strMealThumb //imagen

                    let currentHTML =
                        `
                <div class="mb-4 col">
                <div class="card border-0 rounded-3 bg-light text-center h-100">
                    <a href="./recipe.html?i=${title}" class="text-decoration-none text-reset">
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
>>>>>>> adev
