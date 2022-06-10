let createImages = () : HTMLImageElement[] => {
    let imagesS : HTMLImageElement[] = [];
    const imagePaths : string[] = ["bridge1.png", "bridge2.png", "player.png", "left.png", "right.png", "bullet.png", "fuel.png", "shipLeft.png", "shipRight.png", "heliLeft.png", "heliRight.png", "jetLeft.png", "jetRight.png", "bridgeEnemy.png", "dead.png"]

    for (let i = 0; i< imagePaths.length; i++){
        let gfx = new Image();
        gfx.src = "./graphics/" + imagePaths[i];
        imagesS.push(gfx);
    }
    return imagesS;
}



export  {createImages};