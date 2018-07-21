import loader from '../util/loader'
import character from './rpgmaker/character'

export default new (class DbLoader {
  public async loadRPGMaker(basicPath: string): Promise<any> {
    const characterResourcce = await character.loadRPGMaker(basicPath)
    return await new Promise<any>((res) => {
      res(characterResourcce)
    })
  }
})()
