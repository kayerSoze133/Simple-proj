const circle = document.querySelector('.homepage-circle.circle');
const navigation = document.querySelector('.navigation');
const mid = circle.clientWidth/2;

const images = document.querySelector('.navigation-images');
const imageTexts = document.querySelector('.navigation-texts');

let counter = 0;
// change this according to size of the menu items
const counterMax = 4; 

const navToggle = document.querySelector('.open-close-btn');
const about = document.querySelector('.about-btn');

navToggle.addEventListener('click',toggleNav);

circle.addEventListener('mousemove',rotate);

window.addEventListener('wheel',slideTextWithWheel);

window.addEventListener('keyup',slideTextWithKeys);

navigation.addEventListener('touchstart', handleTouchStart, false);

navigation.addEventListener('touchmove', handleTouchMove, false);

about.addEventListener('click',jump_to_about);