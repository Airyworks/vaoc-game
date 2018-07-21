import { ICharactor } from './character'
import { IDisplayObject, Directions } from './sprite'
import { kernel } from '../kernel'
export class Player implements ICharactor {
  public readonly type: string = 'player'
  public name: string = ''
  public displayObject: IDisplayObject

  constructor() {
    this.displayObject = {
      object: new PIXI.Sprite(),
      zIndex: 5,
      x: 0,
      y: 0
    }
  }

  // tslint:disable-next-line
  protected _direction: Directions = Directions.down
  public get direction() { return this._direction }
  public set direction(v) {
    // direction changes
    if (this._direction !== v) {
      // do sth
      this._direction = v
    }
  }

  public render(delta: number): void {
    // pass
  }

  protected _moveDirections(distance: number, direction: Directions) {
    if (direction === Directions.right) {
      this.displayObject.x += distance
      return
    }
    if (direction === Directions.left) {
      this.displayObject.x -= distance
      return
    }
    if (direction === Directions.up) {
      this.displayObject.y += distance
      return
    }
    if (direction === Directions.down) {
      this.displayObject.y -= distance
      return
    }
  }

  protected _register() {
    kernel.on('onPlayerMove', async (ctx, next) => {
      await next()
      this._moveDirections(ctx.distance, ctx.direction)
    })
  }
}
