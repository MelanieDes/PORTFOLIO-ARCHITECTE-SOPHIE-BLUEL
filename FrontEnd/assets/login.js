// Identification de ma structure formulaire
const form = document.querySelector("form");
// Identification des balises input 
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

// Création d'une variable email et password
let email, password;

// Fonction général d'erreur pour éviter les répétitions
const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if(!valid) {
        container.classList.add('error');
        span.textContent = message;
    } else {
        container.classList.remove('error');
        span.textContent = message;
    }
}

// Fonction pour saisie de l'email avec récuparation de la valeur de l'input
const emailChecker = (value) => {
    // Regex pour email
    if(!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

// Fonction pour la saisie du mot de passe
const passwordChecker = (value) => {
    if (!value.match(
        // Regex pour password
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )) {
            errorDisplay(
            "password", "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
            );            
            password = null;
        } else if (value.length < 12) {            
            errorDisplay("password", "", true);
            password = value;
        } else {            
            errorDisplay("password", "", true);
            password = value;
        }
    };

// 
inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        // test la valeur de event.target.id
        switch (event.target.id){
            // Si l'id est email alors tu m'appelles la fonction emailChecker
            case "email":
                // récuparation de la valeur dans le paramètre
                emailChecker(event.target.value)
            break;
            case "password":
                passwordChecker(event.target.value)
            break;
            // toujours mettre un cas par défault dans un switch
            default:
                null;
        }
    })
})

// Evenement lorsque l'on clique sur envoyer
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(email && password) {
        const data = {
            email,
            password,
        };
        console.log(data);
        // J'efface les données saisies
        inputs.forEach((input) => (input.value = ""));
       
    } else {
        alert("veuillez remplir corectement les champs");
    };    
});

// Revenir à la page d'accueil