(function () {
    var welcomeMsg = document.getElementById('welcome');

})();

$(document).ready(function () {
    setInterval ('cursorAnimation()', 1000);
})

function cursorAnimation() {
    $('.welcome_cursor').animate({
        opacity: 0,
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}
