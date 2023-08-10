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
//                GESTION DE LA CONNEXION
// ------------------------------------------------------

// Connection utilisateur
function userConnected() {
  const userToken = localStorage.getItem("token");
  const login = document.getElementById("login");

  // Condition si le token n'est pas null pour connexion
  if(userToken !== null) {

    // Suppression du lien login
    login.style.display = "none";

    // Emplacement de la barre de modification
    const header = document.querySelector("header");

    // Barre de modification en haut du site
    const rodModification = document.createElement("div");
    rodModification.classList.add("rod-modification");

    // Création de l'icône modifier dans la barre de modification
    const iconModif = document.createElement("i");
    iconModif.classList = "fa-solid fa-pen-to-square";
    iconModif.setAttribute("id", "icon-modif");

    // Création du label modifier dans la barre de modification
    const labelModif = document.createElement("p");
    labelModif.classList.add("label-text-modif");
    labelModif.textContent = "Mode édition";

    // Création du bouton dans la barre de modification
    const buttonPublication = document.createElement("button");
    buttonPublication.classList.add("btn-publication");
    buttonPublication.textContent = "publier les changements";
    buttonPublication.type = "submit";

    // Apparition du bouton modifier en mode connecté
    const btnModif = document.getElementById("modifier-projets");
    btnModif.style.display = "block";
    
    // Rattachement des balises parents/enfants
    header.appendChild(rodModification);
    rodModification.appendChild(iconModif);
    rodModification.appendChild(labelModif);
    rodModification.appendChild(buttonPublication);

  } else {
    // Si pas connecté
    logout.style.display = "none";
    login.style.display = "block";
  }
}
userConnected();
  
function userDisconnected() {

    const logout = document.getElementById("logout");
    // Lorsque l'onclique sur logout, on appel la fonction disconnected
    logout.addEventListener("click", (event) => {
      event.preventDefault();
      disconnected();
    })
}

function disconnected() {
  // suppression des data dans le localStorage
  const closingLogout = localStorage.clear();
    // rechargement de la page
    location.reload();
}
userDisconnected();

