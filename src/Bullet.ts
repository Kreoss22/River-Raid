import { boardSize, bulletSize } from "./constants";
import { Coords } from "./interfaces"

class Bullet {
    position: Coords;
    speed: number = 4;
    speedDelay: number = 1;
    interval: NodeJS.Timer;
    done: boolean = false;

    constructor(position: Coords) {
        this.position = position;
        this.fly();
    }

    fly() {
        this.interval = setInterval(() => {
            this.position.y -= this.speed;
            if (this.position.y < 0) {
                this.remove();
            }
        }, this.speedDelay);
    }

    remove() {
        clearInterval(this.interval);
        this.done = true;
    }
}

export { Bullet }