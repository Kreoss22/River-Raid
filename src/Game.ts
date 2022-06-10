import { Player } from "./Player";
import { Controls, Level, Line, Rectangle, EnemySpawn } from "./interfaces";
import { Bullet } from "./Bullet";
import { boardSize, bulletSize, ctx, playerSize, canvasHeight, pointCounter, lifeCounter, fuelLevel } from "./constants";
import { Enemy } from "./Enemy";
import { getLevel } from "./levels";
import {createImages} from "./images"

class Game{
    player: Player;
    controls: Controls;
    bullets: Bullet[] = [];
    enemies: Enemy[] = [];
    level: Level;
    scrollSpeed: number = 0.02;//0.15;
    distanceTraveled : number = 0;
    showHitboxes: boolean = false;
    bridgeDrawn = 1;
    images : HTMLImageElement[];
    enemyValues: number[] = [80, 30, 30, 60, 60, 100, 100, 500];
    points: number = 0;
    fuel: number = 29800;
    lives: number = 4;
    done: boolean = false;
    interval: NodeJS.Timer;


    constructor(controls: Controls) {
        this.player = new Player();
        this.controls = controls;
        this.level = getLevel(0);
        this.movement();
        this.images = createImages();
        this.play(false);
        console.log();
    }

    movement() {
        document.body.addEventListener("keydown", (e) => {
            for (const [action, key] of Object.entries(this.controls)) {
                if (e.key === key && action !== "shoot" && action !== "hitboxes") {
                    if((action === "left" || action === "right")){
                        this.player.move(action, key);
                    }
                    else{
                        if(action === "up"){
                            this.scrollSpeed = 0.3;
                        }
                        else{
                            this.scrollSpeed = 0.075;
                        }
                    }
                }
            }
        });
        document.body.addEventListener("keyup", (e) => {
            if (this.controls.shoot === e.key)
                this.bullets.push(this.player.shoot());
            else if(this.controls.up === e.key){
                this.scrollSpeed = this.scrollSpeed / 2;
            }
            else if(this.controls.up === e.key){
                this.scrollSpeed = this.scrollSpeed *2;
            }
            else if (this.controls.hitboxes === e.key)
                this.showHitboxes = !this.showHitboxes;
        });
    }

    public play(a: boolean) {
        if(a){
            this.player = new Player();
            this.enemies = [];
            this.distanceTraveled = boardSize.height * (this.bridgeDrawn-1);
            this.level = getLevel((this.bridgeDrawn-1)%2);
        }
        this.interval = setInterval(() => {
            if(this.distanceTraveled > boardSize.height * this.bridgeDrawn){
                this.bridgeDrawn += 1;
                this.level = getLevel((this.bridgeDrawn-1)%2);
                for (const enemySpawn of this.level.enemySpawns) {
                    enemySpawn.spawnDistance -= boardSize.height * (this.bridgeDrawn-1);
                }
            }
            this.distanceTraveled += 10*this.scrollSpeed;
            this.entityRemover();
            this.bulletCollisionChecker();
            this.playerCollisionChecker();
            this.enemySpawner();
            this.draw();
            this.fuel-=2;
            fuelLevel.style.left = (this.fuel/100) + "px";
        }, 10);
    }

    draw() {
        //background
        ctx.drawImage(this.images[(this.bridgeDrawn-1)%2], 0, this.distanceTraveled - (boardSize.height - canvasHeight) - (boardSize.height*(this.bridgeDrawn-1)));
        if(this.distanceTraveled > (boardSize.height * this.bridgeDrawn) - canvasHeight){
            ctx.drawImage(this.images[(this.bridgeDrawn%2)], 0, this.distanceTraveled - (((this.bridgeDrawn+1)*boardSize.height) - canvasHeight));
        }
        //lines
        if (this.showHitboxes === true) {
            ctx.strokeStyle = "lightBlue";
            ctx.lineWidth = 3;
            for (const line of this.getCurrentLines()) {
                ctx.beginPath();
                ctx.moveTo(line.start.x, line.start.y + this.distanceTraveled - (boardSize.height*(this.bridgeDrawn-1)));
                ctx.lineTo(line.end.x, line.end.y  + this.distanceTraveled - (boardSize.height*(this.bridgeDrawn-1)));
                ctx.stroke();
            }
        }
        //bullets
        for (const bullet of this.bullets)
            ctx.drawImage(this.images[5], bullet.position.x, bullet.position.y);
        //enemies
        for (const enemy of this.enemies){
            ctx.drawImage(this.images[enemy.imgNum], enemy.position.x, enemy.position.y + this.distanceTraveled);
        }
        //player
        ctx.drawImage(this.images[this.player.graphicPath], this.player.position.x, this.player.position.y);
    }

    entityRemover() {
        this.bullets = this.bullets.filter(bullet => bullet.done === false);
        this.enemies = this.enemies.filter(enemy => enemy.done === false);
    }

    playerCollisionChecker() {
        for (const enemy of this.enemies) {
            if (this.rectanglesCollision({ topLeft: this.player.position, size: playerSize },
                { topLeft: {x: enemy.position.x, y: enemy.position.y + this.distanceTraveled}, size: enemy.size })) {
                if(enemy.type === "fuel"){
                    if(this.fuel<= 29800){
                        this.fuel+=25;
                    }
                    else{
                        this.fuel = 29800;
                    }
                }
                else{
                    if(!enemy.dead){
                        this.playerDeath()
                    }
                }
            }
        }
        for (const line of this.getCurrentLines()) {
            if (this.rectangleLineCollision({ topLeft: this.player.position, size: playerSize },
                this.getCurrentLinePosition(line))) {
                this.playerDeath()
            }
        }
    }

    bulletCollisionChecker() {
        for (const bullet of this.bullets) {
            for (const enemy of this.enemies) {
                if (this.rectanglesCollision({ topLeft: bullet.position, size: bulletSize },
                    { topLeft: {x: enemy.position.x, y: enemy.position.y + this.distanceTraveled}, size: enemy.size })) {
                    if(!enemy.dead) {
                        bullet.remove();
                        enemy.kill();
                        this.points += this.enemyValues[enemy.imgNum - 6];
                        pointCounter.innerText = "Points: " + this.points;
                    }
                }
            }
            for (const line of this.getCurrentLines()) {
                if (this.rectangleLineCollision({ topLeft: bullet.position, size: bulletSize },
                    this.getCurrentLinePosition(line))) {
                    bullet.remove();
                }
            }
        }
    }

    rectanglesCollision(rect1: Rectangle, rect2: Rectangle): boolean {
        if (rect1.topLeft.x + rect1.size.width > rect2.topLeft.x &&
            rect1.topLeft.x < rect2.topLeft.x + rect2.size.width &&
            rect1.topLeft.y < rect2.topLeft.y + rect2.size.height &&
            rect1.topLeft.y > rect2.topLeft.y) {
            return true;
        }
        return false;
    }

    rectangleLineCollision(rect: Rectangle, line: Line): boolean {
        let rectSides: Line[] = [
            //top
            {
                start: { x: rect.topLeft.x, y: rect.topLeft.y },
                end: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y }
            },
            //right
            {
                start: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y },
                end: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y + rect.size.height }
            },
            //bottom
            {
                start: { x: rect.topLeft.x, y: rect.topLeft.y + rect.size.height },
                end: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y + rect.size.height }
            },
            //left
            {
                start: { x: rect.topLeft.x, y: rect.topLeft.y },
                end: { x: rect.topLeft.x, y: rect.topLeft.y + rect.size.height }
            }
        ];
        for (const side of rectSides) {
            if (this.linesCollision(line, side))
                return true;
        }
        return false;
    }

    linesCollision(line1: Line, line2: Line): boolean {
        let x1 = line1.start.x;
        let y1 = line1.start.y;
        let x2 = line1.end.x;
        let y2 = line1.end.y;
        let x3 = line2.start.x;
        let y3 = line2.start.y;
        let x4 = line2.end.x;
        let y4 = line2.end.y;

        let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1)
            return true;
        return false
    }

    spawnEnemy(enemySpawn : EnemySpawn) {
        let newEnemy = new Enemy(enemySpawn);
        this.enemies.push(newEnemy);
    }

    enemySpawner() {
        for (const enemySpawn of this.level.enemySpawns) {
            if ((-1 * this.distanceTraveled) - 100 <= enemySpawn.spawnDistance ){
                this.spawnEnemy(enemySpawn);
                enemySpawn.enemyType = "";
            }
        }
        this.level.enemySpawns = this.level.enemySpawns.filter(spawn => spawn.enemyType !== "");
    }

    getCurrentLines(): Line[] {
        return this.level.lines.filter(line =>
            (line.start.y - canvasHeight < (-1 * this.distanceTraveled) + (boardSize.height*(this.bridgeDrawn-1))) ||
            (line.end.y - canvasHeight < (-1 * this.distanceTraveled) + (boardSize.height*(this.bridgeDrawn-1))));
    }

    getCurrentLinePosition(line: Line): Line {
        return {
            start: { x: line.start.x , y: line.start.y + this.distanceTraveled - (boardSize.height*(this.bridgeDrawn-1))},
            end: { x: line.end.x, y: line.end.y + this.distanceTraveled - (boardSize.height*(this.bridgeDrawn-1))}
        };
    }

    playerDeath(){
        console.log("Death")
        clearInterval(this.interval);
        this.player.graphicPath = 14;
        this.lives--;
        lifeCounter.innerText = "Lives: " + this.lives;
        this.draw();
        if(this.lives <= 0){
            this.done = true;
        }
        else{
            setTimeout(() => {
                this.play(true);
            }, 1000);
        }

    }
}

export default Game