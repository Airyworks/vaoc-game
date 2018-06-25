import { Game } from './game'
import * as MapGenerator from 'vaoc-map-generator'
import 'pixi-layers'

const appContainer: HTMLDivElement = document.getElementById('app') as HTMLDivElement
const game = new Game(appContainer, 800, 600, {backgroundColor: 0x333})
game.start()
