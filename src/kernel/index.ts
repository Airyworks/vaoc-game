import * as compose from 'koa-compose'

type Middleware = compose.Middleware<any>

const logger = console

export const kernel = new class Kernel {
  public middlewares: { [key: string]: Middleware[] } = {}

  public on(ev: string, middleware: Middleware) {
    this.middlewares[ev] = this.middlewares[ev] || []
    this.middlewares[ev].push(middleware)
  }

  public off(ev: string, middleware: Middleware) {
    if (!this.middlewares[ev]) {
      logger.warn(`${ev} not found in midllewares`)
      return
    }

    const position = this.middlewares[ev].indexOf(middleware)
    if (position === -1) {
      logger.warn(`middleware did not register in middlewares`)
      return
    }

    this.middlewares[ev].splice(position, 1)
    if (this.middlewares[ev].length === 0) {
      delete this.middlewares[ev]
    }
  }

  public async emit<T>(ev: string, ctx: T, next: () => Promise<any>) {
    if (!this.middlewares[ev]) {
      return Promise.resolve()
    } else {
      return compose(this.middlewares[ev])(ctx, next)
    }
  }
}()
