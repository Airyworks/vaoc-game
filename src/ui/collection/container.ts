import * as PIXI from 'pixi.js'
import loader from '../../util/loader'

interface ITexture {
  [propName: string]: PIXI.Texture
}

export class Collection extends PIXI.Container {
  private store: ITexture = {}
  private cards = [{  }, {  }, {  }, {  }, {  }, {  }, {  }, {  }, {  }, {  }, {  }, {  }]
  private index = 0
  private cardContainer = new PIXI.Container()

  constructor() {
    super()
    this._load()
  }

  protected _load() {
    const spritSheet = '/static/assets/images/collection.json'
    loader.toload(spritSheet, (ld) => {
      const frames = ld.resources[spritSheet].data.frames
      for (const frame of Object.keys(frames)) {
        this.store[frame] = PIXI.Texture.fromFrame(frame)
      }
      this._init()
    })
  }

  protected _init() {
    const bg = new PIXI.Sprite(this.store['collection-background.png'])
    const back = new PIXI.Sprite(this.store['collection-back.png'])
    const up = new PIXI.Sprite(this.store['collection-up.png'])
    const down = new PIXI.Sprite(this.store['collection-down.png'])
    const hr1 = new PIXI.Sprite(this.store['collection-hr.png'])
    const hr2 = new PIXI.Sprite(this.store['collection-hr.png'])

    bg.x = 0
    bg.y = 0
    this.addChild(bg)

    back.x = 50
    back.y = 40
    back.anchor.set(0.5)
    back.interactive = true
    back.buttonMode = true
    this.addChild(back)
    back.on('pointerdown', () => {
        back.scale.x = 1.2
        back.scale.y = 1.2
      }).on('pointerup', () => {
        // route go -1
        back.scale.x = 1
        back.scale.y = 1
        console.log('back down')
      }).on('pointerupoutside', () => {
        // route go -1
        back.scale.x = 1
        back.scale.y = 1
      })

    hr1.x = 36
    hr1.y = 265
    this.addChild(hr1)
    hr2.x = 36
    hr2.y = 500
    this.addChild(hr2)

    this.addChild(this.cardContainer)
    this._drawCards()

    up.x = 400
    up.y = 35
    up.anchor.set(0.5)
    up.interactive = true
    up.buttonMode = true
    this.addChild(up)
    up.on('pointerdown', () => {
        up.scale.x = 1.2
        up.scale.y = 1.2
      }).on('pointerup', () => {
        // route go -1
        up.scale.x = 1
        up.scale.y = 1
      }).on('pointerupoutside', () => {
        // route go -1
        up.scale.x = 1
        up.scale.y = 1
      })
    down.x = 400
    down.y = 570
    down.anchor.set(0.5)
    down.interactive = true
    down.buttonMode = true
    this.addChild(down)
    down.on('pointerdown', () => {
        down.scale.x = 1.2
        down.scale.y = 1.2
      }).on('pointerup', () => {
        // route go -1
        down.scale.x = 1
        down.scale.y = 1
      }).on('pointerupoutside', () => {
        // route go -1
        down.scale.x = 1
        down.scale.y = 1
      })
  }

  protected _drawCards() {
    const card = this.store['collection-card.png']
    const shadow = this.store['collection-card-shadow.png']
    const baseX = 70
    const baseY = 77
    for (let i = 0; i < 8; i++) {
      const cardIndex = this.index * 8 + i
      const x = (i % 4) * 168 + baseX
      const y = Math.floor(i / 4) * 235 + baseY
      const cardS = new PIXI.Sprite(card)
      const shadowS = new PIXI.Sprite(shadow)
      cardS.x = x
      cardS.y = y
      shadowS.x = x - 6
      shadowS.y = y - 6
      this.cardContainer.addChild(shadowS)
      this.cardContainer.addChild(cardS)
    }
  }
}
