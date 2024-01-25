import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Tool from '../objects/Tool'
// import Brush from '../objects/Tool'
// import Crayon from '../objects/Tool'

const enum Color {
  LightBlue = 0xa3b7bc,
  Cream = 0xFCCE89,
  Red = 0xc51920,
  Orange = 0xf8ad1c,
  Yellow = 0xfde96a,
  Green = 0x92d72e,
  DarkGreen = 0x007c3e,
  SkyBlue = 0x2eb9e0,
  NavyBlue = 0x264a9c,
  Purple = 0x6a3094,
  DarkPink = 0x841f63,
  Brown = 0x4b3a38,
  Black = 0x1a1919,
  White = 0xFFFFFF
}

const enum Size {
  Small = 50,
  Medium = 70,
  Big = 100,
  Huge = 130
}

let isMouseOverTexture: boolean = false;

export default class MainScene extends Phaser.Scene {
  fpsText: any
  settings: any
  strokeButtons
  rt
  tools
  graphics
  constructor() {
    super({ key: 'MainScene' })
  }

  init()
  {

    this.settings = {
      selectedTool: 0,
      selectedColor: Color.Black, 
      selectedSize: Size.Huge,
    }

    this.strokeButtons = {
      color: this.add.group(),
      tool: this.add.group(),
      size: this.add.group()
    };
    
  }
  
  create() {
    
    const ScreenWidth = Number(this.game.config.width);
    const screenHeight = Number(this.game.config.height);
    
    this.add.rectangle(0,0, 365, screenHeight, 0x000000).setOrigin(0).setAlpha(0.4);
    this.add.rectangle(0,0, 360, screenHeight, 0xA3B7BC).setOrigin(0);
    
    this.createButtons();
    this.rt = this.add.renderTexture(ScreenWidth/2, screenHeight/2, ScreenWidth, screenHeight).setOrigin(0.5).setDepth(-2);
    this.tools = new Tool(this, this.rt)
    
    this.setTool(this.tools.Brush);
    this.setColor(Color.Black)
    this.setToolSize(Size.Huge)
    
    
    this.rt.setInteractive();
    
    this.rt.on('pointermove', pointer =>
    {
      if (pointer.isDown)
      {
        this.settings.selectedTool.draw(pointer)
      }
      
    }, this);
    
    this.rt.on('pointerdown', pointer => {
      this.settings.selectedTool.draw(pointer)
      isMouseOverTexture = this.rt.getBounds().contains(pointer.x, pointer.y);
    }) 
  }
  
  update() {
    
  }

createButtons() {
  
  const ScreenWidth = Number(this.game.config.width);
  const screenHeight = Number(this.game.config.height);
  
  
  const newCard = this.add.sprite(100, 125, 'spritesheet', 'newCard.png')
    .setInteractive()
    .on('pointerdown', () => {
      this.showNewCard();
    })
  
  const size1 = this.add.sprite(268, 125, 'spritesheet', 'size1.png').setDepth(2)
  .setInteractive()
  .on('pointerdown', () => {
    this.setToolSize(Size.Small)
  })
  const size2 = this.add.sprite(268, 192, 'spritesheet', 'size2.png').setDepth(2)
  .setInteractive()
  .on('pointerdown', () => {
    this.setToolSize(Size.Medium)
  })
  const size3 = this.add.sprite(268, 257, 'spritesheet', 'size3.png').setDepth(2)
  .setInteractive()
  .on('pointerdown', () => {
    this.setToolSize(Size.Big)
  })
  const size4 = this.add.sprite(268, 336, 'spritesheet', 'size4.png').setDepth(2)
  .setInteractive()
  .on('pointerdown', () => {
    this.setToolSize(Size.Huge)
  })
  
  const size1Stroke = this.add.sprite(268, 125, 'spritesheet', 'size1Stroke.png').setAlpha(0).setData('size',Size.Small)
  const size2Stroke = this.add.sprite(268, 192, 'spritesheet', 'size2Stroke.png').setAlpha(0).setData('size',Size.Medium)
  const size3Stroke = this.add.sprite(268, 257, 'spritesheet', 'size3Stroke.png').setAlpha(0).setData('size',Size.Big)
  const size4Stroke = this.add.sprite(268, 336, 'spritesheet', 'size4Stroke.png').setAlpha(0).setData('size',Size.Huge)
  
    const eraserStroke= this.add.sprite(100, 300, 'spritesheet', 'eraserStroke.png').setAlpha(0)
      .setData('tool', 'eraser');
    const eraser = this.add.sprite(100, 300, 'spritesheet', 'eraser.png')
    .setInteractive()
    .on('pointerdown', () => {
      this.setTool(this.tools.Eraser);
    });

    const crayon = this.add.sprite(70, 550, 'spritesheet', 'crayon.png').setDepth(2)
    .setInteractive()
    .on('pointerdown', () => {
      this.setTool(this.tools.Crayon);
    });
    const crayonStroke = this.add.sprite(70, 550, 'spritesheet', 'crayonStroke.png').setAlpha(0).setData('tool', 'crayon')
    
    const brush = this.add.sprite(150, 550, 'spritesheet', 'brush.png').setDepth(2)
    .setInteractive()
    .on('pointerdown', () => {
      this.setTool(this.tools.Brush);
    });
    const brushStroke = this.add.sprite(150, 550, 'spritesheet', 'brushStroke.png').setAlpha(0).setData('tool', 'brush')
    
    const spray = this.add.sprite(285, 550, 'spritesheet', 'spray.png').setDepth(2)
    .setInteractive()
    .on('pointerdown', () => {
      this.setTool(this.tools.Spray);
    });
    const sprayStroke = this.add.sprite(285, 550, 'spritesheet', 'sprayStroke.png').setAlpha(0).setData('tool', 'spray')
    
    
    const spriteWidth = 65;
    const spriteHeight = 65;
    const spacingX = 20; // odstęp między spritami w poziomie
    const spacingY = 20; // odstęp między spritami w pionie
    const columns = 3;
    const rows = 4; // Ilość wierszy
    
    const colors: Color[] = [
      Color.Cream,
      Color.Red,
      Color.Orange,
      Color.Yellow,
      Color.Green,
      Color.DarkGreen,
      Color.SkyBlue,
      Color.NavyBlue,
      Color.Purple,
      Color.DarkPink,
      Color.Brown,
      Color.Black
    ]
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const x = (j * (spriteWidth + spacingX)) + 90;
        const y = i * (spriteHeight + spacingY) + 740;
        
        const number = (i * columns + j) + 1
        
        const spriteStroke = this.add.sprite(x, y, "spritesheet", `color1Stroke.png`)
        .setAlpha(0)
        .setData('color', colors[number-1]) // Tworzy sprita
        
        const sprite = this.add.sprite(x, y, "spritesheet", `color${number}.png`)
        .setDepth(2)
        .setInteractive()
        .on('pointerdown', () => {
          if(this.settings.selectedTool === this.tools.eraser) this.setTool(this.tools.Brush)
          this.setColor(colors[number-1]);
        }) // Tworzy sprita
        
        // colorGroup.add(sprite); // Dodaje sprita do grupy
        
        this.strokeButtons.tool.addMultiple([eraserStroke, crayonStroke, brushStroke, sprayStroke]);
        this.strokeButtons.size.addMultiple([size1Stroke, size2Stroke, size3Stroke, size4Stroke])
        this.strokeButtons.color.add(spriteStroke); // Dodaje sprita do grupy
      }
    }
  }

  setColor(color: Color)
  {
    this.settings.selectedColor = color;

    this.strokeButtons.color.getChildren().forEach(element => {
      if(element.getData('color') === color) element.setAlpha(1)
      else element.setAlpha(0);
    });

    this.tools.changeColor(color)
  }

  setTool(tool)
  {
    this.settings.selectedTool = tool;

    this.strokeButtons.tool.getChildren().forEach(element => {
      if(element.getData('tool') === tool.getData('tool')) element.setAlpha(1)
      else element.setAlpha(0)
    })

  }

  setToolSize(size: Size)
  {
    this.settings.selectedSize = size;

    this.strokeButtons.size.getChildren().forEach(element => {
      if(element.getData('size') === size) element.setAlpha(1)
      else element.setAlpha(0)
    })

    this.tools.changeSize(size)

  }

  showNewCard()
  {
    this.scene.pause()

    this.scene.pause();

    this.scene.launch('newCardScene')

    let panel = this.scene.get('newCardScene');

        panel.events.on('clickYes', this.eraseScreen, this);
        panel.events.on('clickNo', this.hideNewCard, this);
  }

  hideNewCard()
  {
    this.scene.resume();
    this.scene.stop('newCardScene');
  }

  eraseScreen()
  {
    this.hideNewCard();
    this.rt.clear();
  }
}
