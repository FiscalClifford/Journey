/*

 */

// Wait for the deviceready event before using any of Cordova's device APIs.

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. 

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

class Tile {
    constructor(x,y){
        
        this.grassland = true,
        this.hills = false,
        this.mountain = false,
        this.water = false,
        this.road = false,
        this.town = false,
        this.swampy = false,
        this.tundra = false,
        this.ruins = false,
        this.desert = false,
        this.landmark = 'none', // none, spire, crater, gash
        this.trees = 'sparse', // none, sparse, moderate, forest
        this.rocks = 'sparse', // none, sparse, moderate, rocky
        this.wildlife = 'sparse', // none, sparse, moderate, flourishing
        this.flowers = 'sparse' // none, sparse, moderate, fields
        this.roaded = false;
        this.familiar = false;
        this.pathVisited = false;
        this.parent = undefined;
        
        this.coords = [x,y];
        this.N = [x, (y+1)];
        this.E = [(x+1), y];
        this.S = [x, (y-1)];
        this.W = [(x-1), y];
    }
    setRocks(max) {
        let roll = getRand(1,max);
        if (roll > 4) {roll = 4}
        switch(roll){
            case 1: this.rocks = 'none'; break;
            case 2: this.rocks = 'sparse'; break;
            case 3: this.rocks = 'moderate'; break;
            case 4: this.rocks = 'rocky'; break;
            default: console.log("error rock switch"); break;
        }
    }
    setTrees(max) {
        let roll = getRand(1,max);
        if (roll > 4) {roll = 4}
        switch(roll){
            case 1: this.trees = 'none'; break;
            case 2: this.trees = 'sparse'; break;
            case 3: this.trees = 'moderate'; break;
            case 4: this.trees = 'forest'; break;
            default: console.log("error tree switch"); break;
        }
    }
    setWildlife(max) {
        let roll = getRand(1,max);
        if (roll > 4) {roll = 4}
        switch(roll){
            case 1: this.trees = 'none'; break;
            case 2: this.trees = 'sparse'; break;
            case 3: this.trees = 'moderate'; break;
            case 4: this.trees = 'flourishing'; break;
            default: console.log("error wildlife switch"); break;
        }
    }
    setFlowers(max) {
        let roll = getRand(1,max);
        if (roll > 4) {roll = 4}
        switch(roll){
            case 1: this.flowers = 'none'; break;
            case 2: this.flowers = 'sparse'; break;
            case 3: this.flowers = 'moderate'; break;
            case 4: this.flowers = 'fields'; break;
            default: console.log("error flower switch"); break;
        }
    }

}

function getRand(min, max) {
    //returns a random value between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function createArray(length) {
    //creates an array of n dimensions based on arguments passed to it
    let arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

var grid = createArray(x, y);

function generateWorld(x,y, passes, towns){
    //generates a new world. Will eventually integrate sliders for different vars.
    console.log("testing");
    let roll = 0;
    //init 
    for (let i=0; i<x; i++){
        for (let j=0; j<y; j++){
            local = new Tile(i,j);
            grid[i][j] = local;
            grid[i][j].grassland = true;
            grid[i][j].setRocks(1);
            grid[i][j].setTrees(4);
            grid[i][j].setWildlife(4);
            grid[i][j].setFlowers(2);
            
            //seed mountains
            roll = getRand(1,100);
            if (roll <= 2){
                grid[i][j].mountain = true;
                grid[i][j].grassland = false;
                grid[i][j].rocks = 'rocky';
                grid[i][j].trees = 'none';
                grid[i][j].wildlife = 'none';
                grid[i][j].flowers = 'none';
            }
            //seed water
            roll = getRand(1,100);
            if (roll <= 5 && grid[i][j].mountain == false){
                grid[i][j].water = true;
                grid[i][j].grassland = false;
                grid[i][j].rocks = 'none';
                grid[i][j].trees = 'none';
                grid[i][j].wildlife = 'none';
                grid[i][j].flowers = 'none';
            }
            //seed hills
            roll = getRand(1,100);
            if (roll <= 30 && grid[i][j].mountain == false && grid[i][j].water == false){
                grid[i][j].hills = true;
                grid[i][j].setRocks(3);
                grid[i][j].setTrees(4);
                grid[i][j].setWildlife(3);
                grid[i][j].setFlowers(4);
            }
            //seed tundra
            roll = getRand(1,100);
            if (roll <= 5 && grid[i][j].mountain == false && grid[i][j].water == false && grid[i][j].N.desert == false && grid[i][j].E.desert == false && grid[i][j].S.desert == false && grid[i][j].W.desert == false){
                grid[i][j].tundra = true;
                grid[i][j].grassland = false;
                grid[i][j].desert = false;
                grid[i][j].setRocks(4);
                grid[i][j].setTrees(1);
                grid[i][j].setWildlife(1);
                grid[i][j].setFlowers(0);
            }
            //seed swampy
            roll = getRand(1,100);
            if (roll <= 5 && grid[i][j].mountain == false && grid[i][j].water == false && grid[i][j].tundra == false){
                grid[i][j].swampy = true;
                grid[i][j].grassland = false;
                grid[i][j].hills = false;
                grid[i][j].setRocks(0);
                grid[i][j].setTrees(4);
                grid[i][j].setWildlife(3);
                grid[i][j].setFlowers(0);
            }
            //seed desert
            roll = getRand(1,100);
            if (roll <= 5 && grid[i][j].mountain == false && grid[i][j].water == false && grid[i][j].tundra == false && grid[i][j].swampy == false && grid[i][j].N.tundra == false && grid[i][j].E.tundra == false && grid[i][j].S.tundra == false && grid[i][j].W.tundra == false){
                grid[i][j].swampy = false;
                grid[i][j].grassland = false;
                grid[i][j].tundra = false;
                grid[i][j].setRocks(1);
                grid[i][j].setTrees(0);
                grid[i][j].setWildlife(0);
                grid[i][j].setFlowers(0);
            }
            //seed ruins
            roll = getRand(1,100);
            if (roll <= 2 && grid[i][j].mountain == false && grid[i][j].water == false){
                grid[i][j].ruins = true;
            }
            
        }
    }
    //surround with water
    for (let p = 0; p < x; p++){
        grid[p][0].water == true;
        grid[p][0].grassland = false;
        grid[p][0].rocks = 'none';
        grid[p][0].trees = 'none';
        grid[p][0].wildlife = 'none';
        grid[p][0].flowers = 'none';
        grid[p][y-1].water == true;
        grid[p][y-1].grassland = false;
        grid[p][y-1].rocks = 'none';
        grid[p][y-1].trees = 'none';
        grid[p][y-1].wildlife = 'none';
        grid[p][y-1].flowers = 'none';
    }
    for (let o = 0; o < y; o++){
        grid[0][o].water == true;
        grid[0][o].grassland = false;
        grid[0][o].rocks = 'none';
        grid[0][o].trees = 'none';
        grid[0][o].wildlife = 'none';
        grid[0][o].flowers = 'none';
        grid[x-1][o].water == true;
        grid[x-1][o].grassland = false;
        grid[x-1][o].rocks = 'none';
        grid[x-1][o].trees = 'none';
        grid[x-1][o].wildlife = 'none';
        grid[x-1][o].flowers = 'none';
    }
    // Normalize tile attributes using multiple passes
    for (let z=0; z<passes;z++){
        for (let i=0; i<x; i++){
            for (let j=0; j<y; j++){
                if (grid[i][j].N.mountain == true || grid[i][j].E.mountain == true || grid[i][j].S.mountain == true || grid[i][j].W.mountain == true){
                    roll = getRand(1,100);
                    if (roll <= 20  && grid[i][j].water == false){
                        grid[i][j].mountain = true;
                        grid[i][j].hills = false;
                        grid[i][j].rocks = 'rocky';
                        grid[i][j].trees = 'none';
                        grid[i][j].wildlife = 'none';
                        grid[i][j].flowers = 'none';
                    }
                }
                if (grid[i][j].N.water == true || grid[i][j].E.water == true || grid[i][j].S.water == true || grid[i][j].W.water == true){
                    roll = getRand(1,100);
                    if (roll <= 50  && grid[i][j].mountain == false){
                        grid[i][j].water = true;
                        grid[i][j].grassland = false;
                        grid[i][j].hills = false;
                        grid[i][j].swampy = false;
                        grid[i][j].tundra = false;
                        grid[i][j].desert = false;
                        grid[i][j].rocks = 'none';
                        grid[i][j].trees = 'none';
                        grid[i][j].wildlife = 'none';
                        grid[i][j].flowers = 'none';
                    }
                }
                if (grid[i][j].N.hills == true || grid[i][j].E.hills == true || grid[i][j].S.hills == true || grid[i][j].W.hills == true){
                    roll = getRand(1,100);
                    if (roll <= 50 && grid[i][j].water == false){
                        grid[i][j].hills = true;
                        
                    }
                }
                if (grid[i][j].N.tundra == true || grid[i][j].E.tundra == true || grid[i][j].S.tundra == true || grid[i][j].W.tundra == true){
                    roll = getRand(1,100);
                    if (roll <= 50  && grid[i][j].water == false && grid[i][j].N.desert == false && grid[i][j].E.desert == false && grid[i][j].S.desert == false && grid[i][j].W.desert == false){
                        grid[i][j].grassland = false;
                        grid[i][j].swampy = false;
                        grid[i][j].tundra = true;
                        grid[i][j].desert = false;
                        grid[i][j].setRocks(4);
                        grid[i][j].setTrees(1);
                        grid[i][j].setWildlife(1);
                        grid[i][j].setFlowers(0);
                    }
                }
                if (grid[i][j].N.desert == true || grid[i][j].E.desert == true || grid[i][j].S.desert == true || grid[i][j].W.desert == true){
                    roll = getRand(1,100);
                    if (roll <= 50  && grid[i][j].water == false && grid[i][j].N.tundra == false && grid[i][j].E.tundra == false && grid[i][j].S.tundra == false && grid[i][j].W.tundra == false){
                        grid[i][j].grassland = false;
                        grid[i][j].swampy = false;
                        grid[i][j].tundra = false;
                        grid[i][j].desert = true;
                        grid[i][j].setRocks(1);
                        grid[i][j].setTrees(0);
                        grid[i][j].setWildlife(0);
                        grid[i][j].setFlowers(0);
                    }
                }
                if (grid[i][j].N.swampy == true || grid[i][j].E.swampy == true || grid[i][j].S.swampy == true || grid[i][j].W.swampy == true){
                    roll = getRand(1,100);
                    if (roll <= 30  && grid[i][j].water == false && grid[i][j].mountain == false ){
                        grid[i][j].swampy = true;
                        grid[i][j].grassland = false;
                        grid[i][j].hills = false;
                        grid[i][j].tundra = false;
                        grid[i][j].desert = false;
                        grid[i][j].setRocks(0);
                        grid[i][j].setTrees(4);
                        grid[i][j].setWildlife(3);
                        grid[i][j].setFlowers(0);
                    }
                }
            }
        }
    }

    //init towns
    let z, counter = 0;
    while(z<towns){
        var roll1 = getRand(1,(x-1));
        var roll2 = getRand(1,(y-1));
        console.log(z)
        if (grid[roll1][roll2].water == false && grid[roll1][roll2].mountain == false){
            //determine if too close to another town
            var dist = (((x + y)/2)/10);
            if (dist <2){dist = 2;}
            let tooclose = false;
            for (i=(roll1-dist); i<(roll1+dist);i++){
                for (j=(roll2-dist); j<(roll2+dist);j++){
                    if (grid[i][j].town == true){tooclose = true;}
                }
                if (tooclose == false){
                    grid[roll1][roll2].town = true;
                    z++;
                }
            }
        }
        counter ++;
        if (counter > (x*y)){
            z = (towns + 1);
        }
    }

    //build roads
    for (let i=0; i<x; i++){
        for (let j=0; j<y; j++){
            if (grid[i][j].town == true && grid[i][j].roaded == false){
                var startx = i;
                var starty = j; 

                //look for target
                for (let a=i; a<x; a++){
                    for (let b=j+1; b<y; b++){
                        if (grid[a][b].town == true && grid[a][b] != grid[i][j]){
                            endx = a;
                            endy = b;
                            let roadRoute = findPath(startx, starty, endx, endy)

                            //create roads and mark starter town as roaded

                        }
                    }
                }

                let pather = 0;
                while (pather < roadRoute.length){
                    let x = roadRoute;
                    let y = roadRoute[pather];
                    grid[x][y].road = true;
                }
            }    
        }
    }
    
         



}

function findPath(startx, starty, endx, endy){

    //find the shortest path to a destination
    let start = [startx, starty];
    let end = [endx, endy];
    let row = grid.length;
    let col = grid[0].length;

    //check if outside of bounds or blocked
    safeNeighbor = function (r, c) {
        if (r < 0 || r >= row) return false;
        if (c < 0 || c >= col) return false;
        if (grid[r][c].mountain == true || grid[r][c].water == true) return false;
        return true;
    };

    //returns list of viable neighbors to visit
    exploreLocation = function (location) {
        let r = location.r;
        let c = location.c;
        let allNeighbors = [];
    //left
    if (safeNeighbor(r, c - 1)) allNeighbors.push({ r: r, c: c - 1 });
    //right
    if (safeNeighbor(r, c + 1)) allNeighbors.push({ r: r, c: c + 1 });
    //top
    if (safeNeighbor(r - 1, c)) allNeighbors.push({ r: r - 1, c: c });
    //bottom
    if (safeNeighbor(r + 1, c)) allNeighbors.push({ r: r + 1, c: c });
        return allNeighbors;
    };

    getFinal = function (start){
    //go backwards through parents and assmeble final answer
        let paths = [start];
        while(true){
            let r = final.r;
            let c = final.c;
            let parent = grid[r][c].parent;
            if(parent == undefined)
            break;
            paths.push(parent);
            path = {r:parent.r,c:parent.c};
        }
        console.log(paths)
    }

    var location = {
        r: start[0],
        c: start[1],
    };
    var final = [];
    var queue = [];
    queue.push(location);
    while (queue.length) {
        var currentLocation = queue.shift();
        if (currentLocation.r == end[0] && currentLocation.c == end[1]) {
            final = getFinal(grid[currentLocation.r][currentLocation.c]);
            for(let i=0; i<grid.length;i++){
                for(let j=0; j<grid[0].length;j++){
                    grid[i][j].parent = undefined;
                    grid[i][j].pathVisited = false;
                }
            }
            return final;
        }
        grid[currentLocation.r][currentLocation.c].pathVisited = true;
        var neighbors = exploreLocation(currentLocation);
        for(neighbor of neighbors){
            if(grid[neighbor.r][neighbor.c].pathVisited != true){
                queue.push(neighbor);
                grid[neighbor.r][neighbor.c].parent = currentLocation;
                }
            }
        }
    
        
    }

 

generateWorld(20, 20, 5, 4);