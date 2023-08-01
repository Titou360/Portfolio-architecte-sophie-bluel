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
<button id="submitBtn" class= "submit-photo-inactive" type="submit" >
  Valider
</button>
</div>
  `;

  const parent = document.querySelector('main');
  parent.appendChild(addPhotoModal);

  const arrowToBack = document.querySelector('.fa-arrow-left');
  arrowToBack.addEventListener('click', () => {
    addPhotoModal.remove();
    createModale();
});

  addPhotoModal.querySelector('.close-modale').addEventListener('click', () => {
    addPhotoModal.remove();
    destroyObstructor();
    window.location.replace('./index.html');


//  ---------------------------------------------------------
//  | Add a project in Gallery & database                   |
//  ---------------------------------------------------------
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('categorySelect');
const imageInput = document.getElementById('image');
const submitBtn = document.getElementById('submitBtn');

function checkFormFields() {
const isTitleFilled = titleInput.value.trim() !== '';
const isCategorySelected = categorySelect.value !== '';
const isImageSelected = imageInput.files && imageInput.files.length > 0;

// Ajouter les événements d'écoute aux éléments
titleInput.addEventListener('input', checkFormFields);
categorySelect.addEventListener('change', checkFormFields);
imageInput.addEventListener('change', checkFormFields);

// Si les trois champs sont remplis, activer le bouton "Valider"
if (isTitleFilled && isCategorySelected && isImageSelected) {
  console.log("Tous les champs sont remplis. Activer le bouton 'Valider'");
  submitBtn.classList.remove('submit-photo-inactive');
  submitBtn.classList.add('submit-photo-active');
} else {
  console.log("Un ou plusieurs champs ne sont pas remplis. Désactiver le bouton 'Valider'");
  submitBtn.classList.remove('submit-photo-active');
  submitBtn.classList.add('submit-photo-inactive');
}
}



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

   // Create a new element 'input' at the end of the .blerectangle div
    const newInputElement = document.createElement('input');

    newInputElement.className = 'input-add-photo';
    newInputElement.type = 'file';
    newInputElement.id = 'image';
    newInputElement.name = 'image';
    newInputElement.accept = 'image/png, image/jpg';

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
  const categorySelect = addPhotoModal.querySelector('#categorySelect');

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
