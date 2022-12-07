let colorData = [];
let htmlFeed = "";
const modeBtn = document.querySelector("#mode-btn");
const mode = document.getElementById("mode");
const form = document.getElementById("get-color-scheme-form");
const color = document.getElementById("color");

form.addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("hex-value").textContent = `Hex value: ${color.value}`
    fetch(`https://www.thecolorapi.com/scheme?hex=${color.value.slice(1,7)}&mode=${mode.value}&count=5`)
            .then (response => response.json())
            .then (data => {
                colorData = data.colors;
                renderColors(colorData);
            });
})

renderColors = colorData => {
    htmlFeed = "";
    for (let i = 0; i < colorData.length; i++){
        htmlFeed += `
            <div class="color-container">
                <div class="color" id="color${i}"
                    style="background-color: ${colorData[i].hex.value}">
                </div>
                <div class="color-name" id="color${i}-name">
                    Hex value: ${colorData[i].hex.value}
                </div>
            </div>    
            `
    }
    document.getElementById("main-container").innerHTML = htmlFeed;
}

