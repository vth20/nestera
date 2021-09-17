// js cho Back to top of page
const Btt = document.querySelector('.backToTop')
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    if(scrolled > 750) {
        Btt.style.opacity = 1;
        Btt.style.zIndex = 5;
    }
    else {
        Btt.style.opacity = 0;
        Btt.style.zIndex = -1;
    }
})

// js cho menuModal
const menuItemOpen = document.querySelector('.js__open-modal');
const menuItemClose = document.querySelector('.js__close-modal');
const menuModal = document.querySelector('.modal__menu');
const bodyMenuModal = document.querySelector('.modal__menu-body');


menuItemOpen.onclick = function() {
    menuModal.style.display = 'block';
    bodyMenuModal.style.display = 'block';
}

menuItemClose.onclick = function() {
    menuModal.style.display = 'none';
    bodyMenuModal.style.display = 'none';
}

const searchInput = document.querySelector('.search-frame')
const searchQuick = document.querySelector('.container__quickLink')
const searchCancel = document.querySelector('.search-cancel')

searchInput.onclick = function() {
    if(searchQuick.clientHeight === 0) {
        searchQuick.style.display = 'block'
        searchCancel.style.display = 'flex'
        bodyMenuModal.style.display = 'none'
    }
    else {
        searchQuick.style.display = 'none'
        searchCancel.style.display = 'none'
        bodyMenuModal.style.display = 'block'
    }
}

searchCancel.onclick = function() {
    searchCancel.style.display = 'none';
    searchQuick.style.display = 'none'
    bodyMenuModal.style.display = 'block'
}

menuItemClose.onclick = function() {
    searchQuick.style.display = 'none';
    menuModal.style.display = 'none';
    bodyMenuModal.style.display = 'none';
}

// Slider galery logo
const logoItems = document.querySelectorAll('.logo__item')

const btnRight = document.querySelector('.clickTo__Scroll-right')
const btnLeft = document.querySelector('.clickTo__Scroll-left')


btnRight.onclick = () => {
    
}

btnLeft.onclick = () => {

}