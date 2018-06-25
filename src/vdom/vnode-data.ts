import * as PIXI from 'pixi.js'

export class VNodeData {
  public key?: string | number
  public el?: PIXI.DisplayObject
  public attrs?: { [key: string]: any }
  public hook?: { [key: string]: Function }
  public on?: { [key: string]: Function | Function[] }
  public show?: boolean
  public keepAlive?: boolean

  constructor(
    key?: string | number,
    el?: PIXI.DisplayObject,
    attrs?: { [key: string]: any },
    hook?: { [key: string]: Function },
    on?: { [key: string]: Function | Function[] },
    show?: boolean,
    keepAlive?: boolean
  ) {
    this.key = key
    this.el = el
    this.attrs = attrs
    this.hook = hook
    this.on = on
    this.show = show
    this.keepAlive = keepAlive
  }
}
