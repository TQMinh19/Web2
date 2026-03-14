document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.customer-nav a');
    const contentSections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.customer-nav li');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target section id from href
            const targetId = this.getAttribute('href').substring(1);

            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));

            // Add active class to the clicked nav item
            this.parentElement.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});
