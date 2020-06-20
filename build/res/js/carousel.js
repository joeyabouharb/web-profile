'use-strict';
import Siema from "siema"
(() => {
    // New siema instance
  const imgArr = ['/ezgif-2-aade6c3074bf.webp', '/bank-app.webp', '/mock-data.webp', '/quiz-proj.webp']
  const auto = {
    mySiema: null,
    value: 0,
    start:  function (){ this.value = setInterval(() => this.mySiema.next(), 7000); },
    stop: function () { clearInterval(this.value) },
  }
  const mySiema = new Siema({
    loop: true,
    onChange: () => {
      auto.stop();
      auto.start();
    }
  });

Siema.prototype.addPagination = function () {
  this.navigationButtons = document.getElementById('button-selectors');
  this.prevArrow = document.createElement('button');
  this.nextArrow = document.createElement('button');
  this.prevArrow.innerHTML = '<i class="fas fa-backward"></i>';
  this.nextArrow.innerHTML = '<i class="fas fa-forward"></i>';
  this.prevArrow.classList.add('button', 'is-dark', 'has-text-black', 'has-slight-radius', 'shadowed', 'align-self');
  this.navigationButtons.appendChild(this.prevArrow);
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    btn.classList.add('button', 'is-primary', 'has-text-dark', 'has-slight-radius', 'button-even', 'shadowed');
    btn.addEventListener('click', () => {
      this.goTo(i);
    });
    this.navigationButtons.appendChild(btn);
  }
  this.nextArrow.classList.add('button', 'is-dark', 'has-text-black', 'has-slight-radius', 'shadowed', 'align-self');
  this.navigationButtons.appendChild(this.nextArrow);

  this.prevArrow.addEventListener('click', () => {
    this.prev();
  });
  this.nextArrow.addEventListener('click', () => {
    this.next();
  });
}
// Trigger pagination creator
auto.mySiema = mySiema;
auto.start();
mySiema.addPagination();
// mySiema.addArrows();

})();