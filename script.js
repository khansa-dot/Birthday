// DOM Elements
const mainNote = document.getElementById('mainNote');
const closeBtn = document.querySelector('.close-btn');
const messageCards = document.querySelectorAll('.message-card');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');
const floatingHearts = document.querySelector('.floating-hearts');

// Open/Close main note
mainNote.addEventListener('click', (e) => {
    if (!e.target.classList.contains('close-btn')) {
        mainNote.classList.add('open');
    }
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNote.classList.remove('open');
});

// Toggle message cards
messageCards.forEach(card => {
    const toggleBtn = card.querySelector('.toggle-btn');
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('open');
        toggleBtn.textContent = card.classList.contains('open') ? '−' : '+';
    });
    
    // Also open on card header click
    card.querySelector('.card-header').addEventListener('click', () => {
        card.classList.toggle('open');
        toggleBtn.textContent = card.classList.contains('open') ? '−' : '+';
    });
});

// Surprise button
surpriseBtn.addEventListener('click', () => {
    if (surpriseMessage.style.display === 'block') {
        surpriseMessage.style.display = 'none';
        surpriseBtn.innerHTML = '<i class="fas fa-heart"></i> Click for a Special Surprise';
    } else {
        surpriseMessage.style.display = 'block';
        surpriseBtn.innerHTML = '<i class="fas fa-heart"></i> Hide Surprise';
        createFloatingHearts();
    }
});

// Create floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 50; i++) {
        createHeart();
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.opacity = '0.7';
    heart.style.zIndex = '1';
    heart.style.pointerEvents = 'none';
    heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    floatingHearts.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Add CSS for falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.7;
        }
        100% { 
            transform: translateY(-100vh) rotate(360deg); 
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create initial floating hearts
for (let i = 0; i < 20; i++) {
    setTimeout(() => createHeart(), i * 300);
}

// Auto-create hearts every 5 seconds
setInterval(() => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeart(), i * 200);
    }
}, 5000);