import * as veb3 from 'vaoc-veb3'

export interface ICard {
  HP: number,
  MP: number,
  ATK: number,
  DEF: number,
  SPD: number,
  MAIN: veb3.MHSJAttributes | 'none',
  MAINP: number,
  NAME: string
}

export class Card implements ICard {
  public HP: number = 0
  public MP: number = 0
  public ATK: number = 0
  public DEF: number = 0
  // speed
  public SPD: number = 0
  public MAIN: veb3.MHSJAttributes | 'none' = 'none'
  public MAINP: number = 0
  public NAME: string = ''
  constructor(init: ICard) {
    Object.assign(this, init)
  }
}
