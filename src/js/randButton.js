const results = document.getElementById('results');


const randomButton = document.getElementById('randomBtn');
const searchButton = document.getElementById('searchBtn');

randomButton.addEventListener('click', searchRand);
searchButton.addEventListener('click', search);

//-----------------------CODIGO QUE SE ENCONTRABA PAGINA INDEX---------------

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


//-------------------------------------

function searchRand() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            //console.log(data);

            let meal = data.meals[0] //obtiene primer elem de array

            let title = meal.strMeal //titulo
            let inst = meal.strInstructions //instrucciones
            let img = meal.strMealThumb //imagen

            let ingArray = [] //Array donde se guardaran los ingredientes

            for (let i = 1; i <= 20; i++) { //como cada ingrediente es un elemento del array distinto solo cambiando el numero final, se usa un for loop
                if (meal[`strIngredient${i}`]) {
                    ingArray.push(meal[`strIngredient${i}`]) //solo mete al array donde ingredientes contenga texto
                } else break;
            }

            //se crea la estructura html para luego meterla al div con id results
            results.innerHTML = `

                            <h3>${title}</h3>
                            <img src="${img}" alt="${title}">
                            <div>${inst}<div>
                            <div>
                                <h5>Ingredientes:</h5>
                                            <ul>
                                                ${ingArray.map(ingredient => `<li>${ingredient}</li>`).join('')}
                                            </ul>
                            </div>`
                                    })
                            }


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
                    let title = meal.strMeal //titulo
                    let img = meal.strMealThumb //imagen

                    let currentHTML =
                        `
                <div class="mb-4 col">
                <div class="card border-0 rounded-3 bg-light text-center h-100">
                    <a href="#" class="text-decoration-none text-reset">
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
