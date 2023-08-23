// function addWorks() {
//   const token = localStorage.getItem("token");

//     fetch(`http://localhost:5678/api/works`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",          
//         },
//         body: formData
//       })
//         .then((reponse) => {
//           if (reponse.status == 204) {
//             console.log("Téléchargement réussi");
//           } else {
//             alert("Erreur dans le téléchargement du projet");
//           }
//         })
//         .catch((error) => {
//             console.log(`Erreur :` + error);
//     });
// }

const validateBtn = document.getElementById("validate-modal2");
const prevImg = document.createElement("img");
const iconImg = document.getElementById("icon-img");

// Prévisualisation de l'image selectionné
function previewPictrure() {
  const sectionPrev = document.getElementById("img-preview");
  const inputImage = document.getElementById("image");
  
  // evenement change pour acceder a l'input file
  inputImage.addEventListener("change", (event) => {
    event.preventDefault();
    iconImg.style.display = "none";
    sectionPrev.innerHTML = "";

    //création de la prévisualisation
    prevImg.classList.add("img-new-preview");
    const fileInput = document.getElementById("image").files[0];

    //création et assignation de l'url du fichier a l'image
    const urlObjet = URL.createObjectURL(fileInput);
    prevImg.src = urlObjet;
    sectionPrev.appendChild(prevImg);
  });
}
previewPictrure();

//Validation et vérification formulaire

function validateForm() {
  //Capture de l'élément seléctionné
  const fileInput = document.querySelector("input[name='image']").files[0];

  // Valeure du champs titre
  const title = document.querySelector("input[name='title']").value;
  
  // valeur du champs catégorie
  const category = document.querySelector("select[name='category']").value;

  //Condition de validation gestion des erreurs
  if (fileInput == undefined) {
    alert("Veuillez choisir une image");
    return;
  }
  if (title == "") {
    alert("Veuillez définir un titre");
    return;
  }
  if (category == "fields-selected") {
    alert("Veuillez selectionner une catégorie");
    return;
  }

  // Création FormData avec les éléments du formulaire

  let formData = new FormData();
  formData.append("image", fileInput);
  formData.append("title", title);
  formData.append("category", category);

  // Envoie FormData dans la requète poste

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer + ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Téléchargement réussi");
        // return response.json();               
      } else {
        alert("Erreur dans le téléchargement du projet");
        // throw new Error("erreur lors du transfert"); 
      }
      
    })
    .then((data) => {
        closeModale2();
        document.querySelector(".add-form").reset();
        prevImg.remove();
        iconImg.style.display = "block";
        openModal();
        displayThumbnail();
        displayWorks();
    })
    .catch((error) => {
      console.error(`Erreur :` + error);
    });
}

// Evenement de validation du formulaire
function validateButton() {
    validateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        validateForm();
      });
}


