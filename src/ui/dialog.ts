import { DIALOG_TITLE_STYLE, DIALOG_WORD_STYLE, DIALOG_SPEED } from '../config'
import * as PIXI from 'pixi.js'
import { Game } from '../game'
import { input } from '../input'

interface IScenario {
  version: string,
  scripts: {
    [key: string]: IScripts
  }
}

type IScripts = Array<{
  image: string,
  words: Array<{
    name: string,
    say: string
  }>
}>

const bgImg = '/static/assets/scenario/images/dialog-bg.png'

export class Dialog {
  public readonly game: Game
  public scenario: IScenario
  public container: PIXI.Container = new PIXI.Container()
  public graphics = new PIXI.Graphics()
  public ready: boolean = false
  public bg: PIXI.Sprite = PIXI.Sprite.fromImage(bgImg)
  public title = new PIXI.Text('', new PIXI.TextStyle(DIALOG_TITLE_STYLE))
  public word = new PIXI.Text('', new PIXI.TextStyle(DIALOG_WORD_STYLE))
  public currScript: IScripts = []
  public currStep: { page: number, step: number} = {
    page: 0,
    step: 0
  }
  public currImg: string = ''
  public isProcess: boolean = false
  public processWord: string = ''
  public interval: number = 0

  constructor(game: Game, scenario: IScenario) {
    this.game = game
    this.scenario = scenario
    game.group.setGroup(this.container, 1)
    this.container.interactive = true
    this.container.buttonMode = false
    this.game.app.stage.addChild(this.container)

    this._init()
    this._register()
  }

  public execScript() {
    if (!this.ready) {
      return
    }
    if (this.isProcess) {
      clearInterval(this.interval)
      this.isProcess = false
      this.word.text = this.processWord
      return
    }
    let {page, step} = this.currStep
    if (page >= this.currScript.length) {
      this.close()
      return
    }
    const newImg = this.currScript[page].image
    const word = this.currScript[page].words[step]
    let lastImg: PIXI.Sprite = new PIXI.Sprite()
    if (this.currImg !== newImg) {
      this.currImg = newImg
      const oldImg = lastImg
      lastImg = PIXI.Sprite.fromImage(newImg)
      lastImg.alpha = 0
      lastImg.zIndex = 5
      this.container.addChild(lastImg)
      const ticker = (delta: number) => {
        if (oldImg && oldImg.alpha > 0) {
          oldImg.alpha -= 0.04 * delta
          lastImg.alpha += 0.04 * delta
        } else {
          this.game.renderer.removeTicker(ticker)
          lastImg.alpha = 1
          this.container.removeChild(oldImg)
        }
      }
      this.game.renderer.addTicker(ticker)
    }
    this.title.text = word.name
    this.word.text = ''
    this.processWord = word.say
    this.isProcess = true
    let i = 0
    this.interval = setInterval(() => {
      if (i === 0) {
        this.word.text = this.processWord[i++]
      } else if (i < this.processWord.length) {
        this.word.text = this.word.text + this.processWord[i++]
      } else {
        clearInterval(this.interval)
        this.isProcess = false
      }
    }, DIALOG_SPEED)
    step ++
    if (step >= this.currScript[page].words.length) {
      page ++
      step = 0
    }
    this.currStep = {step, page}
  }

  public close() {
    this.ready = false
    const ticker = (delta: number) => {
      if (this.container.alpha > 0) {
        this.container.alpha -= 0.04 * delta
      } else {
        this.game.renderer.removeTicker(ticker)
        this.container.visible = false
      }
    }
    this.game.renderer.addTicker(ticker)
  }

  public show(name?: string) {
    this.ready = true
    if (name) {
      this.currScript = this.scenario.scripts[name]
    } else {
      // do nothing
    }
    this.execScript()
  }

  protected _init() {
    // this.graphics.zIndex = 10
    // this.graphics.beginFill(0x333333)
    // this.graphics.drawRect(0, 0, 800, 600)
    // this.container.addChild(this.graphics)
    this.bg.zIndex = 2
    this.bg.position.y = 300
    this.bg.position.x = 0
    this.container.addChild(this.bg)
    this.title.zIndex = 1
    this.title.x = 50
    this.title.y = 400
    this.container.addChild(this.title)
    this.word.zIndex = 1
    this.word.x = 50
    this.word.y = 450
    this.container.addChild(this.word)
  }

  protected _register() {
    input.onSprite(this.container, 'pointerdown', () => {
      this.execScript()
    })
    input.onKeyBoard('keydown', (e) => {
      const keyEvent = e as KeyboardEvent
      if (keyEvent.key === 'Enter') {
        this.execScript()
      }
    })
  }
}
