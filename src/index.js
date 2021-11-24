import Phaser from 'phaser';
import logoImg from './assets/character.png';
import FPSCounter from './FPSCounter';

class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('logo', logoImg);
    }

    create() {
        this.input.keyboard.on('keyup-X', () => {
            this.clearTimer();
        });
        this.data = [];
        this.i = 0;
        this.fpsCounter = new FPSCounter(this);
        this.text = this.add.text(30, 70, "i: ", { color: '#fff000', fontSize: 40})
        .setDepth(99);
        this.sprite = this.physics.add.image(400, 300, 'logo');
        this.timerInterval = setInterval(() => {
            for(let i = 0; i < this.i; i += 1) {
                this.physics.add.image(Math.random() * 760 + 20, Math.random() * 560 + 20, 'logo');
            }
            this.text.setText(`i: ${this.i}`);
            this.data.push(`${this.fpsCounter.getFPS()} ${this.text.text}`);
            this.i += 1;
        }, 1000);
    }

    clearTimer() {
        if (this.timerInterval) {
        this.tabelscale = 600 / 145;
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          for(let i = 0; i < this.data.length; i += 1){
              console.log(600 - parseInt(this.data[i].split(' ')[1]));
            this.add.rectangle(i * 5, 600 - parseInt(this.data[i].split(' ')[1]), 5, 5, '0x00ff00').setDepth(55).setOrigin(0);
          }
          this.rect = this.add.rectangle(0, 0, 800, 600, '0x000000').setDepth(50).setOrigin(0);
        }
      }


    update() {
        if(this.i >= 140){
            this.clearTimer();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);
