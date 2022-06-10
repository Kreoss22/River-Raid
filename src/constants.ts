const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const boardSize = { width: 1024, height: 4151 };
const playerSize = { width: 28, height: 26 };
const bulletSize = { width: 4, height: 20 };
const canvasHeight = 700;
const pointCounter = document.getElementById("score");
const lifeCounter = document.getElementById("lives");
const fuelLevel = document.getElementById("marker");

export { canvas, ctx, boardSize, playerSize, bulletSize, canvasHeight, lifeCounter, pointCounter, fuelLevel};