import bulmaCarousel from "./sass/bulma-extensions/bulma-carousel/dist/js/bulma-carousel"
(() => {
    const element = document.querySelector('#carousel-demo')
    bulmaCarousel.attach(element, {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
    });
})();