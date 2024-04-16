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
function writeToFile(fileName, data) {
    console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congrats, you have generated a logo.svg!");
    });
}
async function init() {
    console.log("Starting init");
    var svgString = "";
    var svg_file = "logo.svg";
// User promt for answers
const answers = await inquirer.createPromptModule(questions);
    // user text
    var user_text = "";
    if (answers.text.length > 0 && answers.text.length < 4) {
        // 1-3, valid 
        user_text = answers.text;
    } else {
        // 0 or 4+, invalid
        console.log("Invalid user text detected! Please enter 1-3 chars, no more or less");
        return;
    }
    console.log("User text: [" + user_text + "]");
	user_font_color = answers["text-color"];
	console.log("User font color: [" + user_font_color + "]");
	user_shape_color = answers.shape;
	console.log("User shape color: [" + user_shape_color + "]");
	user_shape_type = answers["pixel-image"];
	console.log("User entered shape = [" + user_shape_type + "]");

    let user_shape;
    if (user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square();
        console.log("You selected the Square shape!");
    }
    else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle();
        console.log("You selected the Circle shape!");
    }
    else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Triangle();
        console.log("You selected the Triangle shape!");
    }
    else {
        console.log("Invalid shape!");
    }
    user_shape.setColor(user_shape_color);

    // Creates new Svg instance and adds shape and text elements
    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();

    // Prints shape to the console
    console.log("displaying shape:\n\n" + svgString);
    //document.getElementById("svg_image").innerHTML = svgString;
    console.log("Shape is complete!");
    console.log("Writing shape to file...");
    writeToFile(svg_file, svgString);
}
init()