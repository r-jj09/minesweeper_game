// function displayName() {
// 	var playerName = prompt("What's your name?");
// 	if (playerName != null) {
// 		document.getElementById("greeting").innerText = "Hello " + playerName + "!";
// 	}
// }

// var easy = document.getElementById("small-btn");
// var medium = document.getElementById("medium-btn");
// var hard = document.getElementById("large-btn");

// if (easy.addEventListener("click")) {
// 	createGame();
// } else if (medium.addEventListener("click")) {
// 	createGame();
// } else if (hard.addEventListener("click")) {
// 	createGame();
// }

// function createGame() {}

function createSmall() {
	var playfield = document.querySelector(".playfield");
	playfield.classList.add("playfield-small");
	playfield.classList.remove("playfield-medium");
	playfield.classList.remove("playfield-large");

	playfield.classList.remove("playfield-default");

	$(".playfield").empty();

	var num = 1;
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			var field = document.createElement("div");
			field.classList.add("field");
			field.setAttribute("data-x", i);
			field.setAttribute("data-y", j);
			field.setAttribute("data-num", num);
			playfield.append(field);
			var fieldCount = num;
			num++;
		}
	}
	// console.log(fieldCount);
	var bombCount = 4;
	do {
		var bombIndex = Math.random();
		bombIndex = bombIndex * fieldCount;
		bombIndex = Math.floor(bombIndex);
		let field = $("[data-num=" + bombIndex + "]");
		if (field.attr("data-bomb") !== "1") {
			field.attr("data-bomb", 1);
			--bombCount;
		}
		console.log(bombIndex);
	} while (bombCount >= 0);

	$(".playfield").on("click", ".field", (event) => {
		if (event.currentTarget.getAttribute("data-bomb") == 1) {
			event.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.342)";
			event.currentTarget.innerText = "💣";
		} else {
			event.currentTarget.style.backgroundColor = "white";
			walkAround();
		}
	});
}

function walkAround() {
	return;
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
	document.getElementById("status").style.display = "flex";
	if (condition) {
		document.getElementById("gameStatus").innerText = "You lost!";
		document.getElementById("gameStatus").style.color = "red";
	} else {
		document.getElementById("gameStatus").innerText = "You won!";
		document.getElementById("gameStatus").style.color = "green";
	}
}
