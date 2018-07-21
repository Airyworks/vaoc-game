import * as PIXI from 'pixi.js'
import { Game } from '../../game'

const graphic = new PIXI.Graphics()
graphic.beginFill(Number(0xFFFFFF))
graphic.drawCircle(1, 1, 2)
graphic.endFill()
const texture = graphic.generateCanvasTexture()

class Point {
  public bubble: PIXI.Sprite
  private x: number
  private y: number
  private sx: number
  private sy: number
  private sp: number

  constructor (x: number, y: number) {
    this.bubble = new PIXI.Sprite(texture)
    this.x = x + 400
    this.y = y + 300
    const r = Math.random() * 8 + 1
    this.sx = x * r + 400
    this.sy = y * r + 300
    this.bubble.alpha = 0
    this.bubble.position.x = this.sx
    this.bubble.position.y = this.sy
    this.sp = Math.random() * 0.08 + 0.06
  }

  public update (delta: number) {
    this.bubble.position.x += this.sp * (this.x - this.bubble.position.x)
    this.bubble.position.y += this.sp * (this.y - this.bubble.position.y)
    if (this.bubble.alpha < 1) {
      this.bubble.alpha += 0.01
    }
  }
}

export class DropCard {
  public readonly game: Game
  public container: PIXI.Container = new PIXI.Container()
  public points: Array<Point> = new Array()
  public cardBack: PIXI.Sprite
  private cardMove?: IterableIterator<undefined>
  private animationList: Array<() => IterableIterator<undefined>>
  private animationIndex: number

  constructor (game: Game) {
    this.game = game
    this.game.renderer.addTicker(this.render)

    this.cardBack = PIXI.Sprite.fromImage('/static/cArDbAcK.png')
    this.cardBack.anchor.set(0.5)
    this.cardBack.x = game.app.screen.width / 2
    this.cardBack.y = 780
    this.container.addChild(this.cardBack)

    this.animationList = [
      this.cardMoveUp,
      this.lightIn
    ]
    this.animationIndex = 0

    for (let i = -110; i <= 110; i += 3) {
      for (let j = -147; j <= 147; j += 3) {
        const point = new Point(i + Math.random() - 1, j + Math.random() - 1)
        this.container.addChild(point.bubble)
        this.points.push(point)
      }
    }
    this.start()
  }

  public render = (delta: number) => {
    if (this.cardMove) {
      const { done } = this.cardMove.next(delta)
      if (done) {
        this.animationIndex++
        if (this.animationIndex < this.animationList.length) {
          this.cardMove = this.animationList[this.animationIndex].call(this)
        } else {
          this.cardMove = void 0
        }
      }
    }
  }

  private *cardMoveUp () {
    let y = 780
    while (y > 316) {
      y -= 16 * (yield)
      this.cardBack.position.y = y
    }
    this.cardBack.position.y = 300
  }
  private *lightIn () {
    let k = 0
    while (k < 100) {
      const d = yield
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].update(d)
      }
      k++
    }
  }

  public start () {
    this.cardMove = this.animationList[this.animationIndex].call(this)
  }
}