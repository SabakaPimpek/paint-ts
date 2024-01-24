export default class newCardScene extends Phaser.Scene {
    constructor() {
      super({ key: 'newCardScene' })
    }

    create()
    {
        this.cameras.main.setZoom(0);
        
        const ScreenWidth = Number(this.game.config.width);
        const ScreenHeight = Number(this.game.config.height);
        
        
        const popup = this.add.sprite(ScreenWidth/2, ScreenHeight/2, 'spritesheet', 'popup.png').setScale(1)
        const yes = this.add.sprite(ScreenWidth/2 - 150, ScreenHeight/2 + 100, 'spritesheet', 'yes.png')
        .setDepth(4)
        .setScale(1)
        .setInteractive()
        .on('pointerdown', () => {
            this.hideWindow('clickYes')
        })
        const no = this.add.sprite(ScreenWidth/2 + 150, ScreenHeight/2 + 100, 'spritesheet', 'no.png').setDepth(4).setScale(1)
        .setInteractive()
        .on('pointerdown', () => {
            this.hideWindow('clickNo')
        })
        
        this.cameras.main.startFollow(popup)

        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1,
            ease: "Cubic", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 200,
            yoyo: false
        });

    }

    hideWindow(callback)
    {
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 0,
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: "Cubic", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 100,
            //    repeat: -1, // -1: infinity
            yoyo: false,
            onComplete: () => {
                this.events.emit(callback);
              }
        });
    }
    
}