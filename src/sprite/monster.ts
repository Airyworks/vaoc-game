import { ICharactor } from './character'
import { IDisplayObject } from './sprite'
export class Monster implements ICharactor {
  public readonly type: string = 'monster'
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

  public render(delta: number): void {
    // pass
  }
}
