function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    background(0);
    stroke(255);
    noFill();
    drawFractal(width / 2, height / 2, 300);
}

function drawFractal(x, y, radius) {
    ellipse(x, y, radius, radius);
    if (radius > 8) {
        let offset = random(10);
        drawFractal(x + radius / 2, y, radius / 2 - offset);
        drawFractal(x - radius / 2, y, radius / 2 + offset);
    }
}
