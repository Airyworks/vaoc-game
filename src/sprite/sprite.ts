import * as PIXI from 'pixi.js'
export interface IDisplayObject {
  object: PIXI.DisplayObject,
  zIndex: number
}

export interface ISprite {
  displayObject: IDisplayObject
  render(): void
}
