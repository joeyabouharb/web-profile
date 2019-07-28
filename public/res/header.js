import Headroom from 'headroom.js'
(() => {
    console.log('don\'t be cheeky 🥺')
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#navMenu');
    
    burger.addEventListener('click', function(){
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    });
    const header = document.getElementById('header');
    const headroom = new Headroom(header, {
        offset: 105,
        tolerance: 5,
        classes: {
        initial: "animated",
        pinned: "slideInDown",//custom: slideDown
        unpinned: "slideOutUp"//custom: slideUp
        }
    });
    headroom.init();
    })();