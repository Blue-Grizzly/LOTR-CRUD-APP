"use strict"

const endpoint = "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp(){

    document.querySelector("#sortbyselect").addEventListener("change", event=>
        showCharacters(sortByOption(event.target.value)));
    document.querySelector("#input-search").addEventListener("keyup", event=> 
        showCharacters(searchByName(event.target.value)));
    document.querySelector("#input-search").addEventListener("search", event=> 
        showCharacters(searchByName(event.target.value)));
    document.querySelector("#filterby").addEventListener("change", event=>
        showCharacters(filterByRace(event.target.value)));
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
        return characters.sort(character1.name.localeCompare(character2.name));
    } else if (sortValue === "age"){
        return characters.sort(()=>character1.age - character2.age);
    } else if (sortValue === "title"){
        return characters.sort(()=> character1.title.localeCompare(character2.title));
    } else if (sortValue === "race"){
        return characters.sort(()=>character1.race.localeCompare(character2.race));
    }
}


function filterByRace(inputValue){
    inputValue = inputValue.toLowerCase();
    
    return characters.filter(()=>haracter.race.toLowerCase().includes(inputValue));
}