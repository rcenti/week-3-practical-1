let x = 50;
let y = 50;
let w = 300;
let h = 200;
let fillColour;
shapeSelected = true;

function setup() {
    createCanvas(600, 600);
    fillColour = color(random(255), random(255), random(255));
}

function draw() {
    background(0);
    rectMode(CENTER);
    rect(x, y, w, h);
}

function mousePressed() {
    if (mouseX > x - 150 && mouseX < x + 150 && mouseY > y - 150 && mouseY < y + 150) {
        shapeSelected = true;
    }
}
function mouseDragged() {
    fill(fillColour);
    if (shapeSelected === true) {
        x = mouseX;
        y = mouseY;

        }
    
}

function mouseReleased() {
    fillColour = color(random(255), random(255), random(255));
    fill(255);
    shapeSelected = false;
    
}