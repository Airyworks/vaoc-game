import { IMoveable } from './moveable'
import { IDisplayObject } from './sprite'
export class Entity implements IMoveable {
  public displayObject: IDisplayObject

  constructor() {
    this.displayObject = {
      object: new PIXI.Sprite(),
      zIndex: 5
    }
  }

  public render(): void {
    // pass
  }

  public loop(): void {
    // pass
  }
}