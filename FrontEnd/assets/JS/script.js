document.addEventListener('DOMContentLoaded', function() {
  //  ---------------------------------------------------------
  //  | Create the differents constantes for the website      |
  //  ---------------------------------------------------------
  const bodyElement = document.body;
  const token = localStorage.getItem('token');
  //console.log('Token:', token);


  //  ---------------------------------------------------------
  //  | Management of the action for edition mod              |
  //  ---------------------------------------------------------
  const editionMod = document.querySelector('.edition-mod');

  if (token) {
    editionMod.style.display = 'flex';
    editionMod.style.position = 'fixed';
  }

  //  ---------------------------------------------------------
  //  | Management for the "Portfolio" section               |
  //  ---------------------------------------------------------
  const portfolio = document.querySelector('#portfolio');
  const htmlProjects = document.createElement('div');
  htmlProjects.innerHTML = `
    <div class="row">
      <h2 id="projects">
        Mes Projets
      </h2>

      <button id="btn-modal-projects" class="btn-modify">
        modifier
      </button>
    </div>

    <div class="filters"></div>
    <div class="gallery"></div>
  `;

  portfolio.appendChild(htmlProjects);

  //  ---------------------------------------------------------
  //  | Management of the action of the "login/logout" button |
  //  ---------------------------------------------------------
  const loginLogout = document.getElementById('nav-login');

  if (token) {
    loginLogout.textContent = 'logout';
    bodyElement.style.paddingTop = '38px';
  }

  loginLogout.addEventListener('click', function() {
    logInLogOut();
  });

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

  //  ---------------------------------------------------------
  //  | Management of the "modify" button => Online / Offline |
  //  ---------------------------------------------------------

  const modifyButtonProjects = document.getElementById('btn-modal-projects');
  const modifyButtonProfil = document.getElementById('btn-modal-profil');
  if (token) {
    modifyButtonProjects.style.display = 'flex';
    modifyButtonProfil.style.display = 'flex';
  } else {
    modifyButtonProjects.style.display = 'none';
    modifyButtonProfil.style.display = 'none';
  }


  //  ---------------------------------------------------------
  //  | Management for the categorie section                  |
  //  ---------------------------------------------------------

  fetchData()
    .then(data => {
      data.forEach(function(projet) {
        genererFigure(projet);
      });

      const categories = new Set();
      categories.add('Tous');
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

        if (category === 'Tous') {
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
    .catch(error => {
      console.log("Une erreur s'est produite lors de la récupération des données :", error);
    });

  //  ---------------------------------------------------------
  //  | Management for the "Projects" Modal                   |
  //  ---------------------------------------------------------

  async function insertProjectInModal() {
    try {
      const data = await fetchData();
      const galleryModal = document.querySelector('.gallery-modal');
  
      data.forEach(projet => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('container-modal');
  
        const imgElement = document.createElement('img');
        imgElement.src = projet.imageUrl;
        imgElement.alt = projet.title;
        imgContainer.appendChild(imgElement);
  
        const editButton = document.createElement('button');
        editButton.textContent = 'éditer';
        editButton.className = 'btn-edit-modal';
        imgContainer.appendChild(editButton);

        const garbageIt = document.createElement('i');
        garbageIt.className = "garbageit";
        imgContainer.appendChild(garbageIt);

        const moveIt = document.createElement('i');
        moveIt.className = "moveit";
        imgContainer.appendChild(moveIt);


  
        galleryModal.appendChild(imgContainer);
      });
    } catch (error) {
      console.log("Une erreur s'est produite lors de la récupération des données de l'API :", error);
    }
  }

  function createObstructor() {
    const obstructor = document.createElement('div');
    obstructor.classList.add('obstructor');
    const parent = document.querySelector('main');
    parent.style.position = ('fixed');
    parent.appendChild(obstructor);
  }

  function createModale() {
    let modale = document.createElement('div');
    modale.classList.add('modale');
    modale.innerHTML = `
      <button class="close-modale">
        &#x1F5D9;
      </button>

      <h2 class="title-modal-projects">
        Galerie photo
      </h2>

      <div class="gallery-modal">
      </div>

      <div class="modal-option">
        <input class="btn-add-modal"
        type="submit"
        value="Ajouter une photo">

          <p class="suppr-gallery">
            Supprimer la galerie
          </p>
      </div>
    `;

    // Appeler la fonction insertProjectInModal() ici pour afficher les images au chargement de la modale
    insertProjectInModal();

    const parent = document.querySelector('main');
    parent.appendChild(modale);
    modale.querySelector('button.close-modale').addEventListener('click', () => {
      destroyObstructor();
      destroyModale();
      window.location.replace('./index.html');
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

  document.querySelector('#btn-modal-projects').addEventListener('click', () => {
    createObstructor();
    createModale();
  });

  //  ---------------------------------------------------------
  //  | Fetching data on Api  =>  /works                      |
  //  ---------------------------------------------------------
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de l'API");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //  ---------------------------------------------------------
  //  | Management for the figures in the gallery             |
  //  ---------------------------------------------------------
  function genererFigure(projet) {
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
  }
});
