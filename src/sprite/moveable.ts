import { ISprite } from './sprite'
export interface IMoveable extends ISprite {
  loop(): void
}
