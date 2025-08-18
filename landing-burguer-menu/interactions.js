const navMenu = document.querySelector('.nav-list');
const burgerIcon = document.querySelector('.burger-icon');
const logo = document.querySelector('.logo');
const navigation = document.querySelector('.navigation');
const contentHeader = document.querySelector('.content-header');
const a = document.querySelectorAll('.nav-list a');

burgerIcon.addEventListener('click', () => {
    /* If the user click the icon menu, navMenu is appear, display is flex, and the burguer menu display is none */
    burgerIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
    logo.classList.toggle('active');
    navigation.classList.toggle('active');
    contentHeader.classList.toggle('active');
});



window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        contentHeader.classList.add('scrolled');
        a.forEach(link => link.classList.add('scrolled'));
    } else {
        contentHeader.classList.remove('scrolled');
        a.forEach(link => link.classList.remove('scrolled'));
    }
}); 
