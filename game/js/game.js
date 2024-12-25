var config = {
    type: Phaser.AUTO,
    canvas: document.getElementById("myCanvas"),
    width: 800,
    height: 650,
    scene: {
        preload: preload,
        create: function() {
            this.create.call(this, index);
        },
        update: update,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y:300 },
            debug: false,
        },
        parent: "content",
    },
};