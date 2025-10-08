let fillColour;
let x = 50;
let y = 50;

function setup() {

    createCanvas(600, 600);
    fillColour = color(random(255), random(255), random(255));
}

function draw() {
background(220);
    fill(fillColour);
    rect(x, y, 500, 500);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        y -= 5;
    } 
    if (keyCode === DOWN_ARROW) {
        y += 5;
    }
    if (keyCode === LEFT_ARROW) {
        x -= 5;
    }
    if (keyCode === RIGHT_ARROW) {
        x += 5;
    }

    if (key === 'w' || key === 'W') {
        y -= 5;
    } 
    if (key === 's' || key === 'S') {
        y += 5;
    }
    if (key === 'a' || key === 'A') {
        x -= 5;
    }
    if (key === 'd' || key === 'D') {
        x += 5;
    }


}

function mouseClicked() {
    if (mouseX > x && mouseX < x + 500 && mouseY > y && mouseY < y + 500) {
        fillColour = color(random(255), random(255), random(255));
    }
}