import { ICharactor } from './character'
import { IDisplayObject } from './sprite'
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

  public loop(): void {
    // pass
  }

  public render(): void {
    // pass
  }
}
