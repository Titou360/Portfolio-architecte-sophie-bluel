  //  ---------------------------------------------------------
  //  | Connections to Api                                     |
  //  ---------------------------------------------------------
  let urlWorks = "http://localhost:5678/api/works";
  let urlCategories = "http://localhost:5678/api/categories";

  //  ---------------------------------------------------------
  //  | Differents constantes                                 |
  //  ---------------------------------------------------------
  // const body element
  const bodyElement = document.body;
  // const gallery container
  const gallery = document.querySelector(".gallery");


  //  ---------------------------------------------------------
  //  | Management for the token                              |
  //  ---------------------------------------------------------
    let token = sessionStorage.getItem('token');
       console.log('Token:', token);

  //  ---------------------------------------------------------
  //  | Management of the action of the "login/logout" button |
  //  ---------------------------------------------------------
  const loginLogout = document.getElementById('nav-login');

    // Reaction with a saved Token
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
          sessionStorage.removeItem('token');
          loginLogout.textContent = 'login';
      }
  }

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

// ---------------------------------------------
// | Check the connection with the API "works" |
// ---------------------------------------------
async function getWorks () {
    try  {
        const response = await fetch(urlWorks);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
       const data = await response.json();
       return data;
    }  catch (error) {
        console.error(error);
        throw error;
    }
}

async function getCategories () {
    try  {
        const response = await fetch(urlCategories);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
       const data = await response.json();
       //return data;
    }  catch (error) {
        console.error(error);
        throw error;
    }
}

  //  ---------------------------------------------------------
  //  | Management for the "Portfolio" section                |
  //  ---------------------------------------------------------
  const portfolio = document.querySelector('#portfolio');
  const htmlProjects = document.createElement('div');
  htmlProjects.classList.add("container-portfolio");
  portfolio.appendChild(htmlProjects);
  
  const titleProjects = document.createElement('div');
  titleProjects.classList.add("row");
  htmlProjects.appendChild(titleProjects);
  
  const myFilters = document.createElement('div');
  myFilters.classList.add('filters');
  htmlProjects.appendChild(myFilters);
  
  const myGallery = document.createElement('div');
  myGallery.classList.add('gallery');
  htmlProjects.appendChild(myGallery);
  
  const myProjects = document.createElement('h2');
  myProjects.id ="projects";
  myProjects.textContent = "Mes Projets";
  titleProjects.appendChild(myProjects);
  
  const btnModalProjects = document.createElement('button');
  btnModalProjects.id ="btn-modal-projects";
  btnModalProjects.classList.add('btn-modify');
  btnModalProjects.textContent = "modifier";
  titleProjects.appendChild(btnModalProjects);
  

  //  ---------------------------------------------------------
  //  | Management of the "modify" button => Online / Offline |
  //  ---------------------------------------------------------

  const modifyButtonProfil = document.getElementById('btn-modal-profil');
    if (token) {
      btnModalProjects.style.display = 'flex';
      modifyButtonProfil.style.display = 'flex';
    } else {
      btnModalProjects.style.display = 'none';
      modifyButtonProfil.style.display = 'none';
    }

    modifyButtonProfil.addEventListener('click', () => {
      const orginalBtnText = modifyButtonProfil.textContent;
      modifyButtonProfil.textContent = "";

      const messageContainer = document.createElement("p");
      messageContainer.textContent = "En cours de développement ⏳ !";
      messageContainer.classList.add('dev-message');
      modifyButtonProfil.appendChild(messageContainer);

      setTimeout( () => {
        messageContainer.remove();
        modifyButtonProfil.textContent = orginalBtnText;
      }, 3000);
    });

  //  ---------------------------------------------------------
  //  | Management for the filters section                    |
  //  ---------------------------------------------------------

  //  ---------------------------------------------------------
  //  | Management for the filters & figures in the gallery   /
  //  ---------------------------------------------------------
    getWorks()
    .then(data => {
      data.forEach(function(projet) {
        genererFigure(projet);
      });

      // Create the categories from Api

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

    function genererFigure(projet) {
    let figureElement = document.createElement('figure');
    let idFigure = projet.id;
    figureElement.id = idFigure;
    let categoryClass = 'filter-' + encodeURIComponent(projet.category.name.toLowerCase().replace(' ', '-'));
        figureElement.classList.add(categoryClass);
    let imgElement = document.createElement('img');
        imgElement.src = projet.imageUrl;
        imgElement.alt = projet.title;
        figureElement.appendChild(imgElement);
    let figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = projet.title;
        figureElement.appendChild(figcaptionElement);
    let containerElement = document.querySelector('.gallery');
        containerElement.appendChild(figureElement);
    }





  // Reste à finir : retour au form d'origine si clique sur annuler dans fenêtre windows choix photo

  //const close button in modal
  let closeButton;
  // const category Select in modal
  let categorySelect;
  // const image Input in modal
  let imageInput;
  // const Delete works in modal
  let garbageIt;
  // const Add Photo in modal
  let addPhotoModal;
  // const parent container in modal
  const parentContainer = document.querySelector("main");
  // const Title input in modal
  let inputTitle;
  // const messages for image size or error when selecting
  const infoFile = document.querySelector("#info-file");
  // const for informations messages
  const errorMessage = document.createElement('p');

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

	  errorMessage.style.display ="none";
	  errorMessage.innerText = "";
	  errorMessage.classList.add("info-file-is-not-ok");
	  optionsContainer.appendChild(errorMessage);

  	// Ajouter les éléments créés dans leur conteneur respectif
  	optionsContainer.appendChild(addButton);
  	optionsContainer.appendChild(deleteFullGallery);

  	// Ajouter les éléments au parent (peut être le body ou un autre conteneur)
  	// Vous devez sélectionner le conteneur parent approprié
  	modale.appendChild(closeButton);
  	modale.appendChild(titleGalleryModal);
  	modale.appendChild(galleryContainer);
  	modale.appendChild(optionsContainer);

  	closeButton.addEventListener('click', () => {
  		destroyObstructor();
  		destroyModale();
  	});

  	addButton.addEventListener('click', () => {
  		destroyModale();
  		createAddPhotoModal();
  	});

  	deleteFullGallery.addEventListener('click', () => {
  		const originalText = deleteFullGallery.textContent; // Sauvegarde du contenu d'origine
  		deleteFullGallery.textContent = "";

  		const messageContainer = document.createElement("p");
  		messageContainer.textContent = "En cours de développement ⏳ !";
  		messageContainer.classList.add('dev-message');
  		deleteFullGallery.appendChild(messageContainer);

  		setTimeout(() => {
  			messageContainer.remove();
  			deleteFullGallery.textContent = originalText;
  		}, 3000);

  	});

  	manageProjectInModal();
  }

  function createObstructor() {
  	const obstructor = document.createElement('div');
  	obstructor.classList.add('obstructor');
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

  			deleteProject(garbageIt);

        galleryModal.appendChild(imgContainer);
  		});

  	} catch (error) {
  		console.log("Une erreur s'est produite lors de la récupération des données de l'API :", error);
  	}
  }

  // ---------------------------------------------
  // | Modal for adding a photo                  |
  // ---------------------------------------------
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
  	labelTitle.textContent = "Titre";

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
  	labelCategory.textContent = "Catégorie";

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
	  errorMessage.innerText="";
  	errorMessage.style.display = "none";
  	errorMessage.id = "info-file";
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
  	document.querySelector('.close-modale').addEventListener('click', () => {
  		addPhotoModal.remove();
  		destroyObstructor();
  	});

  	// Management for the arrow-left to go back
  	goBack.addEventListener('click', () => {
  		addPhotoModal.remove();
  		goBack.remove();
  		createModale();
  	});

	  submitButton.addEventListener('click', function() {
      sendWorksToAPI();
    });




  	//  ---------------------------------------------------------
  	//  | Add a project in Gallery & database                   |
  	//  ---------------------------------------------------------
  	categorySelect = document.getElementById('categorySelect');
  	imageInput = document.getElementById('image');

  	inputTitle.addEventListener('input', checkFormFields);
  	categorySelect.addEventListener('change', checkFormFields);
  	imageInput.addEventListener('change', function(event) {
  		const selectedImage = imageInput.files[0];
  		checkImageSizeAndExtension(selectedImage);
  		checkFormFields();
  	});

  	// ---------------------------------------------
  	// | Check size and extension for image        |
  	// ---------------------------------------------
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

  function destroyAddPhotoModal() {
  	const addPhotoModal = document.querySelector('div.modale-add');
  	addPhotoModal.remove();
    destroyObstructor();
  }

  // ---------------------------------------------
  // | Delete works in the API                   |
  // ---------------------------------------------
  function deleteProject(garbageIcon) {
  	garbageIcon.addEventListener('click', async function() {

		const token = sessionStorage.getItem('token');

		if (!token) {
		  errorMessage.style.display = "flex";
		  errorMessage.id = "info-file-is-not-ok";
		  errorMessage.innerHTML = "Erreur d'authentification, vous allez être redirigés vers la page de connexion";

		  setTimeout(() => {
			errorMessage.style.display = 'none';
			window.location.replace(
				"./login.html",)

		}, 3000);
		}
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

 			// Supprimer l'élément d'image de la galerie
  			const imageContainer = garbageIcon.parentElement;
  			imageContainer.remove();

              // Supprimer l'élément d'image de la modal
      const modalImageContainer = document.getElementById(projectId);
      if (modalImageContainer) {
        modalImageContainer.remove();
      }

  		} catch (error) {
  			console.error('Une erreur s\'est produite lors de la suppression du projet:', error);
  		}
  	});
  }

  // ---------------------------------------------
  // | Close the AddPhotoModal                   |
  // ---------------------------------------------
  function destroyAddPhotoModal() {
  	const AddPhotoModal = document.querySelector('div.modale-add');
  	AddPhotoModal.remove();
    destroyObstructor();
  }

  // ---------------------------------------------
  // | Check if fields in form are ok            |
  // ---------------------------------------------
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
  		activateSubmitBtn();
  	} else {
  		desactivateSubmitBtn();
  	}
  }

  let selectedImage;

  // ---------------------------------------------
  // | Links to enter in modal                   |
  // ---------------------------------------------
  btnModalProjects.addEventListener('click', () => {
  	createObstructor();
  	createModale();
  });

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

  				errorMessage.style.display = 'flex';
  				errorMessage.innerHTML = `Votre projet est ajouté !`;
          errorMessage.classList.add('info-file-is-ok');
  				categorySelect.value = "";
  				title.value = "";
  				submitBtn.disabled = true;

  				setTimeout(() => {
  					errorMessage.style.display = 'none';
					  destroyAddPhotoModal();
  				}, 3000);

  			} else if (response.status === 400) {
  				// response 400, not all fields are filled in
  				submitBtn.disabled = true;
  				errorMessage.style.display = "flex";
  				errorMessage.innerHTML = "Veuillez compléter tous les champs.";
  				category.value = "";
  				title.value = "";
  			} else {
  				// other answers
  				submitBtn.disabled = true;
  				errorMessage.style.display = "flex";
  				errorMessage.innerHTML = "Problème de connexion avec l'API, contacter votre administrateur.";
  			}
  			return response.json();

  		})
  		.then(function(data) {
  			// Utilisez les données JSON ici si nécessaire
  		})
  		.catch(function(error) {
  			console.error(error);
  		});
  }


  
