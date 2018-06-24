import * as PIXI from 'pixi.js'

import * as MapGenerator from 'vaoc-map-generator'

console.log(MapGenerator)

let app = new PIXI.Application(800, 600, {backgroundColor: 0x333})
const appContainer: HTMLDivElement = document.getElementById('app') as HTMLDivElement
appContainer.appendChild(app.view)
