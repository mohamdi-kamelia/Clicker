// JavaScript

let clicks = 0; // Variable pour compter les clics sur l'image du chimiste
let currentSolutionIndex = 0; // Index de la solution actuelle dans le tableau de solutions
let timerInterval; // Variable pour stocker l'ID de l'intervalle du chronomètre
let seconds = 0; // Variable pour stocker le nombre de secondes écoulées
let score = 0; // Score du joueur
let currentStageIndex = 0; // Index de l'étape actuelle
let currentStagePoints = 0; // Nombre de points accumulés pour l'étape actuelle

const solutions = [
    { name: "H2O", clicksRequired: 10 },
    { name: "O2", clicksRequired: 20 },
    { name: "NaOH", clicksRequired: 30 },
    { name: "NaCl", clicksRequired: 40 },
    { name: "CO2", clicksRequired: 50 },
    { name: "HCl", clicksRequired: 60 },
    { name: "CH4", clicksRequired: 70 }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('chemist').addEventListener('click', handleClick);
    updateSolution(); // Mettre à jour la solution initiale dans l'interface utilisateur
    startTimer(); // Démarrer le chronomètre
    loadScore(); // Charger le score depuis le stockage local
    loadStage(); // Charger l'étape actuelle depuis le DOM
});

function handleClick() {
    clicks++; // Incrémenter le nombre de clics
    document.getElementById('clickCount').innerText = `${clicks} clics`;

    // Vérifier si le nombre de clics atteint le seuil pour passer à la solution suivante
    if (clicks >= solutions[currentSolutionIndex].clicksRequired) {
        // Réinitialiser le compteur de clics
        clicks = 0;

        // Passer à la solution suivante
        currentSolutionIndex++;
        if (currentSolutionIndex >= solutions.length) {
            currentSolutionIndex = 0; // Revenir à la première solution si on atteint la dernière
        }

        // Mettre à jour l'interface utilisateur avec la nouvelle solution
        updateSolution();

        // Ajouter le score pour la solution découverte
        score += 10; // Par exemple, ajouter 10 points à chaque nouvelle solution découverte
        saveScore(); // Sauvegarder le score dans le stockage local
    }

    updateProgressBar();
}

function updateSolution() {
    // Afficher le nom de la solution dans l'interface utilisateur
    document.getElementById('solution').innerText = `Solution : ${solutions[currentSolutionIndex].name}`;
    // Mettre à jour le nombre de clics requis dans l'interface utilisateur
    document.getElementById('clicksRequired').innerText = `Clics requis : ${solutions[currentSolutionIndex].clicksRequired}`;
}

function updateProgressBar() {
    const currentSolution = solutions[currentSolutionIndex];
    const progressBarWidth = (clicks / currentSolution.clicksRequired) * 100;
    document.getElementById('progressBar').style.width = `${progressBarWidth}%`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, 1000);
}

function saveScore() {
    localStorage.setItem('score', score);
}

function loadScore() {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
        score = parseInt(savedScore);
    }
}

function saveStage() {
    // Sauvegarder l'étape actuelle dans les éléments cachés du DOM
    document.getElementById('currentStageIndex').value = currentStageIndex;
    document.getElementById('currentStagePoints').value = currentStagePoints;
}

function loadStage() {
    // Charger l'étape actuelle depuis les éléments cachés du DOM
    const savedStageIndex = parseInt(document.getElementById('currentStageIndex').value);
    const savedStagePoints = parseInt(document.getElementById('currentStagePoints').value);

    if (!isNaN(savedStageIndex) && !isNaN(savedStagePoints)) {
        currentStageIndex = savedStageIndex;
        currentStagePoints = savedStagePoints;
    }
}

