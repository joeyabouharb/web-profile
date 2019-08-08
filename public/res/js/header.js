"use strict";
import Headroom from 'headroom.js'

(() => {
    console.log('don\'t be cheeky 🥺')
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#navMenu');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
        if (nav.classList.contains("bounceIn")) {
            nav.classList.toggle("bounceOut");
            nav.classList.remove('bounceIn');
            setTimeout(() => {
                nav.classList.remove('is-active');
            }, 720)
        } else if (nav.classList.contains("bounceOut")) {
            nav.classList.toggle('is-active');
            nav.classList.remove('bounceOut');
            nav.classList.toggle('bounceIn')
        } else {
            nav.classList.toggle('is-active');
            nav.classList.toggle("bounceIn")
        }

    });
    const header = document.getElementById('header');
    const headroom = new Headroom(header, {
        offset: 105,
        tolerance: 5,
        classes: {
        initial: "animated",
        pinned: "slideInDown",
        unpinned: "slideOutUp"
        }
    });
    headroom.init();
    })();


