// SCRIPT.JS =>
// MODALE.JS =>

document.addEventListener('DOMContentLoaded', function() {
  //  ---------------------------------------------------------
  //  | Create the differents constantes for the website      |
  //  ---------------------------------------------------------
    const bodyElement = document.body;
  //  ---------------------------------------------------------
  //  | Management for the token                              |
  //  ---------------------------------------------------------
    const token = localStorage.getItem('token');
    //console.log('Token:', token);

  //  ---------------------------------------------------------
  //  | Management of the action for edition mod              |
  //  ---------------------------------------------------------
    const editionMod = document.querySelector('.edition-mod');


    if (token) {
    editionMod.style.display = 'flex';
    editionMod.style.position = 'fixed';
    bodyElement.style.paddingTop = '38px';
    } else {
    editionMod.style.display = 'none';
    }

  //  ---------------------------------------------------------
  //  | Management for the "Portfolio" section                |
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
  //  | Management for the "Projects" Modal                   |
  //  ---------------------------------------------------------



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


    const parent = document.querySelector('main');
    parent.appendChild(modale);

   modale.querySelector('button.close-modale').addEventListener('click', () => {
      destroyObstructor();
      destroyModale();
      window.location.replace('./index.html');

    });

    document.querySelector('.btn-add-modal').addEventListener('click', () => {
      destroyModale();
      createAddPhotoModal();
  });

  insertProjectInModal(); 
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
  //  | Check the form, to enable the valid button            |
  //  ---------------------------------------------------------
  const titleInput = document.getElementById('title');

    async function createAddPhotoModal() {
      const addPhotoModal = document.createElement('div');
      addPhotoModal.classList.add('modale-add')
      addPhotoModal.innerHTML = `
        <button class="backtopreviousmodal">
          <i class="fa-solid fa-arrow-left">
          </i>
        </button>

      <button class="close-modale">
        &#x1F5D9;
      </button>

      <h2 class="title-modal-projects">
        Ajout photo
      </h2>

      <div class="container-add-photo">
        <div class="bluerectangle">
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
              <path d="M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z" fill="#B9C5CC"/>
              <path d="M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z" fill="#B9C5CC"/>
              <path d="M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z" fill="#B9C5CC"/>
            </svg>
  
        <button class="btn-add-photo">
          <label for="image" id="btn-add-photo">+ Ajouter photo</label>
          <input
            class="input-add-photo"
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpg">
        </button>

        <p class="info-img">
          jpg, png : 4 mo max
        </p>

      </div>
  
      <form class="container-option-photo" id="uploadForm">
        <label for="title" required>
          Titre
        </label>

        <input
          class="option-photo-input"
          type="text"
          id="title"
          name="title"
          required>

        <label for="category" id="category">
          Catégorie
        </label>
  
        <select id="categorySelect" name="category" class="option-photo-input" required>
        </select>
     </form>

      <div class="modal-option">
        <button id="submitBtn" type="submit">
          Valider
        </button>
      </div>
    `;

    const parent = document.querySelector('main');
      parent.appendChild(addPhotoModal);

      addPhotoModal.querySelector('.close-modale').addEventListener('click', () => {
      addPhotoModal.remove();
      destroyObstructor();
      });


      // Fonction pour envoyer les données vers l'API
    async function sendDataToAPI(formData) {
      try {
    const response = await fetch('http://localhost:5678/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi des données à l'API");
    }
    const data = await response.json();
    return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }


    document.getElementById('submitBtn').addEventListener('click', async function () {
  console.log('vous avez cliqué sur submitBTN');
  //const titleInput = document.getElementById('title');
  const categorySelect = document.getElementById('categorySelect');
  const imageInput = document.getElementById('image');


  // Vérifier si les champs sont remplis
  if (titleInput.value.trim() === '' || categorySelect.value === '' || !imageInput.files || imageInput.files.length === 0) {
    console.error("Tous les champs doivent être remplis");
    return;
  }

  // Créer un nouvel objet FormData
  const formData = new FormData(formElement);
  const formElement = document.getElementById('uploadForm');

  // Ajouter les valeurs des champs au FormData
  formData.append('image', imageInput.files[0]);
  formData.append('title', titleInput.value);
  formData.append('categoryId', parseInt(categorySelect.value)); // Convertir la catégorie en entier
  

  try {
    // Envoyer les données à l'API
    const responseData = await sendDataToAPI(formData);
    console.log('Données envoyées avec succès :', responseData);
    
    // Réinitialiser le formulaire après l'envoi des données
    titleInput.value = '';
    categorySelect.selectedIndex = 0;
    imageInput.value = '';
    // Afficher un message de succès ou rediriger vers une autre page si nécessaire
    alert('Projet ajouté avec succès !');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'envoi des données à l\'API :', error);
  }
    });


  //  ---------------------------------------------------------
  //  | Add a project in Gallery & database                   |
  //  ---------------------------------------------------------
    const categorySelect = document.getElementById('categorySelect');
    const imageInput = document.getElementById('image');

// Ajouter les événements d'écoute aux éléments
    titleInput.addEventListener('input', checkFormFields);
    categorySelect.addEventListener('change', checkFormFields);
    imageInput.addEventListener('change', checkFormFields);

// Appel initial pour vérifier l'état du bouton lors du chargement de la page
    checkFormFields();
  

  

    const arrowToBack = document.querySelector('.fa-arrow-left');
      arrowToBack.addEventListener('click', () => {
      addPhotoModal.remove();
      createModale();
      });

  //  ---------------------------------------------------------
  //  |Transform the form into the choosen picture            |
  //  ---------------------------------------------------------

    function loadImage(event) {
      const selectedImage = event.target.files[0];
        if (selectedImage) {
          const imageURL = URL.createObjectURL(selectedImage);
          const imageElement = document.createElement('img');
          imageElement.src = imageURL;
          imageElement.id = 'imageStore';
          // Add a class for image becoming clickable
          imageElement.classList.add('clickable'); 
          const existingInput = document.querySelector('.bluerectangle input');

        if (existingInput) {
          existingInput.remove();
        }
  
      const bluerectangleDiv = document.querySelector('.bluerectangle');
        bluerectangleDiv.innerHTML = '';
  
        bluerectangleDiv.appendChild(imageElement);
  
     // Create a new element 'input' at the end of the .bluerectangle div
      const newInputElement = document.createElement('input');
        newInputElement.className = 'input-add-photo';
        newInputElement.type = 'file';
        newInputElement.id = 'image';
        newInputElement.name = 'image';
        newInputElement.accept = 'image/png, image/jp?eg';
  
        bluerectangleDiv.appendChild(newInputElement);
  
      function destroyLastElement() {
        const lastElement = document.querySelector('#imageStore');
        if (lastElement) {
          lastElement.remove();
        }
      }
  
      // Add an EventListener by clicking on image to open the new input
      imageElement.addEventListener('click', function () {
        destroyLastElement();
        newInputElement.click();
      });
  
      // Ajoutez un gestionnaire d'événement pour le nouvel input créé
      newInputElement.addEventListener('change', function (event) {
        loadImage(event);
      });
    }
  }
  
  // Ajoutez le gestionnaire d'événement initial pour l'input file existant
  document.querySelector('#image').addEventListener('change', function (event) {
    loadImage(event);
  });

  //  ---------------------------------------------------------
  //  |Management for the categories in the "add photo modal" |
  //  ---------------------------------------------------------
    const categoriesData = await fetchCategories();

    const option1 = document.createElement('option');
    categorySelect.appendChild(option1);

    categoriesData.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });

    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:5678/api/categories');
          if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories de l'API");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  async function insertProjectInModal() {
    try {
      const data = await fetchData();
      const galleryModal = document.querySelector('.gallery-modal');
  
      data.forEach(projet => {
        const imgContainer = document.createElement('figure');
        imgContainer.classList.add('container-modal');
  
        const imgElement = document.createElement('img');
        imgElement.src = projet.imageUrl;
        imgElement.alt = projet.title;
        imgContainer.id = projet.id;/**/
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

  function checkFormFields() {
    const isTitleFilled = titleInput.value.trim() !== '';
    const isCategorySelected = categorySelect.value !== '';
    const isImageSelected = imageInput.files && imageInput.files.length > 0;

    function activateSubmitBtn() {
      submitBtn.removeAttribute('disabled');
      }
    
      function desactivateSubmitBtn() {
      submitBtn.setAttribute('disabled', 'disabled');
      }

      // Si les trois champs sont remplis, activer le bouton "Valider"
  if (isTitleFilled && isCategorySelected && isImageSelected) {
    console.log("Tous les champs sont remplis. Activer le bouton 'Valider'");
    activateSubmitBtn();
  } else {
    console.log("Un ou plusieurs champs ne sont pas remplis. Désactiver le bouton 'Valider'");
    desactivateSubmitBtn();
    }
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

      if (token) {
        filtersContainer.style.display = 'none';
      }
    })

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


//  ---------------------------------------------------------
//  | Delete a project from Gallery & database              |
//  ---------------------------------------------------------

  document.querySelector('main').addEventListener('click', function(event) {
    //Vérifier si l'élément cliqué est une icône "poubelle"
    if (event.target.classList.contains('garbageit')) {
      //Récupère l'élément figure parent correspondant
      const figure = event.target.closest('figure');
      const workId = figure.id;

    fetch(`http://localhost:5678/api/works/${workId}`, {
    method : 'DELETE',
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(function(response) {
    if (response.ok) {
      insertProjectInModal();
    } else {
      console.error('Erreur lors de la suppression de l\'élément');
    }
  })
  .catch(function(error) {
    console.error('Erreur lors de la suppression de l\'élément', error);
});


}


});

})