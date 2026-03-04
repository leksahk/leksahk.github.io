const participants = [
    { nickname: 'leksahk', wins: 5, points: 1250 },
    { nickname: 'CodeQueen', wins: 4, points: 1100 },
    { nickname: 'CyberKnight', wins: 2, points: 850 }
];

const hackathons = [
    { id: 'card-ai', deadline: "March 03, 2026 23:59:59", name: "AI Challenge" },
    { id: 'card-cyber', deadline: "March 04, 2026 12:11:00", name: "Cyber Hack" },
    { id: 'card-web', deadline: "April 01, 2026 23:59:59", name: "Web Design Day" }
];

let currentActiveIndex = 0;

function updateTimer() {
    const timerDisplay = document.getElementById("timer-countdown");
    const now = new Date().getTime();
    
    if (currentActiveIndex >= hackathons.length) {
        timerDisplay.innerHTML = "УСІ ЗМАГАННЯ ЗАВЕРШЕНО";
        return;
    }

    const current = hackathons[currentActiveIndex];
    const distance = new Date(current.deadline).getTime() - now;

    if (distance < 0) {
        markAsInactive(current.id);
        currentActiveIndex++;
        updateTimer(); 
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = `До завершення ${current.name}: ${d}д ${h}г ${m}хв ${s}с`;
}

function markAsInactive(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.classList.add('card-inactive');
        const btn = card.querySelector('button');
        btn.innerText = "Завершено";
    }
}

function renderRanking() {
    const body = document.getElementById('ranking-body');
    body.innerHTML = '';
    participants.forEach((p, i) => {
        body.innerHTML += `<tr><td>${i+1}</td><td>${p.nickname}</td><td>${p.wins}</td><td>${p.points}</td></tr>`;
    });
}

function joinHackathon(btn) {
    btn.innerText = "Ви у списку";
    btn.style.backgroundColor = "#28a745";
    btn.disabled = true;
    participants.push({ nickname: 'Ви (Учасник)', wins: 0, points: 100 });
    renderRanking();
}

function editProject(pencilIcon) {
    const article = pencilIcon.closest('.project-item');
    const title = article.querySelector('h3');
    const status = article.querySelector('strong');
    const description = article.querySelector('.project-desc');

    const newName = prompt("Назва проєкту:", title.innerText);
    if (newName) title.innerText = newName;

    const newStatus = prompt("Статус:", status.innerText);
    if (newStatus) status.innerText = newStatus;

    const newDesc = prompt("Опис:", description.innerText);
    if (newDesc) description.innerText = newDesc;
}

document.addEventListener('DOMContentLoaded', () => {
    renderRanking();
    setInterval(updateTimer, 1000);
    updateTimer();
});