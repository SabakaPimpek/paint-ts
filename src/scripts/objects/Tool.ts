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
    White = 0xFFFFFF,
}
  
  const enum Size {
    Small = 50,
    Medium = 70,
    Big = 100,
    Huge = 130
  }

export default class Tool {
    scene: Phaser.Scene
    Brush
    Crayon
    Spray
    Eraser
    constructor(scene: Phaser.Scene, renderTexture: Phaser.GameObjects.RenderTexture)
    {
        this.scene = scene;

        this.Brush = new Brush(scene, renderTexture)
        this.Crayon = new Crayon(scene, renderTexture)
        this.Spray = new Spray(scene, renderTexture)
        this.Eraser = new Eraser(scene, renderTexture)

    }

    changeColor(color: Color)
    {
        this.Brush.setTintFill(color);
        this.Crayon.color = color;
        this.Spray.setFillStyle(color);
    }

    changeSize(size: Size)
    {
        this.Brush.setDisplaySize(size, size)
        this.Crayon.size = size * 0.05;
        this.Eraser.setDisplaySize(size, size)
    }
}

class Brush extends Phaser.GameObjects.Sprite {
    renderTexture: Phaser.GameObjects.RenderTexture
    constructor(scene: Phaser.Scene, renderTexture: Phaser.GameObjects.RenderTexture)
    {
        super(scene, -20000, -20000, 'brush');
        
        scene.add.existing(this)
        this.setOrigin(0.5, 0.5)
        this.setData('tool', 'brush')
        
        // this.postFX.addBlur(100);
        
        this.renderTexture = renderTexture
        
    }
    
    public draw(pointer: Phaser.Input.Pointer) {
        const points = pointer.getInterpolatedPosition(20);
        // this.renderTexture.draw(this, pointer.x, pointer.y)

        points.forEach(p =>
            {
                this.renderTexture.draw(this, p.x, p.y)
                
            });
        }
    }

    class Crayon extends Phaser.GameObjects.Graphics {
        renderTexture: Phaser.GameObjects.RenderTexture;
        color
        size
    
        constructor(scene: Phaser.Scene, renderTexture: Phaser.GameObjects.RenderTexture) {
            super(scene);
    
            scene.add.existing(this);
    
            this.renderTexture = renderTexture;
            this.lineStyle(2, 0x000000);
            this.setData('tool', 'crayon')

            this.color
            this.size
        }
    
        public draw(pointer: Phaser.Input.Pointer) {
            if (pointer.isDown) {
                this.clear();
                this.setAlpha(1);
                this.lineStyle(this.size, this.color);
                
                const localX = pointer.x - this.x;
                const localY = pointer.y - this.y;
                
                this.beginPath();
                this.moveTo(pointer.prevPosition.x - this.x, pointer.prevPosition.y - this.y);
                
                this.lineTo(localX, localY);
                
                this.strokePath();
                
                this.renderTexture.draw(this);
                this.setAlpha(0);
            }
        }
    }
    
    class Spray extends Phaser.GameObjects.Arc {
        renderTexture: Phaser.GameObjects.RenderTexture;

        constructor(scene: Phaser.Scene, renderTexture: Phaser.GameObjects.RenderTexture) {
            super(scene, -200, -200, 2, undefined, undefined, undefined, 0x000000);
    
            scene.add.existing(this);
            this.setData('tool', 'spray')
    
            this.renderTexture = renderTexture;
        }
    
        public draw(pointer: Phaser.Input.Pointer) {
            const sprayRadius = 60;
            const sprayDensity = 30;
        
            for (var i = 0; i < sprayDensity; i++) {
                const angle = Phaser.Math.RND.angle(); // Losowy kąt
                const distance = Phaser.Math.RND.between(0, sprayRadius); // Losowa odległość w zakresie promienia
        
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;
        
                // Rysuj kółko na render texture
                this.renderTexture.draw(
                    this,
                    pointer.x + offsetX,
                    pointer.y + offsetY,
                    Phaser.Math.RND.between(5, 10),
                    Phaser.Math.RND.integerInRange(0, 0xFFFFFF)
                );
            }
        }
    }

    class Eraser extends Phaser.GameObjects.Arc {
        renderTexture: Phaser.GameObjects.RenderTexture;
    
        constructor(scene: Phaser.Scene, renderTexture: Phaser.GameObjects.RenderTexture) {
            super(scene, -200, -200, 50, undefined, undefined, undefined, 0xFFFFFF);
    
            scene.add.existing(this);
            this.setData('tool', 'eraser')
    
            this.renderTexture = renderTexture;
        }
    
        public draw(pointer: Phaser.Input.Pointer) {
            const points = pointer.getInterpolatedPosition(20);
            points.forEach(p => {
                this.renderTexture.draw(this, p.x, p.y)
            });
        }
    }