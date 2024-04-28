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
    const buyButton = document.getElementById('buyButton');
    const body = document.body;

    // Affichage des points
    pointsDisplay.textContent = points;

    // Dictionnaire des poissons avec les chemins des images corrects
    const fishDict = [
        {
            name: "sardine",
            image: "assets/sardine.png",
            value: 10
        },
        {
            name: "anchois",
            image: "assets/anchois.png",
            value: 100
        },
        {
            name: "bar",
            image: "assets/bar.png",
            value: 500
        },
        {
            name: "cabillaud",
            image: "assets/cabillaud.png",
            value: 1000
        },
        {
            name: "Carpe",
            image: "assets/carpe-removebg-preview.png",
            value: 1500
        },
        {
            name: " Tambour",
            image: "assets/Tambour-removebg-preview.png",
            value: 2000
        },
        {
            name: "Thon",
            image: "assets/thon-removebg-preview.png",
            value: 2500
        },
        {
            name: "Truite arc-en-ciel",
            image: "assets/Truite_arc-en-ciel-removebg-preview.png",
            value: 3000,
        },
        {
            name: "Aiguillat commun",
            image: "assets/Aiguillat_commun-removebg-preview.png",
            value: 3500,
        },
        {
            name: "Anguille",
            image: "assets/Anguille-removebg-preview.png",
            value: 4000,
        },
        {
            name: "Baliste",
            image: "assets/Baliste_-removebg-preview.png",
            value: 4500,
        },
        {
            name: "Castagnole",
            image: "assets/Grande_Castagnole-removebg-preview.png",
            value: 5000,
        },
    ];
    
    function playBackgroundMusic() {
        const backgroundMusic = new Audio('assets/bubbles-171716.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.play();
    }
    // Fonction pour changer le fond d'écran
    function changeBackground(imageUrl) {
        body.style.backgroundImage = "url('" + imageUrl + "')";
    }

    // Mettre à jour l'image de la canne à pêche dans le DOM
    function updateRodImage() {
        if (elements == 1) {
            fishingRodImage.src = "assets/canne.webp";
        }
        if (elements >= 2) {
            fishingRodImage.src = "assets/fusil.png";
        }
    }

    function updateFish() {
        fishName.textContent = fishDict[fishIndex].name;
        fishImage.src = fishDict[fishIndex].image;
        fishPrice.textContent = fishDict[fishIndex].value;
    }

    // Fonction d'achat de poisson
    function buyFish() {
        if (points >= fishDict[fishIndex].value) {
            fishIndex++;
            pointsDisplay.textContent = points;
            updateFish();
            // Mettre à jour la couleur de l'échelle lors de l'achat d'un poisson
            updateDepthColor(fishIndex); // Appel de la fonction ici
            if (fishIndex === 1) { // Vérifie si le quatrième poisson a été pêché
                changeBackground('assets/photos/Profondeur moyenne.jpg');
            } else if (fishIndex === 2) { // Vérifie si le huitième poisson a été pêché
                changeBackground('assets/photos/les-abysses.jpg');
            }
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce poisson.");
        }
    }
    
    
    // Fonction de clic
    function clic() {
        points += bonus * bonusMultiplier; // Points gagnés = bonus * multiplicateur de bonus
        pointsDisplay.textContent = points;
        clickCount++;
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
    
    // Fonction pour acheter un élément
    function acheterElement() {
        if (points >= Math.floor(level * 50 * Math.pow(1.1, elements)) ){
            points -= Math.floor(level * 50 * Math.pow(1.1, elements))
            elements++;
            bonus += 1;
            level += 1;
            pointsDisplay.textContent = points;
            updateShopPrices();
            updateRodImage();
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément.");
        }
    }

    function buyAutoClick() {
        if (points >= Math.floor(level * 50 * Math.pow(1.1, auto_click_value))) {
            points -= Math.floor(level * 50 * Math.pow(1.1, auto_click_value));
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
        const elementPrice = Math.floor(level * 50 * Math.pow(1.1, elements)); // Exponential increase
        const autoClickPrice = Math.floor(level * 50 * Math.pow(1.1, auto_click_value)); // Exponential increase
        buyElementButton.textContent = "Améliorer canne à pêche (+1 point/clic) | prix = " + elementPrice + " points";
        buyAutoClickButton.textContent = "Acheter un trésor enfoui (+1 point/seconde) | prix = " + autoClickPrice + " points";
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
    function createDepthMarkers() {
        const depthScale = document.getElementById('depthScale');
        for (let depth = 0; depth <= 8000; depth += 1000) {
            const marker = document.createElement('div');
            marker.classList.add('depth-scale-marker');
            marker.textContent = depth;
            depthScale.appendChild(marker);
        }
    }
    function updateDepthColor(fishIndex) {
        const depthScale = document.getElementById('depthScale');
        if (fishIndex < 1) { // Avant de pêcher le poisson numéro 4
            depthScale.style.background = `linear-gradient(to bottom, lightblue 0%, lightblue 80%, transparent 80%, transparent 100%)`;
        } else if (fishIndex < 4) { // Après avoir pêché le poisson numéro 4 et avant de pêcher le poisson numéro 8
            depthScale.style.background = `linear-gradient(to bottom, lightblue 0%, lightblue 30%, blue 30%, blue 80%, transparent 80%, transparent 100%)`;
        } else { // Après avoir pêché le poisson numéro 8
            depthScale.style.background = `linear-gradient(to bottom, lightblue 0%, lightblue 30%, blue 30%, blue 80%, darkblue 80%, green 100%)`;
        }
    }
    function createBubbleAnimation() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble-animation';
        document.body.appendChild(bubble);
    
        const screenWidth = window.innerWidth;
        const randomX = Math.random() * screenWidth;
        const randomSize = Math.random() * 20 + 10;
    
        bubble.style.left = randomX + 'px';
        bubble.style.width = randomSize + 'px';
        bubble.style.height = randomSize + 'px';
    
        setTimeout(() => {
            bubble.remove();
        }, 5000); // Supprime la bulle après 5 secondes
    }
    
    // Appelle la fonction createBubbleAnimation toutes les secondes
    setInterval(createBubbleAnimation, 1000);
    
    
    // Gestion des événements
    updateShopPrices();
    updateFish();
    createDepthMarkers();
    updateDepthColor(fishIndex);
    clickButton.addEventListener('click', clic);
    clickButton.addEventListener('click', showClick);
    buyElementButton.addEventListener('click', acheterElement);
    buyAutoClickButton.addEventListener('click', buyAutoClick);
    buyButton.addEventListener('click', buyFish);

    // Sauvegarde automatique toutes les 10 secondes
    setInterval(saveProgression, 10000);

    // Bonus automatique
    setInterval(auto_click, 1000);
});


