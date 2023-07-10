document.addEventListener('DOMContentLoaded', function() {
  let titleProjects = "Mes Projets";
  let portfolio = document.querySelector('#portfolio');

  let html = `
    <h2>${titleProjects}</h2>
    <div class="filters"></div>
    <div class="gallery"></div>
  `;
  portfolio.innerHTML = html;

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      // Je génère et remplis les figures pour chaque projet
      data.forEach(function(projet) {
        genererFigure(projet);
      });

      // Récupérer toutes les catégories uniques
      const categories = new Set();
      categories.add("Tous");
      data.forEach(projet => {
        categories.add(projet.category.name);
      });

      // Sélectionner le conteneur des filtres
      const filtersContainer = document.querySelector('.filters');

      // Créer un bouton pour chaque catégorie
      const allFigures = document.querySelectorAll('.gallery figure');
      const filterButtons = [];

      categories.forEach(category => {
        const button = document.createElement('button');
        const buttonClass = button.classList.add('btn', 'btn-filter');
        button.classList.add(buttonClass);
        button.textContent = category;
        filtersContainer.appendChild(button);
        filterButtons.push(button);

        // Ajouter une classe spécifique pour le bouton "Tous"
        if (category === "Tous") {
          button.classList.add('filter-tous');
        } else {
          const categoryClass = 'filter-' + encodeURIComponent(category.toLowerCase().replace(' ', '-'));
          button.classList.add(categoryClass);
        }
      });

      // Gestionnaire d'événement pour les boutons de filtre
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Supprimer la classe "data-active" de tous les boutons
          filterButtons.forEach(btn => {
            btn.classList.remove('data-active');
          });

          // Ajouter la classe "data-active" au bouton cliqué
          button.classList.add('data-active');

          // Récupérer la classe du bouton cliqué (correspond à la catégorie)
          const categoryClass = button.classList[1];

          // Afficher ou masquer les figures en fonction de la catégorie
          allFigures.forEach(figure => {
            const figureCategories = Array.from(figure.classList).filter(className => className.startsWith('filter-'));
            const shouldDisplay = categoryClass === 'filter-tous' || figureCategories.includes(categoryClass);

            figure.style.display = shouldDisplay ? 'block' : 'none';
          });
        });
      });
    })
    .catch((error) => {
      console.log("Une erreur s'est produite lors de la récupération des données :", error);
    });

  // Je crée la fonction
  function genererFigure(projet) {
    // Je crée un nouvel élément <figure>
    let figureElement = document.createElement('figure');

    // Ajouter une classe à la figure en fonction de la catégorie
    let categoryClass = 'filter-' + encodeURIComponent(projet.category.name.toLowerCase().replace(' ', '-'));
    figureElement.classList.add(categoryClass);

    // Je crée un nouvel élément <img> avec les attributs src et alt
    let imgElement = document.createElement('img');
    imgElement.src = projet.imageUrl;
    imgElement.alt = projet.title;

    // Je crée un nouvel élément <figcaption> avec le titre du projet
    let figcaptionElement = document.createElement('figcaption');
    figcaptionElement.textContent = projet.title;

    // J'ajoute les éléments à l'élément <figure>
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

    // J'ajoute enfin l'élément <figure> à la class .gallery
    let containerElement = document.querySelector('.gallery');
    containerElement.appendChild(figureElement);
  }
});

/* Code for modal  */ 

document.addEventListener("DOMContentLoaded", function() {
  // Vérifiez si le token existe dans le localStorage
  const token = localStorage.getItem("token");

  // Si le token existe, affichez la modal
  if (token) {
    const modal = document.getElementById("modal");
    
    modal.style.display = "block";

    // Supprimez le token du localStorage pour qu'il ne soit pas réaffiché lors de la prochaine visite
    localStorage.removeItem("token");
  }
});

