let run;
var players = ["red", "black", "purple"];
const coinScore = 10;

function collectCoin(player, coin) {
    coin.disableBody(true, true);
    score += coinScore;
    scoreText.setText("Score: " + score);
  }

function choosePlayer() {
    if (character >= 1 && character <= players.length) {
      run = players[character - 1];
      console.log(run);
    } else {
      console.error("Invalid character selection");
    }
  }
  