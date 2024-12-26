let player,
    cursors,
    timerEvent,
    puzzle = 0,
    score = 0,
    timeLeft = 0,
    levelCompleted = false;

function create(index) {
  platforms = this.physics.add.staticGroup();
  coins = this.physics.add.staticGroup();
  trophy = this.physics.add.staticGroup();
  level = " ";

  mazeNumber = maze[index - 1];

  if (index === 1) {
    timeLeft = 60;
    this.add.image(400, 300, "sky");
  } else if (index === 2) {
    timeLeft = 45;
    this.add.image(400, 300, "background-green1");
  } else {
    this.add.image(400, 300, "background-brown1");
    timeLeft = 30;
  }

  const tileWidth = 40;
  const tileHeight = 40;
  const collectorsWidth = 30;
  const collectorsHeight = 30;
}
