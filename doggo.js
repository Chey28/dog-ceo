const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

fetch(BREEDS_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const breedsArray = Object.keys(data.message);
    for (let i = 0; i < breedsArray.length; i++) {
      const option = document.createElement("option");
      option.value = breedsArray[i];
      option.innerText = capitalize(breedsArray[i]);
      select.appendChild(option);
    }
  });

const img = document.querySelector(".doggoImg");

function refreshDoggo() {
  const DOG_URL = `https://dog.ceo/api/breed/${select.value}/images/random`;
  //show loading spinner
  document.querySelector(".rotate").style.visibility = "visible";
  img.style.visibility = "hidden";

  const promise = fetch(DOG_URL);

  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processingPromise) {
      img.src = processingPromise.message;

      img.alt = "Cute Doggo";
      //stop showing loading spinner
      img.addEventListener("load", () => {
        document.querySelector(".rotate").style.visibility = "hidden";
        img.style.visibility = "visible";
      });
    });
}

window.onload = function () {
  document
    .querySelector(".refreshDoggo")
    .addEventListener("click", refreshDoggo);
};



