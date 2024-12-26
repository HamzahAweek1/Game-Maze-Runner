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

  choosePlayer();

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers(run, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  
  this.anims.create({
    key: "turn",
    frames: [{ key: run, frame: 4 }],
    frameRate: 20,
  });
  
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers(run, { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  
  player = this.physics.add.sprite(30, 545, run);
  player.setScale(0.7);
  player.setBounce(0);
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
  

  this.physics.add.collider(coins, platforms);
  this.physics.add.collider(player, platforms);

  this.physics.add.overlap(player, coins, collectCoin, null, this);
  this.physics.add.overlap(player, trophy, DisplayLevelCompleted, null, this);

  scoreText = this.add.text(60, 610, "score: 0", {
    fontSize: "32px",
    fill: "#ffffff",
  });
  
  timerText = this.add.text(600, 610, "Time: " + timeLeft, {
    fontSize: "32px",
    fill: "#ffffff",
  });
  
  if (timerEvent) {
    timerEvent.remove();
  }
  
  timerEvent = this.time.addEvent({
    delay: 1000,
    callback: () => {
      if (timeLeft > 0) {
        timeLeft--;
        console.log(timeLeft);
        if (timerText) {
          timerText.setText("Time: " + timeLeft);
        }
      } else {
        score = 0;
        const gameOverBg = this.add.graphics();
        gameOverBg.fillStyle(0x000000, 0.9);
        gameOverBg.fillRect(200, 200, 400, 150);
        puzzle += 1;
        console.log(puzzle);
        this.add.text(200, 250, " Game Over :(", {
          fontSize: "48px",
          fill: "#ff0000",
          fontStyle: "bold",
        });
        this.time.delayedCall(1500, () => {
          this.scene.restart();
        });
      }
    },
    callbackScope: this,
    loop: true,
  });

  if (index == 1) {
    level = this.add.text(350, 610, "Easy", {
      fontSize: "32px",
      fill: "#ffffff",
    });
  } else if (index == 2) {
    level = this.add.text(350, 610, "Medium", {
      fontSize: "32px",
      fill: "#ffffff",
    });
  } else if (index == 3) {
    level = this.add.text(350, 610, "Hard", {
      fontSize: "32px",
      fill: "#ffffff",
    });
  }    
}

function DisplayLevelCompleted(player, prize){
    prize.disableBody(true, true);
    levelCompleted = true;
    destroyMaze();
    player.setVelocity(0);

    const levelCompletedBg = this.add.graphics();
    levelCompletedBg.fillStyle(0, 0.9);
    levelCompletedBg.fillRect(200, 200, 400, 150);

    this.add.text(210, 250, "Level Completed ;)", {
        fontSize: "36px",
        fill: "#00ff00",
        fontStyle: "bold",
    });

    this.time.delayedCall(1500, () =>{
        if (index < 4) {
            index += 1;
        }
        console.log(index);
        this.create();
    });
}

function destroyMaze(params) {
    platforms.clear(true, true);
    coins.clear(true, true);
    trophy.clear(true, true);
    level.destroy();
    level = null;
    timerText.destroy();
    timerText = null;
    scoreText.destroy();
    scoreText = null;
    score = 0;
    
}

