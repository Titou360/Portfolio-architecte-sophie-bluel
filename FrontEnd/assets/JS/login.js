/*fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Connecté à l\'API avec succès');
    console.log('Réponse de l\'API:', data);
  })
  .catch(error => {
    console.log('Erreur de connexion à l\'API:', error);
  });*/

  document.addEventListener("DOMContentLoaded", function() {
    // Placez votre code JavaScript ici
  
    document.getElementById("login-form").addEventListener("submit", function(event) {
      event.preventDefault(); // Empêche le rechargement de la page
    
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
    
      const requestBody = {
        email: email,
        password: password
      };
    
      // Effectuer la requête d'authentification à l'API
      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json" // Contrôle de l'en-tête Accept
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (response.ok && response.headers.get("content-type").includes("application/json")) {
            return response.json();
          } else {
            throw new Error("Identifiant ou mot de passe incorrect");
          }
        })
        .then(data => {
          // Le token de connexion a été obtenu avec succès
          const token = data.token;
        
          // Effectuez les actions nécessaires en cas de connexion réussie
        
          // Par exemple, stockez le token dans le localStorage
          localStorage.setItem("token", token);
        
          // Redirigez vers la page "index.html"
          window.location.href = "index.html";
        })
        
      })
  })        