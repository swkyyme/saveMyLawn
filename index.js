/*
        something new  event.target.parentNode.pass
*/
const board = document.getElementById("con");
const scoreDisplay = document.getElementById("score");
let speed = 3;
let score = 0;
let timerInterval = null;

initGame();

function initGame() {
	score = 0;
	speed = 3;
	scoreDisplay.innerHTML = 0;
	board.style.top = "-400px";
	board.innerHTML = "";
	for (let i = 0; i < 4; i++) {
		createRow();
	}
	board.addEventListener("click", handleClick);
}

function gameOver() {
	stop();
	confirm(`Game Over. Your score is ${score}`);
	initGame();
}

function createCell() {
	const cell = document.createElement("td");
	cell.className = "cell";
	return cell;
}

function createRow() {
	const row = document.createElement("tr");
	row.className = "row";
	row.pass = 0;

	const randomNum = Math.floor(Math.random() * 4);
	for (let i = 0; i < 4; i++) {
		const cell = createCell();
		if (i === randomNum) {
			cell.classList.add("grass");
		}
		row.appendChild(cell);
	}
	if (board.firstChild === null) {
		board.appendChild(row);
	} else {
		board.insertBefore(row, board.firstChild);
	}
}

function deleteRow() {
	if (board.childNodes.length === 6) {
		if (!board.lastChild.pass) {
			gameOver();
		}
		board.removeChild(board.lastChild);
	}
}

function move() {
	const topProperty = window.getComputedStyle(board).getPropertyValue("top");
	let top = parseInt(topProperty);
	if (top + speed > 0) {
		top = 0;
	} else {
		top += speed;
	}
	board.style.top = `${top}px`;

	if (top === 0) {
		createRow();
		board.style.top = "-100px";
		deleteRow();
	}
}

function speedup() {
	speed += 1;
	if (speed === 20) {
		alert("Bravo!");
	}
}

function handleClick(event) {
	let clickedCellClass = event.target.className;
	if (
		clickedCellClass.includes("cell") &&
		!clickedCellClass.includes("grass")
	) {
		gameOver();
	}
	if (clickedCellClass.includes("grass")) {
		event.target.className = "cell";
		event.target.parentNode.pass = 1;
		score++;
		scoreDisplay.innerHTML = score;

		if (score % 10 === 0) {
			speedup();
		}
	}
}

/*************button***********************************************/

function start() {
	timerInterval = window.setInterval(() => move(), 30);
}

function stop() {
	clearInterval(timerInterval);
}
