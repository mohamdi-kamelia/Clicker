document.addEventListener('DOMContentLoaded', function() {
    // localStorage.clear();
    let points = parseInt(localStorage.getItem('points')) || 0;
    let elements = parseInt(localStorage.getItem('elements')) || 0;
    let bonus = parseInt(localStorage.getItem('bonus')) || 1;
    let auto_click_value = parseInt(localStorage.getItem('auto_click_value')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let fishIndex = parseInt(localStorage.getItem('fishIndex')) || 0;

    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('fishingRodImage');
    const buyElementButton = document.getElementById('buyElement');
    const buyAutoClickButton = document.getElementById('buyTreasure');
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const fishPrice = document.getElementById('fishPrice');
    const buyButton = document.getElementById('buyButton');

    pointsDisplay.textContent = points;

    const fishDict = [
        {
            name : "sardine",
            image : "assets/sardine.png",
            value : 10
        },
        {
            name : "anchois",
            image : "assets/anchois.png",
            value : 100
        },
        {
            name : "bar",
            image : "assets/bar.png",
            value : 500
        },
        {
            name : "cabillaud",
            image : "assets/cabillaud.png",
            value : 1000
        }
    ];

    function updateFish() {
        fishName.textContent = fishDict[fishIndex].name;
        fishImage.src = fishDict[fishIndex].image;
        fishPrice.textContent = fishDict[fishIndex].value;
    }
    function buyFish() {
        if (points >= fishDict[fishIndex].value) {
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

    function updateShopPrices() {
        const elementPrice = Math.floor(level * 50 * Math.pow(1.1, elements)); // Exponential increase
        const autoClickPrice = Math.floor(level * 50 * Math.pow(1.1, auto_click_value)); // Exponential increase
        buyElementButton.textContent = "Améliorer canne à pêche (+1 point/clic) | prix = " + elementPrice + " points";
        buyAutoClickButton.textContent = "Acheter un trésor enfoui (+1 point/seconde) | prix = " + autoClickPrice + " points";
    }  

    function saveProgression() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
        localStorage.setItem('auto_click_value', auto_click_value);
        localStorage.setItem('level', level);
        localStorage.setItem('fishIndex', fishIndex);
    }
    
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
    
    // Gestion des événements
    updateFish();
    updateShopPrices();
    clickButton.addEventListener('click', clic);
    clickButton.addEventListener('click', showClick);
    clickButton.addEventListener('click', createBubble);
    buyElementButton.addEventListener('click', acheterElement);
    buyAutoClickButton.addEventListener('click', buyAutoClick);
    buyButton.addEventListener('click', buyFish);

    
    // Sauvegarde automatique
    setInterval(saveProgression, 10000);


    setInterval(auto_click, 1000);

});