// ------------------------------------------------------
//                SUPPRESSION DES TRAVAUX
// ------------------------------------------------------
const token = localStorage.getItem("token");

//emplacement affichage miniature
const thumbnail = document.querySelector(".display-thumbnail");

//event click dans l'affichage miniature identification de l'id a supprimer
thumbnail.addEventListener("click", (event) => {
  event.preventDefault();

  // Assignation de l'Id du projet aux bouton de suppression
  if (event.target.closest(".btn-delete")) {
    const emplacementClick = event.target.closest(".btn-delete");
    const idBtnDelete = emplacementClick.id;
    
    //declaration de la fonction suppression
    deleteWorks(idBtnDelete);
    displayThumbnail();
  }
});

function deleteWorks(id) {
  const token = localStorage.getItem("token");

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          // Accept: "application/json",
          // "Content-Type": "application/json"
        },
      })
        .then((response) => {
          if (response.status == 204) {
            alert("Suppression du Projet");
          } else {
            alert("Erreur dans la suppression du projet");
          }
        })
        .catch((error) => {
            console.log(`Erreur :` + error);
    });
}

