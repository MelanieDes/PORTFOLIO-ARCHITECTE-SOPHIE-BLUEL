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
//             console.log("Suppression du Projet");
//           } else {
//             alert("Erreur dans la suppression du projet");
//           }
//         })
//         .catch((error) => {
//             console.log(`Erreur :` + error);
//     });
// }




// const validateBtn = document.getElementById("validate-modal2");

// // Prévisualisation de l'image selectionnée
// function previewPictrure() {
//   const iconImg = document.getElementById("icon-img");
//   const sectionPrev = document.getElementById("img-preview");
//   const prevImg = document.createElement("img");
//   const inputImage = document.getElementById("selected");
  

//   // evenement change pour acceder a l'input file

//   inputImage.addEventListener("change", (event) => {
//     event.preventDefault();
//     iconImg.style.display = "none";
//     sectionPrev.innerHTML = "";

//     //création de la prévisualisation

//     prevImg.classList.add("img-new-preview");
//     let selectedFile = document.getElementById("selected").files[0];

//     //création et assignation de l'url du fichier a l'image
//     const urlObjet = URL.createObjectURL(selectedFile);
//     prevImg.src = urlObjet;
//     sectionPrev.appendChild(prevImg);
//   });
// }
// previewPictrure();

// //Validation et vérification formulaire

// function validateForm() {
//   //Capture de l'élément seléctionné
//   let selectedFile = document.getElementById("selected").files[0];

//   // Valeure du champs titre
//   const titlePicture = document.getElementById("title").value;
  
//   // valeur du champs catégorie
//   const categoryList = document.getElementById("list-category").value;

//   //Condition de validation gestion des erreurs
//   console.log(selectedFile);
//   if (selectedFile == undefined) {
//     alert("Veuillez choisir une image");
//     return;
//   }
//   if (titlePicture == "") {
//     alert("Veuillez définir un titre");
//     return;
//   }
//   if (categoryList == "fields-selected") {
//     alert("Veuillez selectionner une catégorie");
//     return;
//   }

//   // Création FormData avec les éléments du formulaire

//   let formData = new FormData();
//   formData.append("image", selectedFile);
//   formData.append("title", titlePicture);
//   formData.append("category", categoryList);

//   // Envoie FormData dans la requète poste

//   fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer" + token,
//       'Accept': 'application/json',
//     },
//     body: formData,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("erreur lors du transfert");        
//       } else {
//         return response.json();
//       }
      
//     })
//     .then((data) => {
//       document.querySelector(".add-form").reset();
//       prevImg.remove();
//       iconImg.style.display = "block";
//       openModal();
//       displayThumbnail();
//       displayWorks();
//     })
//     .catch((error) => {
//       console.error(`Erreur :` + error);
//     });
// }

// // Evenement de validation du formulaire
// validateBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   validateForm();
// });

