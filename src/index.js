import Phaser from "phaser";
import gabe from "./assets/rpg/rpg-pack/chars/gabe/gabe-idle-run.png";

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
  this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
  this.load.spritesheet('gabe', gabe, {frameWidth: 24, frameHeight: 24})
}

function create() {
  const platforms = this.physics.add.staticGroup();
	platforms.create(320, 350, 'platform').setScale(2, 0.5).refreshBody();

	gameState.player = this.physics.add.sprite(320, 300, 'gabe').setScale(2);
  gameState.player.setCollideWorldBounds(true);
  this.anims.create({
    key: 'movement',
    frames: this.anims.generateFrameNumbers('gabe', {start: 0, end: 6}),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('gabe', {start: 0, end: 1}),
    frameRate: 2,
    repeat: -1
  })

	this.physics.add.collider(gameState.player, platforms)
}

function update () {
	const cursors = this.input.keyboard.createCursorKeys();

	if(cursors.left.isDown){
    gameState.player.setVelocityX(-200)
    gameState.player.anims.play('movement', true)
    gameState.player.flipX = true
	} else if (cursors.right.isDown) {
    gameState.player.setVelocityX(200)
    gameState.player.anims.play('movement', true)
    gameState.player.flipX = false
	} else {
    gameState.player.setVelocityX(0);
    gameState.player.anims.play('idle', true)
	}

}
