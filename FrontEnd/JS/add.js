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




