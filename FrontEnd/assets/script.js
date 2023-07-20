// ------------------------------------------------------
// Récupérer dynamiquement les projets de l'architecture.
// ------------------------------------------------------

const works = fetch("http://localhost:5678/api/works");
works
 .then((response) => response.json())
 .then((works) => displayWorks(works))
 .catch((error) => {
     console.log(`Erreur :`+ error);
})

function displayWorks(works) {
    for(let index = 0; index < works.length; index++) {
        
        const figure = works[index];
        // Récupération de l'élément du Dom qui accueillera la galerie
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise dédiée à une image de la gallerie
        const worksElement = document.createElement("figure");
        // Création des balises interne 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerHTML = figure.title;

        // On ratache la balise figure à la section gallery
        sectionGallery.appendChild(worksElement);
        // On rattache les balises interne à la section figure
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}
displayWorks(works);

const categories = fetch("http://localhost:5678/api/categories");
categories
 .then((response) => response.json())
 .then((categories) => console.log(categories))
 .catch((error) => {
     console.log(`Erreur :`+ error);
})
// function displayCategory(categories) {
//        for(let index = 0; index < categories.length; index++) {
        
//         const  sectionCategory = categories[index];
//         // Création de l'élément du Dom qui accueillera les filtres
//         const sectionFiltres = document.querySelector(".filtres");
//         // Création d'une balise dédiée à un bouton filtre de la gallerie
//         const categoryElement = document.createElement("section");
//         // Création des balises interne 
//         const buttonElement = document.createElement("button");

//          // On ratache la balise figure à la section gallery
//          sectionFiltres.appendChild(categoryElement);
//          // On rattache les balises interne à la section figure
//          categoryElement.appendChild(imagbuttonElementeElement);
         
//         }
//         console.log(displayCategory);
       
// }

// displayCategory(categories);