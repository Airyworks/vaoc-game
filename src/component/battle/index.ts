import { Character } from './character'
import * as seedrandom from 'seedrandom'
import { BATTLE_K, BATTLE_L, BATTLE_MAX_MAG, BATTLE_CRITICAL} from '../../config'

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
  k = k * Math.sqrt((a.MAINP - b. MAINP) / 255 + 1)
  }
  return a.ATK * k * (critical ? BATTLE_CRITICAL : 1) * b.DEF / 144
}

export class Battle {
  public queue: Character[] = []
  public self: Character[] = []
  public opponent: Character[] = []
  public rdg: () => number

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

    this._battle(min, attCard)

    const moved = min.pos

    this.queue.forEach((v) => {
      v.pos -= moved
      v.curMP += v.MP
    })
    min.pos = min.SPD
  }

  protected _battle(a: Character, b: Character) {
    const useCritical = a.curMP >= BATTLE_MAX_MAG

    // battle
    const dmg = damage(a, b, useCritical)
    b.curHP = Math.max(0, b.curHP - dmg)

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
