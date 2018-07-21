import * as PIXI from 'pixi.js'
import urljoin from 'url-join'
import axios from 'axios'
import loader from '../../util/loader'

export default new (class RpgMakerCharacterLoader {
  public async loadRPGMaker(basicPath: string): Promise<any> {
    const characterFile = 'data/Actors.json'
    const characterFolder = urljoin(basicPath, 'img/characters')

    const rawContent = (await axios.get(urljoin(basicPath, characterFile))).data
    // remove rpg maker null item
    const content = rawContent.filter((i: any) => i != null)

    const characterImages: string[] = []
    content.forEach((element: any) => {
      const imgUrl = urljoin(characterFolder, element.characterName)
      element.realUrl = imgUrl
      if (element.characterName && characterImages.indexOf(imgUrl) < 0) {
        characterImages.push(imgUrl)
      }
    })
    const sprites = await loader.load(characterImages)

    console.log(content[0], sprites)
    console.log(this.makeFSM(content[0].nickname, content[0].realUrl, content[0].characterIndex))
    return await new Promise<any>((res) => {
      res(true)
    })
  }

  private makeFSM(nickname: string, realUrl: string, characterIndex: number): any {
    // console.log(this.store)
  }
})()
