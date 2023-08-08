  // function to reset bluerectangle ??

let titleInput;

let categorySelect;

let imageInput;

let garbageIt;

let addPhotoModal;

// messages for image size or error when selecting
const infoFile = document.querySelector("#info-file");
//  ---------------------------------------------------------
  //  | Management for the Modal                              |
  //  ---------------------------------------------------------

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

    modale.querySelector('.btn-add-modal').addEventListener('click', () => {
      destroyModale();
      createAddPhotoModal();
  });

  manageProjectInModal();
    }

  function createObstructor() {
    const obstructor = document.createElement('div');
    obstructor.classList.add('obstructor');
    const parent = document.querySelector('main');
    parent.style.position = ('fixed');
    parent.appendChild(obstructor);
    }

  function destroyModale() {
    const modale = document.querySelector('div.modale');
    modale.remove();
    }

  function destroyObstructor() {
    const obstructor = document.querySelector('div.obstructor');
    obstructor.remove();
    }

  async function manageProjectInModal() {
      try {
        const data = await getWorks();
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

          garbageIt = document.createElement('i');
          garbageIt.className = "garbageit fa-trash-can";
          imgContainer.appendChild(garbageIt);

          const moveIt = document.createElement('i');
          moveIt.className = "moveit";
          imgContainer.appendChild(moveIt);

          galleryModal.appendChild(imgContainer);

          deleteProject(garbageIt);
        });

      } catch (error) {
        console.log("Une erreur s'est produite lors de la récupération des données de l'API :", error);
      }
    }

  async function createAddPhotoModal() {
      addPhotoModal = document.createElement('div');
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
            accept="image/png, image/jpg, image/jpeg"
            size="4194304"
            required
          >
        </button>

        <p class="info-img" id="info-file">
          jpg, png : 4 mo max
        </p>

      </div>
  
      <form class="container-option-photo" id="uploadForm">
        <label for="title">
          Titre
        </label>

        <input
          class="option-photo-input"
          type="text"
          id="title"
          name="title"
          required
          disabled >

        <label for="category" id="category">
          Catégorie
        </label>
  
        <select id="categorySelect"
          name="category"
          class="option-photo-input"
          required
          disabled >
        </select>
     </form>

      <div class="modal-option">
        <button id="submitBtn" type="submit" disabled>
          Valider
        </button>
      </div>
    `;

    const parent = document.querySelector('main');
      parent.appendChild(addPhotoModal);


      // Management for the "X" to close modal
      addPhotoModal.querySelector('.close-modale').addEventListener('click', () => {
      addPhotoModal.remove();
      destroyObstructor();
      window.location.replace('./index.html');
      });

      // Management for the arrow-left to go back
      addPhotoModal.querySelector('.fa-solid').addEventListener('click', () => {
          addPhotoModal.remove();
          createModale();
        })

    document.getElementById('submitBtn').addEventListener('click', async function () {
      sendWorksToAPI();

      console.log('Vous avez cliqué sur submitBtn');

    });



  //  ---------------------------------------------------------
  //  | Add a project in Gallery & database                   |
  //  ---------------------------------------------------------
    categorySelect = document.getElementById('categorySelect');
    imageInput = document.getElementById('image');
    titleInput = document.getElementById('title');


// Ajouter les événements d'écoute aux éléments
    titleInput.addEventListener('input', checkFormFields);
    categorySelect.addEventListener('change', checkFormFields);
    imageInput.addEventListener('change', checkFormFields);



// Appel initial pour vérifier l'état du bouton lors du chargement de la page
    checkFormFields();

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

          imageUploaded = selectedImage;

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

// ---------------------------------------------
// | Delete works in the API                   |
// ---------------------------------------------

  function deleteProject(garbageIcon) {
    garbageIcon.addEventListener('click', async function () {
      console.log('vous avez cliqué sur trashicon');
      const projectId = garbageIcon.parentElement.id;
      try {
        // Appeler l'API de suppression avec le token d'authentification
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
  
        if (!response.ok) {
          throw new Error('Une erreur s\'est produite lors de la suppression du projet');
        }
  
        // Si la suppression réussit, vous pouvez peut-être mettre à jour la galerie ou effectuer d'autres actions nécessaires.
        console.log('Projet supprimé avec succès');
  
        // Supprimer l'élément d'image de la galerie
        const imageContainer = garbageIcon.parentElement;
        imageContainer.remove();
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression du projet:', error);
      }
    });
  }


  function destroyAddPhotoModal() {
      const modale = document.querySelector('div.modale');
      modale.remove();
    }

  function checkFormFields() {
    titleInput = document.getElementById('title');
    categorySelect = document.getElementById('categorySelect');
    imageInput = document.getElementById('image');

    const isImageSelected = imageInput.files && imageInput.files.length > 0;
    const isTitleFilled = titleInput.value.trim() !== '';
    const isCategorySelected = categorySelect.value !== '';
  

    function activateSubmitBtn() {
      submitBtn.removeAttribute('disabled');
    }

    function desactivateSubmitBtn() {
      submitBtn.setAttribute('disabled', 'disabled');
    }

    function activateTitleInput () {
      titleInput.removeAttribute('disabled');
    }

    function activateCategorySelect () {
      categorySelect.removeAttribute('disabled');
    }

    if (isImageSelected) {
      activateTitleInput();
    }

    if (isTitleFilled) {
      activateCategorySelect ();
    }
        // Si les trois champs sont remplis, activer le bouton "Valider"
       if (imageInput.files && isTitleFilled && isCategorySelected) {
      console.log("TEST Tous les champs sont remplis. Activer le bouton 'Valider'");
      activateSubmitBtn();
    } else {
      console.log("Un ou plusieurs champs ne sont pas remplis. Désactiver le bouton 'Valider'");
      desactivateSubmitBtn();
      }
  }

  let imageUploaded;

  /**** Reset "error message" ****/
  function errorMessageRemove() {
  errorMessage.style.display = "none";
  errorMessage.innerHTML = " ";
  }

  /**** Message if file is too large or not good extension ****/
  function infoFileNotOk() {
    infoFile.classList.remove("info-file");
    infoFile.classList.add("info-file-is-not-ok");
    fileUploadInput.value = "";
  }


  // ---------------------------------------------
// | Links for all the modify btn               |
// ---------------------------------------------

document.querySelector('#btn-modal-projects').addEventListener('click', () => {
  createObstructor();
  createModale();
  });

document.querySelector('#btn-modal-profil').addEventListener('click', () => {
  const message = "En cours de développement ⏳ !";
  alert(message);
  });

/*modale.querySelector('#suppr-gallery').addEventListener('click', () => {
  const message = "En cours de développement ⏳ !";
  alert(message);
});*/

// ---------------------------------------------
// | Send works to the API                     |
// ---------------------------------------------

  function sendWorksToAPI() {
      const formData = new FormData();
      formData.append("image", imageUploaded);
      formData.append("title", title.value);
      formData.append("category", categorySelect.value);


      fetch('http://localhost:5678/api/works', {
          method :"POST",
          headers: {
            'Authorization' : `Bearer ${token}`
        },
          body: formData,
        })
        .then(function (response) {
          if (response.status === 201) {
            //add a new work in gallery();
            // add a new work in modal ();
            errorMessage.style.display = 'flex';
            errorMessage.innerHTML = `Votre projet ${title.value} est ajouté !`;
            category.value = "";
            title.value = "";
            submitBtn.disabled = true;
            } else if (response.status === 400) {
            // response 400, not all fields are filled in
            submitBtn.disabled = true;
            errorMessage.style.display = "flex";
            errorMessage.innerHTML = "Veuillez compléter tous les champs.";
            category.value = " ";
            title.value = " ";
          } else {
            // other answers
            buttonValidatePhoto.disabled = true;
            errorMessage.style.display = "flex";
            errorMessage.innerHTML = "Problème de connexion avec l'API, contacter votre administrateur.";
          }
          return response.json(); // Ajoutez cette ligne pour obtenir les données JSON
        })
        .then(function (data) {
          // Utilisez les données JSON ici si nécessaire
        })
        .catch(function (error) {
          console.error(error);
        });
  }

