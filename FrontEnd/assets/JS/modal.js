document.addEventListener("DOMContentLoaded", function() {
    // Vérifiez si le token existe dans le localStorage
    const token = localStorage.getItem("token");
  
    // Si le token existe, affichez la modal
    if (token) {
      const modal = document.getElementById("modal");
      const closeBtn = modal.getElementsByClassName("modal-close")[0];
  
      modal.style.display = "block";
  
      closeBtn.onclick = function() {
        modal.style.display = "none";
      }
  
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  
      // Supprimez le token du localStorage pour qu'il ne soit pas réaffiché lors de la prochaine visite
      localStorage.removeItem("token");
    }
  });
  