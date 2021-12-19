/*

 */

// Wait for the deviceready event before using any of Cordova's device APIs.

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. 

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

var tile = new obj

function generateWorld(x, y, mountains, water, towns){
    let grid = [x,y];
    for (x of y){
    }
}

// adsf
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

findPath()