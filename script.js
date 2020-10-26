let menuDisplayed = false;
let radioButtons = document.getElementsByClassName("days");
let radioChecked = false;
let dayGoal;
let habitArray = [];

setupEventListeners();
importArray();



// Collection of all event listeners
function setupEventListeners(){
    document.getElementById("toggleMenu").addEventListener("click", toggleMenu); //Click listener to hamburger menu
    document.getElementById("submit").addEventListener("click", submitForm); //Click listener to submit-button
}

//Importing array from local storage
function importArray(){
    for (var i = 0; i < (localStorage.length / 4); i++){ //For every saved habit in local storage - import habits to array
        habitArray.push(new Habit(localStorage.getItem("habitArray[" + i + "].name"), localStorage.getItem("habitArray[" + i + "].goal"), localStorage.getItem("habitArray[" + i + "].deadline")));
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

//Constructor function for adding new habit
function Habit(name, goal, deadline){

    this.name = name;
    this.goal = goal;
    this.deadline = deadline;
    this.plant = "Pictures/flower.svg";

}

//Submit add habit-form
function submitForm(){
    checkRadio();

    if (habitName.value.length <= 0 || radioChecked === false || habitDate.value.length <= 0) {
        document.getElementById("error").innerHTML = "Please fill in all fields!";
    } else {
        habitArray.push(new Habit(habitName.value, dayGoal, habitDate.value));
        for (var i = 0; i < habitArray.length; i++){ //For every item in array - save object to local storage
            localStorage.setItem("habitArray[" + i + "].name", habitArray[i].name);
            localStorage.setItem("habitArray[" + i + "].goal", habitArray[i].goal);
            localStorage.setItem("habitArray[" + i + "].deadline", habitArray[i].deadline);
            localStorage.setItem("habitArray[" + i + "].plant", habitArray[i].plant);
        }
    }
       
}

//Check if radio buttons are checked and if yes, which one
function checkRadio(){
    for (var i=0; i < radioButtons.length; i++){ //For every radio-button
        if (radioButtons[i].checked === true){ //Check if a button is checked
            radioChecked = true; //If a button is checked - radioChecked = true
            dayGoal = i + 1; //Save chosen daygoal
        }
    }
}