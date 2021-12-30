/*

 */

// Wait for the deviceready event before using any of Cordova's device APIs.

document.addEventListener('deviceready', onDeviceReady, false);

//////////////////////////////////////////////////////////// Misc functions //////////////////////////////////////////////////

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

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
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
            if (grid[i][j].landmark == true){arr = arr+' @ ';}
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

///////////////////////////////////////////////////////////////////// GLOBALS ////////////////////////////////////////////////////////

var sizeX = 30;
var sizeY = 30;
var townTotal = 6;
var landmarkTotal = 8;
var passes = 2;
var grid = createGrid(sizeX);

var towns = [];
var landmarks = [];
var keywords = [];
var characters = [];
var day = 1000;

//file = "../textfiles/male.txt";

///////////////////////////////////////////////////////////////////// BANKS ///////////////////////////////////////////////////////

var townNames = ['Sherwwod', 'Kingsbridge', 'Aerilon', 'Aquarin', 'Aramoor', 'Azmar', 'Begger’s Hole', 'Black Hollow', 'Blue Field', 'Briar Glen', 
'Brickelwhyte', 'Broken Shield', 'Bullmar', 'Carran', 'Coalfell', 'Cullfield', 'Darkwell', 'Doonatel', 'Dry Gulch', 'Easthaven', 'Ecrin', 'Erast', 'Far Water',
'Firebend', 'Fool’s March', 'Frostford', 'Goldcrest', 'Goldenleaf', 'Greenflower', 'Garen’s Well', 'Haran', 'Hillfar', 'Hogsfeet', 'Hollyhead', 'Hull Hwen', 'Icemeet',
'Ironforge', 'Irragin', 'Jarren’s Outpost', 'Jongvale', 'Kara’s Vale', 'Knife’s Edge', 'Lakeshore', 'Leeside', 'Lullin', 'Marren’s Eve', 'Millstone', 'Moonbright',
'Mountmend', 'Nearon', 'New Cresthill', 'Northpass', 'Nuxvar', 'Oakheart', 'Oar’s Rest', 'Old Ashton', 'Orrinshire', 'Ozryn', 'Pavv', 'Pella’s Wish', 'Pinnella Pass',
'Queenstown', 'Ramshorn', 'Red Hawk', 'Rivermouth', 'Saker Keep', 'Seameet', 'Oakenkeep', 'The Warren', 'Snowmelt', 'Squall’s End', 'Swordbreak',
'Tarrin', 'Three Streams', 'Trudid', 'Ubbin Falls', 'Ula’ree', 'Veritas', 'Violl’s Garden', 'Wavemeet', 'Whiteridge', 'Willowdale', 'Windrip', 'Wintervale', 'Wellspring',
'Westwend', 'Wolfden'];

var maleNames = ['Adam', 'Axel', 'Bailey', 'Clint', 'Clayton', 'Geoff', 'Jaime', 'Kaiser', 'Josia', 'Rick', 'Mark', 'Maximus', 'Mayndard'];
var femaleNames = ['Mary', 'Shirley', 'Sarah', 'Anna', 'Carol', 'Ruth', 'Catherine', 'Joyce', 'Heather', 'June', 'Megan', 'Holly'];
var eyeColors = ['light blue', 'blue', 'dark blue', 'gray', 'stormy blue', 'blue-gray', 'green', 'hazel', 'amber', 'light brown', 'brown', 'dark brown', 'chestnut',
'brown','brown','brown','brown','brown','light-brown','light-brown'];
var hairColors = ['brown', 'black', 'grey', 'light brown', 'dark brown', 'blonde', 'brown', 'black', 'jet black', 'black', 'black', 'black', 'dark brown', 'dark brown'];
var armorUpper = ['studded leather', 'iron curiass', 'full iron plate', 'iron chainmail', 'bronze curiass', 'full bronze plate', 'bronze chainmail', 'iron armor with fur lining the edges',
'iron armor with a cape draped behind it', 'iron armor concealed behind a cloak', 'dirty chainmail', 'the shredded remnants of chainmail', 'dirty gambeson', 'worn leather gear'];
var headgear = ['hood', 'half helm', 'barbute helmet', 'eye concealing full helm with horns sticking out the top', 'Lamellar helmet', 'turban', 'wool cap', 'floppy hat'];
var upperClothes = ['shirt', 'vest', 'tunic', 'doublet', 'jerkin', 'wool coat', 'unbuttoned shirt', 'dirty shirt', 'ripped tunic', 'dirty tunic', 'worn coat', 'worn jerkin', 'ripped cloak'];
var lowerClothes = ['breeches', 'hose', 'pants', 'shorts', 'dirty pants', 'worn pants', 'worn shorts', 'frayed pants', 'ripped pants', 'faded pants'];
var colors = ['pink', 'crimson', 'red', 'maroon', 'brown', 'rose', 'salmon', 'orange-red', 'orange','gold', 'ivory', 'yellow', 'olive', 'lime-green', 'green', 'dark green', 'aquamarine',
'turquoise', 'azure', 'cyan', 'teal', 'lavender', 'blue', 'navy', 'violet', 'indigo', 'plum', 'magenta', 'purple','white', 'silver'];
var mutedColors = ['tan', 'brown', 'grey', 'dark-grey', 'light-grey', 'light-brown','dark-brown', 'beige'];
var landmarkNames = ['Castle of Doom', 'Hall of Souls', "Spire of Reckoning", 'Pit of Dispair', 'Citadel of Madness', 'Tower of Steel', 'Caves of the prophet', 'Jungle of despair', 'The Abyss'];
var emotions = ['saddened', 'disgusted', 'surprised', 'angered', 'delighted', 'disturbed', 'scared'];

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
        this.landmark = false,
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
};

//Landmark Functions      ----------------------------------------------------------------
function chooseLandmarkName(){
    let mark = getRand(0, landmarkNames.length-1);
    return landmarkNames.splice(mark,1).toString();
}

function chooseLandmarkPlace(){
    let spot = new Loc();
    spot.x = getRand(1, sizeX-1);
    spot.y = getRand(1, sizeY-1);
    return spot;
}

function chooseLandDesc(){
    return 'A very spooky place';
}

class Landmark{
    constructor(name=chooseLandmarkName(), loc=chooseLandmarkPlace(), description=chooseLandDesc()){
        this.name = name,
        this.loc = loc,
        this.description = description
    }
}

//Town Functions          ----------------------------------------------------------------

function chooseTownName(){
    let title = getRand(0, townNames.length-1);
    return townNames.splice(title,1).toString();
}

function chooseTownPlace(){
    let spot = new Loc();
    spot.x = getRand(1, sizeX-1);
    spot.y = getRand(1, sizeY-1);
    return spot;
}

function chooseDesc(){
    return 'A dingy little town filled with hope.'
}

class Town{
    constructor(name=chooseTownName(), loc=chooseTownPlace(), desc=chooseDesc()){
        this.name = name,
        this.loc = loc,
        this.capital= false,
        this.desc = desc
    }
}

//Person Functions            ----------------------------------------------------------------

function chooseName(gender){
    if (gender == 'male'){
        let name = getRand(0, maleNames.length-1);
        return maleNames.splice(name,1).toString();
    }
    else {
        let name = getRand(0, femaleNames.length-1);
        return femaleNames.splice(name,1).toString();
    }
}
function chooseGender(){
    if (getRand(0, 1) == 1) {return 'male';}
    else {return 'female';}
}
function chooseAge(){
    return getRand(15, 60);
}
function choosePersonality(){
    let type = getRand(1,4);
    if (type == 1 || type == 2){return 'normal';}
    if (type == 3){return 'nice';}
    if (type == 4){return 'mean';}
    return 'nice';
}
function chooseHaircolor(){
    let col = getRand(0, hairColors.length-1);
    return hairColors[col];
}
function chooseEyecolor(){
    let col = getRand(0, eyeColors.length-1);
    return eyeColors[col];
}
function chooseHometown(){
    let roll = getRand(0, towns.length-1);
    let homeTown = towns[roll];
    return homeTown;
}
function chooseOpinions(){
    let op = [];
    return op;
}
function chooseGoals(homeName){
    let goals = [];
    let g = new Goal(homeName, 'live peacefully');
    goals.push(g);
    return goals;
}
function chooseKeymemories(age){
    let mems = [];
    let timeOccurred = getRand((day - age), day);
    mems.push(new KeyMemory(timeOccurred, undefined, undefined, undefined, undefined));
    return mems;
}
function chooseClothing(){
    let clothes = [];
    let pants = getRand(0, lowerClothes.length-1);
    let shirt = getRand(0, upperClothes.length-1);
    clothes.push(lowerClothes[pants]);
    clothes.push(upperClothes[shirt]);
    return clothes;
}
function chooseWeapon(){
    return 'fists';
}
function chooseStrength(){
    let power = getRand(1,20);
    return power;
}
function chooseMoney(){
    let cash = getRand(1,50);
    return cash;
}
function chooseMagic(){
    let magic = getRand(1,100);
    if (magic == 69){
        return true;
    } else {return false;}
}
function chooseRelations(){
    let relations = [];
    return relations;
}

class Person {
    constructor(loc, gender=chooseGender(), name=chooseName(gender), age=chooseAge(), personality=choosePersonality(), haircolor=chooseHaircolor(),
    eyecolor=chooseEyecolor(), hometown=chooseHometown(), opinions=chooseOpinions(), goals=chooseGoals(hometown.name), keyMemories=chooseKeymemories(age), clothing=chooseClothing(),
    weapon=chooseWeapon(), strength=chooseStrength(), money=chooseMoney(), magic=chooseMagic(), relations=chooseRelations()){
        this.gender = gender,
        this.name = name,
        this.age = age,
        this.personality = personality,
        this.haircolor = haircolor,
        this.eyecolor = eyecolor,
        this.hometown = hometown,
        this.opinions = opinions,
        this.goals = goals,
        this.keyMemories = keyMemories,
        this.clothing = clothing,
        this.weapon = weapon,
        this.loc = loc,
        this.strength = strength,
        this.money = money,
        this.magic = magic,
        this.relations = relations
    }
}

//Opinion functions            ----------------------------------------------------------------

function chooseAffinity(){
    return getRand(-79,79);
}
function chooseFamiliar(){
    return false;
}

class Opinion{
    constructor(keyword, affinity=chooseAffinity(), familiar=chooseFamiliar()){
        this.keyword = keyword,
        this.affinity = affinity,
        this.familiar = familiar
    }
}

//Relation functions         ---------------------------------------------------------------------

function chooseRelation(){
    return 'stranger';
}

class Relation{
    constructor(keyword, relation=chooseRelation()){
        this.keyword = keyword,
        this.relation = relation
    }
}

//Goal                       ------------------------------------------------------------------------

class Goal{
    constructor(keyword, action){
        this.keyword = keyword,
        this.action = action
    }
}

//Key Memory functions      ---------------------------------------------------------------------------

function chooseMemPeople(){
    let peopleInvolved = [];
    return peopleInvolved;
}
function chooseMemPlace(){
    place = new Loc();
    place.x = getRand(1, sizeX);
    place.y = getRand(1, sizeY);
    return place;
}
function chooseMemTakeAway(){
    //the ultimate conclusion of this memory 
    return 'It was an experience';
}
function chooseEmotion(){
    return emotions[getRand(0,emotions.length-1)];
}

class KeyMemory{
    constructor(time, people=chooseMemPeople(), place=chooseMemPlace(), takeAway=chooseMemTakeAway(), emotion=chooseEmotion()){
        this.people = people,
        this.place = place,
        this.time = time,
        this.takeAway = takeAway,
        this.emotion = emotion
    }
}


//////////////////////////////////////////////////////////////////////// STARTUP ////////////////////////////////////////////////////////////

function seedMap(){
    var roll = 0;
    //init 
    for (let i=0; i<sizeX; i++){
        for (let j=0; j<sizeY; j++){
            let local = new Tile(i,j);
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
}

function seedTowns(){

    var dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}

    let z = 0; 
    let counter = 0;

    while(z<townTotal){
        var roll1 = getRand(1,(sizeX-2));
        var roll2 = getRand(1,(sizeY-2));
        //console.log("checking: "+roll1+","+roll2);
        if (grid[roll1][roll2].water == false && grid[roll1][roll2].mountain == false){
            var tooclose = false; //flag
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
                let settlement = new Town(undefined, place, undefined);
                towns.push(settlement);
                keywords.push(settlement.name);
                z++;
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (sizeX*sizeY)){
            z = (towntotal + 1);
        }
    }
}

function seedLandmarks(){
 
    var dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}

    var q = 0; 
    var counter = 0;
   
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
                grid[roll1][roll2].landmark = true;
                let place = new Loc();
                place.x = roll1;
                place.y = roll2;
                let mark = new Landmark(undefined, place, undefined);
                landmarks.push(mark);
                keywords.push(mark.name);
                q++;
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (sizeX*sizeY)){
            q = (landmarkTotal + 1);
        }
    }
}

function seedRoads(){
    var closeby = [];
    var townsDone = [];

    var dist = (((sizeX + sizeY)/2));
    dist = (Math.round(dist/3))
    if (dist <2){dist = 2;}
    
    for (townStart of towns){
        //find nearby towns
        for (i=(townStart.loc.x-dist); i<=(townStart.loc.x+dist);i++){
            for (j=(townStart.loc.y-dist); j<=(townStart.loc.y+dist);j++){
                //check if looking outside bounds
                if ((i<0) || (i>(sizeX-1)) || (j<0) || (j>(sizeY-1))){
                    continue;
                }
                if (grid[i][j].town == true){
                    if (townStart.loc.x != i && townStart.loc.y != j){
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

            //find the path between these points
            //console.log("finding path between " + townStart.loc.x + "," + townStart.loc.y + " and " + townEnd.x + "," + townEnd.y);
            let roadRoute = findPath(townStart.loc, townEnd);
            //console.log('roadroute: ' +roadRoute);
            if (roadRoute != false){
                for (item of roadRoute){
                    //console.log(item.x + "," + item.y);
                    grid[item.x][item.y].road = true;
                }
            }
            else {console.log('cannot build road');} 
        }
        townsDone.push(townStart.loc);
        closeby = [];
    }
}

function generateWorld(){
    //generates a new world. Will eventually integrate sliders for different vars.
    console.log("Generating World...");
    seedMap();

    //init towns
    console.log("building towns...");
    seedTowns();

    //init landmarks
    console.log("creating landmarks...");
    seedLandmarks();

    //build roads
    console.log("building roads...");
    seedRoads();

    //Init characters!
    //1. add commoners
    //2. add mercenaries/ soldiers
    //3. add merchants and their bodyguards
    //4. add adventurers
    //5. add big 8
    //6. add Orsted



    for (i=0; i<(towns.length * 2); i++){
        let character = new Person({x:15,y:15},undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined);
 
        characters.push(character);
        keywords.push(character.name);
    }

    //Relations
    for (person of characters){



        //mom
        characters = shuffle(characters);
        let mothered = false;
        for (rel of person.relations){
            if (rel.relation == 'mother'){mothered = true;}
        }
        if (mothered == false){
            for (p2 of characters){
                if (p2.age > person.age + 18){
                    if (p2.gender == 'female'){
                        let childCounter = 0;
                        for (rel of p2.relations){
                            if (rel.relation == 'child'){childCounter++;}
                        }
                        if (childCounter < 4){
                            let a = new Relation(p2.name, 'mother');
                            person.relations.push(a);
                            let b = new Relation(person.name, 'child');
                            p2.relations.push(b);

                            //check if married
                            for (rel of p2.relations){
                                if (rel.relation == 'married'){
                                    let dad = rel.keyword;
                                    let c = new Relation(dad, 'father');
                                    person.relations.push(c);
                                    for (dude of characters){
                                        if (dude.name == dad){
                                            let d = new Relation(person, 'child');
                                            dude.relations.push(d);
                                            
                                        }
                                    }
                                }
                            }
                            break;   
                        }
                    }
                }
            }
        }
        mothered = false;
        for (rel of person.relations){
            if (rel.relation == 'mother'){mothered = true;}
        }
        if (mothered == false){
            let e = new Relation('Dead', 'mother');
            person.relations.push(e);
        }

        //dad
        characters = shuffle(characters);
        let fathered = false;
        for (rel of person.relations){
            if (rel.relation == 'father'){fathered = true;}
        }
        if (fathered == false){
            for (p2 of characters){
                if (p2.age > person.age + 18){
                    if (p2.gender == 'male'){
                        let childCounter = 0;
                        for (rel of p2.relations){
                            if (rel.relation == 'child'){childCounter++;}
                        }
                        if (childCounter < 4){
                            let a = new Relation(p2.name, 'father');
                            person.relations.push(a);
                            let b = new Relation(person.name, 'child');
                            p2.relations.push(b);

                            //check if married
                            for (rel of p2.relations){
                                if (rel.relation == 'married'){
                                    let mom = rel.keyword;
                                    let c = new Relation(mom, 'mother');
                                    person.relations.push(c);
                                    for (gal of characters){
                                        if (gal.name == mom){
                                            let d = new Relation(person, 'child');
                                            gal.relations.push(d);
                                        }
                                    }
                                }
                            } 
                            break;   
                        }
                    }
                }
            }
        }
        fathered = false;
        for (rel of person.relations){
            if (rel.relation == 'father'){fathered = true;}
        }
        if (fathered == false){
            let f = new Relation('Dead', 'father');
            person.relations.push(f);
        }

    }
    //find family
    characters = shuffle(characters);
    for (person of characters){
        for (rel of person.relations){
            if (rel.relation == 'father' || rel.relation == 'mother'){
                let parent = rel.keyword;
                for (target of characters){
                    if (target.name == parent){
                        for (peep of target.relations){
                            //relations of the parents
                            if (peep.relation == 'child' && peep.keyword != person.name){
                                let a = new Relation(peep.keyword, 'family');
                                person.relations.push(a);
                            }
                        }
                    }
                }
            }
        }
    }

    //married
    characters = shuffle(characters);
    let ismarried = false;
    for (rel of person.relations){
        if (rel.relation == 'married'){ismarried = true;}
    }
    if (ismarried == false && getRand(0,100) > 50){
        for (p2 of characters){
            ismarried = false;
            for (rel of p2.relations){
                if (rel.relation == 'married'){ismarried = true;}
                if (rel.relation == 'family' && rel.keyword == person.name){ismarried = true;}
            }
            if (person.gender != p2.gender){
                if (p2.age < person.age + 5 && p2.age > person.age -5 && ismarried == false){
                    let a = new Relation(p2.name, 'married');
                    person.relations.push(a);
                    let b = new Relation(person.name, 'married');
                    p2.relations.push(b);
                    break;
                }
            }
            else {
                if (69 == getRand(0,100)){
                    if (p2.age < person.age + 5 && p2.age > person.age -5 && ismarried == false){
                        let a = new Relation(p2.name, 'married');
                        person.relations.push(a);
                        let b = new Relation(person.name, 'married');
                        p2.relations.push(b);
                        break;
                    }
                }
            }
        }
    }

    //trim duplicates
    for (person of characters){
        for (p1 in person.relations){
            for (p2 in person.relations){
                if (p1 != p2 && person.relations[p1].keyword == person.relations[p2].keyword && person.relations[p1].relation == person.relations[p2].relation){
                    person.relations.splice(p2,1);
                }
            }
        }
    }

    //dead parents if nothing
    for (person of characters){
        let momflag = false;
        let dadflag = false;
        for (p1 of person.relations){
            if (p1.relation == 'mother'){momflag = true;}
            if (p1.relation == 'father'){dadflag = true;}
        }
        if (momflag == false){person.relations.push(new Relation('Dead', 'mother'));}
        if (dadflag == false){person.relations.push(new Relation('Dead', 'father'));}
    }

    //opinions
    characters = shuffle(characters);
    for (person of characters){
        for (topic of keywords){
            var opi = new Opinion(topic, undefined, undefined);
            person.opinions.push(opi);
        }
        for (rel of person.relations){
            if (rel.relation == 'father' || rel.relation == 'mother' || rel.relation == 'married'){
                for (op of person.opinions){
                    if (rel.keyword == op.keyword){
                        op.affinity = 80;
                        op.familiar = true;
                    }
                }
            }
            if (rel.relation == 'family' || rel.relation == 'child'){
                for (op of person.opinions){
                    if (rel.keyword == op.keyword){
                        if (op.affinity < 0){op.affinity = 0; op.familiar=true;}
                    }
                }
            }
            for (op of person.opinions){
                if (op.keyword == person.hometown.name){
                    op.familiar = true;
                    if (op.affinity < -50){op.affinity = getRand(-50, 0)}
                }
            }
        }
    }        

    for (character of characters){
        console.log(character);
    }
    
}


    

generateWorld();
dispGrid();
