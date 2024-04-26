document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des variables à partir du stockage local ou avec des valeurs par défaut
    localStorage.clear();
    let points = parseInt(localStorage.getItem('points')) || 0;
    let elements = parseInt(localStorage.getItem('elements')) || 0;
    let bonus = parseInt(localStorage.getItem('bonus')) || 1;
    let auto_click_value = parseInt(localStorage.getItem('auto_click_value')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let fishIndex = parseInt(localStorage.getItem('fishIndex')) || 0;
    let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    let bonusMultiplier = parseInt(localStorage.getItem('bonusMultiplier')) || 1;

    // Éléments du DOM
    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('fishingRodImage');
    const buyElementButton = document.getElementById('buyElement');
    const buyAutoClickButton = document.getElementById('buyTreasure');
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const fishPrice = document.getElementById('fishPrice');
    const fishCoordinates = document.getElementById('fishCoordinates');
    const buyButton = document.getElementById('buyButton');
    const body = document.body;

    // Affichage des points
    pointsDisplay.textContent = points;

    // Dictionnaire des poissons avec les chemins des images corrects
    const fishDict = [
        {
            name: "sardine",
            image: "assets/sardine.png",
            value: 10,
            coordinates: "(30, 20)"
        },
        {
            name: "anchois",
            image: "assets/anchois.png",
            value: 100,
            coordinates: "(50, 40)"
        },
        {
            name: "bar",
            image: "assets/bar.png",
            value: 500,
            coordinates: "(70, 60)"
        },
        {
            name: "cabillaud",
            image: "assets/cabillaud.png",
            value: 1000,
            coordinates: "(90, 80)"
        },
        {
            name: "Carpe",
            image: "assets/carpe-removebg-preview.png",
            value: 1500,
            coordinates: "(100, 110)"
        },
        {
            name: " Tambour",
            image: "assets/Tambour-removebg-preview.png",
            value: 2000,
            coordinates: "(120, 130)"
        },
        {
            name: "Thon",
            image: "assets/thon-removebg-preview.png",
            value: 2500,
            coordinates: "(140, 150)"
        },
        {
            name: "Truite arc-en-ciel",
            image: "assets/Truite_arc-en-ciel-removebg-preview.png",
            value: 3000,
            coordinates: "(160, 170)"
        }
    ];

    // Mettre à jour l'image de la canne à pêche dans le DOM
    function updateRodImage() {
        // Chemin de l'image de la canne à pêche de base et de l'image améliorée
        const baseRodImage = "canne.webp";
        const improvedRodImage = "cane_a_peche.png"; // Assurez-vous de mettre le chemin correct vers l'image de la nouvelle canne à pêche

        // Vérifier si la canne à pêche a été améliorée
        if (elements > 0) {
            // Mettre à jour l'image de la canne à pêche avec l'image améliorée
            clickButton.src = improvedRodImage;
        }
    }
    // Fonction d'achat de poisson
    function buyFish() {
        if (points >= fishDict[fishIndex].value) {
            points -= fishDict[fishIndex].value;
            fishIndex++;
            pointsDisplay.textContent = points;
            updateFish();
            if (fishIndex >= 1) { // Vérifie si le quatrième poisson a été pêché
                body.style.backgroundImage = "url('assets/photos/Profondeur moyenne.jpg')";
            }
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce poisson.");
        }
    }

    // Fonction d'achat d'élément
    function acheterElement() {
        if (points >= level * 50) {
            points -= level * 50;
            elements++;
            bonus += 1;
            level += 1;
            pointsDisplay.textContent = points;
            updateShopPrices();
            updateRodImage(); // Appel de la fonction pour mettre à jour l'image de la canne à pêche
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément.");
        }
    }
    
    // Fonction de clic
    function clic() {
        points += bonus * bonusMultiplier; // Points gagnés = bonus * multiplicateur de bonus
        pointsDisplay.textContent = points;
        clickCount++;
        updateFishSize();

        // Vérification si le score augmente de 100 points
        if (clickCount % 100 === 0) {
            // Double le multiplicateur de bonus pour le prochain clic
            bonusMultiplier *= 2;
        }

        // Vérification si le nombre de clics atteint 500
        if (clickCount >= 500) {
            alert("Félicitations ! Vous avez atteint 500 clics. Vous avez gagné !");
            clickCount = 0; // Réinitialisation du nombre de clics
        }
       
    }
    
    function auto_click() {
        if (auto_click_value > 0) {
            points += auto_click_value;
            pointsDisplay.textContent = points;
            for (let i = 0; i < auto_click_value; i++) {
                createBubble();
            };
        }
    }
 
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const screenWidth = window.innerWidth;
        const randomX = Math.random() * screenWidth;

        bubble.style.left = randomX + 'px';
        bubble.style.top = '700px';
        document.body.appendChild(bubble);
    
        // Remove the bubble element after the animation ends
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }
    // Fonction d'achat de bonus automatique
    function buyAutoClick() {
        if (points >= level * 50) {
            points -= level * 50;
            auto_click_value++;
            level += 1;
            pointsDisplay.textContent = points;
            updateShopPrices();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce bonus.");
        }
    }

    // Mise à jour des prix dans la boutique
    function updateShopPrices() {
        buyElementButton.textContent = "Améliorer canne à pêche (+1 point/clic) | prix = " + level * 50 + " points";
        buyAutoClickButton.textContent = "Acheter un trésor enfoui (+1 point/seconde) | prix = " + level * 50 + " points";
    }

    // Fonction de sauvegarde de la progression
    function saveProgression() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
        localStorage.setItem('auto_click_value', auto_click_value);
        localStorage.setItem('level', level);
        localStorage.setItem('fishIndex', fishIndex);
        localStorage.setItem('clickCount', clickCount);
        localStorage.setItem('bonusMultiplier', bonusMultiplier);
    }

    // Effet visuel du clic
    function showClick() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 20);
    }

    // Mise à jour des informations sur le poisson
    function updateFish() {
        fishName.textContent = fishDict[fishIndex].name;
        fishImage.src = fishDict[fishIndex].image;
        fishPrice.textContent = fishDict[fishIndex].value;
        //fishCoordinates.textContent = "Coordonnées : " + fishDict[fishIndex].coordinates;
    }

    // Gestion des événements
    updateShopPrices();
    clickButton.addEventListener('click', clic);
    clickButton.addEventListener('click', showClick);
    clickButton.addEventListener('click', createBubble);
    buyElementButton.addEventListener('click', acheterElement);
    buyAutoClickButton.addEventListener('click', buyAutoClick);
    buyButton.addEventListener('click', buyFish);

    // Sauvegarde automatique toutes les 10 secondes
    setInterval(saveProgression, 10000);

    // Bonus automatique
    setInterval(auto_click, 1000);
});


