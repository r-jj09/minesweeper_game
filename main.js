// function displayName() {
// 	var playerName = prompt("What's your name?");
// 	if (playerName != null) {
// 		document.getElementById("greeting").innerText = "Hello " + playerName + "!";
// 	}
// }

var grid = document.getElementById("grid");

function createSmall() {
	document.querySelector(".playfield").style.gridColumn = "10";
}
function chooseSmall() {
	var field = document.querySelector(".playfield");

	field.classList.add("playfield-small");
	field.classList.remove("playfield-medium");
	field.classList.remove("playfield-large");

	field.classList.remove("playfield-default");

	createSmall();
}

function createMedium() {
	document.querySelector(".playfield").style.gridColumn = "14";
}

function chooseMedium() {
	var field = document.querySelector(".playfield");

	field.classList.remove("playfield-small");
	field.classList.add("playfield-medium");
	field.classList.remove("playfield-large");

	field.classList.remove("playfield-default");

	createMedium();
}

function createLarge() {
	document.querySelector(".playfield").style.gridColumn = "18";
}

function chooseLarge() {
	var field = document.querySelector(".playfield");

	field.classList.remove("playfield-small");
	field.classList.remove("playfield-medium");
	field.classList.add("playfield-large");

	field.classList.remove("playfield-default");

	createLarge();
}

function startOver() {
	var field = document.querySelector(".playfield");

	field.classList.add("playfield-default");

	field.classList.remove("playfield-small");
	field.classList.remove("playfield-medium");
	field.classList.remove("playfield-large");
}

function gameOver() {
	var field = document.querySelector(".playfield");
	document.getElementById("status").style.display = "flex";

	document.getElementById("gameStatus").innerText = "You lost!";
	document.getElementById("gameStatus").style.color = "red";
}

function youWin() {
	var field = document.querySelector(".playfield");
	document.getElementById("status").style.display = "flex";

	document.getElementById("gameStatus").innerText = "You won!";
	document.getElementById("gameStatus").style.color = "green";
}

// if (
// 	document.querySelector(".playfield").classList.contains("playfield-default")
// ) {
// 	document.getElementById("lost").style.display = none;
// }
