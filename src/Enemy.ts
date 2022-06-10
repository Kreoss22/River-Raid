
import {Coords, EnemySpawn} from "./interfaces"

class Enemy {
    position: Coords;
    startX: number;
    endX: number;
    //ai: EnemyMovement[];
    done: boolean = false;
    interval: NodeJS.Timer;
    type: string;
    moving: boolean;
    size: {width: number, height: number};
    side: string;
    imgNum : number;
    dead: boolean = false;
    shooting : boolean = false;



    constructor( enemySpawn : EnemySpawn) {
        this.position = { x: enemySpawn.startX, y: enemySpawn.spawnDistance };
        this.type = enemySpawn.enemyType;
        this.moving = enemySpawn.moving;
        this.size = enemySpawn.size;
        this.side = enemySpawn.side;
        this.imgNum = enemySpawn.imgNum;
        if(enemySpawn.moving){
            this.startX = enemySpawn.startX;
            this.endX = enemySpawn.moveX;
            this.newMove();
        }
    }

    newMove() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if(this.position.x === this.endX){
                if(this.type !== "jet"){
                    if(this.side === "Right"){
                        this.side = "Left";
                        this.imgNum--;
                    }
                    else {
                        this.side = "Right"
                        this.imgNum++;
                    }
                    let temp : number = this.startX;
                    this.startX = this.endX;
                    this.endX = temp;
                }
                else{
                    this.position.x = this.startX;
                }
            }
            let dir = this.endX - this.startX;
            if(dir< 0){
                this.position.x -= 1;
            }else {
                this.position.x += 1;
            }
        }, 2)
    }

    kill() {
        clearInterval(this.interval);
        this.dead = true;
        this.imgNum = 14;
        setTimeout(() => {this.done = true;}, 1000)

    }
}

export { Enemy }