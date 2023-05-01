"use strict"

const endpoint = "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp(){

    document.querySelector("#sortbyselect").addEventListener("change", event => showCharacters(sortByOption(event.target.value)));
    document.querySelector("#input-search").addEventListener("keyup", event => showCharacters(searchByName(event.target.value)));
    document.querySelector("#input-search").addEventListener("search", event => showCharacters(searchByName(event.target.value)));
    document.querySelector("#filterby").addEventListener("change", event => showCharacters(filterByRace(event.target.value)));
}



function searchByName(searchValue){
    searchValue = searchValue.toLowerCase().trim();

    return characters.filter(checkNames);

    function checkNames(character){
        return character.name.toLowerCase().includes(searchValue);
    }
    
}


function sortByOption(sortValue) {
    if(sortValue === "name"){
        return characters.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "age"){
        return characters.sort((a, b) => a.age - b.age);
    } else if (sortValue === "title"){
        return characters.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "race"){
        return characters.sort((a, b) => a.race.localeCompare(b.race));
    }
}


function filterByRace(inputValue){
    inputValue = inputValue.toLowerCase();
    
    return characters.filter(character=>character.race.toLowerCase().includes(inputValue));
}