import { IDisplayObject, ISprite } from './sprite'
export class Entity implements ISprite {
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
