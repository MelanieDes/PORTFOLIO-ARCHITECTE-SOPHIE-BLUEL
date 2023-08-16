// ------------------------------------------------------
//                GESTION DE LA MODALE.
// ------------------------------------------------------
let modal = null;
// let modal2 = null;

const openModal = function (event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
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

// // Ouverture de la Modal 2
// const openModal2 = function (event) {
//   event.preventDefault();
//   const target2 = document.getElementById(event.target2.getAttribute("href"));
//   target2.style.display = null;
//   modal2 = target2;
//   modal2.addEventListener("click", closeModal2);
//   modal2.querySelector(".btn-close").addEventListener("click", closeModal2);
//   modal.querySelector(".btn-return-arrow").addEventListener("click", closeModal2);
//   modal2.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
// };

// const closeModal2 = function (event) {
//   if (modal2 === null) return;
//   event.preventDefault();
//   modal2.style.display = "none";
//   modal2.setAttribute("aria-hidden", "true");
//   modal2.removeAttribute("aria-modal");
//   modal2.removeEventListener("click", closeModal2);
//   modal2.querySelector(".btn-close").removeEventListener("click", closeModal2);
//   modal.querySelector(".btn-return-arrow").removeEventListener("click", closeModal2);
//   modal2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
//   modal2 = null;
// };

// const closeModalOne = document.getElementById("close-modal1");
// closeModalOne.addEventListener("click", () => {
//   console.log(closeModalOne)
// })

// Evite que le code se duplique à chaque clic
const stopPropagation = function (event) {
  event.stopPropagation();
};

document.querySelectorAll(".btn-recast").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".btn-close").forEach((button) => {
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

// ------------------------------------------------------
//                SUPPRESSION DES TRAVAUX
// ------------------------------------------------------
const token = localStorage.getItem("token");

//emplacement affichage miniature

const thumbnail = document.querySelector(".display-thumbnail");
//event click dans l'affichage miniature identification de l'id a supprimer

thumbnail.addEventListener("click", (event) => {
  event.preventDefault();

  // Assiganation de l'Id du projet aux bouton de suppression
  if (event.target.closest(".btn-delete")) {
    const emplacementClick = event.target.closest(".btn-delete");
    const idBtnDelete = emplacementClick.id;
    //declaration de la fonction suppression

    deleteWorks(idBtnDelete);
    displayThumbnail();
    displayWorks();
  }
});

function deleteWorks(id) {
  const token = localStorage.getItem("token");

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
        .then((reponse) => {
          if (reponse.status == 204) {
            console.log("Suppression du Projet");
          } else {
            alert("Erreur dans la suppression du projet");
          }
        })
        .catch((error) => {
            console.log(`Erreur :` + error);
    });
}


