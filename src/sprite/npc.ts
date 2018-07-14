import { ICharactor } from './character'
import { IDisplayObject } from './sprite'
export class NPC implements ICharactor {
  public readonly type: string = 'npc'
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
