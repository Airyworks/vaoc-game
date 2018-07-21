import * as PIXI from 'pixi.js'
import { Character as Char } from '../../component/battle/character'

export class Character extends PIXI.Container {
  public info: Char
  constructor(info: Char) {
    super()
    this.info = info
  }
}
