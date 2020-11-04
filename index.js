const legend = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((character, index) => {
  return {
    letter: character,
    value: index
  }
});

function findKey(key, param) {
  const keyObject = legend.find(legendItem => legendItem[param] === key);
  return keyObject;
}

function search(key) {
  const found = findKey(key, "letter");

  if (!found) {
    return "";
  }
  return found.value;
}

function reverse(key) {
  const found = findKey(key, "value");
  if (!found) {
    return "";
  }
  return found.letter;
}

function modify(modifyifiedValue) {
  const sizeOfLegend = legend.length - 1;
  const encryptedValue = modifyifiedValue - (sizeOfLegend * Math.floor(modifyifiedValue / sizeOfLegend));
  return encryptedValue;
}

function decrypt(message, key) {
  let encryptedMessage = "";
  let currentMessage = message.replace(/\s/g, "").toUpperCase();
  let currentKey = key.replace(/\s/g, "").toUpperCase();
  const startValues = document.querySelector(".start-values");
  const newValues = document.querySelector(".result-values");
  startValues.innerHTML = "";
  newValues.innerHTML = "";

  [...currentMessage].forEach((letter, index) => {
    const valueString = search(currentMessage[index]);
    const valueKey = search(currentKey[index]);

    startValues.innerHTML += `<p>Litera: ${valueString} Indeks znaku sekretnego klucza: ${valueKey}</p>`;

    const intString = typeof valueString === "undefined" ? parseInt(currentMessage[index]) : valueString
    const intKey = typeof valueKey === "undefined" ? parseInt(currentKey[index]) : valueKey

    if (isNaN(intString) || isNaN(intKey)) {
      encryptedMessage += currentMessage[index]
    } else {
      const difference = intString - intKey;

      const encryptedValue = modify(difference);
      newValues.innerHTML += `<p>Nowa wartość: ${difference} Indeks nowego znaku: ${encryptedValue}</p>`;

      console.log(encryptedValue)
      
      let reverseLookup = reverse(encryptedValue);
      if (reverseLookup == 0) {
        reverseLookup = "";
      }
      encryptedMessage += reverseLookup;
    }
  })

  return encryptedMessage;
}

function encrypt(message, key) {
  let encryptedMessage = "";
  let currentMessage = message.replace(/\s/g, "").toUpperCase();
  let currentKey = key.replace(/\s/g, "").toUpperCase();
  const startValues = document.querySelector(".start-values");
  const newValues = document.querySelector(".result-values");
  startValues.innerHTML = "";
  newValues.innerHTML = "";

  [...currentMessage].forEach((letter, index) => {
    const valueString = search(currentMessage[index]);
    const valueKey = search(currentKey[index]);

    startValues.innerHTML += `<p>Litera: ${valueString} Znak (sekretny klucz): ${valueKey}</p>`;

    const intString = typeof valueString === "undefined" ? parseInt(currentMessage[index]) : valueString
    const intKey = typeof valueKey === "undefined" ? parseInt(currentKey[index]) : valueKey;

    if (isNaN(intString) || isNaN(intKey)) {
      encryptedMessage += currentMessage[index];
    } else {
      const sum = intString + intKey;
      const reverseValue = modify(sum);
      newValues.innerHTML += `<p>Nowa wartość: ${sum} Indeks nowego znaku: ${reverseValue}</p>`;

      let reverseLookup = reverse(reverseValue);
      if (reverseLookup == 0) {
        reverseLookup = "";
      }
      encryptedMessage += reverseLookup;
    }
  });

  return encryptedMessage;
}

const secretKey =  Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
const secretKeyWrapper = document.querySelector(".sekret-key");
secretKeyWrapper.textContent = secretKey;

const decryptBtn = document.querySelector(".generate");
const encryptBtn = document.querySelector(".uncode-btn");
const generateMessage = document.querySelector(".generated-message");
const uncoddedMessage = document.querySelector(".uncoded-message");
const input = document.querySelector("#message");


let decryptedMessage = "";

decryptBtn.addEventListener("click", () => {
  const inputValue = input.value;

  decryptedMessage = decrypt(inputValue, secretKey);
  generateMessage.textContent = decryptedMessage;
})

encryptBtn.addEventListener("click", () => {
  const encryptedMessage = encrypt(decryptedMessage, secretKey);
  uncoddedMessage.textContent = encryptedMessage;
})

