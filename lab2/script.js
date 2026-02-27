const participants = [
    { nickname: 'leksahk', wins: 5, points: 1250 },
    { nickname: 'CodeQueen', wins: 4, points: 1100 },
    { nickname: 'CyberKnight', wins: 2, points: 850 }
];

function renderRanking() {
    const tableBody = document.getElementById('ranking-body');
    tableBody.innerHTML = ''; 

    participants.forEach((user, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${user.nickname}</td>
            <td>${user.wins}</td>
            <td>${user.points}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function editProject(pencilIcon) {
    const article = pencilIcon.closest('.project-item');
    
    const title = article.querySelector('h3');
    const status = article.querySelector('strong');
    const description = article.querySelector('.project-desc');

    const newName = prompt("Змінити назву проєкту:", title.innerText);
    if (newName !== null && newName.trim() !== "") {
        title.innerText = newName; 
    }

    const newStatus = prompt("Змінити статус (напр., В процесі, Завершено):", status.innerText);
    if (newStatus !== null && newStatus.trim() !== "") {
        status.innerText = newStatus;
    }

    const newDesc = prompt("Змінити опис проєкту:", description.innerText);
    if (newDesc !== null && newDesc.trim() !== "") {
        description.innerText = newDesc; 
    }
}

function joinHackathon(button) {
    button.innerText = "Ви у списку";
    button.classList.add('btn-joined');
    button.disabled = true;

    participants.push({ nickname: 'Ви (Учасник)', wins: 0, points: 100 });
    renderRanking();
}

//таймер зворотного відліку
function initTimer() {
    const deadline = new Date("March 22, 2026 23:59:59").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = deadline - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer-countdown").innerHTML = 
            days + "д " + hours + "г " + minutes + "хв " + seconds + "с ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer-countdown").innerHTML = "ЧАС ВИЙШОВ";
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderRanking();
    initTimer();
});