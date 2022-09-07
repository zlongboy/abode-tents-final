const hamburgerNav = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');

hamburgerNav.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});