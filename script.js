
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const feedback = document.querySelector(".feedback")
const feedbackWind = document.querySelector(".feedback-container")
const overlay = document.querySelector(".overlay");
const closeWind = document.querySelector(".close-window")

let current = 0;
let timer;
let timerInterval = 4; 

// BURGER MENU
const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('menu');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active'); // Анімація хрестика
        navMenu.classList.toggle('open');      // Виїзд меню
    });
}

// =========================================
// ПІДСВІТКА АКТИВНОГО ПУНКТУ МЕНЮ
// =========================================
const navLinks = document.querySelectorAll('.navbar .menu ul li a');

let currentPath = window.location.pathname.split('/').pop();

if (currentPath === '') {
    currentPath = 'index.html';
}

navLinks.forEach(link => {
    link.classList.remove('active');
    
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// FEEDBACK
feedback.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'block';
    feedbackWind.classList.add("show")
})
closeWind.addEventListener('click', () => {
    overlay.style.display = 'none'
    feedbackWind.classList.remove("show")
})
overlay.addEventListener('click', () => {
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none'
        feedback.classList.remove("show");
        feedbackWind.classList.remove("show")
    }
})
const feedbackForm = document.getElementById('feedbackForm');
const submitBtn = document.querySelector('.feedback-send');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

if (submitBtn && feedbackForm) {
    submitBtn.addEventListener('click', function() {
        messageInput.value = messageInput.value.trim();
        if (messageInput.value === '') {
            messageInput.setCustomValidity('Коментар не може бути порожнім');
        } else {
            messageInput.setCustomValidity(''); 
        }

        const phoneRegex = /^\+?[0-9\s\-\(\)]{10,15}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Введіть коректний номер телефону (напр. +380951234567)');
        } else {
            phoneInput.setCustomValidity('');
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Введіть коректний email (наприклад: name@mail.com)');
        } else {
            emailInput.setCustomValidity('');
        }

        feedbackForm.classList.add('submitted');
    });

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        alert('Дякуємо! Ваш відгук успішно надіслано.');
        
        feedbackForm.reset();
        feedbackForm.classList.remove('submitted');
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.feedback-container').classList.remove('show');
    });
}

//SLIDER
function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.toggle("active", i === index)
        dots[i].classList.toggle("active", i === index)
    }
    current = index;
}

function nextSlide() {
    const next = (current + 1) % slides.length
    showSlide(next)
}

function prevSlide() {
    const prev = (current - 1 + slides.length) % slides.length
    showSlide(prev)
}

function startAutoSlide() {
    timer = setInterval(nextSlide, timerInterval * 1000);
}

function stopAutoSlide() {
    clearInterval(timer);
}

next.addEventListener('click', (e) => {
    e.preventDefault();
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
})

prev.addEventListener('click', (e) => {
    e.preventDefault();
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
})

dots.forEach(dot => {
    dot.addEventListener('click', e => {
        stopAutoSlide();
        showSlide(Number(e.target.dataset.index));
        startAutoSlide();
    })
})

showSlide(current);
startAutoSlide();

//PAGINATION
const itemsPerPage = 6;
const items = Array.from(document.querySelectorAll(".items_container .item")); //choose all elemnts from items container to arr
const pagination = document.getElementById("pagination");

const totalPages = Math.ceil(items.length / itemsPerPage);


function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    items.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? "block" : "none";
    });

    Array.from(pagination.children).forEach(btn => btn.classList.remove("active"));
    pagination.children[page - 1].classList.add("active");
}

function createPagination() {
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.addEventListener("click", () => showPage(i));
        pagination.appendChild(btn);
    }
}

createPagination();
showPage(1);
