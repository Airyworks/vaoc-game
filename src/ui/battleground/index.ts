import { Battle } from '../../component/battle'
import * as PIXI from 'pixi.js'
import { Character } from './character'

export class Battleground extends PIXI.Container {
   public battle: Battle
   constructor(self: Character[], oppo: Character[]) {
     super()
     this.battle = new Battle(self.map((v) => v.info), oppo.map((v) => v.info))
   }

   public next() {
     if (this.battle.isEnd) {
       return
     }
     this.battle.next()
   }
}
