let colorData = [];
let htmlFeed = "";
const modeBtn = document.querySelector("#mode-btn");
const mode = document.getElementById("mode");
const form = document.getElementById("get-color-scheme-form");
const color = document.getElementById("color");
let originalColor = "";

//original hex color displays 
color.addEventListener("change", function(e){
    e.preventDefault();
    document.getElementById("hex-value").innerHTML = `
        Original Color Hex value: ${color.value}
        <button id="copy-OG-btn" class="copy-btn">
            <i class="fa-regular fa-copy"></i>
        </button>
        `
    document.getElementById("step2-container").classList.remove("hidden");    
    modeBtn.classList.remove("hidden");   
    originalColor = color.value;
    const copyBtn = document.getElementById("copy-OG-btn");    
    copyBtn.addEventListener("click", function(e){
        navigator.clipboard.writeText(originalColor);
    });
});


//fetch color scheme from API 
form.addEventListener("submit", function(e){
    e.preventDefault();
    fetch(`https://www.thecolorapi.com/scheme?hex=${color.value.slice(1,7)}&mode=${mode.value}&count=5`)
            .then (response => response.json())
            .then (data => {
                colorData = data.colors;
                renderColors(colorData);
            });
})

//render colors onto page
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
                    <button id="copy-btn${i}" class="copy-btn" data-color${i}="color${i}-name" >
                        <i class="fa-regular fa-copy" data-color${i}="color${i}-name"></i>
                    </button>
                </div>
            </div>    
            `
    }
    document.getElementById("main-container").innerHTML = htmlFeed;
    document.addEventListener("click", function(e){
        if(e.target.dataset.color0) {
            navigator.clipboard.writeText(colorData[0].hex.value);
        } else if(e.target.dataset.color1) {
            navigator.clipboard.writeText(colorData[1].hex.value);
        } else if(e.target.dataset.color2) {
            navigator.clipboard.writeText(colorData[2].hex.value);
        } else if(e.target.dataset.color3) {
            navigator.clipboard.writeText(colorData[3].hex.value);
        } else if(e.target.dataset.color4) {
            navigator.clipboard.writeText(colorData[4].hex.value);
        }
    })
}


