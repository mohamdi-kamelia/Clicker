document.addEventListener('DOMContentLoaded', function() {
    let points = 0;
    let elements = 0;
    let bonus = 1;
    let auto_click_value = 0;
    let clickCount = 0;
    let level = 1;
    let fishIndex = 0;
    
    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('clickButton');
    const buyElementButton = document.getElementById('buyElement');
    const buyAutoClickButton = document.getElementById('buyTreasure');
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const fishPrice = document.getElementById('fishPrice');
    const fish = document.getElementById('fish');
    const buyButton = document.getElementById('buyButton');

    const fishDict = [
        {
            name : "sardine",
            image : "assets/sardine.png",
            value : 10
        },
        {
            name : "anchois",
            image : "assets/anchois.png",
            value : 1000
        },
        {
            name : "bar",
            image : "assets/bar.png",
            value : 2000
        },
        {
            name : "cabillaud",
            image : "assets/cabillaud.png",
            value : 4000
        }
    ];

    function updateFish() {
        fishName.textContent = fishDict[fishIndex].name;
        fishImage.src = fishDict[fishIndex].image;
        fishPrice.textContent = fishDict[fishIndex].value;
    }
    function buyFish() {
        if (points >= fishDict[fishIndex].value) {
            points -= fishDict[fishIndex].value;
            fishIndex++;
            pointsDisplay.textContent = points;
            updateFish();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce poisson.");
        }
    }
    
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

    function auto_click() {
        points += auto_click_value;
        pointsDisplay.textContent = points;
    }
    
    // Fonction pour acheter un élément
    function acheterElement() {
        if (points >= level*50) {
            points -= level*50;
            elements++;
            bonus += 1;
            level += 1;
            pointsDisplay.textContent = points;
            updateShopPrices();
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément.");
        }
    }

    function buyAutoClick() {
        if (points >= level *50) {
            points -= level *50;
            auto_click_value++;
            level += 1;
            pointsDisplay.textContent = points;
            updateShopPrices();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce bonus.");
        }
        
    }

    function updateShopPrices() {
        buyElementButton.textContent = "Améliorer canne à pêche (+1 point/clic) | prix = " + level*50 + " points";
        buyAutoClickButton.textContent = "Acheter un trésor enfoui (+1 point/seconde) | prix = " + level*50 + " points";
    }  
    
    function updateFishSize() {
        // Augmente la taille de l'image de poisson à chaque clic
        const newSize = 50 + clickCount * 10; // Ajuste la taille selon le nombre de clics
        fish.style.width = newSize + 'px';
    }

    // Gestion des événements
    updateFish();
    updateShopPrices();
    clickButton.addEventListener('click', clic);
    buyElementButton.addEventListener('click', acheterElement);
    buyAutoClickButton.addEventListener('click', buyAutoClick);
    buyButton.addEventListener('click', buyFish);
    
    // Sauvegarde automatique
    setInterval(function() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
    }, 60000); // Sauvegarde toutes les minutes

    setInterval(auto_click, 1000);
});