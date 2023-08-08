  // Reste à finir : retour au form d'origine si clique sur annuler dans fenêtre windows choix photo
  
  let closeButton;

  let categorySelect;

  let imageInput;

  let garbageIt;

  let addPhotoModal;

  const parentContainer = document.querySelector("main");

  let inputTitle;

  // messages for image size or error when selecting
  const infoFile = document.querySelector("#info-file");


  //  ---------------------------------------------------------
  //  | Management for the Modal fully dynamic                |
  //  ---------------------------------------------------------

  function createModale() {
  	let modale = document.createElement('div');
  	modale.classList.add('modale');

  	// Créer le bouton Fermer <button class="close-modale">
  	const closeButton = document.createElement("button");
  	closeButton.classList.add("close-modale");
  	closeButton.innerHTML = "&#x1F5D9;";

  	// Créer le titre <h2 class="title-modal-projects">
  	const titleGalleryModal = document.createElement("h2");
  	titleGalleryModal.classList.add("title-modal-projects");
  	titleGalleryModal.textContent = "Galerie photo";

  	// Créer le conteneur de la galerie <div class="gallery-modal">
  	const galleryContainer = document.createElement("div");
  	galleryContainer.classList.add("gallery-modal");

  	// Créer le conteneur des options <div class="modal-option">
  	const optionsContainer = document.createElement("div");
  	optionsContainer.classList.add("modal-option");

  	// Créer le bouton Ajouter <input class="btn-add-modal" type="submit" value="Ajouter une photo">
  	const addButton = document.createElement("input");
  	addButton.classList.add("btn-add-modal");
  	addButton.type = "submit";
  	addButton.value = "Ajouter une photo";

  	// Créer le paragraphe Supprimer <p class="suppr-gallery"> Supprimer la galerie </p>
  	const deleteFullGallery = document.createElement("p");
  	deleteFullGallery.classList.add("suppr-gallery");
  	deleteFullGallery.textContent = "Supprimer la galerie";

    parentContainer.appendChild(modale);

  	// Ajouter les éléments créés dans leur conteneur respectif
  	optionsContainer.appendChild(addButton);
  	optionsContainer.appendChild(deleteFullGallery);

  	// Ajouter les éléments au parent (peut être le body ou un autre conteneur)
  	 // Vous devez sélectionner le conteneur parent approprié
    modale.appendChild(titleGalleryModal);
    modale.appendChild(closeButton);
  	modale.appendChild(galleryContainer);
  	modale.appendChild(optionsContainer);

  	document.querySelector('button.close-modale').addEventListener('click', () => {
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
  	parentContainer.style.position = ('fixed');
  	parentContainer.appendChild(obstructor);
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
  			imgContainer.id = projet.id; /**/
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
  	addPhotoModal.classList.add('modale-add');

  	const titleAddPhoto = document.createElement('h2');
  	titleAddPhoto.classList.add('title-modal-projects');
  	titleAddPhoto.innerText = 'Ajout photo';
    addPhotoModal.appendChild(titleAddPhoto);

  	const iconGoBack = document.createElement('i');
  	iconGoBack.classList.add('fa-solid', 'fa-arrow-left');

  	const goBack = document.createElement('button');
  	goBack.classList.add('backtopreviousmodal');

  	const closeModale = document.createElement('button');
  	closeModale.classList.add('close-modale');
  	closeModale.innerHTML = '&#x1F5D9;';

  	// Créer le conteneur principal <div class="container-add-photo">
  	const containerAddPhoto = document.createElement("div");
  	containerAddPhoto.classList.add("container-add-photo");
    addPhotoModal.appendChild(containerAddPhoto);

  	// Créer le rectangle bleu <div class="bluerectangle">
  	const blueRectangle = document.createElement("div");
  	blueRectangle.classList.add("bluerectangle");
    containerAddPhoto.appendChild(blueRectangle);

  	// Créer l'élément <svg>
  	const svgNamespace = "http://www.w3.org/2000/svg";
  	const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
    <path d="M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z" fill="#B9C5CC"/>
    <path d="M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z" fill="#B9C5CC"/>
    <path d="M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z" fill="#B9C5CC"/>
                    </svg>`;
  	const svgElement = new DOMParser().parseFromString(svgContent, "image/svg+xml").documentElement;
    blueRectangle.appendChild(svgElement);
    
  	// Créer le bouton <button class="btn-add-photo">
  	const btnAddPhoto = document.createElement("button");
  	btnAddPhoto.classList.add("btn-add-photo");

  	// Créer l'élément <label>
  	const labelForImage = document.createElement("label");
  	labelForImage.setAttribute("for", "image");
  	labelForImage.id = "btn-add-photo";
  	labelForImage.textContent = "+ Ajouter photo";

  	// Créer l'élément <input>
  	const inputAddPhoto = document.createElement("input");
  	inputAddPhoto.classList.add("input-add-photo");
  	inputAddPhoto.type = "file";
  	inputAddPhoto.id = "image";
  	inputAddPhoto.name = "image";
  	inputAddPhoto.accept = "image/png, image/jpg, image/jpeg";
  	inputAddPhoto.size = "4194304";
  	inputAddPhoto.required = true;

  	// Créer le paragraphe <p class="info-img" id="info-file">
  	const infoImgParagraph = document.createElement("p");
  	infoImgParagraph.classList.add("info-img");
  	infoImgParagraph.id = "info-file";
  	infoImgParagraph.textContent = "jpg, png : 4 mo max";

    const formOptionPhoto = document.createElement('form');
    formOptionPhoto.classList.add('container-option-photo');
    formOptionPhoto.id = "uploadForm";
    addPhotoModal.appendChild(formOptionPhoto);

    const labelTitle = document.createElement('label');
    labelTitle.setAttribute("for", "title");
    labelTitle.textContent= "Titre";

    const inputTitle = document.createElement('input');
    inputTitle.classList.add('option-photo-input');
    inputTitle.type = "text";
    inputTitle.id = "title";
    inputTitle.name = "title";
    inputTitle.disabled = true;

    formOptionPhoto.appendChild(labelTitle);
    formOptionPhoto.appendChild(inputTitle);

    const labelCategory = document.createElement('label');
    labelCategory.setAttribute("for", "category");
    labelCategory.textContent= "Catégorie";

    const selectCategory = document.createElement('select');
    selectCategory.classList.add('option-photo-input');
    selectCategory.id = "categorySelect";
    selectCategory.name = "category";
    selectCategory.disabled = true;

    formOptionPhoto.appendChild(labelCategory);
    formOptionPhoto.appendChild(selectCategory);

  	// Ajouter les éléments créés à leurs parents respectifs
  	btnAddPhoto.appendChild(labelForImage);
  	btnAddPhoto.appendChild(inputAddPhoto);

  	blueRectangle.appendChild(btnAddPhoto);
  	blueRectangle.appendChild(infoImgParagraph);

    // Créer l'élément <div> avec la classe "modal-option"
  const modalOptionDiv = document.createElement("div");
  modalOptionDiv.classList.add("modal-option");

    // Créer une attente pour un message d'erreur ou d'acceptation
  const errorMessage = document.createElement('p');
  errorMessage.style.display = "none";
  errorMessage.id = "info-file", "info-file-is-ok";

  modalOptionDiv.appendChild(errorMessage);

    // Créer le bouton <button> avec les attributs spécifiés
  const submitButton = document.createElement("button");
  submitButton.id = "submitBtn";
  submitButton.type = "submit";
  submitButton.disabled = true; // Mettre le bouton en mode désactivé au début
  submitButton.textContent = "Valider";

  // Ajouter le bouton à l'élément <div>
  modalOptionDiv.appendChild(submitButton);
  addPhotoModal.appendChild(modalOptionDiv);
  
  	parentContainer.appendChild(addPhotoModal);
  	
  	goBack.appendChild(iconGoBack);
  	addPhotoModal.appendChild(goBack);
  	addPhotoModal.appendChild(closeModale);


  	// Management for the "X" to close modal
  	addPhotoModal.querySelector('.close-modale').addEventListener('click', () => {
  		addPhotoModal.remove();
  		destroyObstructor();
  		window.location.replace('./index.html');
  	});

  	// Management for the arrow-left to go back
  	goBack.addEventListener('click', () => {
  		addPhotoModal.remove();
  		goBack.remove();
  		createModale();
  	});

  	document.getElementById('submitBtn').addEventListener('click', async function() {
  		sendWorksToAPI();
  	});



  	//  ---------------------------------------------------------
  	//  | Add a project in Gallery & database                   |
  	//  ---------------------------------------------------------
  	categorySelect = document.getElementById('categorySelect');
  	imageInput = document.getElementById('image');


  	// Ajouter les événements d'écoute aux éléments
  	inputTitle.addEventListener('input', checkFormFields);
   	categorySelect.addEventListener('change', checkFormFields);
  	imageInput.addEventListener('change', function(event) {
  		const selectedImage = imageInput.files[0];
  		checkImageSizeAndExtension(selectedImage);
  		checkFormFields();
  	});

  	function checkImageSizeAndExtension(selectedImage) {
  		if (selectedImage) {
  			const imageSizeLimit = 4 * 1024 * 1024; // 4 Mo en octets
        const validFormats = ["image/png", "image/jpeg", "image/jpg"]; 

  			if (selectedImage.size > imageSizeLimit) {
  				infoImgParagraph.innerHTML = '<p class="info-img" id="info-file-is-not-ok">La taille de votre photo dépasse les 4 Mo autorisés.</p>';
  			} else if (!validFormats.includes(selectedImage.type)) {
          infoImgParagraph.innerHTML = '<p class="info-img" id="info-file-is-not-ok">Format de fichier non pris en charge.</br> Veuillez sélectionner un fichier PNG, JPG ou JPEG.</p>';
        } else {
  				// Image valide, réinitialiser le message d'alerte et charger l'image
  				blueRectangle.innerHTML = ''; // Réinitialiser le contenu du bluerectangle
  				loadImage(selectedImage);
  			}
  		}
  	}

  	// Appel initial pour vérifier l'état du bouton lors du chargement de la page
  	checkFormFields();

  	//  ---------------------------------------------------------
  	//  |Transform the form into the choosen picture            |
  	//  ---------------------------------------------------------

  	function loadImage(event) {
      selectedImage = imageInput.files[0];
  		if (selectedImage) {
  			const imageURL = URL.createObjectURL(selectedImage);
        console.log('Selected Image URL:', imageURL);
  			const imageElement = document.createElement('img');
  			imageElement.src = imageURL;
  			imageElement.id = 'imageStore';
  			// Add a class for image becoming clickable
  			imageElement.classList.add('clickable');
        inputTitle.removeAttribute('disabled');
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
  			imageElement.addEventListener('click', function() {
  				destroyLastElement();
  				newInputElement.click();
  			});

  			// Ajoutez un gestionnaire d'événement pour le nouvel input créé
  			newInputElement.addEventListener('change', function(event) {
  				loadImage(event);
  			});
  		}
  	}

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
  	garbageIcon.addEventListener('click', async function() {
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
    inputTitle = document.getElementById('title');
  	categorySelect = document.getElementById('categorySelect');
  	imageInput = document.getElementById('image');

  	const isImageSelected = imageInput.files && imageInput.files.length > 0;
  	const isTitleFilled = inputTitle.value.trim() !== '';
  	const isCategorySelected = categorySelect.value !== '';


  	function activateSubmitBtn() {
  		submitBtn.removeAttribute('disabled');
  	}

  	function desactivateSubmitBtn() {
  		submitBtn.setAttribute('disabled', 'disabled');
  	}

  	function activateInputTitle() {
  		inputTitle.removeAttribute('disabled');
  	}

  	function activateCategorySelect() {
  		categorySelect.removeAttribute('disabled');
  	}

  	if (isImageSelected) {
  		activateInputTitle();
  	}

  	if (isTitleFilled) {
  		activateCategorySelect();
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

  let selectedImage;

  /**** Reset "error message" ****/
  function errorMessageRemove() {
  	errorMessage.style.display = "none";
  	errorMessage.innerHTML = " ";
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
  	formData.append("image", selectedImage);
  	formData.append("title", inputTitle.value);
  	formData.append("category", categorySelect.value);


  	fetch('http://localhost:5678/api/works', {
  			method: "POST",
  			headers: {
  				'Authorization': `Bearer ${token}`
  			},
  			body: formData,
  		})
  		.then(function(response) {
  			if (response.status === 201) {
  				//add a new work in gallery();
  				// add a new work in modal ();
  				errorMessage.style.display = 'flex';
  				errorMessage.innerHTML = `Votre projet ${title.value} est ajouté !`;
  				categorySelect.value = "";
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
  				submitBtn.disabled = true;
  				errorMessage.style.display = "flex";
  				errorMessage.innerHTML = "Problème de connexion avec l'API, contacter votre administrateur.";
  			}
  			return response.json(); // Ajoutez cette ligne pour obtenir les données JSON
  		})
  		.then(function(data) {
  			// Utilisez les données JSON ici si nécessaire
  		})
  		.catch(function(error) {
  			console.error(error);
  		});
  }