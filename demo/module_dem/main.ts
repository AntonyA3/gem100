import {Rect} from "./rect"

function init():void{
    var rect: Rect = new Rect(0,10,100,100)
    console.log("this rect is")
    console.log(rect.toString())
}

window.onload = () => init()