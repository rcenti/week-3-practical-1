import { TestResults, checkBackgroundIsCalledInDraw, checkCanvasSize, getShapes, simulateKeyboardEvent, LINE, TRIANGLE, RECT, CIRCLE, ELLIPSE, advanceToFrame, canvasStatus } from "../../lib/test-utils.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

function boundingBoxMovement(code, keyName, xChange, yChange, beforeShape) {
    // rects and ellipses
    simulateKeyboardEvent(keyPressed, keyName.length === 1 ? keyName : "", code);
    advanceToFrame(frameCount + 1);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    // Get shape
    const afterShapes = getShapes();
    if (afterShapes.length !== 1) {
        TestResults.addFail(`Expected one shape after pressing the ${keyName} key. Found ${afterShapes.length}. Did you forget to call background() in draw()?`);
    }
    else {
        // Check position
        const afterShape = afterShapes[0];
        if (afterShape.x === beforeShape.x + xChange && afterShape.y === beforeShape.y + yChange) {
            TestResults.addPass(`The shape moves as expected when the ${keyName} key is pressed.`);
        } else {
            TestResults.addFail(`Expected the shape to move ${xChange}, ${yChange} when the ${keyName} key is pressed. Your shape moved ${afterShape.x - beforeShape.x}, ${afterShape.y - beforeShape.y}.`);
        }
    }
}

function rectMovement(code, keyName, xChange, yChange, beforeShape) {
    const smallestX = 0;
    const biggestX = width - beforeShape.w;
    const smallestY = 0;
    const biggestY = height - beforeShape.h;
    if (beforeShape.x >= smallestX && beforeShape.x <= biggestX && beforeShape.y >= smallestY && beforeShape.y <= biggestY) {
        boundingBoxMovement(code, keyName, xChange, yChange, beforeShape);
    } else {
        TestResults.addWarning(`The ${beforeShape.type} is too close to the edge to check if pressing the ${keyName} works as expected.`);
    }
}

function ellipseMovement(code, keyName, xChange, yChange, beforeShape) {
    const smallestX = beforeShape.w / 2;
    const biggestX = width - beforeShape.w / 2;
    const smallestY = beforeShape.h / 2;
    const biggestY = height - beforeShape.h / 2;
    if (beforeShape.x >= smallestX && beforeShape.x <= biggestX && beforeShape.y >= smallestY && beforeShape.y <= biggestY) {
        boundingBoxMovement(code, keyName, xChange, yChange, beforeShape);
    } else {
        TestResults.addWarning(`The ${beforeShape.type} is too close to the edge to check if pressing the ${keyName} works as expected.`);
    }
}

function triangleMovement(code, keyName, xChange, yChange, beforeShape) {
    const smallestX = 0;
    const biggestX = width;
    const smallestY = 0;
    const biggestY = height;
    if (smallestX <= Math.min(beforeShape.x1, beforeShape.x2, beforeShape.x3) + xChange && biggestX >= Math.max(beforeShape.x1, beforeShape.x2, beforeShape.x3) + xChange
        && smallestY <= Math.min(beforeShape.y1, beforeShape.y2, beforeShape.y3) + yChange && biggestY >= Math.max(beforeShape.y1, beforeShape.y2, beforeShape.y3)) {
        // Move
        simulateKeyboardEvent(keyPressed, keyName.length === 1 ? keyName : "", code);
        advanceToFrame(frameCount + 1);
        // Get shape
        const afterShapes = getShapes();
        if (afterShapes.length !== 1) {
            TestResults.addFail(`Expected one shape after pressing the ${keyName} key. Found ${afterShapes.length}. Did you forget to call background() in draw()?`);
        }
        else if (afterShapes[0].type !== TRIANGLE) {
            TestResults.addFail(`When the ${keyName} key was pressed the triangle became a ${afterShapes[0].type}.`);
        }
        else {
            // Check position
            const afterShape = afterShapes[0];
            if (afterShape.x1 === beforeShape.x1 + xChange && afterShape.x2 === beforeShape.x2 + xChange && afterShape.x3 === beforeShape.x3 + xChange
                && afterShape.y1 === beforeShape.y1 + yChange && afterShape.y2 === beforeShape.y2 + yChange && afterShape.y3 === beforeShape.y3 + yChange) {
                TestResults.addPass(`The triangle moves as expected when the ${keyName} key is pressed.`);
            } else {
                TestResults.addFail(`Expected the triangle to move ${xChange}, ${yChange} when the ${keyName} key is pressed. Your shape moved by a different amount.`);
            }
        }
    } else {
        TestResults.addWarning(`The triangle is too close to the edge to check if pressing the ${keyName} works as expected.`);
    }
}

function lineMovement(code, keyName, xChange, yChange, beforeShape) {
    const smallestX = 0;
    const biggestX = width;
    const smallestY = 0;
    const biggestY = height;
    if (smallestX <= Math.min(beforeShape.x1, beforeShape.x2) + xChange && biggestX >= Math.max(beforeShape.x1, beforeShape.x2) + xChange
        && smallestY <= Math.min(beforeShape.y1, beforeShape.y2) + yChange && biggestY >= Math.max(beforeShape.y1, beforeShape.y2)) {
        // Move
        simulateKeyboardEvent(keyPressed, keyName.length === 1 ? keyName : "", code);
        advanceToFrame(frameCount + 1);
        for (const e of canvasStatus.errors) {
            TestResults.addFail(`In frame ${frameCount}, ${e}`);
        }
        // Get shape
        const afterShapes = getShapes();
        if (afterShapes.length !== 1) {
            TestResults.addFail(`Expected one shape after pressing the ${keyName} key. Found ${afterShapes.length}. Did you forget to call background() in draw()?`);
        }
        else if (afterShapes[0].type !== LINE) {
            TestResults.addFail(`When the ${keyName} key was pressed the line became a ${afterShapes[0].type}.`);
        }
        else {
            // Check position
            const afterShape = afterShapes[0];
            if (afterShape.x1 === beforeShape.x1 + xChange && afterShape.x2 === beforeShape.x2 + xChange
                && afterShape.y1 === beforeShape.y1 + yChange && afterShape.y2 === beforeShape.y2 + yChange) {
                TestResults.addPass(`The line moves as expected when the ${keyName} key is pressed.`);
            } else {
                TestResults.addFail(`Expected the line to move ${xChange}, ${yChange} when the ${keyName} key is pressed. Your shape moved by a different amount.`);
            }
        }
    } else {
        TestResults.addWarning(`The line is too close to the edge to check if pressing the ${keyName} works as expected.`);
    }
}

function checkMovement(code, keyName, xChange, yChange) {
    const beforeShapes = getShapes();
    if (beforeShapes.length !== 1) {
        TestResults.addFail(`Unable to check movement when the ${keyName} key is pressed because there are ${beforeShapes.length}. One shape was expected.`);
    } else {
        const beforeShape = beforeShapes[0];
        if (beforeShape.type === RECT || beforeShape.type === SQUARE) {
            rectMovement(code, keyName, xChange, yChange, beforeShape);
        }
        else if (beforeShape.type === ELLIPSE || beforeShape.type === CIRCLE) {
            ellipseMovement(code, keyName, xChange, yChange, beforeShape)
        }
        else if (beforeShape.type === TRIANGLE) {
            triangleMovement(code, keyName, xChange, yChange, beforeShape);
        }
        else if (beforeShape.type === LINE) {
            lineMovement(code, keyName, xChange, yChange, beforeShape);
        }
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(600, 600);
    checkBackgroundIsCalledInDraw();
    let lastShapes = getShapes();
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    if (lastShapes.length !== 1) {
        TestResults.addFail(`Expected 1 shape when the sketch first loads. Found ${lastShapes.length}.`);
    } else {
        try {
            checkMovement("w".charCodeAt(0), "w", 0, -5);
            checkMovement("s".charCodeAt(0), "s", 0, 5);
            checkMovement("a".charCodeAt(0), "a", -5, 0);
            checkMovement("d".charCodeAt(0), "d", 5, 0);
            checkMovement(UP_ARROW, "UP arrow", 0, -5);
            checkMovement(DOWN_ARROW, "DOWN arrow", 0, 5);
            checkMovement(LEFT_ARROW, "LEFT arrow", -5, 0);
            checkMovement(RIGHT_ARROW, "RIGHT arrow", 5, 0);
        } catch (e) {
            TestResults.addFail("Unable to test shape movement. Has keyPressed() been implemented?");
        }
        // check bounds
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
