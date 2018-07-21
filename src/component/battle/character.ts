import { ICard, Card } from './card'

export class Character extends Card {
  public curHP = 65535
  public curMP = 0
  public pos = 0
  // is opponent's card
  public isOppo = false

  constructor(init: ICard) {
    super(init)
    this.curHP = init.HP
    this.pos = init.SPD
  }
}
