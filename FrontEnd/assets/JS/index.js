document.addEventListener("DOMContentLoaded", function() {
    // Vérifiez si un token est présent dans le localStorage
    const token = localStorage.getItem("token");
    console.log(token)
    // Vérifiez si l'élément avec l'ID "introduction" existe
    const introductionSection = document.getElementById("introduction");
    if (introductionSection) {
      // Créez un nouvel élément <button>
      const button = document.createElement("button");
      button.textContent = "Modifier";
  
      // Ajoutez le bouton à la figcaption de la figure
      const figure = introductionSection.querySelector("figure");
      if (figure) {
        const figcaption = figure.querySelector("figcaption");
        if (figcaption) {
          figcaption.appendChild(button);
        }
      }
    }
  });
  