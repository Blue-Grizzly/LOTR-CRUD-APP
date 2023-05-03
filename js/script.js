import { getCharacters, createCharacter, updateCharacter, deleteCharacter } from "./rest-service.js";
import { filterByRace, sortByOption, searchByName } from "./helpers.js";

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

async function updateCharacterClicked(event) {
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

  const response = await updateCharacter(
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
  if (response.ok) {
    document.querySelector("#dialog-update-character").close();
    updateCharactersGrid();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Something went wrong. Please, try again!");
    event.target.parentNode.close();
  }
}

// 4. Som en administrativ bruger vil jeg gerne kunne slette et {item} så det forsvinder fra databasen.

// 5. Som en daglig bruger vil jeg gerne have tydelig feedback på når jeg sletter et {item},
//  så jeg ved at jeg har fjernet noget fra listen.

function showDeleteFeedback() {
  const dialog = document.getElementById("dialog-delete-feedback");
  const dialogMessage = document.getElementById(
    "dialog-delete-feedback-message"
  );
  dialogMessage.textContent;
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

async function createCharacterClicked(event) {
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
  const response = await createCharacter(
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
  if (response.ok) {
    document.querySelector("#dialog-create-character").close();
    updateCharactersGrid();
    form.reset();
    hideErrorMessage();
    event.target.parentNode.close();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Something went wrong. Please, try again!");
  }
}

async function updateCharactersGrid() {
  characterList = await getCharacters();
  showCharacters(characterList);
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
        <div class="clickable">    
            <img src="${characterObject.image}" />
            <h3>Name: ${characterObject.name}</h3>
            <p>Age: ${characterObject.age}</p>
            <p>Race: ${characterObject.race}</p>
        </div>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </div>
        </article>
    `;
  document.querySelector("#characters").insertAdjacentHTML("beforeend", html);

  const gridItem = document.querySelector(
    "#characters article:last-child .clickable"
  );

  gridItem.addEventListener("click", () => {
    showCharacterModal(characterObject);
  });

  document
    .querySelector("#characters article:last-child .btn-delete")
    .addEventListener("click", () => deleteCharacterClicked(characterObject));
  document
    .querySelector("#characters article:last-child .btn-update")
    .addEventListener("click", () => updateClicked(characterObject));
}

function showCharacterModal(characterObject) {
  const modal = document.createElement("dialog");
  modal.innerHTML = /*html*/ `
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
  `;
  document.body.appendChild(modal);
  modal.showModal();
  modal.addEventListener("click", () => {
    modal.remove();
  });
}

async function deleteCharacterClicked(characterObject) {
  const response = await deleteCharacter(characterObject);
  if (response.ok) {
    updateCharactersGrid();
    showDeleteFeedback();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

function showErrorMessage(message) {
  document.querySelector(".error-message").textContent = message;
  document.querySelector(".error-message").classList.remove("hide");
}

function hideErrorMessage() {
  document.querySelector(".error-message").textContent = "";
  document.querySelector(".error-message").classList.add("hide");
}

export {characterList};