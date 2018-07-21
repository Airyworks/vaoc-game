import * as PIXI from 'pixi.js'
import loader from '../../util/loader'
import { CARD_TITLE_WORD_STYLE, CARD_ATTR_WORD_STYLE } from '../../config'

interface ITexture {
  [propName: string]: PIXI.Texture
}

interface IPrefer {
  [propName: string]: string
}

interface ICard {
  name: string,
  hp: number,
  magic: number,
  speed: number
}

const cardTitleStyle = new PIXI.TextStyle(CARD_TITLE_WORD_STYLE)
const cardAttrStyle = new PIXI.TextStyle(CARD_ATTR_WORD_STYLE)

export class Collection extends PIXI.Container {
  private store: ITexture = {}
  private cards: ICard[] = [
    { name: 'WJX', hp: 10, magic: 15, speed: 11 },
    { name: 'WJX', hp: 15, magic: 10, speed: 12 },
    { name: 'WJX', hp: 12, magic: 15, speed: 13 },
    { name: 'WJX', hp: 14, magic: 25, speed: 15 },
    { name: 'WJX', hp: 10, magic: 11, speed: 16 },
    { name: 'WJX', hp: 10, magic: 15, speed: 15 },
    { name: 'WJX', hp: 10, magic: 15, speed: 15 },
    { name: 'WJX', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 },
    { name: 'Minako', hp: 10, magic: 15, speed: 15 }
  ]
  private index = 0
  private cardContainer = new PIXI.Container()
  private prefer: IPrefer = {
    wid: 'collection-card-wid.png',
    wat: 'collection-card-wat.png',
    tim: 'collection-card-tim.png',
    spa: 'collection-card-spa.png',
    soi: 'collection-card-soi.png',
    none: 'collection-card-none.png',
    lig: 'collection-card-lig.png',
    fir: 'collection-card-fir.png',
    ele: 'collection-card-ele.png',
    dar: 'collection-card-dar.png'
  }
  private preferIndexes = Object.keys(this.prefer)

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
    const card = this.store['collection-card-front-1.png']
    const cardIcon = this.store['collection-icon.png']
    const shadow = this.store['collection-card-shadow.png']
    const baseX = 70
    const baseY = 77
    for (let i = 0; i < 8; i++) {
      const cardIndex = this.index * 8 + i
      const x = (i % 4) * 168 + baseX
      const y = Math.floor(i / 4) * 235 + baseY
      const cardS = new PIXI.Sprite(card)
      const cardIconS = new PIXI.Sprite(cardIcon)
      const shadowS = new PIXI.Sprite(shadow)
      const preferIndex: string = this.preferIndexes[Math.floor(Math.random() * this.preferIndexes.length)]
      const preferS = new PIXI.Sprite(this.store[this.prefer[preferIndex]])
      const title = new PIXI.Text(this.cards[cardIndex].name, cardTitleStyle)
      const hp = new PIXI.Text(this.cards[cardIndex].hp.toString(), cardAttrStyle)
      const magic = new PIXI.Text(this.cards[cardIndex].magic.toString(), cardAttrStyle)
      const speed = new PIXI.Text(this.cards[cardIndex].speed.toString(), cardAttrStyle)
      cardS.x = x
      cardS.y = y
      shadowS.x = x - 6
      shadowS.y = y - 6
      preferS.anchor.set(0.5)
      preferS.x = x + 120
      preferS.y = y + 130
      cardIconS.x = x + 60
      cardIconS.y = y + 140
      title.anchor.set(0.5)
      title.x = x + 73
      title.y = y + 15
      hp.x = x + 35
      magic.x = x + 35
      speed.x = x + 35
      hp.y = y + 140
      magic.y = y + 155
      speed.y = y + 170

      const cardDemo = new PIXI.Sprite(this.store['collection-card-demo.png'])
      cardDemo.anchor.set(0.5)
      cardDemo.x = x + 73
      cardDemo.y = y + 80
      // cardDemo.scale.x = 1.32
      // cardDemo.scale.y = 1.42

      this.cardContainer.addChild(shadowS)
      this.cardContainer.addChild(cardDemo)
      this.cardContainer.addChild(cardS)
      this.cardContainer.addChild(preferS)
      this.cardContainer.addChild(cardIconS)
      this.cardContainer.addChild(title)
      this.cardContainer.addChild(hp)
      this.cardContainer.addChild(magic)
      this.cardContainer.addChild(speed)
    }
  }
}
