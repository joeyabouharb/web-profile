(() => {

    const powback = document.getElementById('powerback');
    const powerslide = document.getElementById('powerlang');
    const powforward = document.getElementById('powerforward');
    const learnforward = document.getElementById('learnforward')
    const learnback = document.getElementById('learnback')
    const learnslide = document.getElementById('learnlang');
    const slideCreate = (back, forward, slide) => {
        back.onclick = () => {
            sideScroll(slide, 'left', 100, 180, 50)
        }
    
        forward.onclick = () => {
            sideScroll(slide, 'right', 100, 180, 50)
        }
        const sideScroll = (element, direction, speed, distance, step) => {
            let scrollAmount = 0;
            const slideTimer = setInterval(() => {
                if(direction == 'left'){
                    element.scrollLeft -= step;
                } else {
                    element.scrollLeft += step;
                }
                scrollAmount += step;
                if(scrollAmount >= distance){
                    window.clearInterval(slideTimer);
                }
            }, speed);
        }
    }
    slideCreate(powback, powforward, powerslide);
    slideCreate(learnback, learnforward, learnslide)
})();