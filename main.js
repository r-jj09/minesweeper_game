// function displayName() {
// 	var playerName = prompt("What's your name?");
// 	if (playerName != null) {
// 		document.getElementById("greeting").innerText = "Hello " + playerName + "!";
// 	}
// }
var won = true;
var bombCount;
var remainingBombs;
var size;
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
		createGame();
	});
	function createGame() {
		$(".playfield").empty();
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
		console.log(fieldCount);
		do {
			var bombIndex = Math.random();
			bombIndex = bombIndex * fieldCount;
			bombIndex = Math.floor(bombIndex);
			let field = $("[data-num=" + bombIndex + "]");
			if (field.attr("data-bomb") !== "1") {
				field.attr("data-bomb", 1);
				--bombCount;
			}
			// console.log(bombIndex);
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
				// walkAround();
			}
		});
		$(".playfield").on("contextmenu", ".field", (event) => {
			event.preventDefault();
			if (event.currentTarget.textContent == "") {
				event.currentTarget.textContent = "🏳️";
				event.currentTarget.style.fontSize = "1.5em";
				event.currentTarget.classList.add("flagged");
				--remainingBombs;
			} else if ((event.currentTarget.textContent = "🏳️")) {
				event.currentTarget.textContent = "";
				++remainingBombs;
			}
			updateRemaining();
		});

		// function walkAround() {
		// 	for (let i = 0; i < array.length; i++) {}
		// 	return;
		// }

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
