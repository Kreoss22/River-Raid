interface Coords {
    x: number,
    y: number
}
interface Controls {
    up: string,
    right: string,
    down: string,
    left: string,
    shoot: string,
    hitboxes: string
}
interface EnemyMovement {
    direction: Coords;
    distance: number;
    speed: number;
    speedDelay: number;
}
interface Line {
    start: Coords;
    end: Coords;
}
interface EnemySpawn {
    spawnDistance: number;
    startX: number;
    enemyType: string;
    moving: boolean;
    size: {width: number, height: number}
    side: string;
    moveX?: number;
    imgNum: number;
}
interface Level {
    lines: Line[];
    enemySpawns: EnemySpawn[];
}
interface Size {
    width: number,
    height: number
}
interface Rectangle {
    topLeft: Coords,
    size: Size
}

export { Coords, Controls, EnemyMovement, Line, EnemySpawn, Level, Rectangle };