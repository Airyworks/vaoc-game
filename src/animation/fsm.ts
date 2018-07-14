type EventFunc = (ev: string, last: string, next: string) => void | Promise<void>
type TransFuncStr = ((...args: any[]) => string | Promise<string>) | string
type HookName = 'onLeave' | 'onAfter' | 'onBegin' | 'onEnter'

interface ISTATEBASE {
  events: {
    [key in HookName]?: EventFunc
  },
  transitions: {
    [transName: string]: TransFuncStr
  },
  store: {
    [key: string]: any
  }
}

type IVALIDSTATE = ISTATEBASE & { name: string }
export type ISTATE = Partial<ISTATEBASE>

export class FSM {
  private static async emitStateHook(
    state: IVALIDSTATE,
    hook: HookName,
    from: IVALIDSTATE,
    to: IVALIDSTATE
  ) {
    const fn = state.events[hook]
    if (fn !== undefined) {
      return Promise.resolve(fn.call(state, hook, from.name, to.name))
    }
  }

  private static resolveStates(iStates: { [name: string]: ISTATE }): { [name: string]: IVALIDSTATE } {
    const ret: { [name: string]: IVALIDSTATE } = {}
    for (const i in iStates) {
      ret[i] = {} as IVALIDSTATE
      ret[i].name = i

      const keys: Array<keyof ISTATE> = ['events', 'transitions', 'store']
      keys.forEach((k) => {
        ret[i][k] = iStates[i][k] || {}
      })
    }
    return ret
  }

  private states: { [name: string]: IVALIDSTATE }
  private initState: string
  private currentState: IVALIDSTATE
  private pendingState: boolean = false

  public constructor(states: { [name: string]: ISTATE }, initState: string) {
    const validStates = FSM.resolveStates(states)
    this.states = validStates
    this.currentState = validStates[initState]
    this.initState = initState
  }

  public get current() {
    return this.currentState.name
  }

  public set current(state: string) {
    this.gotoState(state)
  }

  public get isPending() {
    return this.pendingState
  }

  public transVia(transName: string, ...args: any[]): Promise<void> {
    if (transName in this.currentState.transitions) {
      const trans: TransFuncStr = this.currentState.transitions[transName]
      const prev = this.currentState
      let nextStateName: Promise<string> | string = ''
      if (typeof trans === 'string') {
        nextStateName = trans
      } else {
        nextStateName = trans.call(prev, ...args)
      }
      this.pendingState = true
      return new Promise<void>((s, j) => {
        Promise.resolve(nextStateName).then((name) => {
          this.transTo(name).then(() => {
            this.pendingState = false
            s()
          })
        }).catch((err) => {
          this.pendingState = false
          j(err)
        })
      })
    } else {
      throw new NoSuchTransitionError(`In ${this.currentState.name} state has no transition named ${transName}`)
    }
  }

  public async gotoState(state: string) {
    if (!this.states[state]) {
      throw new InvalidStateError(`Invalid state: ${state}`)
    }
    const next = this.states[state]
    const prev = this.currentState
    await FSM.emitStateHook(prev, 'onLeave', prev, next)
    await FSM.emitStateHook(next, 'onEnter', prev, next)
    this.currentState = next
    return this
  }

  public reset() {
    this.currentState = this.states[this.initState]
    return this
  }

  private async transTo(state: string) {
    if (!this.states[state]) {
      throw new InvalidStateError(`Invalid state: ${state}`)
    }
    const next = this.states[state]
    const prev = this.currentState
    await FSM.emitStateHook(prev, 'onLeave', prev, next)
    await FSM.emitStateHook(prev, 'onAfter', prev, next)
    await FSM.emitStateHook(next, 'onBegin', prev, next)
    await FSM.emitStateHook(next, 'onEnter', prev, next)
    this.currentState = next
  }
}

// tslint:disable-next-line
export class InvalidStateError extends Error {
  constructor(msg: string) {
    super()
    this.name = 'InvalidStateError'
    this.message = msg
  }
}

// tslint:disable-next-line
export class NoSuchTransitionError extends Error {
  constructor(msg: string) {
    super()
    this.name = 'NoSuchTransitionError'
    this.message = msg
  }
}
