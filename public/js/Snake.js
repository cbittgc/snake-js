export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 200;
    this.tileSize = 16;
    this.direction = Phaser.Math.Vector2.RIGHT;

    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(
          this.scene.game.config.width / 2,
          this.scene.game.config.height / 2,
          this.tileSize,
          this.tileSize,
          0x00ff00
        )
        .setOrigin(0)
    );

    this.apple = this.scene.add
      .rectangle(0, 0, this.tileSize, this.tileSize, 0xff00000)
      .setOrigin(0);
    this.positionApple();

    scene.input.keyboard.on("keydown", (e) => {
      this.keydown(e);
    });
  }
  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }
  move() {
    let x = this.body[0].x + this.direction.x * this.tileSize;
    let y = this.body[0].y + this.direction.y * this.tileSize;

    if (this.apple.x === x && this.apple.y === y) {
      // eat the apple
      this.body.push(
        this.scene.add
          .rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00)
          .setOrigin(0)
      );
      this.positionApple();
    }

    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x = x;
    this.body[0].y = y;

    // death by grid border colision
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.scene.game.config.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.scene.game.config.height
    ) {
      this.scene.scene.restart();
    }
    // death by self colision
    let tail = this.body.slice(1);
    if (tail.some((s) => s.x === this.body[0].x && s.y === this.body[0].y)) {
      this.scene.scene.restart();
    }
  }

  positionApple() {
    this.apple.x =
      Math.floor(
        (Math.random() * this.scene.game.config.width) / this.tileSize
      ) * this.tileSize;
    this.apple.y =
      Math.floor(
        (Math.random() * this.scene.game.config.height) / this.tileSize
      ) * this.tileSize;
  }

  keydown(event) {
    // DIRECTION CHANGE: EITHER ARROW KEYS OR 'WASD'
    switch (event.keyCode) {
      case 87: // UP
        if (this.direction !== Phaser.Math.Vector2.DOWN)
          this.direction = Phaser.Math.Vector2.UP;
        break;
      case 38: // UP
        if (this.direction !== Phaser.Math.Vector2.DOWN)
          this.direction = Phaser.Math.Vector2.UP;
        break;
      case 65: // LEFT
        if (this.direction !== Phaser.Math.Vector2.RIGHT)
          this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 37: // LEFT
        if (this.direction !== Phaser.Math.Vector2.RIGHT)
          this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 83: // DOWN
        if (this.direction !== Phaser.Math.Vector2.UP)
          this.direction = Phaser.Math.Vector2.DOWN;
        break;
      case 40: // DOWN
        if (this.direction !== Phaser.Math.Vector2.UP)
          this.direction = Phaser.Math.Vector2.DOWN;
        break;
      case 68: // RIGHT
        if (this.direction !== Phaser.Math.Vector2.LEFT)
          this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 39: // RIGHT
        if (this.direction !== Phaser.Math.Vector2.LEFT)
          this.direction = Phaser.Math.Vector2.RIGHT;
        break;
    }
  }
}
