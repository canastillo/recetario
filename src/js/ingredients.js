const grid = document.getElementById('grid');

fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let meals = data.meals
        let url = "https://www.themealdb.com/images/ingredients/"

        let bloques = []

        for (let i = 0; i < 36; i++) {
            let ingred = meals[i]

            let id = ingred.idIngredient
            let name = ingred.strIngredient
            let desc = ingred.strDescription

            let complete_url = url + name + ".png"


            let currentHTML = 
                            `
                            <div class="mb-4 col">
                                <div class="card card-ingredient border-0 rounded-3 bg-light text-center h-100">
                                    <a href="./ingredient.html?i=${name}" class="text-decoration-none text-reset">
                                        <img src="${complete_url}" class="card-img-top"
                                            alt="${name}">
                                        <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            `
            bloques.push(currentHTML)
        }

        grid.innerHTML = bloques.join('')
    })