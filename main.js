// function displayName() {
// 	var playerName = prompt("What's your name?");
// 	if (playerName != null) {
// 		document.getElementById("greeting").innerText = "Hello " + playerName + "!";
// 	}
// }
var won = true;
var bombCount;
var placedBomb;
var remainingBombs;
var size;
var found = 0;
var bomb = 0;
$(document).ready(function () {
	var playfield = document.querySelector(".playfield");
	var difficulty = document.querySelector(".difficulty");
	$(".buttons").on("click", ".size-btn", (event) => {
		difficulty.style.visiblity = "hidden";
		if (event.currentTarget.classList.contains("small-btn")) {
			bombCount = 5;
			size = 7;
			playfield.classList.add("playfield-small");
			playfield.classList.remove("playfield-medium");
			playfield.classList.remove("playfield-large");
		} else if (event.currentTarget.classList.contains("medium-btn")) {
			bombCount = 8;
			size = 10;
			playfield.classList.remove("playfield-small");
			playfield.classList.add("playfield-medium");
			playfield.classList.remove("playfield-large");
		} else if (event.currentTarget.classList.contains("large-btn")) {
			bombCount = 12;
			size = 14;
			playfield.classList.remove("playfield-small");
			playfield.classList.remove("playfield-medium");
			playfield.classList.add("playfield-large");
		}
		remainingBombs = bombCount + 1;
		placedBomb = bombCount + 1;
		createGame();
	});
	function createGame() {
		$(".playfield").empty();
		document.getElementById("status").style.display = "none";
		var num = 1;
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
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
		do {
			var bombIndex = Math.random();
			bombIndex = bombIndex * fieldCount;
			bombIndex = Math.floor(bombIndex) + 1;
			let field = $("[data-num=" + bombIndex + "]");
			if (field.attr("data-bomb") !== "1") {
				field.attr("data-bomb", 1);
				--bombCount;
			}
			console.log(bombIndex);
		} while (bombCount >= 0);
		updateRemaining();
		$(".playfield").on("click", ".field", (event) => {
			if (event.currentTarget.getAttribute("data-bomb") == 1) {
				event.currentTarget.style.backgroundColor = "red";
				event.currentTarget.textContent = "💣";
				event.currentTarget.style.fontSize = "1.5em";
				won = false;
				--remainingBombs;
				updateRemaining();
				gameOver();
			} else {
				event.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.342)";
				walkAround();
				event.currentTarget.textContent = bomb;
			}
		});

		function walkAround() {
			var x = parseInt(event.currentTarget.getAttribute("data-x"));
			var y = parseInt(event.currentTarget.getAttribute("data-y"));
			for (let i = x - 1; i <= x + 1; i++) {
				for (let j = y - 1; j <= y + 1; j++) {
					var element = document.querySelector(
						`[data-x="${i}"][data-y="${j}"]`
					);
					if (element && element.getAttribute("data-bomb") == 1) {
						++bomb;
						console.log(bomb);
					}
				}
			}
			return bomb;
		}

		$(".playfield").on("contextmenu", ".field", (event) => {
			event.preventDefault();
			if (event.currentTarget.textContent == "") {
				event.currentTarget.textContent = "🏳️";
				event.currentTarget.style.fontSize = "1.5em";
				event.currentTarget.classList.add("flagged");
				--remainingBombs;
				if (
					event.currentTarget.classList.contains("flagged") &&
					event.currentTarget.getAttribute("data-bomb") == 1
				) {
					++found;
					console.log("You found: " + found);
				}
			} else if ((event.currentTarget.textContent = "🏳️")) {
				event.currentTarget.textContent = "";
				event.currentTarget.classList.remove("flagged");
				++remainingBombs;
			}
			updateRemaining();
			if (found == placedBomb) {
				won = true;
				gameOver();
			}
		});

		function updateRemaining() {
			document.getElementById("mines").textContent =
				"Remaining mines: " + remainingBombs;
		}
	}

	function gameOver() {
		document.getElementById("status").style.display = "flex";
		if (won === false) {
			document.getElementById("gameStatus").innerText = "You lost!";
			document.getElementById("gameStatus").style.color = "red";
		} else {
			document.getElementById("gameStatus").innerText = "You won!";
			document.getElementById("mines").textContent = "Remaining mines: ✔";
			document.getElementById("gameStatus").style.color = "green";
		}
	}
});
function startOver() {
	document.getElementById("status").style.display = "none";
	$(".playfield").empty();
	document.getElementById("mines").textContent = "Remaining mines: ❌";
	var field = document.querySelector(".playfield");
	field.classList.add("playfield-small");
	field.classList.remove("playfield-medium");
	field.classList.remove("playfield-large");
}
