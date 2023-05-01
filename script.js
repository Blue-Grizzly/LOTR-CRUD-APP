"use strict"

const endpoint = "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp(){

    document.querySelector("#sortbyselect").addEventListener("change", sortInputChange);
    document.querySelector("#input-search").addEventListener("keyup", searchInputChange);
    document.querySelector("#input-search").addEventListener("search", searchInputChange);
    document.querySelector("#filterby").addEventListener("change", filterByRaceChange);
}


function searchInputChange(event){
    const value = event.target.value;
    const searchResults = searchByName(value);
    showCharacters(searchResults);

}

function searchByName(searchValue){
    searchValue = searchValue.toLowerCase().trim();

    const results = characters.filter(checkNames);

    function checkNames(character){
        return character.name.toLowerCase().includes(searchValue);
    }
    
    return results
}

function sortInputChange(event){
    const value = event.target.value;
    const sortResult = sortByOption(value);
    showCharacters(sortResult);

}



function sortByOption(sortValue) {
    if(sortValue === "name"){
        return characters.sort(compareName);
    } else if (sortValue === "age"){
        return characters.sort(compareAge);
    } else if (sortValue === "title"){
        return characters.sort(compareTitle);
    } else if (sortValue === "race"){
        return characters.sort(compareRace);
    }

    function compareName(character1, character2){
        return character1.name.localeCompare(character2.name);
    }
    
    function compareAge(character1, character2){
        return character1.age - character2.age;
    }
    
    function compareTitle(character1, character2){
        return character1.title.localeCompare(character2.title);
    }

    function compareRace(character1, character2){
        return character1.race.localeCompare(character2.race);
    }

}



function filterByRaceChange(event){
    const value = event.target.value;
    const searchResults = filterByRace(value);
    showCharacters(searchResults);
}

function filterByRace(inputValue){
    inputValue = inputValue.toLowerCase();
    
    if (inputValue === "elf"){
        return characters.filter(filterElf);
    } else if (inputValue === "men"){
        return characters.filter(filterMen);
    } else if (inputValue === "dwarf"){
        return characters.filter(filterDwarf);
    } else if (inputValue === "orc"){
        return characters.filter(filterOrc);
    } else if (inputValue === "ainur"){
        return characters.filter(filterAinur);
    } else if (inputValue === "hobbit"){
        return characters.filter(filterHobbit);
    }


    function filterElf(character){
        return character.race.toLowerCase().includes(searchValue);
    }    
    
    function filterMen(character){
        return character.race.toLowerCase().includes(searchValue);
    }    
    
    function filterDwarf(character){
        return character.race.toLowerCase().includes(searchValue);
    }    
    
    function filterOrc(character){
        return character.race.toLowerCase().includes(searchValue);
    }    
    
    function filterAinur(character){
        return character.race.toLowerCase().includes(searchValue);
    }    
    
    function filterHobbit(character){
        return character.race.toLowerCase().includes(searchValue);

    }

}