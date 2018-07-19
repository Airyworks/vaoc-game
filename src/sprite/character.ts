import { ISprite } from './sprite'
export interface ICharactor extends ISprite {
  name: string
  readonly type: string
}
