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
    searchValue = searchValue.toLowerCase();

    const results = characters.filter(checkNames);

    function checkNames(post){
        const name = post.title.toLowerCase();
        return name.includes(searchValue);
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
        console.log("elf");
        const race = character.race.toLowerCase();
        return race.includes(searchValue);
    }    
    
    function filterMen(character){
        console.log("men");
        const race = character.race.toLowerCase();
        return race.includes(searchValue);
    }    
    
    function filterDwarf(character){
        console.log("dwarf");
        const race = character.race.toLowerCase();
        return race.includes(searchValue);
    }    
    
    function filterOrc(character){
        console.log("orc");
        const race = character.race.toLowerCase();
        return race.includes(searchValue);
    }    
    
    function filterAinur(character){
        console.log("ainur");
        const race = character.race.toLowerCase();
        return race.includes(searchValue);
    }    
    
    function filterHobbit(character){
        console.log("hobbit");
        const race = character.race.toLowerCase();
        return race.includes(searchValue);
    }

}