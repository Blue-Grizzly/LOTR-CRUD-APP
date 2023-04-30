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


