import { IMoveable } from './moveable'
export interface ICharactor extends IMoveable {
  name: string
  readonly type: string
}
