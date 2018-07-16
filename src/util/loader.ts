import * as PIXI from 'pixi.js'

type PIXILoader = PIXI.loaders.Loader
type PIXIResource = PIXI.loaders.Resource

type LoaderCallBack = (
  ld: PIXILoader,
  rs: PIXIResource
) => any

export default new (class Loader {
  public async load(filename: string, cb?: LoaderCallBack): Promise<any>
  public async load(filename: string[], cb?: LoaderCallBack): Promise<any>
  public async load(filename: string, name: string, cb?: LoaderCallBack): Promise<any>
  public async load(filename: any, name?: any, cb?: LoaderCallBack): Promise<any> {

    if (Array.isArray(filename)) {

      cb = name
      if (!cb) {
        cb = (_: PIXILoader, rs: PIXIResource) => {
          const ret: any = {}
          for (const i in rs) {
            if (rs.hasOwnProperty(i)) {
              ret[i] = new PIXI.Sprite((rs as any)[i].texture)
            }
          }
          return ret
        }
      }
      return await new Promise<any>((res) => {
        PIXI.loader.add(filename).load((ld: PIXILoader, rs: PIXIResource) => {
          res((cb as LoaderCallBack)(ld, rs))
        })
      })

    } else if (typeof name === 'string') {

      if (!cb) {
        cb = (_: PIXILoader, rs: PIXIResource) => {
          return new PIXI.Sprite((rs as any)[name].texture)
        }
      }
      return await new Promise<any>((res) => {
        PIXI.loader.add(name, filename).load((ld: PIXILoader, rs: PIXIResource) => {
          res((cb as LoaderCallBack)(ld, rs))
        })
      })

    } else {

      cb = name
      if (!cb) {
        cb = (_: PIXILoader, rs: PIXIResource) => {
          return new PIXI.Sprite((rs as any)[filename].texture)
        }
      }
      return await new Promise<any>((res) => {
        PIXI.loader.add(filename).load((ld: PIXILoader, rs: PIXIResource) => {
          res((cb as LoaderCallBack)(ld, rs))
        })
      })

    }
  }

  public copyTexture(src: PIXI.Sprite): PIXI.Sprite {
    return new PIXI.Sprite(src.texture)
  }

  // public loadGesture(file: string): Promise<any> {

  // }
})()
