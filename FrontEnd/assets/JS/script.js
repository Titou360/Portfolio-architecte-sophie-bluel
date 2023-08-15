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
    const token = localStorage.getItem('token');
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
          sessionStorage.clear();
          localStorage.removeItem('token');
          loginLogout.textContent = 'login';
          window.location.replace('./index.html');
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
       return data;
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





