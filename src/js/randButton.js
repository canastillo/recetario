const results = document.getElementById('results');
const randomButton = document.getElementById('randomBtn');

randomButton.addEventListener('click', searchRand);

function searchRand() {
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
.then(function (response) {
return response.json();
})

.then(function (data) {
//console.log(data);

let meal = data.meals[0] //obtiene primer elem de array

let title = meal.strMeal   //titulo
let inst = meal.strInstructions //instrucciones
let img = meal.strMealThumb  //imagen

let ingArray = []  //Array donde se guardaran los ingredientes

for (let i=1; i<=20;i++){   //como cada ingrediente es un elemento del array distinto solo cambiando el numero final, se usa un for loop
    if(meal[`strIngredient${i}`]){
        ingArray.push(meal[`strIngredient${i}`])  //solo mete al array donde ingredientes contenga texto
    }
    else break;
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