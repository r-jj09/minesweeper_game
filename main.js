function startOnLoad() {
	displayName();
	createSmall();
}
// function displayName() {
// 	var playerName = prompt("What's your name?");
// 	if (playerName != null) {
// 		document.getElementById("greeting").innerText = "Hello " + playerName + "!";
// 	}
// }
function createSmall() {
	var playfield = document.querySelector(".playfield");

	playfield.classList.add("playfield-small");
	playfield.classList.remove("playfield-medium");
	playfield.classList.remove("playfield-large");

	playfield.classList.remove("playfield-default");

	$(".playfield").empty();

	for (let i = 0; i < 49; i++) {
		var field = document.createElement("div");
		field.classList.add("field");
		field.setAttribute("data-x", i);
		playfield.append(field);
		var fieldCover = document.createElement("div");
		fieldCover.classList.add("fieldCover");
		field.append(fieldCover);

		var fieldCount = i;
	}

	for (let i = 0; i < 5; i++) {
		var bombField = Math.random();
		bombField = bombField * fieldCount;
		bombField = Math.floor(bombField);
		let field = $("[data-x=" + bombField + "]");
		console.log(bombField);
		field.text("💣");
	}

	for (let i = 0; i < 5; i++) {
		if (field.getAttribute("data-x") === bombField) {
			field.innerText = "💣";
		}
	}
}
function createMedium() {
	var playfield = document.querySelector(".playfield");

	playfield.classList.remove("playfield-small");
	playfield.classList.add("playfield-medium");
	playfield.classList.remove("playfield-large");

	playfield.classList.remove("playfield-default");

	$(".playfield").empty();

	for (let i = 0; i < 100; i++) {
		var field = document.createElement("div");
		field.classList.add("field");
		field.setAttribute("data-x", i);
		playfield.append(field);
		var fieldCover = document.createElement("div");
		fieldCover.classList.add("fieldCover");
		field.append(fieldCover);
	}
}
function createLarge() {
	var playfield = document.querySelector(".playfield");

	playfield.classList.remove("playfield-small");
	playfield.classList.remove("playfield-medium");
	playfield.classList.add("playfield-large");

	playfield.classList.remove("playfield-default");

	$(".playfield").empty();

	for (let i = 0; i < 196; i++) {
		var field = document.createElement("div");
		field.classList.add("field");
		field.setAttribute("data-x", i);
		playfield.append(field);
		var fieldCover = document.createElement("div");
		fieldCover.classList.add("fieldCover");
		field.append(fieldCover);
	}
}
function startOver() {
	var field = document.querySelector(".playfield");

	field.classList.add("playfield-small");
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
