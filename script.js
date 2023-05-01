"use strict"

const endpoint = "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";

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






