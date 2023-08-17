// ------------------------------------------------------
//                GESTION DE LA MODALE.
// ------------------------------------------------------
let modal = null;

const openModal = async function (event) {
  event.preventDefault();
  const target = event.target.getAttribute("href");
  if(target.startsWith("#")) {
    modal = document.querySelector(target)
  } else {
    modal = await loadModal(target)
  }
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-btn-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const closeModal = function (event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-btn-close").removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
};


// Evite que le code se duplique à chaque clic
const stopPropagation = function (event) {
  event.stopPropagation();
};

const loadModal = async function (url) {
  // Idéalement un loader pour indiquer à l'utilisateur serait parfait
  const target = '#' + url.split('#')[1];
  const exitingModal = document.querySelector(target)
  if(exitingModal !== null) return exitingModal // Evite de répéter l'élément sur la page au chargement
  const html = await fetch(url).then(response => response.text());
  const element = document.createRange().createContextualFragment(html).querySelector(target);
  if(element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
  console.log(html, target)
  document.body.append(element);
  return element
}

document.querySelectorAll(".btn-recast").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".js-btn-close").forEach((button) => {
  button.addEventListener('click', closeModal);
})

// Affichage des travaux miniatures dans la modale
function displayThumbnail() {
  const thumbnailContainer = document.getElementById('display-thumbnail');
  thumbnailContainer.innerHTML = "";

  // Récupération des travaux via l'API
  fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    for (let index = 0; index < works.length; index++) {
      const elements = works[index];
      
      if(elements !== null) {

        // Création du container des miniatures
        const formThumbnail = document.createElement("div");
        formThumbnail.classList.add("form-thumbnail");

        const iconThumbnail = document.createElement("div");
        iconThumbnail.classList.add("icon-form-thumbnail");

        // Intégration des images
        const imgThumbnail = document.createElement("img");
        imgThumbnail.src = elements.imageUrl;
        imgThumbnail.alt = elements.title;
        imgThumbnail.classList.add("img-thumbnail");
        
         // Création du boutton delete
         const btnDelete = document.createElement("button");
         btnDelete.classList.add("btn-delete");
         btnDelete.setAttribute("id", elements.id);

        // Intégration du l'icone delete
        const iconDelete = document.createElement('i');
        iconDelete.classList = "fa-solid fa-trash-can";
        iconDelete.style.color = "#FFFFFF";    

        // Intégration du label éditer
        const editeWorks = document.createElement("a");
        editeWorks.textContent = "éditer";
        editeWorks.classList.add("edite")         

        // Rattachement des balises
        thumbnailContainer.appendChild(formThumbnail); 
        formThumbnail.appendChild(iconThumbnail)
        iconThumbnail.appendChild(btnDelete);
        btnDelete.appendChild(iconDelete);
        formThumbnail.appendChild(imgThumbnail);
        formThumbnail.appendChild(editeWorks);               
      }   
    }    
  })
  .catch((error) => {
    console.log(`Erreur :` + error);
  });  
}
displayThumbnail()

document.querySelectorAll(".btn-validate").forEach((button) => {
  button.addEventListener("click", openModal);
});


// function thumbnailCategory(categories) {
//   // Création de l'élément du Dom qui accueillera les catégories
  

//   fetch("http://localhost:5678/api/categories")
//   .then((response) => response.json())
//   .then((categories) => {
//     const sectionChooseCategory = document.querySelector(".fields-form");
//     for (let index = 0; index < categories.length; index++) {
//       const categoryIndex = categories[index];
  
//       // Création d'une balise dédiée à un bouton filtre de la gallerie
//       const chooseCategory = document.createElement("option");
//       chooseCategory.classList.add("list-category");
//       chooseCategory.innerHTML = categoryIndex.name;
        
//       // Lien entre la balise input et la section filtre
//       sectionChooseCategory.appendChild(chooseCategory);
//     }
//     console.log(categories);
//       })
//   .catch((error) => {
//     console.log(`Erreur :` + error);
//   });
  
    
// }

