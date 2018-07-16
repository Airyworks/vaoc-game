import { FSM } from '../../src/util/fsm'
describe('FSM', () => {
  it('FSM test: general function', async () => {
    const states = {
      a: {
        events: {
          onAfter: () => {},
          onLeave: () => {}
        },
        transitions: {
          toB: () => 'b'
        }
      },
      b: {
        events: {
          onBefore: (ev: string) => { console.log('I\'m going to B') },
          onEnter: (ev?: string, last?: string, next?: string) => { console.log('I\'m coming to B') }
        },
        transitions: {
          toC: 'c',
          toA: (really: boolean, arg?: any) => {
            if (really) { return 'a' } else { return arg ? 'a' : 'b' }
          }
        }
      },
      c: {
        // no events property
        transitions: {
          toB: () => 'b'
        }
      }
    }
    const fsm = new FSM(states, 'a')
    await fsm.transVia('toB')                     // is b
    expect(fsm.current).toEqual('b')
    await fsm.transVia('toC')                      // is c
    expect(fsm.current).toEqual('c')
    await fsm.transVia('toB')                     // is b
    expect(fsm.current).toEqual('b')
    await fsm.gotoState('a')                       // is a, same as fsm.current = 'a'
    expect(fsm.current).toEqual('a')
    await fsm.reset()                              // is a
    expect(fsm.current).toEqual('a')
    await fsm.transVia('toB')                     // is b
    await fsm.transVia('toA', true)                // call transition with an arg
    expect(fsm.current).toEqual('a')
  })
  it('FSM test: async function', async () => {
    let flag = true
    const states = {
      a: {
        events: {
          async onBegin() { return new Promise<void>((res) => {
            setTimeout(() => {
              flag = false
              res()
            }, 1000)
          }) },
          async onLeave(ev?: string, last?: string, next?: string) { await new Promise<void>(() => {}) }
        },
        transitions: {
          async toA(input: string) { return new Promise<string>(() => 'a') }
        }
      },
      b: {
        transitions: {
          toA: 'a'
        }
      }
    }

    const fsm = new FSM(states, 'b')
    const p = fsm.transVia('toA')       // return a promise<FSM>

    expect(fsm.current).toEqual('b')
    expect(fsm.isPending).toEqual(true)
    expect(flag).toEqual(true)
    await p

    expect(fsm.current).toEqual('a')
    expect(fsm.isPending).toEqual(false)
    expect(flag).toEqual(false)
  })

  it('FSM test: store', async () => {
    const states = {
      a: {
        store: {
          varA: 0
        },
        events: {
          async onLeave(ev?: string, last?: string, next?: string) { await new Promise<void>((res) => {
            states.a.store.varA ++
            res()
          }) }
        },
        transitions: {
          toA(input: string) {
            states.a.store.varA --
            return 'a'
          }
        }
      }
    }
    const fsm = new FSM(states, 'a')
    expect(states.a.store.varA).toEqual(0)
    await fsm.transVia('toA')
    expect(states.a.store.varA).toEqual(0)
    await fsm.gotoState('a')
    expect(states.a.store.varA).toEqual(1)
    fsm.reset()
    expect(states.a.store.varA).toEqual(1)
  })
})
