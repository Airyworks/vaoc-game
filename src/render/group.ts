import { ISprite } from 'src/sprite/sprite'
import * as PIXI from 'pixi.js'
type ZOrderType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type LayersType = {
  [k in ZOrderType]: PIXI.display.Layer
}

const orders: ZOrderType[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export class Group {
  public readonly stage: PIXI.Container
  protected layers: LayersType

  constructor(container: PIXI.Container) {
    this.stage = container
    const tempLayers: Partial<LayersType> = {}

    orders.forEach((k) => {
      const temp = new PIXI.display.Layer(new PIXI.display.Group(k, true))
      temp.group.enableSort = true
      container.addChild(temp)
      tempLayers[k] = temp
    })

    this.layers = tempLayers as LayersType
  }

  public setGroup(target: ISprite, zOrder: ZOrderType) {
    target.displayObject.object.parentGroup = this.layers[zOrder].group
  }
}
