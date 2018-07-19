import { IPosition } from '../sprite'
import { Constant } from 'vaoc-map-generator'

export function warn(info: string) {
  console.warn(info)
}

export function log(info: string) {
  console.log(info)
}


export function intersectArr<T>(a: T[], b: T[]) {
  const setB = new Set<T>(b)
  return a.filter((x) => setB.has(x))
}

export function minusArr<T>(a: T[], b: T[]) {
  const setB = new Set<T>(b)
  return a.filter((x) => ! setB.has(x))
}

/**
 * translate absolute coordinate to relative coordinate
 * see src/component/player.ts
 * @export
 * @param {IPosition} absPos: absolute coordinate
 * @returns [IPosition, IPosition] relPos: relative coordinate
 * includes [chunk's Position in all chunks, position in current chunk]
 */
export function absPos2relPos(absPos: IPosition): [IPosition, IPosition] {
  const length = Constant.CHUNK_SIDE
  const chunkPos = {
    x: Math.floor( absPos.x / length ),
    y: Math.floor( absPos.y / length )
  }
  const relPos = {
    x: absPos.x - chunkPos.x * length,
    y: absPos.y - chunkPos.y * length
  }
  return [chunkPos, relPos]
}
