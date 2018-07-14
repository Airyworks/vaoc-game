import * as PIXI from 'pixi.js'

export interface ISprite {
  displayObject: IDisplayObject,
  render(): void
}

export interface IPosition {
  x: number,
  y: number
}

export interface IDisplayObject extends IPosition {
  object: PIXI.DisplayObject,
  zIndex: number
}
