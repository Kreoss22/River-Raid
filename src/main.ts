import Game from "./Game";

let controls = {
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    shoot: 'z',
    hitboxes: 'h'
}

let game = new Game(controls);
let interval: NodeJS.Timer = setInterval(()=>{
    if(game.done){
        document.getElementById("canv").innerHTML = "";
    }
}, 10);