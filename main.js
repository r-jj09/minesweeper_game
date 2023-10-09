function displayName() {
    var playerName = prompt("What's your name?");
    if (playerName != null) {
        document.getElementById("greeting").innerText = "Hello " + playerName + "!";
    }
}

function chooseSmall() {
    var small = document.getElementById("small-btn");
    var field = document.querySelector(".playfield");

    field.classList.add('playfield-small');
    field.classList.remove('playfield-medium');
    field.classList.remove('playfield-large');

    field.classList.remove('playfield-default');
}

function chooseMedium() {
    var medium = document.getElementById("medium-btn");
    var field = document.querySelector(".playfield");

    field.classList.remove('playfield-small');
    field.classList.add('playfield-medium');
    field.classList.remove('playfield-large');

    field.classList.remove('playfield-default');
}

function chooseLarge() {
    var small = document.getElementById("small-btn");
    var field = document.querySelector(".playfield");

    field.classList.remove('playfield-small');
    field.classList.remove('playfield-medium');
    field.classList.add('playfield-large');

    field.classList.remove('playfield-default');
}