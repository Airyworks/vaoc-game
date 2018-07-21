import { Grid as GridSprite, IPosition } from '../sprite'
import { minusArr } from '../util'
import * as PIXI from 'pixi.js'

import { Constant, world, Chunk } from 'vaoc-map-generator'
import { kernel } from '../kernel'

export const map = new class Map {
  public container: PIXI.Container = new PIXI.Container()
  public textures: { [key: string]: PIXI.Texture } = {}
  public world = world
  public hashes: string[] = []
  public chunkIdStore: number[] = []

  // tslint:disable-next-line
  protected _chunkId: number = 0
  public get chunkId(): number {
    return this._chunkId
  }

  public set chunkId(value: number) {
    if (value !== this._chunkId) {
      this._chunkId = value
      const chunk = this.world.chunks[value]
      this._chunkPos = chunk
      this._updateChunk()
    }
  }

  // chunkPos is chunk's Position in map, not player's position in chunk
  // tslint:disable-next-line
  protected _chunkPos: IPosition = { x: 0, y: 0 }
  public get chunkPos(): IPosition {
    return this._chunkPos
  }

  public set chunkPos(value: IPosition) {
    if (
      value.x !== this._chunkPos.x ||
      value.y !== this._chunkPos.y
    ) {
      this._chunkPos = value
      this._chunkId = this.world.position[value.x][value.y].id
      this._updateChunk()
    }
  }

  constructor() {
    this._register()
  }

  public init(initHash: string[]) {
    this.hashes = initHash
    this.world.loadBlockHash(initHash)
    this.world.generateChunks()
  }

  public addChunk(hash: string) {
    this.world.addChunk(hash)
    this._updateChunk()
  }

  // find which chunks should be loaded
  protected _resolveChunkId(): number[] {
    const chunkIdStore: number[] = []
    const center = this.chunkPos
    const chunks: IPosition[] = [
      center,
      { x: center.x - 1, y: center.y },
      { x: center.x + 1, y: center.y },
      { x: center.x, y: center.y + 1 },
      { x: center.x, y: center.y - 1 },
      { x: center.x - 1, y: center.y + 1 },
      { x: center.x - 1, y: center.y - 1 },
      { x: center.x + 1, y: center.y + 1 },
      { x: center.x + 1, y: center.y - 1 }
    ]
    chunks.forEach((v) => {
      if (this.world.position[v.x][v.y]) {
        chunkIdStore.push(this.world.position[v.x][v.y].id)
      }
    })
    return chunkIdStore
  }

  protected _updateChunk() {
    const newChunkStore = this._resolveChunkId()
    const releaseChunks = minusArr(this.chunkIdStore, newChunkStore)
    const loadChunks = minusArr(newChunkStore, this.chunkIdStore)
    releaseChunks.forEach((id) => {
      this.world.chunks[id].releaseGrids()
    })
    loadChunks.forEach((id) => {
      this.world.chunks[id].loadGrids()
    })
  }

  protected _register() {
    kernel.on('onMove', async (ctx: IPosition, next) => {
      if (ctx.x !== this._chunkPos.x ||
          ctx.y !== this._chunkPos.y) {
          kernel.emit('onChunkChange', { oldPos: this._chunkPos, newPos: ctx })
        }
      await next()
    })
    kernel.on('onChunkChange', async (ctx: {oldPos: IPosition, newPos: IPosition}, next) => {
      this.chunkPos = ctx.newPos
    })
  }

}()
