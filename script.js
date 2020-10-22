let menuDisplayed = false;


setupEventListeners();

function setupEventListeners(){
    document.getElementById("toggleMenu").addEventListener("click", toggleMenu);
}

function toggleMenu(){
    if (menuDisplayed == false){
        document.getElementById("menu").style.display = "block";
        menuDisplayed = true;
    } else if (menuDisplayed){
        document.getElementById("menu").style.display = "none";
        menuDisplayed = false;
    }
}