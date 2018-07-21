interface IRoute {
  [propName: string]: PIXI.Container
}

export class Router {
  private store: IRoute = {}
  private stage: PIXI.Container
  private history: string[] = []
  private curr = ''

  constructor(stage: PIXI.Container) {
    this.stage = stage
  }

  public register(name: string, container: PIXI.Container) {
    if (this.store[name]) {
      throw new Error(`container ${name} already exist`)
    } else {
      this.store[name] = container
      this.stage.addChild(container)
      container.renderable = false
    }
  }

  public push(name: string) {
    if (!this.store[name]) {
      throw new Error(`container ${name} not exist`)
    } else {
      if (this.history[this.history.length - 1]) {
        this.store[this.history[this.history.length - 1]].renderable = false
      }
      this.store[name].renderable = true
      this.history.push(name)
    }
  }
}

