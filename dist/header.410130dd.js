parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pkmj":[function(require,module,exports) {
var define;
var t;!function(o,i){"use strict";"function"==typeof t&&t.amd?t([],i):"object"==typeof exports?module.exports=i():o.Headroom=i()}(this,function(){"use strict";var t={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};function o(t){this.callback=t,this.ticking=!1}function i(t,o){var n;o=function t(o){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var i,n,e,s=o||{};for(n=1;n<arguments.length;n++){var r=arguments[n]||{};for(i in r)"object"!=typeof s[i]||(e=s[i])&&"undefined"!=typeof window&&(e===window||e.nodeType)?s[i]=s[i]||r[i]:s[i]=t(s[i],r[i])}return s}(o,i.options),this.lastKnownScrollY=0,this.elem=t,this.tolerance=(n=o.tolerance)===Object(n)?n:{down:n,up:n},this.classes=o.classes,this.offset=o.offset,this.scroller=o.scroller,this.initialised=!1,this.onPin=o.onPin,this.onUnpin=o.onUnpin,this.onTop=o.onTop,this.onNotTop=o.onNotTop,this.onBottom=o.onBottom,this.onNotBottom=o.onNotBottom}return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,o.prototype={constructor:o,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},i.prototype={constructor:i,init:function(){if(i.cutsTheMustard)return this.debouncer=new o(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this},destroy:function(){var t=this.classes;for(var o in this.initialised=!1,t)t.hasOwnProperty(o)&&this.elem.classList.remove(t[o]);this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var t=this.elem.classList,o=this.classes;!t.contains(o.pinned)&&t.contains(o.unpinned)||(t.add(o.unpinned),t.remove(o.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var t=this.elem.classList,o=this.classes;t.contains(o.unpinned)&&(t.remove(o.unpinned),t.add(o.pinned),this.onPin&&this.onPin.call(this))},top:function(){var t=this.elem.classList,o=this.classes;t.contains(o.top)||(t.add(o.top),t.remove(o.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var t=this.elem.classList,o=this.classes;t.contains(o.notTop)||(t.add(o.notTop),t.remove(o.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var t=this.elem.classList,o=this.classes;t.contains(o.bottom)||(t.add(o.bottom),t.remove(o.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var t=this.elem.classList,o=this.classes;t.contains(o.notBottom)||(t.add(o.notBottom),t.remove(o.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(t){return Math.max(t.offsetHeight,t.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var t=document.body,o=document.documentElement;return Math.max(t.scrollHeight,o.scrollHeight,t.offsetHeight,o.offsetHeight,t.clientHeight,o.clientHeight)},getElementHeight:function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(t){var o=t<0,i=t+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return o||i},toleranceExceeded:function(t,o){return Math.abs(t-this.lastKnownScrollY)>=this.tolerance[o]},shouldUnpin:function(t,o){var i=t>this.lastKnownScrollY,n=t>=this.offset;return i&&n&&o},shouldPin:function(t,o){var i=t<this.lastKnownScrollY,n=t<=this.offset;return i&&o||n},update:function(){var t=this.getScrollY(),o=t>this.lastKnownScrollY?"down":"up",i=this.toleranceExceeded(t,o);this.isOutOfBounds(t)||(t<=this.offset?this.top():this.notTop(),t+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(t,i)?this.unpin():this.shouldPin(t,i)&&this.pin(),this.lastKnownScrollY=t)}},i.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},i.cutsTheMustard=void 0!==t&&t.rAF&&t.bind&&t.classList,i});
},{}],"pJfE":[function(require,module,exports) {
"use strict";var e=t(require("headroom.js"));function t(e){return e&&e.__esModule?e:{default:e}}!function(){console.log("don't be cheeky 🥺");var t=document.querySelector(".burger"),s=document.querySelector("#navMenu");t.addEventListener("click",function(){t.classList.toggle("is-active"),s.classList.contains("bounceIn")?(s.classList.toggle("bounceOut"),s.classList.remove("bounceIn"),setTimeout(function(){s.classList.remove("is-active")},720)):s.classList.contains("bounceOut")?(s.classList.toggle("is-active"),s.classList.remove("bounceOut"),s.classList.toggle("bounceIn")):(s.classList.toggle("is-active"),s.classList.toggle("bounceIn"))});var n=document.getElementById("header");new e.default(n,{offset:105,tolerance:5,classes:{initial:"animated",pinned:"slideInDown",unpinned:"slideOutUp"}}).init()}();
},{"headroom.js":"pkmj"}]},{},["pJfE"], null)
//# sourceMappingURL=/header.410130dd.js.map