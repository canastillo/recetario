const grid = document.getElementById('grid');

fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log(data);
        let meals = data.meals
        let url = "https://www.themealdb.com/images/ingredients/"
        //console.log(meals)

        let bloques = []
        //let fragment = document.createDocumentFragment();

        for (let i = 0; i < 36; i++) {
            let ingred = meals[i]

            let id = ingred.idIngredient
            let name = ingred.strIngredient
            let desc = ingred.strDescription

            let complete_url = url + name + ".png"


            let currentHTML = 
                            `
                            <div class="mb-4 col">
                                <div class="card border-0 rounded-3 bg-light text-center h-100">
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
            


            /*Otra buena opcion para crear elementos de forma dinamica, el problema es que no respetaba boostrap classes

            const col = document.createElement('div');
            col.setAttribute('class', 'mb-4 col');

            const card = document.createElement('div');
            col.setAttribute('class', 'card');

            const a = document.createElement('a');
            col.setAttribute('class', 'text-decoration-none text-reset');

            const img = document.createElement('img');
            col.setAttribute('class', 'card-img-top');
            img.src = complete_url;
            img.alt = name

            const card_body = document.createElement('div');
            col.setAttribute('class', 'card-body');

            const h5 = document.createElement('h5');
            col.setAttribute('class', 'card-title');
            h5.textContent = name;

            card_body.appendChild(h5)
            a.appendChild(img)
            a.appendChild(card_body)
            card.appendChild(a)
            col.appendChild(card)
            fragment.appendChild(col);
            */

        }

        grid.innerHTML = bloques.join('')
        //grid.appendChild(fragment)
    })