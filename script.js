"use strict";

const endpoint =
  "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp() {
  document
    .querySelector("#form-update-character .btn-cancel")
    .addEventListener("click", cancelUpdate);

    document
      .querySelector("#dialog-failed-to-update .btn-cancel")
      .addEventListener("click", closeUpdateFailedDialog);

  document
    .querySelector("#form-update-character")
    .addEventListener("submit", updateCharacterClicked);
}

function closeUpdateFailedDialog(){
    console.log("close failed to update clicked");
    document.querySelector("#dialog-failed-to-update").close();
}
function cancelUpdate() {
  console.log("cancel btn clicked");
  document.querySelector("#dialog-update-character").close();
}

function showCharacter(characterObject) {
  document
    .querySelector("#posts article:last-child .btn-update")
    .addEventListener("click", updateClicked);

  // called when update button is clicked

  function updateClicked() {
    //saves the form in as a variable so easier to use below
    const updateForm = document.querySelector("#form-update-post");

    //the following makes info from object be displayed in the ModalWindow to provide
    //Feedback to the user

    updateForm.charactername.value = characterObject.charactername;
    updateForm.race.value = characterObject.race; //sets value of the form title to that of the object.
    updateForm.image.value = characterObject.image;
    updateForm.age.value = characterObject.age;
    updateForm.birth.value = characterObject.birth;
    updateForm.culture.value = characterObject.culture;
    updateForm.death.value = characterObject.death;
    updateForm.gender.value = characterObject.gender;
    updateForm.language.value = characterObject.language;
    updateForm.magical.value = characterObject.magical;
    updateForm.realm.value = characterObject.realm;
    updateForm.title.value = characterObject.title;
    updateForm.weapon.value = characterObject.weapon;

    //sets the id of the form to the id for the specific object
    updateForm.setAttribute("data-id", characterObject.id);

    //shows the update form
    document.querySelector("#dialog-update-post").showModal();

    // console.log("Update button clicked");
  }
}

function updateCharacterClicked(event) {
  //event.preventDefault();
  const form = event.target;
  // extract the values from inputs in the form
  const characterName = form.characterName.value;
  const race = form.race.value;
  const image = form.image.value;
  const age = form.age.value;
  const birth = form.birth.value;
  const culture = form.culture.value;
  const death = form.death.value;
  const gender = form.gender.value;
  const language = form.language.value;
  const magical = form.magical.value;
  const realm = form.realm.value;
  const title = form.title.value;
  const weapon = form.weapon.value;
  //gets the id of the post
  const id = form.getAttribute("data-id");

  //puts in data from from passes it to updateCharacter
  updateCharacter(
    id,
    characterName,
    race,
    image,
    age,
    birth,
    culture,
    death,
    gender,
    language,
    magical,
    realm,
    title,
    weapon
  ); //match the parameters in updatepost!!!
  document.querySelector("#dialog-update-character").close();
}

//  Update an existing character
async function updateCharacter(
  id,
  characterName,
  race,
  image,
  age,
  birth,
  culture,
  death,
  gender,
  language,
  magical,
  realm,
  title,
  weapon
) {
  // Character object we update
  const characterToUpdate = {
    characterName,
    race,
    image,
    age,
    birth,
    culture,
    death,
    gender,
    language,
    magical,
    realm,
    title,
    weapon,
  };
  // convert the JS object to JSON string
  const json = JSON.stringify(characterToUpdate);
  // PUT fetch request with JSON in the body. Calls the specific element in resource
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "PUT",
    body: json,
  });
  // check if response is ok - if the response is successful
  if (response.ok) {
    console.log("Post succesfully updated in Firebase 🔥");
    updateCharactersGrid();
  }
  else{
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}







// 4. Som en administrativ bruger vil jeg gerne kunne slette et {item} så det forsvinder fra databasen.

// 5. Som en daglig bruger vil jeg gerne have tydelig feedback på når jeg sletter et {item},
//  så jeg ved at jeg har fjernet noget fra listen.


function deletecharacterClicked(event) {

const id = event.target.getAttribute("data-id");
deleteCharacter(id);

}


async function deleteCharacter(id) {
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Character successfully deleted from Firebase");
    showDeleteFeedback("Character is deleted");
    updateCharactersGrid(); 
  }
}


function showDeleteFeedback(message){

const dialog = document.getElementById("dialog-delete-feedback");
const dialogMessage = document.getElementById("dialog-delete-feedback-message");
dialogMessage.textContent = message;
dialog.showModal();
setTimeout(closeDialog, 3000);

function closeDialog(){
dialog.close();
}

}










window.addEventListener("load", initApp);

function initApp() {
updateCharactersGrid();
document.querySelector("#btn-create-character").addEventListener("click", showCreateCharacterDialog);
document.querySelector("#form-create-character").addEventListener("submit", createCharacterClicked);
}

function showCreateCharacterDialog() {
  document.querySelector("#dialog-create-character").showModal();
  console.log("Create New Character clicked!");
}

function createCharacterClicked(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const image = form.image.value;
  createCharacter(title, body, image);
  form.reset();
  document.querySelector("#dialog-create-character").close();
}

async function updateCharactersGrid() {
  const characterList = await getCharacters();
  showCharacters(characterList);
}

async function getCharacters(url) {
  const response = await fetch(url);
  const data = await response.json();
  return prepareData(data);
}

function showCharacters(listOfCharacters) {
  document.querySelector("#characters").innerHTML = "";

  for (const character of listOfCharacters) {
    showCharacter(character);
  }
}

function showCharacter(characterObject) {
  const html = /*html*/ `
        <article class="grid-item">
            <img src="${characterObject.image}" />
            <h3>${characterObject.age}</h3>
            <p>${characterObject.birth}</p>
            <p>${characterObject.culture}</p>
            <p>${characterObject.death}</p>
            <p>${characterObject.gender}</p>
            <p>${characterObject.language}</p>
            <p>${characterObject.magical}</p>
            <p>${characterObject.lotrName}</p>
            <p>${characterObject.race}</p>
            <p>${characterObject.realm}</p>
            <p>${characterObject.title}</p>
            <p>${characterObject.weapon}</p>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </div>
        </article>
    `;
  document.querySelector("#character").insertAdjacentHTML("beforeend", html);

  document.querySelector("#character article:last-child .btn-delete").addEventListener("click", deleteClicked);
  document.querySelector("#character article:last-child .btn-update").addEventListener("click", updateClicked);
}

async function createCharacter(age, birth, culture, death, gender, language, magical, lotrName, race, realm, title, weapon, image) {
  const newCharacter = {
    age: age,
    birth: birth,
    culture: culture,
    death: death,
    gender: gender,
    language: language,
    magical: magical,
    lotrName: lotrName,
    race: race,
    realm: realm,
    title: title,
    weapon: weapon,
    image: image,
  };
  console.log(newPost);
  const json = JSON.stringify(newPost);
  const response = await fetch(`${endpoint}/characters.json`, {
    method: "POST",
    body: json,
  });
  if (response.ok) {
    console.log("New character succesfully added to Firebase 🔥");
    updatePostsGrid();
  }
}


function prepareData(dataObject) {
  const characterArray = [];
  for (const key in dataObject) {
    const character = dataObject[key];
    character.id = key;
    console.log(post);
    characterArray.push(character);
  }
  console.log(characterArray);
  return characterArray;
}

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