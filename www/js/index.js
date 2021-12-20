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
        this.landmark = 'none', // none, spire, crater, gash
        this.trees = 'sparse', // sparse, moderate, forest
        this.rocks = 'sparse', // sparse, moderate, rocky
        this.wildlife = 'sparse', // sparse, moderate, flourishing
        this.flowers = 'sparse' // sparse, moderate, fields
        
        this.coords = [x,y];
        this.N = [x, (y-1)];
        this.E = [(x+1), y];
        this.S = [x, (y+1)];
        this.W = [(x-1), y];
    }
    dispCoords(){
        return this.coords;
    }
    
}

function createArray(length) {
    let arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function generateWorld(x,y){
    console.log("testing");
    let grid = createArray(x, y);
    for (let i=0; i<x; i++){
        for (let j=0; j<y; j++){
            local = new Tile(i,j);
            
            console.log(i + ' ' + j);
            console.log("---");
            console.log(local.coords);
            console.log('/n');
        }
    }
}


function findPath(){
    //find the shortest path to a destination
    let grid = [
    [{ state: 'empty' }, { state: 'empty' }, { state: 'empty' }],
    [{ state: 'empty' }, { state: 'block' }, { state: 'goal' }],
    ];
    let start = [0, 0];
    let end = [1, 2];
    let row = grid.length;
    let col = grid[0].length;
    //check if outside of bounds or blocked
    safeNeighbor = function (r, c) {
        if (r < 0 || r >= row) return false;
        if (c < 0 || c >= col) return false;
        if (grid[r][c].state == 'block') return false;
        return true;
    };
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

    var location = {
        r: start[0],
        c: start[1],
    };
    var queue = [];
    queue.push(location);
    while (queue.length) {
        var currentLocation = queue.shift();
        if (currentLocation.r == end[0] && currentLocation.c == end[1])
            return currentLocation;
        grid[currentLocation.r][currentLocation.c].state = 'visited';
        var neighbors = exploreLocation(currentLocation);
        for(neighbor of neighbors){
            if(grid[neighbor.r][neighbor.c].state != "visited"){
                queue.push(neighbor);
                grid[neighbor.r][neighbor.c]["parent"]=currentLocation;
                }
            }
        }
    return false;
    }

generateWorld(10, 10);