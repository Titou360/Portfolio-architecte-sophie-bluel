document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  const editionMod = document.querySelector('.edition-mod');
  const loginLogout = document.getElementById('nav-login');
  const bodyElement = document.body;
  

  if (token) {
    editionMod.style.display = 'flex';
    editionMod.style.position ="fixed";
    loginLogout.textContent = 'logout';
    bodyElement.style.paddingTop = "38px";

  }

  //  ---------------------------------------------------------
  //  | Management of the action of the "login/logout" button |
  //  ---------------------------------------------------------

  // add event listening on the  "login/logout" button
  loginLogout.addEventListener('click', function () {
    logInLogOut();
  });

  // redirect function to a page according to the token
  function logInLogOut() {
    if (token === null) {
      window.location.replace('./login.html');
    } else {
      sessionStorage.clear();
      localStorage.removeItem('token');
      loginLogout.textContent = 'login';
      window.location.replace('./index.html');
    }
  }

  let titleProjects = 'Mes Projets';
  let portfolio = document.querySelector('#portfolio');

  let html = `
    <div class="row">
      <h2 id="projects">${titleProjects}</h2>
      <button id="btntomodalprojects" class="btn-modify">modifier</button>
    </div>
    <div class="filters"></div>
    <div class="gallery"></div>
  `;
  portfolio.innerHTML = html;

  //* Créer une fonction pour récupérer les données de l'API sur /works *//
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données de l\'API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //* Créer une fonction pour générer les différentes figures de la galerie //
  const genererFigure = (projet) => {
    let figureElement = document.createElement('figure');
    let categoryClass = 'filter-' + encodeURIComponent(projet.category.name.toLowerCase().replace(' ', '-'));
    figureElement.classList.add(categoryClass);
    let imgElement = document.createElement('img');
    imgElement.src = projet.imageUrl;
    imgElement.alt = projet.title;
    let figcaptionElement = document.createElement('figcaption');
    figcaptionElement.textContent = projet.title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    let containerElement = document.querySelector('.gallery');
    containerElement.appendChild(figureElement);
  };

  fetchData()
    .then(data => {
      data.forEach(function(projet) {
        genererFigure(projet);
      });

      const categories = new Set();
      categories.add("Tous");
      data.forEach(projet => {
        categories.add(projet.category.name);
      });

      const filtersContainer = document.querySelector('.filters');
      const allFigures = document.querySelectorAll('.gallery figure');
      const filterButtons = [];

      categories.forEach(category => {
        const button = document.createElement('button');
        const buttonClass = 'btn-filter';
        button.classList.add(buttonClass);
        button.textContent = category;
        filtersContainer.appendChild(button);
        filterButtons.push(button);

        if (category === "Tous") {
          button.classList.add('filter-tous');
        } else {
          const categoryClass = 'filter-' + encodeURIComponent(category.toLowerCase().replace(' ', '-'));
          button.classList.add(categoryClass);
        }
      });

      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          filterButtons.forEach(btn => {
            btn.classList.remove('data-active');
          });

          button.classList.add('data-active');
          const categoryClass = button.classList[1];

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

  /** Modal **/

  function createObstructor() {
    const obstructor = document.createElement('div');
    obstructor.classList.add('obstructor');
    const parent = document.querySelector('main');
    parent.appendChild(obstructor);
  }

  function createModale() {
    const modale = document.createElement('div');
    modale.classList.add('modale');
    modale.innerHTML = `
      <button class="close-modale">&#x1F5D9;</button>
      <h2 class="title-modal-projects">Galerie photo</h2>
      <div class="modal-option">
        <input class="btn-add-modal" type="submit" value="Ajouter une photo">
        <p class="suppr-gallery">Supprimer la galerie</p>
      </div>
    `;

    const parent = document.querySelector('main');
    parent.appendChild(modale);
    modale
      .querySelector('button.close-modale')
      .addEventListener('click', () => {
        destroyObstructor();
        destroyModale();
      });
  }

  function destroyModale() {
    const modale = document.querySelector('div.modale');
    modale.remove();
  }

  function destroyObstructor() {
    const obstructor = document.querySelector('div.obstructor');
    obstructor.remove();
  }

  document
    .querySelector('#btntomodalprojects')
    .addEventListener('click', () => {
      createObstructor();
      createModale();
    });
});
