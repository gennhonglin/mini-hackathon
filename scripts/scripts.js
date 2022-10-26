//Array of Types
const typing = ["fire", "water", "grass", "electric", "flying", "ground", "ice", "dragon", "fairy", "normal", "dark", "ghost", "psychic", "steel", "poison", "rock" , "bug"];

//Makes sure we have only 4 types of choices displayed on the page
let typeTracker = [];


//This should reset the page and print out the new pokemon data and new choices to choose from
function reset() {
    let pokemonImgContainer = document.querySelector(".pokemon__test--container");
    let pokemonButtonContainers = document.querySelector(".pokemon__test--type");

    randomNum = Math.floor(Math.random() *  904) + 1;
    poke = axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
    poke.then(pokemon => {
        pokemonImgContainer.innerHTML = "";
        pokemonButtonContainers.innerHTML = "";
        typeTracker = [];
        newScreen(pokemon);

        const pokemonType = document.getElementsByClassName("pokemon__test--button");
        for(let i = 0; i < pokemonType.length; i++) {
            pokemonType[i].addEventListener("click", () => {
                compare(pokemonType[i].value, pokemon.data.types[0].type.name);
                reset();
            })
        }
    }) 

}

//This function takes in a object in the parameter and develops the page for the pokemon object data to be displayed
function newScreen(pokemon) {
    let pokemonImgContainer = document.querySelector(".pokemon__test--container");
    let pokemonButtonContainers = document.querySelector(".pokemon__test--type");
    let pokemonImg = document.createElement("img");
    pokemonImg.src = pokemon.data.sprites.other.home.front_default;
    pokemonImg.classList.add("pokemon__test--img");

    pokemonImgContainer.appendChild(pokemonImg);
    pokemonContainer.prepend(pokemonImgContainer);

    //This loop pretty much loops through the typings and choose random typings to put in the button
    //And places them in an array of size 4 for the exact 4 buttons to be displayed
    while(typeTracker.length < 4) {
        let typeRandom = Math.floor(Math.random() * 17);
        let duplicateType = false;
        //This pushes data in first just so the array contains something first
        if(typeTracker.length === 0) {
            typeTracker.push(pokemon.data.types[0].type.name);
        } else {
            //This loop makes sure to check if the array that we are pushing into contains the data we randomly chose and if it is in there
            //set duplicate to true and if not leave it as false
            for(let i = 0; i < typeTracker.length; i++) {
                if(typeTracker[i] === typing[typeRandom]) {
                    duplicateType = true;
                }
            }
            //This if statement checks if the variable we store our true and false from above is true or false and that determines if it
            //gets pushed in and if theres a duplicate do not push it in and if it isn't in there push the data into the array
            if(duplicateType === true) {
                continue;
            } else {
                typeTracker.push(typing[typeRandom]);
            }
           
        }

    }

    //This for loops just develops all 4 buttons
    for(let i = 0; i < 4; i++) {
        
        let pokemonButton = document.createElement("button");
        pokemonButton.innerText = typeTracker[i];
        pokemonButton.classList.add("pokemon__test--button");
        pokemonButton.value = typeTracker[i];
        pokemonButtonContainers.appendChild(pokemonButton);
    }

    //Append everything we did in that for loop into the parent for it to be displayed
    pokemonContainer.appendChild(pokemonButtonContainers);
    
}

//Just to make the code down below a little smaller I made this Compare function to print out correct if its right and incorrect if its wrong
function compare(x, y) {
    if(x === y) {
        alert("Correct");
    } else {
        alert("INCORRECT");
    }
}

//Generates a value between 1 - 904 and gives us value to access the specific page of data from the API
let randomNum = Math.floor(Math.random() *  904) + 1;

//Gives us access to the API data
let poke = axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`);

let pokemonContainer = document.querySelector(".pokemon__test");


//This is when the page loads up for the first time and displays everything on the page for the first time.
poke.then (pokemon => {
        
    newScreen(pokemon);

    const pokemonType = document.getElementsByClassName("pokemon__test--button");
    //This loop allows us to click any of the buttons and make it compare it to the data we got from the website to see
    //If it is the same and is return correct and if not return incorrect
    //After comparing it should reset the page and allow the users to infinitely play the quiz` 
    for(let i = 0; i < pokemonType.length; i++) {
        pokemonType[i].addEventListener("click", () => {
            compare(pokemonType[i].value, pokemon.data.types[0].type.name);
            reset();
        })
    }
}) 
