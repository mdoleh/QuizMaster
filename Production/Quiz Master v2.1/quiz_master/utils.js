// Keycode utility
window.utils = window.utils || {};
window.utils.keyCodes = {
    spacebar: 32,
    enter: 13
};
// Array shuffle method
Array.prototype.shuffle = function () {
    for (var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};