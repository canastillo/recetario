let recetasContenedor = document.querySelector("#recetas-container");

let ingredientesContenedor = document.querySelector("#ingredientes-container");

///Recuperación de lista de recetas

fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => {
        data['meals'].forEach(receta => {
            console.log(receta)
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