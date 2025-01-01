let images = [
    "assets/character-grey.png",
     "assets/character-red.png",
      "assets/character-purple.png",
];

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("background1", "assets/background-green1.jpg");
    this.load.image("background2", "assets/background-brown1.png");
    this.load.image("coin", "assets/star.png")
    this.load.image("prize", "assets/prize.png");
    this.load.spritesheet("red", images[0], {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.spritesheet("black", images[1], {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.spritesheet("purple", images[2], {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.image("tile", "assets/tile.jpg");
}