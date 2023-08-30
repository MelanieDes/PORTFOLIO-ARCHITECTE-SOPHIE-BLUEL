// ------------------------------------------------------
//                GESTION DE LA MODALE.
// ------------------------------------------------------
let modal = null;
let modal2 = null;

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

const openModal2 = async function (event) {
  event.preventDefault();
  const target2 = event.target.getAttribute("formaction");
  if(target2.startsWith("#")) {
    modal2 = document.querySelector(target2)
  } else {
    modal2 = await loadModal(target2)
  }
  modal2.style.display = null;
  modal2.removeAttribute("aria-hidden");
  modal2.setAttribute("aria-modal", "true");
  modal2.addEventListener("click", closeModal2);
  modal2.querySelector(".js-btn-close-2").addEventListener("click", closeModal2);
  modal2.querySelector(".btn-return-arrow").addEventListener("click", closeModal2);
  modal2.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const closeModal2 = function (event) {
  if (modal2 === null) return;
  event.preventDefault();
  modal2.style.display = "none";
  modal2.setAttribute("aria-hidden", "true");
  modal2.removeAttribute("aria-modal");
  modal2.removeEventListener("click", closeModal2);
  modal2.querySelector(".js-btn-close-2").removeEventListener("click", closeModal2);
  modal2.querySelector(".btn-return-arrow").removeEventListener("click", closeModal2);
  modal2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal2 = null;
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
  document.body.append(element);
  previewPictrure()
  thumbnailCategory()
  validateButton()
  return element 
}

document.querySelectorAll(".btn-recast").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Fermeture Modale 1
const buttonModal1 = document.querySelector(".js-btn-close");
buttonModal1.addEventListener('click', closeModal);

// Fermeture Modale 2
const buttonModal = document.querySelector(".js-btn-close-2");
buttonModal1.addEventListener('click', closeModal);

// Retour Modale 2 à Modale 1
function returnArrowModal() {
	const returnArrow = document.getElementById("return-modal2");
	returnArrow.addEventListener('click', (event) => {
		event.preventDefault();
		closeModal2();
})
}


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
    alert(`Erreur :` + error);
  });  
}
displayThumbnail()

const buttonModalOne = document.getElementById("validate-modal")
buttonModalOne.addEventListener("click", openModal2);


// Affichage des catégories dans la modale 2
function thumbnailCategory() {
  fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((categories) => {
          const sectionChooseCategory = document.querySelector("#list-category");
          for(let index = 0; index < categories.length; index++) {
            const categoryIndex = categories[index];

            // Création d'une balise dédiée à un bouton filtre de la gallerie
            const chooseCategory = document.createElement('option');
            chooseCategory.classList.add("list-category");
            chooseCategory.innerHTML = categoryIndex.name;
            chooseCategory.value = categoryIndex.id;

            // Lien entre la balise input et la sectiob filtre
            sectionChooseCategory.appendChild(chooseCategory);
          }
        })
        .catch((error) => {
          alert(`Erreur :` + error);
        });
}

// Prévisualisation de l'image selectionné
function previewPictrure() {  
  const inputPreview = document.getElementById("image");
  inputPreview.addEventListener('change', (event) => {
    event.preventDefault();
    if(event.target.files.length >= 0) {
    const src = URL.createObjectURL(event.target.files[0]);
    const preview = document.querySelector("#file-ip-1-preview");
    const iconImg = document.getElementById("icon-img");
    preview.src = src;
    preview.style.display = "block";
    iconImg.style.display = "none";
    }
  })    
}

// Evenement de validation du formulaire
function validateButton() {
    const validateBtn = document.getElementById("validate-modal2");
    validateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        registerAddWorkEventListener();
      });
}



function registerAddWorkEventListener() {
  //Capture de l'élément seléctionné
  const fileInput = document.getElementById("image");
  // Valeure du champs titre
  const title = document.querySelector("input[name='title']");
  // valeur du champs catégorie
  const category = document.querySelector("select[name='category']");
    
  // Condition de validation gestion des erreurs
  if (fileInput.files[0] == undefined) {
    alert("Veuillez choisir une image");
    return;
  }
  if (title.value == "") {
    alert("Veuillez définir un titre");
    return;
  }
  if (category.value == "") {
    alert("Veuillez selectionner une catégorie");
    return;
  }
  
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("category", category.value);
  formData.append("image", fileInput.files[0]);

  const token = localStorage.getItem("token");

   fetch(`http://localhost:5678/api/works`, {
        method: "POST",
		    headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",          
        }, 
        body: formData,       
      })
	  .then((response) => {
		      if (response.ok) {
		        alert("Téléchargement réussi");
		        return response.json();               
		      } else {
		        alert("erreur lors du transfert");		        
		      }			  
		    })
  
}       



  
  