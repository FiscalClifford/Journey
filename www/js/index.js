/*

 */

// Wait for the deviceready event before using any of Cordova's device APIs.

document.addEventListener('deviceready', onDeviceReady, false);

//////////////////////////////////////////////////////////// foundational functions //////////////////////////////////////////////////

function onDeviceReady() {
    // Cordova is now initialized. 

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function getRand(min, max) {
    //returns a random value between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function createGrid(x){
    let matrix = [];
    for (i=0; i<x; i++){
        matrix[i] = []; 
    }
    return matrix;
  }

///////////////////////////////////////////////////////////////////// GLOBALS ////////////////////////////////////////////////////////

var sizeX = 10;
var sizeY = 10;
var townTotal = 4;
var passes = 5;
var grid = createGrid(sizeX);
var towns = [];

//////////////////////////////////////////////////////////////////// CLASSES //////////////////////////////////////////////////////////

class Loc {
    constructor(){
    this.x = 0,
    this.y = 0;
    }
};

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
        this.familiar = false,
        //path finding
        this.pathVisited = false,
        this.parent = undefined,
        //
        this.coords = [x,y],
        this.N = [x, (y+1)],
        this.E = [(x+1), y],
        this.S = [x, (y-1)],
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



//////////////////////////////////////////////////////////////////////// STARTUP ////////////////////////////////////////////////////////////

function generateWorld(x,y, passes, towntotal){
    //generates a new world. Will eventually integrate sliders for different vars.
    console.log("Generating World...");
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
    console.log("building towns...");
    let z = 0; 
    let counter = 0;
    //console.log ("z: "+z+" towns: "+towntotal);
    while(z<towntotal){
        var roll1 = getRand(1,(x-2));
        var roll2 = getRand(1,(y-2));
        //console.log("checking: "+roll1+","+roll2);
        if (grid[roll1][roll2].water == false && grid[roll1][roll2].mountain == false){
            //determine if too close to another town
            var dist = (((x + y)/2)/10);
            if (dist <2){dist = 2;}
            let tooclose = false; //flag
            for (i=(roll1-dist); i<=(roll1+dist);i++){
                for (j=(roll2-dist); j<=(roll2+dist);j++){
                    //console.log("dist check: "+ i+","+j);
                    //check if looking outside bounds
                    if ((i<0) || (i>(x-1)) || (j<0) || (j>(y-1))){
                        //console.log("out of bounds");
                        break;
                    }
                    if (grid[i][j].town == true){
                        tooclose = true;
                        //console.log("too close!");
                    }
                }
            }
            if (tooclose == false){
                console.log("town created at: "+ roll1 + " , " + roll2);
                grid[roll1][roll2].town = true;
                let place = new Loc();
                place.x = roll1;
                place.y = roll2;
                towns.push(place);
                console.log(place);
                z++;
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (x*y*100)){
            z = (towntotal + 1);
        }
    }

    //build roads
    console.log("building roads...");
    var startPoint = new Loc();
    var endPoint = new Loc();
    for (i=0;i<towns.length;i++){
        console.log(towns[i]);
    }

    for (townStart of towns){
        startPoint.x = townStart.x;
        startPoint.y = townStart.y;
        for (townEnd of towns){
            endPoint.x = townEnd.x;
            endPoint.y = townEnd.y;
            //console.log("comp "+startPoint.x+","+startPoint.y+ " and "+endPoint.x+","+endPoint.y);

            if (startPoint.x != endPoint.x && startPoint.y != endPoint.y){
                //find the path between these points
                console.log("finding path between " + startPoint.x + "," + startPoint.y + " and " + endPoint.x + "," + endPoint.y);
                let roadRoute = findPath(startPoint, endPoint);
                console.log("Path route:");
                for (item of roadRoute){
                    console.log(item.x + "," + item.y);
                    grid[item.x][item.y].road = true;
                }
            }
        }
    }
}

function findPath(startPoint, endPoint){
    console.log("called findPath");

    //check if outside of bounds or blocked
    safeNeighbor = function (x, y) {
        if (x < 0 || x >= sizeX) return false;
        if (y < 0 || y >= sizeY) return false;
        if (grid[x][y].mountain == true || grid[x][y].water == true) return false;
        return true;
    };

    //returns list of viable neighbors to visit
    exploreLoc = function (loc) {
        let allNeighbors = [];
        console.log("finding neighbors for: "+loc.x+","+loc.y);
        let x = loc.x;
        let y = loc.y;
        //left
        if (safeNeighbor(x, y - 1)){
            allNeighbors.push({x: x, y: y-1});
        } 
        //right
        if (safeNeighbor(x, y + 1)) {
            allNeighbors.push({x: x, y: y+1});
        }
        //top
        if (safeNeighbor(x - 1, y)) {
            allNeighbors.push({x: x-1, y: y});
        }
        //bottom
        if (safeNeighbor(x + 1, y)) {
            allNeighbors.push({x: x+1, y: y});
        }
        for (i=0; i <allNeighbors.length; i++){
            console.log("Neighbors:"+allNeighbors[i].x+","+allNeighbors[i].y+"   visited?: "+grid[allNeighbors[i].x][allNeighbors[i].y].pathVisited);
        }
        console.log("~~~~");
        return allNeighbors;
    };

    printPath = function (path){
    //go backwards through parents and assemeble final answer
        let paths = [path];
        while(true){
            let x = path.x;
            let y = path.y;
            let parent = grid[x][y].parent;
            if(parent == undefined)
              break;
            paths.push(parent);
            path = {x:parent.x,y:parent.y};
            }
        console.log("-----------------------");
        for (item of paths){
            console.log(item.x + "," + item.y);
        }
        return paths.reverse();
    }

    var queue = [];
    queue.push(startPoint);
    var counter = 0;
    var matchFlag = false;
    var final = []

    //main loop
    while (queue.length) {
        var currentLocation = queue.shift();
        console.log("Currently at: "+currentLocation.x+","+currentLocation.y+" --> "+endPoint.x+","+endPoint.y);
        console.log("Queue:")
        for (place of queue){
            console.log(place.x+","+place.y);
        }
        if (currentLocation.x == endPoint.x && currentLocation.y == endPoint.y){
            final = printPath(currentLocation);
            for(i=0;i<sizeX;i++){
                for(j=0;j<sizeY;j++){
                    grid[i][j].parent = undefined;
                    grid[i][j].pathVisited = false;
                }
            }
            return final;
        }    
        grid[currentLocation.x][currentLocation.y].pathVisited = true;
        var neighbors = exploreLoc(currentLocation);
        for(neighbor of neighbors){
          if(grid[neighbor.x][neighbor.y].pathVisited != true){
              for (i=0; i < queue.length;i++){
                  if (queue[i].x == neighbor.x && queue[i].y == neighbor.y){
                    matchFlag = true;
                  }
              }
              if (matchFlag == false){
                queue.push(neighbor);
                grid[neighbor.x][neighbor.y].parent = currentLocation;
              }
              else matchFlag = false;
          }
        }
        counter ++;
        if (counter > 200){break;}
    }
    return false;
}
    

generateWorld(sizeX, sizeY, passes, townTotal);