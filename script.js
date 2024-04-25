document.addEventListener('DOMContentLoaded', function() {
    let points = 0;
    let elements = 0;
    let bonus = 1;
    let clickCount = 0;

    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('clickButton');
    const buyElementButton = document.getElementById('buyElement');
    const buyBonusButton = document.getElementById('buyBonus');
    const depthDisplay = document.getElementById('depthScale'); // Élément pour afficher l'échelle de profondeur

    // Fonction de clic
    function clic() {
        points += bonus;
        pointsDisplay.textContent = points;
        clickCount++;
        updateFishSize();
        updateDepth(); // Mise à jour de la profondeur

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
   
    
    function updateDepth() {
        // Ajouter les numéros de profondeur à l'échelle
        depthDisplay.innerHTML = ''; // Effacer le contenu existant
        for (let i = 300; i >= 0; i -= 50) { // Commencer à 300 et diminuer de 50 à chaque fois jusqu'à 0
            const tickLabel = document.createElement('div');
            tickLabel.classList.add('tickLabel');
            tickLabel.textContent = i + "m";
            tickLabel.style.bottom = `${((300 - i) / 300 * 100)}%`; // Positionner le numéro en fonction de la profondeur
            depthDisplay.appendChild(tickLabel);
        }
    }


    // Gestion des événements
    clickButton.addEventListener('click', clic);
    buyElementButton.addEventListener('click', acheterElement);
    buyBonusButton.addEventListener('click', acheterBonus);

    // Appeler la fonction pour mettre à jour la profondeur initiale
    updateDepth();

    // Sauvegarde automatique
    setInterval(function() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
    }, 60000); // Sauvegarde toutes les minutes
});
