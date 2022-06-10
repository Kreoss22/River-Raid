import { Level } from "./interfaces";

let levels = [
    {
        leftSide: [
            [446, 700],
            [446, 574],
            [271, 507],
            [247,445],
            [271,420],
            [253, 400],
            [253, 307],
            [280, 280],
            [264,265],
            [314,215],
            [278, 130],
            [305,100],
            [285, 83],
            [282, -10],
            [313, -45],
            [325, -180],
            [313, -190],
            [313, -215],
            [345, -250],
            [370, -300],
            [350, -320],
            [350, -360],
            [375, -390],
            [345, -460],
            [365, -558],
            [340, -590],
            [400, -667],
            [350, -728],
            [393, -762],
            [350, -793],
            [364, -877],
            [351, -900],
            [351, -1000],
            [373, -1023],
            [355, -1110],
            [370, -1270],
            [355, -1285],
            [355, -1358],
            [280, -1430],
            [303, -1515],
            [280, -1545],
            [330, -1600],
            [282, -1635],
            [310, -1663],
            [245, -1815],
            [260, -1830],
            [255, -1880],
            [180, -1953],
            [275, -2032],
            [255, -2057],
            [255, -2145],
            [292, -2177],
            [255, -2200],
            [245, -2277],
            [337, -2352],
            [320, -2380],
            [320, -2450],
            [310, -2460],
            [345, -2493],
            [360, -2530],
            [360, -2556],
            [345, -2585],
            [368, -2610],
            [350, -2630],
            [350, -2750],
            [399, -2798],
            [343, -2861],
            [383, -2898],
            [343, -2926],
            [374, -2963],
            [345, -3050],
            [368, -3075],
            [350, -3100],
            [350, -3190],
            [243, -3255],
            [278, -3285],
            [271, -3313],
            [446, -3378],
            [446, -3516],
        ],
        rightSide: [
            [578, 700],
            [578, 574],
            [762, 505],
            [788, 445],
            [827, 422],
            [805, 399],
            [805, 310],
            [867, 212],
            [834, 130],
            [860, 105],
            [834, 80],
            [834, -8],
            [868, -40],
            [855, -57],
            [870, -160],
            [870, -228],
            []

        ],
        objects: [
            [[0,0]]
        ]
    },
    {
        leftSide: [
            [446, 700],
            [446, 574],
            [115, 447],
            [158, 410],
            [115, 383],
            [140, 352],
            [118, 305],
            [287, 240],
            [287, 109],
            [130, 48],
            [130, -225],
            [148, -248],
            [125, -320],
            [125, -483],
            [167, -562],
            [153, -577],
            [153, -670],
            []
        ],
        rightSide: [
            [578, 700],
            [578, 574],
        ],
        objects: [
            [[0,0]]
        ]
    }
]

function getLevel(lvlNumber: number) {
    let level: Level;
    if (lvlNumber === 0) {
        level = {
            lines: [],
            enemySpawns: [
                { spawnDistance: -400, startX: 480 , enemyType: "ship", moving: false, size: {width: 62, height: 16}, side: "Right", imgNum: 8},
                { spawnDistance: -400, startX: 580 , enemyType: "ship", moving: false, size: {width: 62, height: 16} , side: "Right", imgNum: 8},
                { spawnDistance: -300, startX: 600 , enemyType: "ship", moving: false, size: {width: 62, height: 16} , side: "Left", imgNum: 7},
                { spawnDistance: -200, startX: 400 , enemyType: "fuel", moving: false, size: {width: 28, height: 48} , side: "Left", imgNum: 6},
                { spawnDistance: -100, startX: 600 , enemyType: "ship", moving: true, size: {width: 62, height: 16}, side: "Left", moveX: 400, imgNum: 7},
                { spawnDistance: -500, startX: 590 , enemyType: "fuel", moving: false, size: {width: 28, height: 48} , side: "Left", imgNum: 6},
                { spawnDistance: 100, startX: -32 , enemyType: "jet", moving: true, size: {width: 32, height: 12}, side: "Right", moveX: 1024, imgNum: 12},
                { spawnDistance: -1030, startX: 730 , enemyType: "ship", moving: false, size: {width: 62, height: 16} , side: "Left", imgNum: 7},
                { spawnDistance: -1000, startX: 600 , enemyType: "heli", moving: true, size: {width: 32, height: 20} , side: "Left", imgNum: 9, moveX: 450},
                { spawnDistance: -1100, startX: 450 , enemyType: "heli", moving: true, size: {width: 32, height: 20} , side: "Right", imgNum: 10, moveX: 550},
                { spawnDistance: -3508, startX: 448 , enemyType: "bridge", moving: false, size: {width: 129, height: 51} , side: "Left", imgNum: 13}
            ]
        };
        addLines(level, levels[0].leftSide)
        addLines(level, levels[0].rightSide)
        //Objects in the middle
        for (const object of levels[0].objects)
            addLines(level, object);
    }
    if(lvlNumber === 1){
        level = {
            lines: [],
            enemySpawns: [
                { spawnDistance: -400, startX: 480 , enemyType: "ship", moving: false, size: {width: 62, height: 16}, side: "Right", imgNum: 8},
                { spawnDistance: -400, startX: 580 , enemyType: "ship", moving: false, size: {width: 62, height: 16} , side: "Right", imgNum: 8},
                { spawnDistance: -100, startX: 600 , enemyType: "ship", moving: false, size: {width: 62, height: 16} , side: "Left", imgNum: 7},
                { spawnDistance: -100, startX: 600 , enemyType: "ship", moving: true, size: {width: 62, height: 16}, side: "Left", moveX: 400, imgNum: 7},
                { spawnDistance: -20, startX: -32 , enemyType: "jet", moving: true, size: {width: 32, height: 12}, side: "Right", moveX: 1024, imgNum: 12},
                { spawnDistance: -3508, startX: 448 , enemyType: "bridge", moving: false, size: {width: 129, height: 51} , side: "Left", imgNum: 13}
            ]
        };
        addLines(level, levels[1].leftSide)
        addLines(level, levels[1].rightSide)
        //Objects in the middle
        for (const object of levels[1].objects)
            addLines(level, object);
    }
    return level;
}

function addLines(level: Level, points: number[][]) {
    for (let i = 0; i < points.length - 1; i++) {
        let prev = points[i];
        let now = points[i + 1];
        level.lines.push({
            start: { x: prev[0], y: prev[1] },
            end: { x: now[0], y: now[1] }
        });
    }
}

export { getLevel };