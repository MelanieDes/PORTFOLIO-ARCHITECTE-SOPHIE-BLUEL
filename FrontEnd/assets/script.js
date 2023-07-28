// ------------------------------------------------------
// Récupérer dynamiquement les projets de l'architecture.
// ------------------------------------------------------
const worksFetch = fetch("http://localhost:5678/api/works");
worksFetch
  .then((response) => response.json())
  .then((works) => displayWorks(works))
  .catch((error) => {
    console.log(`Erreur :` + error);
  });

function displayWorks(works) {
  for (let index = 0; index < works.length; index++) {
    // const worksIndex = works[index];
    // Récupération de l'élément du Dom qui accueillera la galerie
    const sectionGallery = document.querySelector(".gallery");
    // Création d'une balise dédiée à une image de la gallerie
    const worksElement = document.createElement("figure");
    // Création des balises interne
    const imageElement = document.createElement("img");
    imageElement.src = works[index].imageUrl;
    imageElement.alt = works[index].title;
    const titleElement = document.createElement("h3");
    titleElement.innerHTML = works[index].title;
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
const categoriesFetch = fetch("http://localhost:5678/api/categories");
categoriesFetch
  .then((response) => response.json())
  .then((categories) => displayCategory(categories))
  .catch((error) => {
    console.log(`Erreur :` + error);
  });

function displayCategory(categories) {
  for (let index = 0; index < categories.length; index++) {
    // const categoryIndex = categories[index];
    
    // Création de l'élément du Dom qui accueillera les filtres
    const sectionFiltres = document.querySelector(".filtres");
    
    // Création d'une balise dédiée à un bouton filtre de la gallerie
    const categoryElement = document.createElement("button");
    categoryElement.classList.add("btnFilter");
    categoryElement.innerHTML = categories[index].name;
    
    // Lien entre la balise input et la section filtre
    sectionFiltres.appendChild(categoryElement);

    categoryElement.addEventListener("click", selectCategory);
    categoryElement.dataset.blob = index + "-btn";
    
  }
}

function selectCategory(event) {
  let categoryIndex = categories[index];
  event.target.dataset.blob = categories.categoryId;
  console.log(event.target.dataset.blob);
}

// si je clique sur une id categorie alors tu selectionne les travaux avec id categoryIndex
// const categorySelected = document.querySelector(".btnFilter");

// categorySelected.addEventListener('click', function() {
//     const categoryFilter = categories.filter(function(categories) {
//         return categories.id;
//     });
// })


