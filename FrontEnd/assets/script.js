// ------------------------------------------------------
// Récupérer dynamiquement les projets de l'architecture.
// ------------------------------------------------------
// Récupération des travaux de l'API (fetch GET)
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => displayWorks(works))
  .catch((error) => {
    console.log(`Erreur :` + error);
  });

function displayWorks(works) {
  for (let index = 0; index < works.length; index++) {
    const worksIndex = works[index];
    // Récupération de l'élément du Dom qui accueillera la galerie
    const sectionGallery = document.querySelector(".gallery");
    // Création d'une balise dédiée à une image de la gallerie
    const worksElement = document.createElement("figure");
    // Création des balises interne
    const imageElement = document.createElement("img");
    imageElement.src = worksIndex.imageUrl;
    imageElement.alt = worksIndex.title;
    const titleElement = document.createElement("h3");
    titleElement.innerHTML = worksIndex.title;
    // Lien entre la balise figure et la section gallery
    sectionGallery.appendChild(worksElement);
    // lien entre les balises interne à la section figure
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
  }
}

// ------------------------------------------------------
// Récupérer dynamiquement les categories de l'architecture.
// ------------------------------------------------------

// Récupération des catégories de l'API (fetch GET)
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => displayCategory(categories))
  .catch((error) => {
    console.log(`Erreur :` + error);
  });

function displayCategory(categories) {
  // Création de l'élément du Dom qui accueillera les filtres
  const sectionFiltres = document.querySelector(".filtres");

  // Création du bouton Tous
  const buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  buttonAll.classList.add("btnFilter");
  sectionFiltres.appendChild(buttonAll);

  // Mise en place de la class active sur le premier bouton
  let firstButtonsSelected = document.querySelector(".btnFilter");
  firstButtonsSelected.classList.add("active");

  // Appel des travaux via le bouton Tous
  buttonAll.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => displayWorks(works))
    .catch((error) => {
      console.log(`Erreur :` + error);
    });
    setActiveButton(buttonAll);
  });

  for (let index = 0; index < categories.length; index++) {
    const categoryIndex = categories[index];

    // Création d'une balise dédiée à un bouton filtre de la gallerie
    const categoryElement = document.createElement("button");
    categoryElement.classList.add("btnFilter");
    categoryElement.innerHTML = categoryIndex.name;
    // categoryElement.id = categoryIndex.id; --> Début de recherche avec Robin
    // categoryElement.dataset.blob = index + "-btn"; --> Début de recherche avec Robin

    // Lien entre la balise input et la section filtre
    sectionFiltres.appendChild(categoryElement);

    // Affichage des travaux selon bouton cliqué
    categoryElement.addEventListener("click", (event) => {
      event.preventDefault();
      selectCategory(categoryIndex.id);
      setActiveButton(categoryElement);
    });
  }
}

function setActiveButton(button) {
  const buttons = document.querySelectorAll(".btnFilter");
  buttons.forEach((btn) => {
    if (btn === button) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Fonction qui permet le tri des catégories
function selectCategory(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
        const selectWorks = works.filter(
        (works) => works.categoryId === categoryId
      );
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
      displayWorks(selectWorks);      
    })
    .catch((error) => {
      console.log(`Erreur :` + error);
    });
  // console.log(event.target.dataset.blob); --> Début de recherche avec Robin
}

// ------------------------------------------------------
//                GESTION DE LA MODALE.
// ------------------------------------------------------

let modal = null;

const openModal = function (event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".btn-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".btn-close").removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (event) {
  event.stopPropagation();
};

document.querySelectorAll(".btn-recast").forEach((a) => {
  a.addEventListener("click", openModal);
});

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => displayWorks(works))
  .catch((error) => {
    console.log(`Erreur :` + error);
  });
