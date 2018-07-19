import * as PIXI from 'pixi.js'

export interface ISprite {
  displayObject: IDisplayObject,
  render: (delta: number) => void
}

export interface IPosition {
  x: number,
  y: number
}

export interface IDisplayObject extends IPosition {
  object: PIXI.DisplayObject,
  zIndex: number
}

export enum Directions {
  up = 0,
  down,
  left,
  right
}
