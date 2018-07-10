import { ISprite } from './sprite'

export enum Directions {
  up = 0,
  down,
  left,
  right
}

export interface IMoveable extends ISprite {
  loop(): void
}
