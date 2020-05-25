document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 10;
  const height = 20;
  var stepTime = 1000;
  for (let i = 0; i < width * height; i++) {
    grid.appendChild(document.createElement("div"));
  }
  for (let i = 0; i < 10; i++) {
    var tDiv = document.createElement("div");
    grid.appendChild(tDiv);
    tDiv.setAttribute("class", "taken");
  }

  let squares = Array.from(document.querySelectorAll(".grid div"));

  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");

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
    });
  }

  draw();

  //undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  //make tetromino move down every step
  timerId = setInterval(moveDown, stepTime);

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
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  //move the tetromino left unless at left edge of grid. //****PICK UP TUTORIAL AT 51:35******* */
});
