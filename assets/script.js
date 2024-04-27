document.addEventListener('DOMContentLoaded', function() {
    localStorage.clear(); // À commenter si vous souhaitez conserver les données entre les sessions.
    let points = parseInt(localStorage.getItem('points')) || 0;
    let elements = parseInt(localStorage.getItem('elements')) || 0;
    let bonus = parseInt(localStorage.getItem('bonus')) || 1;
    let auto_click_value = parseInt(localStorage.getItem('auto_click_value')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let fishIndex = parseInt(localStorage.getItem('fishIndex')) || 0;
    let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    let bonusMultiplier = parseInt(localStorage.getItem('bonusMultiplier')) || 1;

    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('fishingRodImage');
    const buyElementButton = document.getElementById('buyElement');
    const buyAutoClickButton = document.getElementById('buyTreasure');
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const fishPrice = document.getElementById('fishPrice');
    const fishCoordinates = document.getElementById('fishCoordinates');

    const fishDict = [
        { name: "sardine", image: "sardine.png", value: 10, coordinates: "(30, 20)" },
        { name: "anchois", image: "anchois.png", value: 100, coordinates: "(50, 40)" },
        { name: "bar", image: "bar.png", value: 150, coordinates: "(70, 60)" },
        { name: "cabillaud", image: "cabillaud.png", value: 200, coordinates: "(90, 80)" }
    ];

    const canneDict = [
        { models: "canne simple", image: "canne.webp", value: 50 },
        { models: "canne améliorée", image: "cane_a_peche.png", value: 150 },
        { models: "fusil harpon", image: "fusil_harpon.png", value: 200 },
        { models: "fusil harpon cobra", image: "fusil_cobra_carbone.png", value: 250 }
    ];

    function updateUI() {
        fishName.textContent = fishDict[fishIndex].name;
        fishImage.src = fishDict[fishIndex].image;
        fishPrice.textContent = `Prix : ${fishDict[fishIndex].value} points`;
        fishCoordinates.textContent = `Coordonnées : ${fishDict[fishIndex].coordinates}`;
        pointsDisplay.textContent = points;
        buyElementButton.textContent = `Améliorer canne à pêche (+1 point/clic) | Prix : ${canneDict[elements].value} points`;
        buyAutoClickButton.textContent = `Acheter auto-click (+1 point/seconde) | Prix : ${level * 50} points`;
        updateRodImage();
    }

    function updateRodImage() {
        clickButton.src = canneDict[Math.min(elements, canneDict.length - 1)].image;
    }

    function saveProgression() {
        localStorage.setItem('points', points.toString());
        localStorage.setItem('elements', elements.toString());
        localStorage.setItem('bonus', bonus.toString());
        localStorage.setItem('auto_click_value', auto_click_value.toString());
        localStorage.setItem('level', level.toString());
        localStorage.setItem('fishIndex', fishIndex.toString());
        localStorage.setItem('clickCount', clickCount.toString());
        localStorage.setItem('bonusMultiplier', bonusMultiplier.toString());
    }

    clickButton.addEventListener('click', function() {
        points += bonus * bonusMultiplier;
        clickCount++;
        if (clickCount % 100 === 0) bonusMultiplier *= 2;
        if (clickCount >= 500) {
            alert("Félicitations ! Vous avez atteint 500 clics. Vous avez gagné !");
            clickCount = 0;
        }
        updateUI();
        saveProgression();
    });

    buyElementButton.addEventListener('click', function() {
        const upgradeCost = canneDict[Math.min(elements + 1, canneDict.length - 1)].value;
        if (points >= upgradeCost) {
            points -= upgradeCost;
            elements++;
            bonus++;
            level++;
            updateUI();
            saveProgression();
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément.");
        }
    });

    buyAutoClickButton.addEventListener('click', function() {
        const autoClickCost = level * 50;
        if (points >= autoClickCost) {
            points -= autoClickCost;
            auto_click_value++;
            level++;
            updateUI();
            saveProgression();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce bonus.");
        }
    });

    buyButton.addEventListener('click', function() {
        if (points >= fishDict[fishIndex].value) {
            points -= fishDict[fishIndex].value;
            fishIndex = (fishIndex + 1) % fishDict.length;
            updateUI();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce poisson.");
        }
    });

    setInterval(function() {
        if (auto_click_value > 0) {
            points += auto_click_value;
            updateUI();
        }
    }, 1000);

    updateUI();
});
