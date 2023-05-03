
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

export { prepareData };