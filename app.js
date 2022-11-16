const apiKey = "oGoLxZnV75hdAQgLcooJbk7a6DXDjLtb4ChjP2lx";
const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

const inputRover = document.querySelector("#rover");
const inputCamera = document.querySelector("#camera");
const inputDate = document.querySelector("#date");
const inputSol = document.querySelector("#sol");

function getSelectedRover() {
  if (inputRover.value) {
    return inputRover.value;
  }
}

function getSelectedCamera() {
  if (inputCamera.value) {
    return inputCamera.value;
  }
}

function getSelectedDate() {
  if (inputDate.value) {
    return inputDate.value;
  }
}

function getSelectedSol() {
  if (inputSol.value) {
    return inputSol.value;
  }
}

function getPictures(url, key) {
  const rover = getSelectedRover();
  const camera = getSelectedCamera();
  fetch(`${url}${rover}/latest_photos?&api_key=${key}&camera=${camera}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderPictures(data);
    });
}

function getPicturesByDate(url, key) {
  const rover = getSelectedRover();
  const camera = getSelectedCamera();
  const date = getSelectedDate();
  fetch(
    `${url}${rover}/photos?&api_key=${key}&camera=${camera}&earth_date=${date}&page=1`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderPicturesByDateAndSol(data);
    });
}

function getPicturesBySol(url, key) {
  const rover = getSelectedRover();
  const camera = getSelectedCamera();
  const date = getSelectedDate();
  const sol = getSelectedSol();
  fetch(
    `${url}${rover}/photos?&api_key=${key}&camera=${camera}&earth_date=${date}&page=1&sol=${sol}`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderPicturesByDateAndSol(data);
    });
}

function renderPictures(pictures) {
  const cards = document.querySelector("ul");

  cards.innerHTML = "";

  pictures.latest_photos.forEach((pic) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.setAttribute("src", `${pic.img_src}`);
    p.innerHTML = `Earth Date: ${pic.earth_date}<br> Sol: ${pic.sol}`;

    li.appendChild(img);
    li.appendChild(p);
    cards.appendChild(li);
  });

  if (cards.innerHTML == "") {
    cards.innerHTML = "No pictures were found.";
  }
}

function renderPicturesByDateAndSol(pictures) {
  const cards = document.querySelector("ul");

  cards.innerHTML = "";

  pictures.photos.forEach((pic) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.setAttribute("src", `${pic.img_src}`);
    p.innerHTML = `Earth Date: ${pic.earth_date}<br> Sol: ${pic.sol}`;

    li.appendChild(img);
    li.appendChild(p);
    cards.appendChild(li);
  });

  if (cards.innerHTML == "") {
    cards.innerHTML = "No pictures were found.";
  }
}

inputRover.addEventListener("change", function () {
  getPictures(apiUrl, apiKey);
});

inputCamera.addEventListener("change", function () {
  getPictures(apiUrl, apiKey);
});

inputDate.addEventListener("change", function () {
  getPicturesByDate(apiUrl, apiKey);
});

inputSol.addEventListener("change", function () {
  getPicturesBySol(apiUrl, apiKey);
});
