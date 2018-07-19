import { Game } from './game'
import 'pixi-layers'
import { STAGE_WIDTH, STAGE_HEIGHT } from './config'

const appContainer: HTMLDivElement = document.getElementById('app') as HTMLDivElement
const game = new Game(appContainer, STAGE_WIDTH, STAGE_HEIGHT, {backgroundColor: 0x333})
game.start()
