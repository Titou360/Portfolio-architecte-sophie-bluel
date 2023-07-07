document.addEventListener('DOMContentLoaded', function() {
let titleProjects = "Mes Projets"
let portfolio = document.querySelector('#portfolio')

let html = `
    <h2>${titleProjects}</h2>
      <div class="filters"></div>
      <div class="gallery"></div>
`
portfolio.innerHTML = html
});

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    // Je génére et rempli les figures pour chaque projet
    data.forEach(function(projet) {
      genererFigure(projet);
    });
  })
  // J'établie un message d'erreur en cas de soucis de connexion
  .catch((error) => {
    console.log("Une erreur s'est produite lors de la récupération des données :", error);
  });

  // Je crée la fonction 
function genererFigure(projet) {
  // Je crée un nouvel élément <figure>
  let figureElement = document.createElement('figure');

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



fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => {
  // Récupérer toutes les catégories uniques
  const categories = new Set();
  categories.add("Tous");
  data.forEach(projet => {
    categories.add(projet.category.name);
  });  

  // Sélectionner le conteneur des filtres
  const filtersContainer = document.querySelector('.filters');

  // Créer un bouton pour chaque catégorie
  categories.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('btn-filter');
    button.textContent = category;
    filtersContainer.appendChild(button);

    button.addEventListener('click', function() {
      const filterButtons = document.querySelectorAll('.btn-filter');
      filterButtons.forEach(btn => {
        btn.classList.remove('data-active');
      })
      button.classList.add('data-active');
  });

  // Important, to be place at the end
  data.forEach(projet => {
    genererFigure(projet);
  });
})
.catch((error) => {
  console.log("Une erreur s'est produite lors de la récupération des données :", error);
});
})
