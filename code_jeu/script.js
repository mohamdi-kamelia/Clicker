document.addEventListener('DOMContentLoaded', function() {
    let points = 0;
    let elements = 0;
    let bonus = 1;
    let clickCount = 0;
    
    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('clickButton');
    const buyElementButton = document.getElementById('buyElement');
    const buyBonusButton = document.getElementById('buyBonus');
    const fish = document.getElementById('fish');
    
    // Fonction de clic
    function clic() {
        points += bonus;
        pointsDisplay.textContent = points;
        clickCount++;
        updateFishSize();

        // Vérifier si le nombre de clics atteint 500
        if (clickCount >= 500) {
            // Afficher un message de victoire
            alert("Félicitations ! Vous avez atteint 500 clics. Vous avez gagné !");
            // Réinitialiser le nombre de clics pour éviter que le message de victoire ne se répète
            clickCount = 0;
        }
    }
    
    // Fonction pour acheter un élément
    function acheterElement() {
        if (points >= 10) {
            points -= 10;
            elements++;
            bonus += 1;
            pointsDisplay.textContent = points;
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément.");
        }
    }
    
    // Fonction pour acheter un bonus
    function acheterBonus() {
        if (points >= 50) {
            points -= 50;
            bonus *= 2;
            pointsDisplay.textContent = points;
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce bonus.");
        }
    }
    
    // Gestion des événements
    clickButton.addEventListener('click', clic);
    buyElementButton.addEventListener('click', acheterElement);
    buyBonusButton.addEventListener('click', acheterBonus);
    
    // Sauvegarde automatique
    setInterval(function() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
    }, 60000); // Sauvegarde toutes les minutes
    
    function updateFishSize() {
        // Augmente la taille de l'image de poisson à chaque clic
        const newSize = 50 + clickCount * 10; // Ajuste la taille selon le nombre de clics
        fish.style.width = newSize + 'px';
    }
});
