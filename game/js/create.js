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

  for (let row = 0; row < mazeNumber.length; row++) {
    for (let col = 0; col < mazeNumber[row].length; col++) {
      if (mazeNumber[row][col] === 1) {
        const wall = platforms
          .create(col * tileWidth, row * tileHeight, "tile")
          .setOrigin(0, 0)
          .refreshBody();
        wall.setDisplaySize(tileWidth, tileHeight);
      } else if (mazeNumber[row][col] === 2) {
        const coin = coins
          .create(col * tileWidth, row * tileHeight, "coin")
          .setOrigin(0, 0)
          .refreshBody();
        coin.setCollideWorldBounds(true);
        coin.setDisplaySize(collectorsWidth, collectorsHeight);
      } else if (mazeNumber[row][col] === 3) {
        const prize = trophy
          .create(col * tileWidth, row * tileHeight, "prize")
          .setOrigin(0, 0)
          .refreshBody();
        prize.setCollideWorldBounds(true);
        prize.setDisplaySize(collectorsWidth, collectorsHeight);
      }
    }
  }
  
}

