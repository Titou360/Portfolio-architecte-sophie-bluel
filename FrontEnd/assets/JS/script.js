document.addEventListener('DOMContentLoaded', function() {
  let titleProjects = "Mes Projets";
  let portfolio = document.querySelector('#portfolio');

  let html = `
    <h2>${titleProjects}</h2>
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
});

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const loginLink = document.getElementById('nav-login');

  // Fonction pour gérer la soumission du formulaire de connexion
  async function handleLoginFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      const token = data.token;

      // Enregistrer le token dans le localStorage
      localStorage.setItem('token', token);

      // Rediriger vers index.html
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      errorMessage.removeAttribute('hidden');
    }
  }

  // Gérer la soumission du formulaire de connexion
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginFormSubmit);
  }

  // Gérer le clic sur le lien "Logout"
  loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    // Effacer le token du localStorage
    localStorage.removeItem('token');

    // Rediriger vers login.html
    window.location.href = 'login.html';
  });

  // Vérifier si l'utilisateur est connecté au chargement de la page
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;

  // Mettre à jour l'affichage du lien "Logout"
  if (isLoggedIn) {
    loginLink.style.display = 'inline';
    loginLink.textContent = 'Logout';
  } else {
    loginLink.style.display = 'inline';
    loginLink.textContent = 'Login';
  }
});
