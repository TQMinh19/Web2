let currentSlide = 0;
let slides, dots, totalSlides;
let isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    totalSlides = slides.length;

    // Auto-change slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }, 5000);

    // Initialize login/menu state
    initializeAuth();

    // User menu handlers
    const userIcon = document.querySelector('.user-icon');
    const userMenuContainer = document.querySelector('.user-menu-container');
    const logoutBtn = document.querySelector('.logout-btn');
    const loginForm = document.getElementById('loginForm');
    const loginToggle = document.getElementById('loginToggle');

    // Toggle user menu dropdown
    if (userIcon) {
        userIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            if (isLoggedIn) {
                userMenuContainer.classList.toggle('active');
            } else {
                // If not logged in, open login modal
                loginToggle.checked = true;
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (userMenuContainer && !userMenuContainer.contains(e.target)) {
            userMenuContainer.classList.remove('active');
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (email && password) {
                // Mark as logged in
                isLoggedIn = true;
                localStorage.setItem('userLoggedIn', 'true');

                // Close login modal
                loginToggle.checked = false;

                // Show user menu
                initializeAuth();
                userMenuContainer.classList.add('active');

                // Clear form
                loginForm.reset();

                // Optional: Show success message
                // alert('Đăng nhập thành công!');
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Clear logged in state
            isLoggedIn = false;
            localStorage.removeItem('userLoggedIn');

            // Hide user menu
            userMenuContainer.classList.remove('active');

            // Reinitialize auth UI
            initializeAuth();
        });
    }
});

// Initialize authentication UI based on login state
function initializeAuth() {
    const userMenuContainer = document.querySelector('.user-menu-container');
    const loginToggle = document.getElementById('loginToggle');

    if (isLoggedIn) {
        // Show user menu, hide login modal
        userMenuContainer.style.display = 'flex';
        loginToggle.checked = false;
    } else {
        // Show login option, hide user menu
        userMenuContainer.style.display = 'flex';
        userMenuContainer.classList.remove('active');
    }
}

// Manual slide change
function changeSlide(index) {
    currentSlide = index;
    updateSlide();
}

// Update slide display
function updateSlide() {
    if (!slides || !dots) return;

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}
