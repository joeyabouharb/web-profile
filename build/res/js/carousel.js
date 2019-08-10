'use-strict';
import Siema from "siema"
(() => {
    // New siema instance
const mySiema = new Siema();

// Add a function that generates pagination to prototype
Siema.prototype.addPagination = function() {
  const selectors = document.getElementById('button-selectors')
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    btn.classList.add('button', 'is-light', 'has-slight-radius', 'button-even');
    btn.addEventListener('click', () => this.goTo(i));
    selectors.appendChild(btn);
  }
  // this.selector.appendChild(selectors);
}

// Trigger pagination creator
mySiema.addPagination();
})();