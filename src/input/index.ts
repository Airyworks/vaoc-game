import { kernel } from '../kernel'

export type KeyEventType = 'keydown' | 'keyup'

export const input = new class Input {
  public onElement<T extends EventListener>(
    target: EventTarget,
    event: string,
    handler: T,
    options?: boolean | AddEventListenerOptions
  ): void {
    target.addEventListener(event, handler, options)
  }

  public onceElement<T extends EventListener>(
    target: EventTarget,
    event: string,
    handler: T,
    options?: boolean | AddEventListenerOptions
  ): void {
    if (typeof options === 'boolean') {
      target.addEventListener(event, handler, Object.assign({}, { once: true, useCapture: options }))
    } else {
      target.addEventListener(event, handler, Object.assign({}, options, {once: true}))
    }
  }

  public onSprite(
    target: PIXI.DisplayObject,
    event: PIXI.interaction.InteractionEventTypes,
    handler: (ev: PIXI.interaction.InteractionEvent) => void
  ): void {
    target.on(event, handler)
  }

  public onceSprite(
    target: PIXI.DisplayObject,
    event: PIXI.interaction.InteractionEventTypes,
    handler: (ev: PIXI.interaction.InteractionEvent) => void
  ): void {
    target.once(event, handler)
  }

  public onKeyBoard<T extends EventListener>(
    event: KeyEventType,
    handler: T,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.onElement(document, event, handler, options)
  }

  public onceKeyBoard<T extends EventListener>(
    event: KeyEventType,
    handler: T,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.onceElement(document, event, handler, options)
  }
}()
