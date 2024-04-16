class Shape {
// Defines Shape class with constructor 'color'  and sets 'color' value.
    
    constructor(){
        this.color=''
    }
    setColor(color){
        this.color=(color);
    }
}
// Defines class Circle that extends Shape and renders SVG Circle
class Circle extends Shape{
    render(){
        return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}">`
    }
}
// Defines class Square that extends Shape and renders SVG Square
class Square extends Shape{
    render(){
        return `<rect x="50" height="200" width="200" fill="${this.color}">`
    }
}
// Defines class Triangle(polygon) that extends Shape and renders SVG Triangle(polygon).
class Triangle extends Shape{
    render(){
         //return `<polygon height="100%" width="100%" points="25,75 75,25 25,25" fill="${this.color}">'
         return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}">`
    }
};
module.exports = {Circle, Square, Triangle}