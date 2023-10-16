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
var neighborBombs = 0;
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
		found = 0;
		bomb = 0;
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
			// console.log(bombIndex);
		} while (bombCount >= 0);
		updateRemaining();
		$(".field").on("mousedown", (event) => {
			// console.log(event.which);
			if (event.which === 1) {
				if (event.currentTarget.getAttribute("data-bomb") == 1) {
					event.currentTarget.style.backgroundColor = "red";
					event.currentTarget.textContent = "💣";
					event.currentTarget.style.fontSize = "1.5em";
					won = false;
					--remainingBombs;
					updateRemaining();
					gameOver();
				} else {
					checkRound($(event.currentTarget));
					event.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.342)";
					event.currentTarget.textContent = neighborBombs;
				}
			} else if (event.which === 3) {
				if (!event.currentTarget.textContent) {
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
			}
		});
		$(document).on("contextmenu", (event) => {
			event.preventDefault();
			return false;
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
function checkRound(field) {
	let table = $(".playfield");

	// 1. mező ellenőrzése
	let x = field.attr("data-x") - 1;
	let y = field.attr("data-y") - 1;
	let checkField = table.find("[data-x=" + x + "][data-y=" + y + "]");

	if (!checkField.hasClass("fieldOpened") && !checkField.attr("data-bomb")) {
		console.log(checkField.get(0));
		checkField.addClass("fieldOpened");
		// checkRound(checkField);
	} else if (checkField.attr("data-bomb")) {
		++neighborBombs;
	}
	// 2. mező ellenőrzése
	x = field.attr("data-x");
	y = field.attr("data-y") - 1;
	checkField = table.find("[data-x=" + x + "][data-y=" + y + "]");

	if (!checkField.hasClass("fieldOpened") && !checkField.attr("data-bomb")) {
		console.log(checkField.get(0));
		checkField.addClass("fieldOpened");
	} else if (checkField.attr("data-bomb")) {
		++neighborBombs;
	}

	// 3. mező
	x = field.attr("data-x") + 1;
	y = field.attr("data-y") - 1;
	checkField = table.find("[data-x=" + x + "][data-y=" + y + "]");

	if (!checkField.hasClass("fieldOpened") && !checkField.attr("data-bomb")) {
		console.log(checkField.get(0));
		checkField.addClass("fieldOpened");
	} else if (checkField.attr("data-bomb")) {
		++neighborBombs;
	}

	// 4. mező

	// 5. mező

	// 6. mező

	// 7. mező

	// 8.mező

	return neighborBombs;
}
