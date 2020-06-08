import Phaser from "phaser";
import idleFrog from "./assets/used_assets/idle_frog.png"
import grass from "./assets/used_assets/tile_jungle_ground_full.png"

const gameState = {}

const config = {
  type: Phaser.AUTO,
  width: 640,
	height: 360,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 200},
			enableBody: true,
			debug: false,
		}
	},
  scene: {
		preload,
		create,
		update
	}
}

const game = new Phaser.Game(config);

function preload() {
  this.load.image('grass', grass);
  this.load.spritesheet('idleFrog', idleFrog, {frameWidth: 64, frameHeight: 64})
}

function create() {
  const grass = this.physics.add.staticGroup();
  grass.create(320, 350, 'grass').refreshBody();
  grass.create(320, 350, 'grass').refreshBody();

	gameState.player = this.physics.add.sprite(320, 300, 'idleFrog');
  gameState.player.setCollideWorldBounds(true);
  // this.anims.create({
  //   key: 'movement',
  //   frames: this.anims.generateFrameNumbers('gabe', {start: 0, end: 6}),
  //   frameRate: 10,
  //   repeat: -1
  // })
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('idleFrog', {start: 0, end: 4}),
    frameRate: 5,
    repeat: -1
  })

	this.physics.add.collider(gameState.player, grass)
}

function update () {
	const cursors = this.input.keyboard.createCursorKeys();

	if(cursors.left.isDown){
    gameState.player.setVelocityX(-200)
    // gameState.player.anims.play('movement', true)
    gameState.player.flipX = true
	} else if (cursors.right.isDown) {
    gameState.player.setVelocityX(200)
    // gameState.player.anims.play('movement', true)
    gameState.player.flipX = false
	} else {
    gameState.player.setVelocityX(0);
    gameState.player.anims.play('idle', true)
  }
  
  if (cursors.up.isDown) {
    gameState.player.setVelocityY(-100)
  }

}
