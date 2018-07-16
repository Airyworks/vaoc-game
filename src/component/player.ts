import { Player as PlayerSprite, Directions, IPosition } from '../sprite'
import { input } from '../input'
import { PLAYER_SPEED } from '../config'

export class Player implements IPosition {
  // position in chunk
  public x: number = 0
  public y: number = 0

  public target: IPosition

  // includes position in stage
  public readonly sprite: PlayerSprite

  public arrowKeySet = new Set<number>()

  // tslint:disable-next-line
  private _moving: boolean = false
  public get moving() { return this._moving }

  constructor(sprite: PlayerSprite) {
    this.sprite = sprite
    this._register()
    this.target = this
  }

  public moveTo(pos: IPosition) {
    // TODO: find path
    this.target = pos
  }

  public move(direct: Directions) {
    
  }

  private _register() {
    input.onKeyBoard('keydown', (ev) => {
      const keyEv = ev as KeyboardEvent
      if (keyEv.key === 'ArrowLeft' || keyEv.key === 'a'
          || keyEv.key === 'ArrowRight' || keyEv.key === 'd'
          || keyEv.key === 'ArrowUp' || keyEv.key === 'w'
          || keyEv.key === 'ArrowDown' || keyEv.key === 's') {
        this.arrowKeySet.add(keyEv.keyCode)
      }
    })

    input.onceKeyBoard('keyup', (ev) => {
      const keyEv = ev as KeyboardEvent
      if (keyEv.key === 'ArrowLeft' || keyEv.key === 'a'
          || keyEv.key === 'ArrowRight' || keyEv.key === 'd'
          || keyEv.key === 'ArrowUp' || keyEv.key === 'w'
          || keyEv.key === 'ArrowDown' || keyEv.key === 's') {
        this.arrowKeySet.delete(keyEv.keyCode)
      }
    })
  }

  public get position(): IPosition {
    return { x: this.x, y: this.y }
  }

  public get displayPosition(): IPosition {
    const x = this.sprite.displayObject.x
    const y = this.sprite.displayObject.y
    return {x, y}
  }
}

export const player = new Player(new PlayerSprite())
