function playBackgroundMusic() {
    const backgroundMusic = new Audio('assets/bubbles-171716.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();
}

function changeBackground(imageUrl) {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

function updateRodImage(elements) {
    const fishingRodImage = document.getElementById('fishingRodImage');
    if (elements == 1) {
        fishingRodImage.src = "assets/canne.webp";
    }
    if (elements >= 2) {
        fishingRodImage.src = "assets/fusil.png";
    }
}

function updateFish(fishIndex, fishDict) {
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const fishPrice = document.getElementById('fishPrice');
    fishName.textContent = fishDict[fishIndex].name;
    fishImage.src = fishDict[fishIndex].image;
    fishPrice.textContent = fishDict[fishIndex].value;
}

function buyFish(points, fishIndex, fishDict, changeBackground, updateDepthColor) {
    const pointsDisplay = document.getElementById('points');
    if (points >= fishDict[fishIndex].value) {
        fishIndex++;
        points -= fishDict[fishIndex].value;
        pointsDisplay.textContent = points;
        updateFish(fishIndex, fishDict);
        updateDepthColor(fishIndex);
        if (fishIndex === 1) {
            changeBackground('assets/photos/Profondeur moyenne.jpg');
        } else if (fishIndex === 2) {
            changeBackground('assets/photos/les-abysses.jpg');
        }
    } else {
        alert("Vous n'avez pas assez de points pour acheter ce poisson.");
    }
}

function clic(bonus, bonusMultiplier, pointsDisplay) {
    points += bonus * bonusMultiplier;
    pointsDisplay.textContent = points;
    clickCount++;
}

function auto_click(auto_click_value, pointsDisplay, createBubble) {
    if (auto_click_value > 0) {
        points += auto_click_value;
        pointsDisplay.textContent = points;
        for (let i = 0; i < auto_click_value; i++) {
            createBubble();
        };
    }
}

function acheterElement(points, elements, bonus, level, updateShopPrices, updateRodImage) {
    const pointsDisplay = document.getElementById('points');
    if (points >= Math.floor(level * 50 * Math.pow(1.1, elements))) {
        points -= Math.floor(level * 50 * Math.pow(1.1, elements));
        elements++;
        bonus += 1;
        level += 1;
        pointsDisplay.textContent = points;
        updateShopPrices();
        updateRodImage(elements);
    } else {
        alert("Vous n'avez pas assez de points pour acheter cet élément.");
    }
}

function buyAutoClick(points, auto_click_value, level, updateShopPrices) {
    const pointsDisplay = document.getElementById('points');
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

function saveProgression(points, elements, bonus, auto_click_value, level, fishIndex, clickCount, bonusMultiplier) {
    localStorage.setItem('points', points);
    localStorage.setItem('elements', elements);
    localStorage.setItem('bonus', bonus);
    localStorage.setItem('auto_click_value', auto_click_value);
    localStorage.setItem('level', level);
    localStorage.setItem('fishIndex', fishIndex);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('bonusMultiplier', bonusMultiplier);
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
    if (fishIndex < 1) {
        depthScale.style.background = `linear-gradient(to bottom, lightblue 0%, lightblue 80%, transparent 80%, transparent 100%)`;
    } else if (fishIndex < 4) {
        depthScale.style.background = `linear-gradient(to bottom, lightblue 0%, lightblue 30%, blue 30%, blue 80%, transparent 80%, transparent 100%)`;
    } else {
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
    }, 5000);
}

setInterval(createBubbleAnimation, 1000);
