document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const minigrid = document.querySelector(".mini-grid");
  const scoreDisplay = document.querySelector("#score");
  const levelDisplay = document.querySelector("#level");
  const lineDisplay = document.querySelector("#lines");
  const width = 10;
  const height = 20;
  const mgWidth = 4;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let level = 1;
  let lines = 0;
  var stepTime = 1000;
  let gameEnded = false;
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];

  for (let i = 0; i < width * height; i++) {
    grid.appendChild(document.createElement("div"));
  }
  for (let i = 0; i < 10; i++) {
    var tDiv = document.createElement("div");
    grid.appendChild(tDiv);
    tDiv.setAttribute("class", "taken");
  }
  let squares = Array.from(document.querySelectorAll(".grid div"));

  for (let i = 0; i < mgWidth ** 2; i++) {
    minigrid.appendChild(document.createElement("div"));
  }

  let mgSquares = document.querySelectorAll(".mini-grid div");
  let mgIndex = 0;
  const upNextTetrominoes = [
    [1, 2, mgWidth + 1, mgWidth * 2 + 1], //l0
    [0, 1, mgWidth + 1, mgWidth * 2 + 1], //l1
    [mgWidth + 1, mgWidth + 2, mgWidth * 2, mgWidth * 2 + 1], //z0
    [mgWidth, mgWidth + 1, mgWidth * 2 + 1, mgWidth * 2 + 2], //z1
    [mgWidth, mgWidth + 1, mgWidth + 2, 1], //t
    [0, 1, mgWidth, mgWidth + 1], //box
    [1, mgWidth + 1, mgWidth * 2 + 1, mgWidth * 3 + 1], //stick
  ];

  function drawNext() {
    mgSquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      mgSquares[mgIndex + index].classList.add("tetromino");
      mgSquares[mgIndex + index].style.backgroundColor = colors[nextRandom];
    });
  }

  const startBtn = document.querySelector("#start-button");

  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      document.removeEventListener("keyup", control);
    } else {
      if (gameEnded) {
        squares.forEach((square) => {
          square.classList.remove("tetromino");
          square.classList.remove("taken");
          let gridsquares = squares.slice(200);
          gridsquares.forEach((square) => square.classList.add("taken"));
        });
        mgSquares.forEach((square) => {
          square.classList.remove("tetromino");
        });
        gameEnded = false;
      }
      document.addEventListener("keyup", control);
      draw();
      timerId = setInterval(moveDown, stepTime);
      nextRandom = Math.floor(Math.random() * upNextTetrominoes.length);
      drawNext();
    }
  });

  //The Tetrominoes
  const l0Tetromino = [
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [width * 2, width * 2 + 1, width + 1, 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const l1Tetromino = [
    [0, 1, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width + 1, width + 2, width * 2],
  ];

  const z0Tetromino = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [1, width + 1, width + 2, width * 2 + 2],
    [width * 2, width * 2 + 1, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 2],
  ];

  const z1Tetromino = [
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2],
  ];

  const tTetromino = [
    [width, width + 1, width + 2, 1],
    [1, width + 1, width * 2 + 1, width + 2],
    [width, width + 1, width + 2, width * 2 + 1],
    [width, 1, width + 1, width * 2 + 1],
  ];

  const boxTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const stickTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    l0Tetromino,
    l1Tetromino,
    z0Tetromino,
    z1Tetromino,
    tTetromino,
    boxTetromino,
    stickTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  //randomly select a Teromino and rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  //draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  //assign functions to keyCodes
  function control(e) {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  }

  //move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      currentRotation = 0;
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      drawNext();
      addScore();
      gameOver();
    }
  }

  //move the tetromino left unless at left edge of grid or there is a blockage.

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  //move the tetromino right unless at left edge of grid or there is a blockage.
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) currentPosition += 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  //rotate the tetromino
  function rotate() {
    function atRightEdge(current) {
      return current.some(
        (index) => (currentPosition + index) % width === width - 1
      );
    }
    function atLeftEdge(current) {
      return current.some((index) => (currentPosition + index) % width === 0);
    }
    function checkRotatedPosition(P) {
      P = P || currentPosition;
      if ((P + 1) % width < width / 2 - 1) {
        if (atRightEdge(current)) {
          currentPosition += 1;
          checkRotatedPosition(P);
        }
      } else if (P % width > width / 2) {
        if (atLeftEdge(current)) {
          currentPosition -= 1;
          checkRotatedPosition(P);
        }
      }
    }

    undraw();
    currentRotation =
      currentRotation === current.length - 1 ? 0 : currentRotation + 1;
    current = theTetrominoes[random][currentRotation];
    checkRotatedPosition();
    draw();
  }

  //add score
  function addScore() {
    for (let i = 0; i < width * height - 1; i += width) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(i + j);
      }
      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        lines++;
        lineDisplay.innerHTML = lines;
        if (score % 100 === 0) {
          level++;
          stepTime *= 0.9;
          levelDisplay.innerHTML = level;
        }
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  //game over
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "GAMEOVER";
      clearInterval(timerId);
      document.removeEventListener("keyup", control);
      gameEnded = true;
    }
  }
});
