"use strict";

const endpoint =
  "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

let characterList;

window.addEventListener("load", initApp);

function initApp() {
  updateCharactersGrid();
  document
    .querySelector("#btn-create-character")
    .addEventListener("click", showCreateCharacterDialog);
  document
    .querySelector("#form-create-character")
    .addEventListener("submit", createCharacterClicked);

  document
    .querySelector("#form-update-character .btn-cancel")
    .addEventListener("click", cancelUpdate);

  document
    .querySelector("#dialog-failed-to-update .btn-cancel")
    .addEventListener("click", closeUpdateFailedDialog);

  document
    .querySelector("#form-create-character .btn-cancel")
    .addEventListener("click", closeCreateCharacterModal);
  document
    .querySelector("#form-update-character")
    .addEventListener("submit", updateCharacterClicked);

  document
    .querySelector("#sortbyselect")
    .addEventListener("change", (event) =>
      showCharacters(sortByOption(event.target.value))
    );
  document
    .querySelector("#input-search")
    .addEventListener("keyup", (event) =>
      showCharacters(searchByName(event.target.value))
    );
  document
    .querySelector("#input-search")
    .addEventListener("search", (event) =>
      showCharacters(searchByName(event.target.value))
    );
  document
    .querySelector("#filterby")
    .addEventListener("change", (event) =>
      showCharacters(filterByRace(event.target.value))
    );
}

function closeCreateCharacterModal(event) {
  event.preventDefault();
  console.log("cancel CreateCharacter Clicked");
  document.querySelector("#dialog-create-character").close();
}
function closeUpdateFailedDialog() {
  console.log("Close failed to update clicked!");
  document.querySelector("#dialog-failed-to-update").close();
}
function cancelUpdate(event) {
  event.preventDefault();
  console.log("Cancel button clicked!");
  document.querySelector("#dialog-update-character").close();
}

function updateClicked(characterObject) {
  //saves the form in as a variable so easier to use below
  const updateForm = document.querySelector("#form-update-character");

  //the following makes info from object be displayed in the ModalWindow to provide
  //Feedback to the user

  updateForm.name.value = characterObject.name;
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
  document.querySelector("#dialog-update-character").showModal();

  console.log("Update button clicked");
}
// }

function updateCharacterClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-update-character");
  // extract the values from inputs in the form
  const name = form.name.value;
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
    name,
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

//  Updates an existing character
async function updateCharacter(
  id,
  name,
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
    name: name,
    race: race,
    image: image,
    age: age,
    birth: birth,
    culture: culture,
    death: death,
    gender: gender,
    language: language,
    magical: magical,
    realm: realm,
    title: title,
    weapon: weapon,
  };
  // Converts the JS object to JSON string
  const json = JSON.stringify(characterToUpdate);
  // PUT fetch request with JSON in the body. Calls the specific element in resource
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "PUT",
    body: json,
  });
  // Checks if response is ok - if the response is successful
  if (response.ok) {
    console.log("Character succesfully updated in Firebase!");
    updateCharactersGrid();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

// 4. Som en administrativ bruger vil jeg gerne kunne slette et {item} så det forsvinder fra databasen.

// 5. Som en daglig bruger vil jeg gerne have tydelig feedback på når jeg sletter et {item},
//  så jeg ved at jeg har fjernet noget fra listen.

async function deleteCharacter(characterObject) {
  const id = characterObject.id;
  const response = await fetch(`${endpoint}/characters/${id}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Character successfully deleted from Firebase!");
    showDeleteFeedback("Character is deleted!");
    updateCharactersGrid();
  }
}

function showDeleteFeedback(message) {
  const dialog = document.getElementById("dialog-delete-feedback");
  const dialogMessage = document.getElementById(
    "dialog-delete-feedback-message"
  );
  dialogMessage.textContent = message;
  dialog.showModal();
  setTimeout(closeDialog, 1000);

  function closeDialog() {
    dialog.close();
  }
}

function showCreateCharacterDialog() {
  document.querySelector("#dialog-create-character").showModal();
  console.log("Create New Character clicked!");
}

function createCharacterClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-create-character");
  const name = form.name.value;
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
  createCharacter(
    name,
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
  );
  form.reset();
  document.querySelector("#dialog-create-character").close();
}

async function updateCharactersGrid() {
  characterList = await getCharacters();
  showCharacters(characterList);
}

async function getCharacters() {
  const response = await fetch(`${endpoint}/characters.json`);
  const data = await response.json();
  return prepareData(data);
}

function showCharacters(characterList) {
  document.querySelector("#characters").innerHTML = "";

  for (const character of characterList) {
    showCharacter(character);
  }
}

function showCharacter(characterObject) {
  const html = /*html*/ `
        <article class="grid-item">
            <img src="${characterObject.image}" />
            <h3>Name: ${characterObject.name}</h3>
            <p>Age: ${characterObject.age}</p>
            <p>Birth: ${characterObject.birth}</p>
            <p>Culture: ${characterObject.culture}</p>
            <p>Death: ${characterObject.death}</p>
            <p>Gender: ${characterObject.gender}</p>
            <p>Language: ${characterObject.language}</p>
            <p>Magical ${characterObject.magical}</p>
            <p>Race: ${characterObject.race}</p>
            <p>Realm: ${characterObject.realm}</p>
            <p>Title: ${characterObject.title}</p>
            <p>Weapon: ${characterObject.weapon}</p>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </div>
        </article>
    `;
  document.querySelector("#characters").insertAdjacentHTML("beforeend", html);

  document
    .querySelector("#characters article:last-child .btn-delete")
    .addEventListener("click", () => deleteCharacter(characterObject));
  document
    .querySelector("#characters article:last-child .btn-update")
    .addEventListener("click", () => updateClicked(characterObject));
}

async function createCharacter(
  name,
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
  const newCharacter = {
    name: name,
    race: race,
    image: image,
    age: age,
    birth: birth,
    culture: culture,
    death: death,
    gender: gender,
    language: language,
    magical: magical,
    realm: realm,
    title: title,
    weapon: weapon,
  };
  console.log(newCharacter);
  const json = JSON.stringify(newCharacter);
  const response = await fetch(`${endpoint}/characters.json`, {
    method: "POST",
    body: json,
  });
  if (response.ok) {
    console.log("New character succesfully added to Firebase!");
    updateCharactersGrid();
  }
}

function prepareData(dataObject) {
  const characterArray = [];
  for (const key in dataObject) {
    const character = dataObject[key];
    character.id = key;
    characterArray.push(character);
  }
  console.log(characterArray);
  return characterArray;
}

function searchByName(searchValue) {
  searchValue = searchValue.toLowerCase().trim();
  return characterList.filter(checkNames);

  function checkNames(character) {
    return character.name.toLowerCase().includes(searchValue);
  }
}

function sortByOption(sortValue) {
  if (sortValue === "name") {
    return characterList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "age") {
    return characterList.sort((a, b) => a.age - b.age);
  } else if (sortValue === "title") {
    return characterList.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "race") {
    return characterList.sort((a, b) => a.race.localeCompare(b.race));
  }
}

function filterByRace(inputValue) {
  inputValue = inputValue.toLowerCase();
  if(inputValue !== "filterall"){
  return characterList.filter((character) =>
    character.race.toLowerCase().includes(inputValue)
  );} else{
    updateCharactersGrid();
  }
}
