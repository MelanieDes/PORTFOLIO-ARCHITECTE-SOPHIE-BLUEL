// ------------------------------------------------------
// Récupérer dynamiquement les projets de l'architecture.
// ------------------------------------------------------
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => displayWorks(works))
    .catch((error) => {
        console.log("error", error);
    })

const works = [
    {
        "image": "abajour-tahina.png",
        "tagLine": "Abajour Tahina",
    },
    {
        "image": "appartement-paris-v.png",
        "tagLine": "Appartement Paris V",
    },
    {
        "image": "restaurant-sushisen-londres.png",
        "tagLine": "Restaurant Sushisen - Londres",
    },
    {
        "image": "la-balisiere.png",
        "tagLine": "Villa “La Balisiere” - Port Louis",
    },
    {
        "image": "structures-thermopolis.png",
        "tagLine": "Structures Thermopolis",
    },
    {
        "image": "appartement-paris-x.png",
        "tagLine": "Appartement Paris X",
    },
    {
        "image": "le-coteau-cassis.png",
        "tagLine": "Pavillon “Le coteau” - Cassis",
    },
    {
        "image": "villa-ferneze.png",
        "tagLine": "Appartement Paris XVIII",
    },
    {
        "image": "appartement-paris-xviii.png",
        "tagLine": "Appartement Paris XVIII",
    },
    {
        "image": "bar-lullaby-paris.png",
        "tagLine": "Bar “Lullaby” - Paris",
    },
    {
        "image": "hotel-first-arte-new-delhi.png",
        "tagLine": "Hotel First Arte - New Delhi",
    },
    
];

function displayWorks(works) {
    const imageGallery  = document.querySelector(".gallery > img")
    const textGallery = document.querySelector(".gallery > figcaption")
    
}
console.log();