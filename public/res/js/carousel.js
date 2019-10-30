'use-strict';
import Siema from "siema"
(() => {
    // New siema instance
  const imgArr = ['/ezgif-2-aade6c3074bf.webp', '/bank-app.webp', '/mock-data.webp', '/quiz-proj.webp']
  const mySiema = new Siema({});

Siema.prototype.addPagination = function () {
  const selectors = document.getElementById('button-selectors');
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    btn.classList.add('button', 'is-light', 'has-slight-radius', 'button-even');
    btn.addEventListener('click', () => this.goTo(i));
    selectors.appendChild(btn);
  }
}
// Trigger pagination creator
mySiema.addPagination();
})();