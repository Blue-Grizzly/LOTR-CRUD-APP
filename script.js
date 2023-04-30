"use strict"

const endpoint = "https://lotr-crud-default-rtdb.europe-west1.firebasedatabase.app/";
// two folders in firebase /users & /characters

window.addEventListener("load", initApp);

function initApp() {
updatePostsGrid();
document.querySelector("#btn-create-post").addEventListener("click", showCreatePostDialog);
document.querySelector("#form-create-post").addEventListener("submit", createPostClicked);
}

function showCreatePostDialog() {
  document.querySelector("#dialog-create-post").showModal();
  console.log("Create New Post clicked!");
}

function createPostClicked(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const image = form.image.value;
  createPost(title, body, image);
  form.reset();
  document.querySelector("#dialog-create-post").close();
}

async function updatePostsGrid() {
  const postList = await getPosts();
  showPosts(postList);
}

async function getPosts(url) {
  const response = await fetch(url);
  const data = await response.json();
  return prepareData(data);
}

function showPosts(listOfPosts) {
  document.querySelector("#posts").innerHTML = "";

  for (const post of listOfPosts) {
    showPost(post);
  }
}

function showPost(postObject) {
  const html = /*html*/ `
        <article class="grid-item">
            <img src="${postObject.image}" />
            <h3>${postObject.age}</h3>
            <p>${postObject.birth}</p>
            <p>${postObject.culture}</p>
            <p>${postObject.death}</p>
            <p>${postObject.gender}</p>
            <p>${postObject.language}</p>
            <p>${postObject.magical}</p>
            <p>${postObject.lotrName}</p>
            <p>${postObject.race}</p>
            <p>${postObject.realm}</p>
            <p>${postObject.title}</p>
            <p>${postObject.weapon}</p>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </div>
        </article>
    `;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", html);

  document.querySelector("#posts article:last-child .btn-delete").addEventListener("click", deleteClicked);
  document.querySelector("#posts article:last-child .btn-update").addEventListener("click", updateClicked);
}

async function createPost(age, birth, culture, death, gender, language, magical, lotrName, race, realm, title, weapon, image) {
  const newPost = {
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
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: json,
  });
  if (response.ok) {
    console.log("New post succesfully added to Firebase 🔥");
    updatePostsGrid();
  }
}

function prepareData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    console.log(post);
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}