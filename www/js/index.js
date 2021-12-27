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

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

///////////////////////////////////////////////////////////////////// GLOBALS ////////////////////////////////////////////////////////

var sizeX = 30;
var sizeY = 30;
var townTotal = 6;
var landmarkTotal = 8;
var passes = 2;
var grid = createGrid(sizeX);
var towns = [];
var landmarks = [];

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
        this.coords = [x,y]

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

function generateWorld(passes, towntotal){
    //generates a new world. Will eventually integrate sliders for different vars.
    console.log("Generating World...");
    let roll = 0;
    //init 
    for (let i=0; i<sizeX; i++){
        for (let j=0; j<sizeY; j++){
            local = new Tile(i,j);
            grid[i][j] = local;
            grid[i][j].grassland = true;
            grid[i][j].setRocks(1);
            grid[i][j].setTrees(4);
            grid[i][j].setWildlife(4);
            grid[i][j].setFlowers(2);
        }
    }
    for (let i=1; i<sizeX-1; i++){
        for (let j=1; j<sizeY-1; j++){ 
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
            if (roll <= 5 && grid[i][j].mountain != true && grid[i][j].water != true && grid[i][j-1].desert != true && grid[i][j+1].desert != true && grid[i+1][j].desert != true && grid[i-1][j].desert != true){
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
            if (roll <= 5 && grid[i][j].mountain == false && grid[i][j].water == false && grid[i][j].tundra == false && grid[i][j].swampy == false && grid[i][j+1].tundra != true && grid[i][j-1].tundra != true && grid[i+1][j].tundra != true && grid[i-1][j].tundra != true){
                grid[i][j].desert = true;
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
    for (let p = 0; p < sizeX; p++){
        grid[p][0].water = true;
        grid[p][0].grassland = false;
        grid[p][0].rocks = 'none';
        grid[p][0].trees = 'none';
        grid[p][0].wildlife = 'none';
        grid[p][0].flowers = 'none';
        grid[p][sizeY-1].water = true;
        grid[p][sizeY-1].grassland = false;
        grid[p][sizeY-1].rocks = 'none';
        grid[p][sizeY-1].trees = 'none';
        grid[p][sizeY-1].wildlife = 'none';
        grid[p][sizeY-1].flowers = 'none';
    }
    for (let o = 0; o < sizeY; o++){
        grid[0][o].water = true;
        grid[0][o].grassland = false;
        grid[0][o].rocks = 'none';
        grid[0][o].trees = 'none';
        grid[0][o].wildlife = 'none';
        grid[0][o].flowers = 'none';
        grid[sizeX-1][o].water = true;
        grid[sizeX-1][o].grassland = false;
        grid[sizeX-1][o].rocks = 'none';
        grid[sizeX-1][o].trees = 'none';
        grid[sizeX-1][o].wildlife = 'none';
        grid[sizeX-1][o].flowers = 'none';
    }
    // Normalize tile attributes using multiple passes
    for (let z=0; z<passes;z++){
        console.log("pass "+z);
        for (let i=1; i<sizeX-1; i++){
            for (let j=1; j<sizeY-1; j++){
                if (grid[i][j-1].mountain == true || grid[i+1][j].mountain == true || grid[i][j+1].mountain == true || grid[i-1][j].mountain == true){
                    roll = getRand(1,100);
                    if (roll <= 20  && grid[i][j].water == false){
                        //console.log("pass worked mountain");
                        grid[i][j].mountain = true;
                        grid[i][j].hills = false;
                        grid[i][j].rocks = 'rocky';
                        grid[i][j].trees = 'none';
                        grid[i][j].wildlife = 'none';
                        grid[i][j].flowers = 'none';
                    }
                }
                if (grid[i][j+1].water == true || grid[i][j-1].water == true || grid[i+1][j].water == true || grid[i-1][j].water == true){
                    roll = getRand(1,100);
                    if (roll <= 20  && grid[i][j].mountain == false){
                        //console.log("pass worked water");
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
                if (grid[i][j+1].hills == true || grid[i][j-1].hills == true || grid[i+1][j].hills == true || grid[i-1][j].hills == true){
                    roll = getRand(1,100);
                    if (roll <= 60 && grid[i][j].water == false){
                        grid[i][j].hills = true;
                        
                    }
                }
                if (grid[i][j+1].tundra == true || grid[i][j-1].tundra == true || grid[i+1][j].tundra == true || grid[i-1][j].tundra == true){
                    roll = getRand(1,100);
                    if (roll <= 40  && grid[i][j].water == false && grid[i][j+1].desert == false && grid[i][j-1].desert == false && grid[i+1][j].desert == false && grid[i-1][j].desert == false){
                        //console.log("pass worked tundra");
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
                if (grid[i][j+1].desert == true || grid[i][j-1].desert == true || grid[i+1][j].desert == true || grid[i-1][j].desert == true){
                    roll = getRand(1,100);
                    if (roll <= 40  && grid[i][j].water == false && grid[i][j+1].tundra == false && grid[i][j-1].tundra == false && grid[i+1][j].tundra == false && grid[i-1][j].tundra == false){
                        //console.log("pass worked desert");
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
                if (grid[i][j+1].swampy == true || grid[i][j-1].swampy == true || grid[i+1][j].swampy == true || grid[i-1][j].swampy == true){
                    roll = getRand(1,100);
                    if (roll <= 30  && grid[i][j].water == false && grid[i][j].mountain == false ){
                        //console.log("pass worked swamp");
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

    var dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}
 
    console.log("building towns...");
    let z = 0; 
    let counter = 0;
    //console.log ("z: "+z+" towns: "+towntotal);
    while(z<townTotal){
        var roll1 = getRand(1,(sizeX-2));
        var roll2 = getRand(1,(sizeY-2));
        //console.log("checking: "+roll1+","+roll2);
        if (grid[roll1][roll2].water == false && grid[roll1][roll2].mountain == false){
            let tooclose = false; //flag
            for (i=(roll1-dist); i<=(roll1+dist);i++){
                for (j=(roll2-dist); j<=(roll2+dist);j++){
                    //console.log("dist check: "+ i+","+j);
                    //check if looking outside bounds
                    if ((i<0) || (i>(sizeX-1)) || (j<0) || (j>(sizeY-1))){
                        //console.log("out of bounds");
                        continue;
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
                z++;
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (sizeX*sizeY)){
            z = (towntotal + 1);
        }
    }

    //init landmarks
    console.log("creating landmarks...");
    let q = 0; 
    counter = 0;
    dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}

    while(q<landmarkTotal){
        var roll1 = getRand(1,(sizeX-2));
        var roll2 = getRand(1,(sizeY-2));
        //console.log("checking: "+roll1+","+roll2);
        if (grid[roll1][roll2].water == false && grid[roll1][roll2].mountain == false&& grid[roll1][roll2].town == false){
            let tooclose = false; //flag
            for (i=(roll1-dist); i<=(roll1+dist);i++){
                for (j=(roll2-dist); j<=(roll2+dist);j++){
                    //console.log("dist check: "+ i+","+j);
                    //check if looking outside bounds
                    if ((i<0) || (i>(sizeX-1)) || (j<0) || (j>(sizeY-1))){
                        //console.log("out of bounds");
                        continue;
                    }
                    if (grid[i][j].landmark != 'none'){
                        tooclose = true;
                        //console.log("too close!");
                    }
                }
            }
            if (tooclose == false){
                console.log("landmark created at: "+ roll1 + " , " + roll2);
                grid[roll1][roll2].landmark = 'Spire';
                let place = new Loc();
                place.x = roll1;
                place.y = roll2;
                landmarks.push(place);
                q++;
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (sizeX*sizeY)){
            q = (landmarkTotal + 1);
        }
    }

    //build roads
    console.log("building roads...");
    var closeby = [];
    var townsDone = [];

    dist = (((sizeX + sizeY)/2));
    dist = (Math.round(dist/3))
    if (dist <2){dist = 2;}
    
    for (townStart of towns){
        //find nearby towns
        for (i=(townStart.x-dist); i<=(townStart.x+dist);i++){
            for (j=(townStart.y-dist); j<=(townStart.y+dist);j++){
                //check if looking outside bounds
                if ((i<0) || (i>(sizeX-1)) || (j<0) || (j>(sizeY-1))){
                    continue;
                }
                if (grid[i][j].town == true){
                    if (townStart.x != i && townStart.y != j){
                        //no repeats
                        let repeated = false;
                        for (check of townsDone){
                            if (check.x == i && check.y == j){
                                repeated = true;
                            }
                        }
                        if (repeated == false){
                            spot = {x:i,y:j};
                            closeby.push(spot);
                        }
                    }
                }
            }
        }
        if (closeby.length  < 1){break;}

        for (townEnd of closeby){
            //console.log("comp "+startPoint.x+","+startPoint.y+ " and "+endPoint.x+","+endPoint.y);
                
            //find the path between these points
            console.log("finding path between " + townStart.x + "," + townStart.y + " and " + townEnd.x + "," + townEnd.y);
            let roadRoute = findPath(townStart, townEnd);
            console.log("Path route:");
            for (item of roadRoute){
                console.log(item.x + "," + item.y);
                grid[item.x][item.y].road = true;
            } 
        }
        townsDone.push(townStart);
        closeby = [];
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
        //console.log("finding neighbors for: "+loc.x+","+loc.y);
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

        return paths.reverse();
    }

    var queue = [];
    queue.push(startPoint);
    var matchFlag = false;
    var final = []

    //main loop
    while (queue.length) {
        queue = shuffle(queue);
        var currentLocation = queue.shift();
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
    }
    return false;
}

function dispGrid(){
    let arr = '';
    for (i=0;i<sizeX;i++){
        arr = '';
        for (j=0;j<sizeY;j++){
            if (grid[i][j].landmark == 'Spire'){arr = arr+' @ ';}
            else if (grid[i][j].town == true){arr = arr+' X ';}
            else if (grid[i][j].road == true){arr = arr+' # ';}
            else if (grid[i][j].water == true){arr = arr+' W ';}
            else if (grid[i][j].mountain == true){arr = arr+' M ';}
            else if (grid[i][j].desert == true){arr = arr+' - ';}
            else if (grid[i][j].tundra == true){arr = arr+' ~ ';}
            else if (grid[i][j].grassland == true){arr = arr+' . ';}
            else if (grid[i][j].swampy == true){arr = arr+' & ';}
            else {arr = arr+' ? ';}
        }
        console.log(arr);
    }
}
    

generateWorld(passes, townTotal);
dispGrid();
