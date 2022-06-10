import {Coords} from "./interfaces"

class EnemyBullet{
    position : Coords;
    direction : string;
    speed: number = 4;
    speedDelay: number = 1;
    interval: NodeJS.Timer;
    done: boolean = false;

    constructor(position: Coords, direction: string) {
        this.position = position;
        this.direction = direction;
    }

    fly() {
        if(this.direction === "left"){
            this.interval = setInterval(() => {
                if(this.direction)
                    this.position.x -= this.speed;
            }, this.speedDelay);
        }
        else{
            this.interval = setInterval(() => {
                if(this.direction)
                    this.position.x += this.speed;
            }, this.speedDelay);
        }
    }

    remove() {
        clearInterval(this.interval);
        this.done = true;
    }
}

export { EnemyBullet }