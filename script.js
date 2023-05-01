"use strict"

const endpoint = "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";
// two folders in firebase /users & /characters

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