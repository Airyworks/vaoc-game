import { IPosition, Grid as GridSprite, Directions } from '../../sprite'
import { player, map } from '../../component'

import { Constant } from 'vaoc-map-generator'
const CHUNK_SIDE = Constant.CHUNK_SIDE

import * as Config from '../../config'

// 单边长是 (stage - reserve)/2, 但是保证渲染连续性设置为 (stage - reserve)/2 + 2
// see vaoc-render-model.png
const MAX_WIDTH_GRID =
  ( Config.STAGE_WIDTH - Config.RESERVE_WIDTH ) / 2 / Config.GRID_WIDTH + 2
const MAX_HEIGHT_GRID =
  ( Config.STAGE_HEIGHT - Config.RESERVE_HEIGHT ) / 2 / Config.GRID_HEIGHT + 2

interface IChunkScope {
  leftTop: IPosition,
  leftBottom: IPosition,
  rightTop: IPosition,
  rightBottom: IPosition
}

type DIRECTIONS = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'lefttop' | 'righttop' | 'leftbottom' | 'rightbottom'

type ShownChunk = Array<{
    direction: DIRECTIONS,
    chunkId: number
} & IChunkScope>

export class Ground {
  private static getShownGrid(): ShownChunk {
    const ret: ShownChunk = []
    const chunkPos = map.chunkPos
    const playerPos = player.position

    const leftTop: IPosition = { x: playerPos.x, y: playerPos.y}

    function findChunkId(pos: IPosition): number {
      return map.world.position[pos.x][pos.y].id
    }

    // function getLoadedGrids(direction: DIRECTIONS): IChunkScope {
    //   if (direction === 'center') {

    //   } else
    //   if (direction === 'left') {

    //   } else
    //   if (direction === 'right') {

    //   } else
    //   if (direction === 'top') {

    //   } else
    //   if (direction === 'bottom') {

    //   } else
    //   if (direction === 'lefttop') {

    //   } else
    //   if (direction === 'righttop') {

    //   } else
    //   if (direction === 'leftbottom') {

    //   } else
    //   if (direction === 'rightbottom') {

    //   }
    // }

    // // load chunks in current chunk
    // ret.push({
    //   direction: 'center',
    //   chunkId: findChunkId(chunkPos),
    //   leftTop: 
    // })

    if (playerPos.x < MAX_WIDTH_GRID) {
      // load grids in west chunk
    } else if (playerPos.x > Constant.CHUNK_SIDE - MAX_WIDTH_GRID) {
      // load grids in east chunk
    }
    if (playerPos.y < MAX_HEIGHT_GRID) {
      // load girds in north chunk
    } else if (playerPos.y > Constant.CHUNK_SIDE - MAX_HEIGHT_GRID) {
      // load grids in south chunk
    }
    if (playerPos.y < MAX_HEIGHT_GRID &&
        playerPos.x < MAX_WIDTH_GRID) {
      // load grids in northwest chunk
    } else
    if (playerPos.y < MAX_HEIGHT_GRID &&
        playerPos.x > Constant.CHUNK_SIDE -  MAX_WIDTH_GRID) {
      // load grids in northeast
    } else
    if (playerPos.y > Constant.CHUNK_SIDE - MAX_HEIGHT_GRID &&
        playerPos.x < MAX_WIDTH_GRID) {
      // load grids in southwest
    } else
    if (playerPos.y > Constant.CHUNK_SIDE - MAX_HEIGHT_GRID &&
        playerPos.x > Constant.CHUNK_SIDE - MAX_WIDTH_GRID) {
      // load grids in southeast
    }
    return []
  }

}
