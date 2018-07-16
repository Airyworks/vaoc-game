import { IPosition } from '../../sprite'

export const camera = new class Camera {

  // position of center of stage in current chunk
  // tslint:disable-next-line
  private _center: IPosition = { x: 32, y: 32 }

  // tslint:disable-next-line
  private _scale: number = 1.0

  public get center() { return this._center }
  public set center(pos: IPosition) { this.moveTo(pos) }

  public get scale() { return this._scale }
  public set scale(sc: number) { this.zoom(sc) }

  public moveTo(pos: IPosition) {}

  public zoom(scale: number) {
    if (scale !== this._scale) {
      // TODO: change camera zoom
    }
  }
}()
