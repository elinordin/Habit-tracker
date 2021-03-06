let menuDisplayed = false;
let radioButtons = document.getElementsByClassName("days");
let radioChecked = false;
let dayGoal;
let habitArray = [];
let currentPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
let todaysDate = new Date().toISOString().slice(0, 10);

//-------------------------------PROGRAM RUNNING--------------------------------------
    
checkLocalStorageForDate();

if (todaysDate !== localStorage.getItem("savedDate")) {
    resetChecked();
};

importArrayFromLocalStorage();

if (currentPage === "index.html") {
    displayHabitBoxes();
}

setupEventListeners();


//----------------------------------FUNCTIONS----------------------------------------_

function checkLocalStorageForDate() {
    if (localStorage.getItem("savedDate") === null) {
        localStorage.setItem("savedDate", todaysDate);
    }
};

function resetChecked(){
    localStorage.setItem("savedDate", todaysDate);

    for (let i=0; i < ((localStorage.length/5) - 1); i++) {
        localStorage.setItem("habitArray[" + i + "].checked", "false")
    }
};


// Collection of all event listeners
function setupEventListeners(){
    document.getElementById("toggleMenu").addEventListener("click", toggleMenu); //Click listener to hamburger menu
    
    if (currentPage === "addhabit.html") {
        document.getElementById("submit").addEventListener("click", submitForm); //Click listener to submit-button
    }
    if (currentPage === "index.html"){
       for (let i = 0; i < habitArray.length; i++){
            document.getElementById("delete" + i).addEventListener("click", function(){
                deleteHabit(i);
            })
            document.getElementById("checked" + i).addEventListener("click", function(){
                toggleCheckMark(i);
            })
       }
    }
    if (currentPage === "status.html"){
        document.getElementsByClassName("lightUnevenCircle")[0].addEventListener("click", displayLearnings);
    }

}


//Importing array from local storage
function importArrayFromLocalStorage(){
    for (let i = 0; i < ((localStorage.length / 5) - 1); i++){ //For every saved habit in local storage - import habits to array
        habitArray.push(new Habit(localStorage.getItem("habitArray[" + i + "].name"), localStorage.getItem("habitArray[" + i + "].goal"), localStorage.getItem("habitArray[" + i + "].deadline"), localStorage.getItem("habitArray[" + i + "].checked")));
    }
}

//Importing local storage from array
function importLocalStorageFromArray(){
    for (let i = 0; i < habitArray.length; i++){ //For every item in array - save object to local storage
        localStorage.setItem("habitArray[" + i + "].name", habitArray[i].name);
        localStorage.setItem("habitArray[" + i + "].goal", habitArray[i].goal);
        localStorage.setItem("habitArray[" + i + "].deadline", habitArray[i].deadline);
        localStorage.setItem("habitArray[" + i + "].plant", habitArray[i].plant);
        localStorage.setItem("habitArray[" + i + "].checked", habitArray[i].checked);      
    }
}

//Toggles menu
function toggleMenu(){
    if (menuDisplayed == false){ // If menu is not displayed
        document.getElementById("menu").style.display = "block";
        menuDisplayed = true;
    } else if (menuDisplayed){ //If menu is displayed
        document.getElementById("menu").style.display = "none";
        menuDisplayed = false;
    }
}

//Toggle the style of the checkmark
function toggleCheckMark(i){
    console.log(habitArray[i].checked);
   if (habitArray[i].checked == "false"){ //If checkmark is not checked
        document.getElementById("checkIcon" + i).classList.remove("false");
        document.getElementById("checkIcon" + i).classList.add("true");
        habitArray[i].checked = "true";
        plantGrow(i);
        localStorage.setItem("habitArray[" + i + "].checked", habitArray[i].checked)
   } else if (habitArray[i].checked == "true"){ //If checkmark is checked
        document.getElementById("checkIcon" + i).classList.remove("true");
        document.getElementById("checkIcon" + i).classList.add("false");
        habitArray[i].checked = "false";
        localStorage.setItem("habitArray[" + i + "].checked", habitArray[i].checked)
   }


}

//Constructor function for adding new habit
function Habit(name, goal, deadline, checked){

    this.name = name;
    this.goal = goal;
    this.deadline = deadline;
    this.plant = "Pictures/plant0.svg";
    this.checked = checked;

}

//Submit add habit-form
function submitForm(){
    checkRadio();

    if (habitName.value.length <= 0 || radioChecked === false || habitDate.value.length <= 0) {
        document.getElementById("error").innerHTML = "Please fill in all fields!";
    } else {
        habitArray.push(new Habit(habitName.value, dayGoal, habitDate.value, false));
        importLocalStorageFromArray();
        location.replace("index.html");
    }
    
       
}

//Check if radio buttons are checked and if yes, which one
function checkRadio(){
    for (let i=0; i < radioButtons.length; i++){ //For every radio-button
        if (radioButtons[i].checked === true){ //Check if a button is checked
            radioChecked = true; //If a button is checked - radioChecked = true
            dayGoal = i + 1; //Save chosen daygoal
        }
    }
}

//Importing HTML-element to startPage
function displayHabitBoxes(){
    for (let i=0; i < habitArray.length; i++){

        let newHtml = "<div id='habit" + i + "'class='habit'>" +
                            "<div id='delete" + i + "'><i class='fas fa-times'></i></div>" +
                            "<img class='greenPlant' src='" + habitArray[i].plant + "' alt='green plant'>" + 
                            "<p class='habitText'>" + habitArray[i].name + "</p>" +
                            "<button id='checked" + i + "'class='checked'><i id='checkIcon" + i + "'class='fas fa-check " + habitArray[i].checked + "'></i></button>" +
                        "</div>";
        
        let startPage = document.getElementById("startPage");
        
        startPage.innerHTML += newHtml;
    }
}

//Deleting habit from startPage, array and local storage
function deleteHabit(i){

    let clickedHabit = document.getElementById("habit" + i);
    clickedHabit.remove();

    habitArray.splice(i, 1);
    localStorage.clear()

    importLocalStorageFromArray();
}

//Displays learnings
function displayLearnings(){
    document.getElementById("learnings").style.display = "block";
}

function plantGrow(i){
    document.getElementsByClassName("greenPlant")[i].classList.add("fadeOut");
    document.getElementsByClassName("greenPlant")[i].src = "Pictures/plant1.svg";
    document.getElementsByClassName("greenPlant")[i].classList.add("fadeIn");
}