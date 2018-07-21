import { Player as PlayerSprite, Directions, IPosition } from '../sprite'
import { input } from '../input'
import { Render } from '../render/render'
import { PLAYER_SPEED, KEYBOARD_SETTING, RESERVE_WIDTH, RESERVE_HEIGHT, STAGE_WIDTH, STAGE_HEIGHT } from '../config'
import { absPos2relPos } from '../util'
import { kernel } from '../kernel'

const RESERVE_BOTTOM = ( STAGE_HEIGHT - RESERVE_HEIGHT ) / 2
const RESERVE_TOP = RESERVE_BOTTOM + RESERVE_HEIGHT
const RESERVE_LEFT = ( STAGE_WIDTH - RESERVE_WIDTH ) / 2
const RESERVE_RIGHT = RESERVE_LEFT + RESERVE_WIDTH

export class Player extends PlayerSprite implements IPosition {
  // position in chunk, origin is relative to left down corner of this chunk
  // 0 <= (x,y) < 64
  public x: number = 0
  public y: number = 0

  // position relative to map
  // origin is Map(0, 0), which is left down corner of Chunk0
  public absX: number = 0
  public absY: number = 0

  // target is relative to displayObject
  // so it can be float
  public target: IPosition
  public readonly renderer: Render
  public ready: boolean

  public arrowKeySet = new Set<string>()
  public keyQueue = [
    { key: KEYBOARD_SETTING.Left, last: 0 },
    { key: KEYBOARD_SETTING.Right, last: 0 },
    { key: KEYBOARD_SETTING.Up, last: 0 },
    { key: KEYBOARD_SETTING.Down, last: 0 },
  ]
  public pressCnt = 0

  // tslint:disable-next-line
  private _moving: boolean = false
  public get moving() { return this._moving }

  constructor(render: Render) {
    super()
    this.ready = false
    this.renderer = render
    this._register()
    this.target = this.displayPosition
  }

  public moveTo(pos: IPosition) {
    // TODO: find path
    this.target = pos
  }

  public move(distance: number) {
    // do not need to move, stopping
    if (
      Math.abs(this.target.x - this.displayPosition.x) < distance
      &&
      Math.abs(this.target.y - this.displayPosition.y) < distance
    ) {
      this._moving = false
      return
    }
    this._moving = true

    // TODO: check if the grid is reachable

    if (this.target.x - this.displayPosition.x >= distance) {
      // move to the right
      if (this.displayPosition.x + distance >= RESERVE_RIGHT) {
        kernel.emit('onGroundMove',{ distance, direction: Directions.right })
      } else {
        kernel.emit('onPlayerMove',{ distance, direction: Directions.right })
      }
      this.absX += distance
    }

    if (this.target.x - this.displayPosition.x <= - distance) {
      // move to the left
      if (this.displayPosition.x - distance <= RESERVE_LEFT) {
        kernel.emit('onGroundMove', { distance, direction: Directions.left })
      } else {
        kernel.emit('onPlayerMove', { distance, direction: Directions.left })
      }
      this.absX -= distance
    }

    // y goes up with moving up
    if (this.target.y - this.displayPosition.y >= distance) {
      // move up
      if (this.displayPosition.y + distance >= RESERVE_TOP) {
        kernel.emit('onGroundMove', { distance, direction: Directions.up })
      } else {
        kernel.emit('onPlayerMove', { distance, direction: Directions.up })
      }
      this.absY += distance
    }

    // y goes down with moving down
    if (this.target.y - this.displayPosition.y <= - distance) {
      // move down
      if (this.displayPosition.y - distance <= RESERVE_BOTTOM) {
        kernel.emit('onGroundMove', { distance, direction: Directions.down })
      } else {
        kernel.emit('onPlayerMove', { distance, direction: Directions.down })
      }
      this.absY -= distance
    }

    // after moving
    const [chunkPos, relPos] = absPos2relPos({
      x: this.absX,
      y: this.absY
    })
    kernel.emit('onMove', chunkPos);
    ({x: this.x, y: this.y} = relPos)
  }

  public render(delta: number) {
    const distance = PLAYER_SPEED * delta

    if (this.ready) {
      if (this.arrowKeySet.size !== 0) {
        let key = ''

        // get the last pressed key
        this.keyQueue.sort((a, b) => {
          return b.last - a.last
        })
        for (const k of this.keyQueue) {
          if (this.arrowKeySet.has(k.key)) {
            key = k.key
            break
          }
        }

        switch (key) {
          case KEYBOARD_SETTING.Left:
            this.target = { x: this.displayPosition.x - distance, y: this.displayPosition.y }
            break
          case KEYBOARD_SETTING.Right:
            this.target = { x: this.displayPosition.x + distance, y: this.displayPosition.y }
            break
          case KEYBOARD_SETTING.Up:
            this.target = { x: this.displayPosition.x, y: this.displayPosition.y - distance }
            break
          case KEYBOARD_SETTING.Down:
            this.target = { x: this.displayPosition.x, y: this.displayPosition.y + distance }
            break
        }
      }

      // moving
      this.move(distance)
    }
  }

  protected _register() {
    super._register()
    input.onKeyBoard('keydown', (ev) => {
      const keyEv = ev as KeyboardEvent
      if (keyEv.key === KEYBOARD_SETTING.Left
          || keyEv.key === KEYBOARD_SETTING.Right
          || keyEv.key === KEYBOARD_SETTING.Up
          || keyEv.key === KEYBOARD_SETTING.Down) {
        this.arrowKeySet.add(keyEv.key)
        this.keyQueue.forEach((v: { key: string, last: number}) => {
          if (v.key === keyEv.key) {
            v.last = ++ this.pressCnt
            return
          }
        })
      }
    })

    input.onceKeyBoard('keyup', (ev) => {
      const keyEv = ev as KeyboardEvent
      if (keyEv.key === KEYBOARD_SETTING.Left
        || keyEv.key === KEYBOARD_SETTING.Right
        || keyEv.key === KEYBOARD_SETTING.Up
        || keyEv.key === KEYBOARD_SETTING.Down) {
        this.arrowKeySet.delete(keyEv.key)
      }
    })
    this.renderer.addTicker((delta: number) => {this.render(delta)})
  }

  public get relativePosition(): IPosition {
    return { x: this.x, y: this.y }
  }

  public get displayPosition(): IPosition {
    const x = this.displayObject.x
    const y = this.displayObject.y
    return { x, y }
  }

  public get absolutePosition(): IPosition {
    return { x: this.absX, y: this.absY }
  }
}
