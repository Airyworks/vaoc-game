import { Character } from './character'
import * as seedrandom from 'seedrandom'
import { BATTLE_K, BATTLE_L, BATTLE_MAX_MAG, BATTLE_CRITICAL} from '../../config'

// const logger = console.log

function findCharLevel(ch: Character) {
  switch (ch.MAIN) {
    case 'spa':
    case 'tim':
      return 3
    case 'dar':
    case 'lig':
      return 2
    case 'none':
      return 0
    default:
      return 1
  }
}

function getK(a: Character, b: Character) {
  switch (a.MAIN) {
    case 'none':
      switch (findCharLevel(b)) {
        case 0:
          return BATTLE_K.NotAff
        case 1:
          return BATTLE_K.NoL1
        case 2:
          return BATTLE_K.NoL2
        default:
          return BATTLE_K.NoL3
      }
    case 'wat':
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L1No
        case 'fir':
          return BATTLE_K.L1L1
        default:
          return BATTLE_K.NotAff
      }
    case 'fir':
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L1No
        case 'wid':
          return BATTLE_K.L1L1
        default:
          return BATTLE_K.NotAff
      }
    case 'wid':
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L1No
        case 'soi':
          return BATTLE_K.L1L1
        default:
          return BATTLE_K.NotAff
      }
    case 'soi':
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L1No
        case 'ele':
          return BATTLE_K.L1L1
        default:
          return BATTLE_K.NotAff
      }
    case 'ele':
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L1No
        case 'wat':
          return BATTLE_K.L1L1
        default:
          return BATTLE_K.NotAff
      }
    case 'lig':
      if (findCharLevel(b) === 1) {
        return BATTLE_K.L2L1
      }
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L2No
        case 'dar':
          return BATTLE_K.L2L2
        default:
          return BATTLE_K.NotAff
      }
    case 'dar':
      if (findCharLevel(b) === 1) {
        return BATTLE_K.L2L1
      }
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L2No
        case 'lig':
          return BATTLE_K.L2L2
        default:
          return BATTLE_K.NotAff
      }
    case 'tim':
      if (findCharLevel(b) === 1) {
        return BATTLE_K.L3L1
      } else if (findCharLevel(b) === 2) {
        return BATTLE_K.L3L2
      }
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L3No
        case 'tim':
          return BATTLE_K.L3L3
        default:
          return BATTLE_K.NotAff
      }
    case 'spa':
      if (findCharLevel(b) === 1) {
        return BATTLE_K.L3L1
      } else if (findCharLevel(b) === 2) {
        return BATTLE_K.L3L2
      }
      switch (b.MAIN) {
        case 'none':
          return BATTLE_K.L3No
        case 'spa':
          return BATTLE_K.L3L3
        default:
          return BATTLE_K.NotAff
      }
  }
  return 0
}

function damage(a: Character, b: Character, critical: boolean) {
  let k = getK(a, b)
  if (a.MAIN !== 'none' && b.MAIN !== 'none') {
  k = k * Math.sqrt((a.MAINP - b.MAINP) / 255 + 1)
  }
  return Math.floor(a.ATK * k * (critical ? BATTLE_CRITICAL : 1) * b.DEF / BATTLE_L)
}

export class Battle {
  public queue: Character[] = []
  public self: Character[] = []
  public opponent: Character[] = []
  public rdg: () => number
  public isEnd: boolean = false
  public isWin: boolean = false
  public logger = console.log

  constructor(self: Character[], oppo: Character[], seed?: string) {
    this.self = self
    this.opponent = oppo
    this.rdg = seed ? seedrandom(seed) : seedrandom()
    this._init()
  }

  public next() {
    // find min
    const min = this.queue.reduce((a, b) => {
      if (a.pos > b.pos) {
        return b
      } else {
        return a
      }
    })

    // generate which card will be attack
    const attackedSet = min.isOppo ? this.self : this.opponent
    const filtered = attackedSet.filter((v) => v.curHP > 0)
    const attCard = filtered[Math.floor(this.rdg() * filtered.length)]

    if (this.logger) {
      this.logger(`${min.NAME} 对 ${attCard.NAME} 发动了攻击 !`)
    }

    this._battle(min, attCard)

    if (this._isEnd()) {
      this.isEnd = true
      if (this._isWin()) {
        if (this.logger) {
          this.logger(`对方卡牌全部被破坏!`)
          this.logger(`胜利!`)
        }
        this.isWin = true
      } else {
        if (this.logger) {
          this.logger(`你的卡牌全部被破坏!`)
          this.logger(`失败!`)
        }
        this.isWin = false
      }
      return true
    }

    const moved = min.pos

    this.queue.forEach((v) => {
      v.pos -= moved
      v.curMP += v.MP
    })
    min.pos = min.SPD
    // not end
    return false
  }

  protected _isEnd() {
    if (this.self.filter((v) => v.curHP > 0).length *
    this.opponent.filter((v) => v.curHP > 0).length === 0) {
      return true
    }
    return false
  }

  protected _isWin() {
    if (this.self.filter((v) => v.curHP > 0).length) {
      return false
    } else {
      return true
    }
  }

  protected _battle(a: Character, b: Character) {
    const useCritical = a.curMP >= BATTLE_MAX_MAG
    if (useCritical && this.logger) {
      this.logger(`${a.NAME} 对 ${b.NAME} 的攻击触发了暴击!`)
    }

    // battle
    const dmg = damage(a, b, useCritical)
    b.curHP = Math.max(0, b.curHP - dmg)

    if (this.logger) {
      this.logger(`${a.NAME} 对 ${b.NAME} 的攻击造成了 ${dmg} 点伤害`)
      this.logger(`${b.NAME} 还剩 ${b.curHP} 点生命值`)
      if (b.curHP <= 0) {
        this.logger(`${b.NAME} 生命值耗光, 被破坏`)
      }
    }

    // after battle
    if (useCritical) {
      a.curMP -= BATTLE_MAX_MAG
    }
  }

  protected _init() {
    this.self.forEach((v) => {
      v.isOppo = false
    })

    this.opponent.forEach((v) => {
      v.isOppo = true
    })

    this.queue = this.opponent.concat(this.self)
  }
}
