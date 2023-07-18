document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const loginLink = document.querySelector('#nav-login');

  // Vérifier si le token est présent dans le localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Changer le texte en "logout" si le token est présent
    loginLink.textContent = 'logout';
  }

  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      const token = data.token;

      // Stocker le token dans le localStorage
      localStorage.setItem('token', token);
      console.log('Token:', token);

      // Changer le texte du lien en "logout" après la connexion réussie
      loginLink.textContent = 'logout';

      // Rediriger vers une autre page ou effectuer d'autres actions
      window.location.href = 'index.html';
    } catch (error) {
      console.error(error);
      errorMessage.removeAttribute('hidden');
    }
  });

  // Gérer la déconnexion lorsque l'utilisateur clique sur "logout"
  loginLink.addEventListener('click', function() {
    if (token) {
      // Supprimer le token du localStorage
      localStorage.removeItem('token');
    }
    // Rediriger vers la page de login
    window.location.href = 'login.html';
  });
});
