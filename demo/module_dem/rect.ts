export class Rect{
    x:number
    y:number
    w:number
    h:number
    constructor(x:number, y:number, w:number, h:number){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    toString():string{
        return `Rect{x: ${this.x}, y: ${this.y}, width: ${this.w}, height: ${this.h}}`
    }
}

