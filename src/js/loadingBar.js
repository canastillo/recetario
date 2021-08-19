export function showLoadingBar(containerId) {
    let container = document.querySelector(containerId)
    let loader = document.querySelector("#loader")
    let rows = document.querySelectorAll(".row")

    // Quitamos las recetas que estaban
    rows.forEach(row => container.removeChild(row))

    if (loader) {
        loader.style.animationIterationCount = "infinite"
        loader.style.display = "block"
    } else 
        createLoadingBar(containerId)
}

function createLoadingBar(containerId) {
    let container = document.querySelector(containerId)
    let loader = document.createElement("div")

    loader.classList.add("loader")
    loader.id = "loader"
    container.appendChild(loader)
}

export function hideLoadingBar() {
    let loader = document.querySelector("#loader")
    loader.style.display = "none"
    loader.style.animationIterationCount = "0"
}