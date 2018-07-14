import { ISprite, IDisplayObject } from './sprite'
export class Grid implements ISprite {
  public displayObject: IDisplayObject

  constructor() {
    this.displayObject = {
      object: new PIXI.Sprite(),
      zIndex: 0,
      x: 0,
      y: 0
    }
  }

  public render(): void {
    // pass
  }
}
