import { Player as PlayerSprite, Directions, IPosition } from 'src/sprite'

export class Player implements IPosition {
  public x: number = 0
  public y: number = 0

  public readonly sprite: PlayerSprite

  constructor(sprite: PlayerSprite) {
    this.sprite = sprite
  }

  public get position(): IPosition {
    return { x: this.x, y: this.y }
  }

  public get displayPosition(): IPosition {
    const x = this.sprite.displayObject.x
    const y = this.sprite.displayObject.y
    return {x, y}
  }

  public moveTo(pos: IPosition) {
    // find path
  }

  public move(direct: Directions) {
    
  }
}
