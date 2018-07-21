import { Battle } from '../../component/battle'
import * as PIXI from 'pixi.js'
import { Character as Char } from './character'
import { Game } from '../../game'
import loader from '../../util/loader'
import { Character } from '../../component/battle/character'

interface ITexture {
  [propName: string]: PIXI.Texture
}

export class Battleground extends PIXI.Container {
  public battle: Battle
  private game: Game
  private store: ITexture = {}
  constructor(game: Game) {
    super()
    this.game = game
    // self: Character[], oppo: Character[]
    this.battle = new Battle([], [])
    this._load()
  }

  public newBattle(self: Char[], oppo: Char[]) {
    this.battle = new Battle(self.map((v) => v.info), oppo.map((v) => v.info))
    this._renderAvatar('opponent')
    this._renderAvatar('self')
  }

  public next() {
    if (this.battle.isEnd) {
      return
    }
    this.battle.next()
  }


  private _load() {
    const spritSheet = '/static/assets/images/battle.json'
    loader.toload(spritSheet, (ld) => {
      const frames = ld.resources[spritSheet].data.frames
      for (const frame of Object.keys(frames)) {
        this.store[frame] = PIXI.Texture.fromFrame(frame)
      }
      this._init()
    })
  }

  private _init() {
    const bg = new PIXI.Sprite(this.store['battle-background.png'])
    bg.x = 0
    bg.y = 0
    this.addChild(bg)


    const bt = [[
      new Character({ HP: 3500,
        hash: "",
        MP: 355,
        ATK: 250,
        DEF: 125,
        SPD: 200,
        MAIN: 'wat',
        MAINP: 182,
        NAME: '王跻欣01' }),
      new Character({ HP: 5500,
        hash: "",
        MP: 285,
        ATK: 180,
        DEF: 115,
        SPD: 250,
        MAIN: 'spa',
        MAINP: 230,
        NAME: '王跻欣02' }),
      new Character({ HP: 4500,
        hash: "",
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'lig',
        MAINP: 200,
        NAME: '王跻欣03' }),
      new Character({ HP: 4500,
        hash: "",
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'lig',
        MAINP: 200,
        NAME: '王跻欣04' }),
      new Character({ HP: 4500,
        hash: "",
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'lig',
        MAINP: 200,
        NAME: '王跻欣05' })
    ], [
    new Character({ HP: 3500,
      hash: "",
      MP: 355,
      ATK: 250,
      DEF: 125,
      SPD: 200,
      MAIN: 'fir',
      MAINP: 182,
      NAME: '王大夫01' }),
    new Character({ HP: 5500,
      hash: "",
      MP: 285,
      ATK: 180,
      DEF: 115,
      SPD: 250,
      MAIN: 'wid',
      MAINP: 230,
      NAME: '王大夫02' }),
      new Character({ HP: 4500,
        hash: "",
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'dar',
        MAINP: 200,
        NAME: '王大夫03' }),
      new Character({ HP: 4500,
        hash: "",
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'dar',
        MAINP: 200,
        NAME: '王大夫04' }),
      new Character({ HP: 4500,
        hash: "",
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'dar',
        MAINP: 200,
        NAME: '王大夫05' })
      ]]

    this.newBattle(bt[0].map((v) => new Char(v)), bt[1].map((v) => new Char(v)))
  }

  private _renderAvatar(side: 'self' | 'opponent') {
    let baseX = 0
    let baseY = 0
    if (side === 'opponent') {
      baseX = 30
      baseY = 30
    } else if (side === 'self') {
      baseX = 360
      baseY = 200
    }

    for (let i = 0; i < this.battle[side].length; i++) {
      const mahou = this.battle[side][i]
      const avatar = new PIXI.Sprite(this.store[`battle-${mahou.MAIN}.png`])
      // const img = new PIXI.Sprite()
      const pos = side === 'self' ? i + 1 : i
      avatar.x = (pos % 3) * 140 + baseX
      avatar.y = Math.floor(pos / 3) * 170 + baseY
      this.addChild(avatar)
    }
  }
}
