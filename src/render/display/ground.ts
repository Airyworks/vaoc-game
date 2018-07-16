import { IPosition, Grid as GridSprite } from '../../sprite'
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

type IShownChunk = Array<{
    direction: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'lefttop' | 'righttop' | 'leftbottom' | 'rightbottom',
    chunkId: number,
    leftTop: IPosition,
    leftBottom: IPosition,
    rightTop: IPosition,
    rightBottom: IPosition
}>

export class Ground {
  private static getShownGrid(): IShownChunk {
    const chunkPos = map.chunkPos
    const playerPos = player.position


    // load chunks in current chunk


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
