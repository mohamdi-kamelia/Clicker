document.addEventListener('DOMContentLoaded', function() {
    let points = parseInt(localStorage.getItem('points')) || 0;
    let elements = parseInt(localStorage.getItem('elements')) || 0;
    let bonus = parseInt(localStorage.getItem('bonus')) || 1;
    let auto_click_value = parseInt(localStorage.getItem('auto_click_value')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let fishIndex = parseInt(localStorage.getItem('fishIndex')) || 0;

    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('clickButton');
    const buyElementButton = document.getElementById('buyElement');
    const buyAutoClickButton = document.getElementById('buyTreasure');
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const fishPrice = document.getElementById('fishPrice');
    const buyButton = document.getElementById('buyButton');

    pointsDisplay.textContent = points;

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
            name: "new_fish_1",
            image: "assets/new_fish_1.png",
            value: 1500
        },
        {
            name: "new_fish_2",
            image: "assets/new_fish_2.png",
            value: 2000
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
            changeBackground();
        } else {
            alert("Vous n'avez pas assez de points pour acheter ce poisson.");
        }
    }

    function clic() {
        points += bonus;
        pointsDisplay.textContent = points;
        updateFishSize();
        if (checkAllFishBought()) {
            changeBackground();
        }
    }

    function auto_click() {
        if (auto_click_value > 0) {
            points += auto_click_value;
            pointsDisplay.textContent = points;
        }
    }

    function acheterElement() {
        if (points >= level * 50) {
            points -= level * 50;
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

    function updateShopPrices() {
        buyElementButton.textContent = "Améliorer canne à pêche (+1 point/clic) | prix = " + level * 50 + " points";
        buyAutoClickButton.textContent = "Acheter un trésor enfoui (+1 point/seconde) | prix = " + level * 50 + " points";
    }

    function saveProgression() {
        localStorage.setItem('points', points);
        localStorage.setItem('elements', elements);
        localStorage.setItem('bonus', bonus);
        localStorage.setItem('auto_click_value', auto_click_value);
        localStorage.setItem('level', level);
        localStorage.setItem('fishIndex', fishIndex);
    }

    function checkAllFishBought() {
        return fishIndex >= fishDict.length;
    }

    function changeBackground() {
        if (checkAllFishBought()) {
            document.body.style.backgroundImage = "(jpg'assets/photos/Profondeur moyenne.jpg')";
        }
    }

    updateFish();
    updateShopPrices();
    clickButton.addEventListener('click', clic);
    buyElementButton.addEventListener('click', acheterElement);
    buyAutoClickButton.addEventListener('click', buyAutoClick);
    buyButton.addEventListener('click', buyFish);

    setInterval(saveProgression, 10000);
    setInterval(auto_click, 1000);

});
