export type KeyEventType = 'keydown' | 'keyup'

export const input = new class Input {
  public onElement(
    target: EventTarget,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ): void {
    target.addEventListener(event, handler, options)
  }

  public onceElement(
    target: EventTarget,
    event: string,
    handler: EventListener,
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

  public onKeyBoard(
    event: KeyEventType,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.onElement(document, event, handler, options)
  }

  public onceKeyBoard(
    event: KeyEventType,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.onceElement(document, event, handler, options)
  }
}()
