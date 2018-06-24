import * as PIXI from 'pixi.js'

import * as MapGenerator from 'vaoc-map-generator'

console.log(MapGenerator)

let app = new PIXI.Application(800, 600, {backgroundColor: 0x333})
const appContainer: any = document.getElementById('app')
appContainer.appendChild(app.view)
