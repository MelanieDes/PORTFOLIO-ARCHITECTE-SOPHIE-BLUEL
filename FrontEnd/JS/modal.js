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
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const closeModal = function (event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".btn-close").removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
};

// Evite que le code se duplique à chaque clic
const stopPropagation = function (event) {
  event.stopPropagation();
};

document.querySelectorAll(".btn-recast").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Affichage des travaux miniatures dans la modale
function displayThumbnail() {
  const thumbnailContainer = document.getElementById('display-thumbnail');
  thumbnailContainer.innerHTML = "";

  // Récupération des travaux via l'API
  fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    for (let index = 0; index < works.length; index++) {
      const worksIndex = works[index];
      
      if(worksIndex !== null) {

        // Création du container des miniatures
        const formThumbnail = document.createElement("div");
        formThumbnail.classList.add("form-thumbnail");

        // Intégration des images
        const imgThumbnail = document.createElement("img");
        imgThumbnail.src = worksIndex.imageUrl;
        imgThumbnail.alt = worksIndex.title;
        imgThumbnail.classList.add("img-thumbnail");

        // Intégration du bouton déplacer
        // const buttonMove = document.createElement("button");
        // buttonMove.setAttribute("id", "button-move");
        // const iconMove = document.createElement('i');
        // iconMove.classList = "fa-solid fa-arrows-up-down-left-right" 
        // iconMove.setAttribute("id", "icon-move");

        // Intégration du bouton poubelle
        const iconDelete = document.createElement('i');
        iconDelete.classList = "fa-solid fa-trash-can";
        iconDelete.style.color = "#FFFFFF"; 

        // Intégration du label éditer
        const editeWorks = document.createElement("a");
        editeWorks.textContent = "éditer";
        editeWorks.classList.add("edite")         

        // Rattachement des balises
        // thumbnailContainer.appendChild(buttonMove);
        // buttonMove.appendChild(iconMove);
        thumbnailContainer.appendChild(formThumbnail);
        formThumbnail.appendChild(imgThumbnail);
        formThumbnail.appendChild(iconDelete);
        formThumbnail.appendChild(editeWorks);        
      }      
    }    
  })
  .catch((error) => {
    console.log(`Erreur :` + error);
  });  
}
displayThumbnail()

// Ouverture de la Modal 2
const openModal2 = function (event) {
  event.preventDefault();
  const target = document.getElementById(event.target.getAttribute("class"));
  target.style.display = null;
  // target.removeAttribute("aria-hidden");
  // target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal2);
  modal.querySelector(".btn-close").addEventListener("click", closeModal2);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const closeModal2 = function (event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal2);
  modal.querySelector(".btn-close").removeEventListener("click", closeModal2);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
};

document.querySelectorAll(".btn-validate").forEach((button) => {
  button.addEventListener("click", openModal);
});