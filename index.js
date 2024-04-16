const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require('./lib/shapes');
// Imports graceful-fs, inquirer, Circle, Square, Triangle modules
// Svg class defined

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

// Using inquirer to define array of questions for the user
// Each individual question is an object
const questions = [
    {
        type: "input",
        name: "text",
        message: "Text: Enter up to (3) Characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Text Color: Enter a color keyword:",
    },
    {
        type: "input",
        name: "shape",
        message: "Shape Color: Enter a color keyword:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which Image you would like?",
        choices: ["circle", "Square", "Triangle"],
    },
];
// Following function writes the data to a file
