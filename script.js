import { affichagePoints, BoutonClick, acheterElementButton, boutonAutoClick, boutonAcheter, nomPoisson, imagePoisson, prixPoisson, body } from './constantes.js';

document.addEventListener('DOMContentLoaded', function() {
    // A décommenter pour effacer les données sauvegardées :
    // localStorage.clear();

    // Initialisation des variables à partir du stockage local ou avec des valeurs par défaut
    let points = parseInt(localStorage.getItem('points')) || 0;
    let elements = parseInt(localStorage.getItem('elements')) || 0;
    let bonus = parseInt(localStorage.getItem('bonus')) || 1;
    let valeurAutoClick = parseInt(localStorage.getItem('valeurAutoClick')) || 0;
    let niveau = parseInt(localStorage.getItem('niveau')) || 1;
    let indexPoisson = parseInt(localStorage.getItem('indexPoisson')) || 0;
    let compteurClicks = parseInt(localStorage.getItem('compteurClicks')) || 0;
    let multiplicateur = parseInt(localStorage.getItem('multiplicateur')) || 1;

    // Éléments du DOM


    // Affichage des points
    affichagePoints.textContent = points;

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
    function miseAJourCanne() {
        if (elements == 1) {
            imageCanne.src = "assets/canne.webp";
        }
        if (elements >= 2) {
            imageCanne.src = "assets/fusil.png";
        }
        
    }

    // Mettre à jour l'image du poisson dans le DOM
    function miseAJourPoisson() {
        nomPoisson.textContent = fishDict[indexPoisson].name;
        imagePoisson.src = fishDict[indexPoisson].image;
        prixPoisson.textContent = fishDict[indexPoisson].value;
    }

    // Fonction d'achat de poisson
    function pecherPoisson() {
        if (points >= fishDict[indexPoisson].value) {
            indexPoisson++;
            affichagePoints.textContent = points;
            miseAJourPoisson();
            // Mettre à jour la couleur de l'échelle lors de l'achat d'un poisson
            updateDepthColor(indexPoisson); // Appel de la fonction ici
            if (indexPoisson === 1) { // Vérifie si le quatrième poisson a été pêché
                changeBackground('assets/photos/Profondeur moyenne.jpg');
            } else if (indexPoisson === 2) { // Vérifie si le huitième poisson a été pêché
                changeBackground('assets/photos/les-abysses.jpg');
            }
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce poisson.");
        }
    }
    
    
    // Fonction de clic
    function clic() {
        points += bonus * multiplicateur; // Points gagnés = bonus * multiplicateur de bonus
        affichagePoints.textContent = points;
        compteurClicks++;
        }


    // Fonction gérant le clic automatique
    function auto_click() {
        if (valeurAutoClick > 0) {
            points += valeurAutoClick;
            affichagePoints.textContent = points;
            for (let i = 0; i < valeurAutoClick; i++) {
                creerBulle();
            };
        }
    }
    
    // Fonction pour acheter un élément
    function acheterElement() {
        if (points >= Math.floor(niveau * 50 * Math.pow(1.1, elements)) ){
            points -= Math.floor(niveau * 50 * Math.pow(1.1, elements))
            elements++;
            bonus += 1;
            niveau += 1;
            affichagePoints.textContent = points;
            miseAJourPrix();
            miseAJourCanne();
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément.");
        }
    }

    // Fonction pour acheter ou améliorer l'auto click
    function acheterAutoClick() {
        if (points >= Math.floor(niveau * 50 * Math.pow(1.1, valeurAutoClick))) {
            points -= Math.floor(niveau * 50 * Math.pow(1.1, valeurAutoClick));
            valeurAutoClick++;
            niveau += 1;
            affichagePoints.textContent = points;
            miseAJourPrix();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce bonus.");
        }
    }

    // Mise à jour des prix dans la boutique
    function miseAJourPrix() {
        const elementPrice = Math.floor(niveau * 50 * Math.pow(1.1, elements)); // Exponential increase
        const autoClickPrice = Math.floor(niveau * 50 * Math.pow(1.1, valeurAutoClick)); // Exponential increase
        acheterElementButton.textContent = "Améliorer canne à pêche (+1 point/clic) | prix = " + elementPrice + " points";
        boutonAutoClick.textContent = "Acheter un trésor enfoui (+1 point/seconde) | prix = " + autoClickPrice + " points";
    }  

    // Fonction de sauvegarde de la progression
    function sauvegarder() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
        localStorage.setItem('valeurAutoClick', valeurAutoClick);
        localStorage.setItem('niveau', niveau);
        localStorage.setItem('indexPoisson', indexPoisson);
        localStorage.setItem('compteurClicks', compteurClicks);
        localStorage.setItem('multiplicateur', multiplicateur);
    }

    // Effet visuel du clic
    function afficherClic() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 20);
    }

    // Fonction pour créer une bulle ) chaque clic
    function creerBulle() {
        const bulle = document.createElement('div');
        bulle.className = 'bulle';

        const screenWidth = window.innerWidth;
        const randomX = Math.random() * screenWidth;

        bulle.style.left = randomX + 'px';
        bulle.style.top = '700px';
        document.body.appendChild(bulle);
    
        bulle.addEventListener('animationend', () => {
            bulle.remove();
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
    function updateDepthColor(indexPoisson) {
        const depthScale = document.getElementById('depthScale');
        if (indexPoisson < 1) { // Avant de pêcher le poisson numéro 4
            depthScale.style.background = `linear-gradient(to bottom, lightblue 0%, lightblue 80%, transparent 80%, transparent 100%)`;
        } else if (indexPoisson < 4) { // Après avoir pêché le poisson numéro 4 et avant de pêcher le poisson numéro 8
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
    miseAJourCanne();
    miseAJourPrix();
    miseAJourPoisson();

    createDepthMarkers();
    updateDepthColor(indexPoisson);

    BoutonClick.addEventListener('click', clic);
    BoutonClick.addEventListener('click', afficherClic);
    BoutonClick.addEventListener('click', creerBulle);
    acheterElementButton.addEventListener('click', acheterElement);
    boutonAutoClick.addEventListener('click', acheterAutoClick);
    boutonAcheter.addEventListener('click', pecherPoisson);

    // Sauvegarde automatique toutes les 10 secondes
    setInterval(sauvegarder, 10000);

    // Bonus automatique
    setInterval(auto_click, 1000);
});


