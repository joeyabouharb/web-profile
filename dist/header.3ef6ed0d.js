parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {!function(){console.log("don't be cheeky \uD83E\uDD7A");var s=document.querySelector(".burger"),e=document.querySelector("#navMenu");s.addEventListener("click",function(){s.classList.toggle("is-active"),e.classList.contains("bounceIn")?(e.classList.toggle("bounceOut"),e.classList.remove("bounceIn"),e.classList.remove("is-active")):e.classList.contains("bounceOut")?(e.classList.toggle("is-active"),e.classList.remove("bounceOut"),e.classList.toggle("bounceIn")):(e.classList.toggle("is-active"),e.classList.toggle("bounceIn"))})}();return{"pJfE":{}};});