import * as PIXI from 'pixi.js'

let app = new PIXI.Application(800, 600, {backgroundColor: 0x333})
const appContainer:any = document.getElementById('app')
appContainer.appendChild(app.view)
