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
    

    const buttonAll = document.createElement("button");
    buttonAll.textContent = "Tous";
    buttonAll.classList.add("btnFilter");
    sectionFiltres.appendChild(buttonAll);

    let firstButtonsSelected = document.querySelector(".btnFilter");
    firstButtonsSelected.classList.add("active");
    
    buttonAll.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveButton(buttonAll);
  });
    
    for (let index = 0; index < categories.length; index++) {
        const categoryIndex = categories[index];
        
        // Création d'une balise dédiée à un bouton filtre de la gallerie
        const categoryElement = document.createElement("button");
        categoryElement.classList.add("btnFilter");
        categoryElement.innerHTML = categoryIndex.name;
        // categoryElement.id = categoryIndex.id;
        // categoryElement.dataset.blob = index + "-btn";

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
  buttons.forEach(btn => {
    if(btn === button) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');      
    }
  })
}

// Fonction qui permet le tri des catégories
function selectCategory(categoryId) {
  fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    // if(filtre == "tous") {
    //   displayWorks(works);
    // } else {
      const selectWorks = works.filter((works) => works.categoryId === categoryId);
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
      displayWorks(selectWorks);
    // }
  })    
  .catch((error) => {
    console.log(`Erreur :` + error);
  });
  // console.log(event.target.dataset.blob); --> Début de recerhce avec Robin
}







