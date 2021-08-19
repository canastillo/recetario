const grid = document.getElementById('grid');

fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let countries = data.meals
        //console.log(meals)
        //console.log(meals.length)

        let bloques = []

        flags = ["us", "gb", "ca", "cn", "hr", "nl", "eg", "fr", "gr", "in",
            "ie", "it", "jm", "jp", "ke", "my", "mx", "ma", "pl", "pt",
            "ru", "es","th", "tn", "tr", "eu", "vn"
        ]

        for (let i = 0; i < countries.length; i++) {

            let country = countries[i]
            let countryName = country.strArea

            let currentHTML =
                `
                            <div class="mb-5 col">
                                <div class="card border-0 rounded-3 bg-light text-center">
                                    <a href="javascript:void(0)" class="text-decoration-none text-reset">
                                        <img src="https://www.countryflags.io/${flags[i]}/flat/64.png" class="card-img-top"
                                            alt="${countryName}" style="max-width: 64px">
                                        <div class="card-body">
                                            <h5 class="card-title">${countryName}</h5>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            `
            bloques.push(currentHTML)
        }

        grid.innerHTML = bloques.join('')



    })