// ------------------------------------------------------
// Récupérer dynamiquement les projets de l'architecture.
// ------------------------------------------------------
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => displayWorks(works))
    .catch((error) => {
        console.log("error", error);
    })

function displayWorks(works) {
    for(let index = 0; index < works.length; index++) {
        
        const figure = works[index];
        // Récupération de l'élément du Dom qui accueillera la galerie
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise dédiée à une image de la gallerie
        const worksElement = document.createElement("figure");
        // Créaton des balises interne 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerHTML = figure.title;

        // On ratache la balise figure à la section gallery
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);

        


    }
}
displayWorks();