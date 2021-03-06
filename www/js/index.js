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
        let answer = paths.reverse();
        if (answer.length > 2){
            if (answer[0].x == answer[1].x && answer[0].y == answer[1].y){
                answer.shift();
            }
        }   
        return answer;
    }

    var queue = [];
    queue.push(startPoint);
    var matchFlag = false;
    var final = []

    //main loop
    for(i=0;i<sizeX;i++){
        for(j=0;j<sizeY;j++){
            grid[i][j].parent = undefined;
            grid[i][j].pathVisited = false;
        }
    }
    while (queue.length) {
        queue = shuffle(queue);
        var currentLocation = queue.shift();
        if (currentLocation.x == endPoint.x && currentLocation.y == endPoint.y){
            final = printPath(currentLocation);
            
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

function findPathFlying(startPoint, endPoint){
    console.log("called findPathFlying");

    //check if outside of bounds or blocked
    safeNeighbor = function (x, y) {
        if (x < 0 || x >= sizeX) {return false;}
        if (y < 0 || y >= sizeY) {return false;}
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
        //console.log(allNeighbors);
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
        let answer = paths.reverse();
        if (answer.length > 2){
            if (answer[0].x == answer[1].x && answer[0].y == answer[1].y){
                answer.shift();
            }
        }   
        return answer;
    }

    var queue = [];
    queue.push(startPoint);
    var matchFlag = false;
    var final = []

    //main loop
    for(i=0;i<sizeX;i++){
        for(j=0;j<sizeY;j++){
            grid[i][j].parent = undefined;
            grid[i][j].pathVisited = false;
        }
    }
    while (queue.length) {
        queue = shuffle(queue);
        var currentLocation = queue.shift();
        if (currentLocation.x == endPoint.x && currentLocation.y == endPoint.y){
            final = printPath(currentLocation);
            
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
            if (grid[i][j].dungeon == true){arr = arr+' @ ';}
            else if (grid[i][j].landmark == true){arr = arr+' O ';}
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

function containsItem(array, target){
    for(let i = 0; i < array.length; i++){
      if(array[i] === target){
        return true;
      }
    }
    return false;
  }

function isFamiliar(char, keyword){
    for (op of char.opinions){
        if (op.keyword == keyword){
            return op.familiar;
        }
    }
}

function getAff(char, keyword){
    for (op of char.opinions){
        if (op.keyword == keyword){
            return op.affinity;
        }
    }
}

function getEmo(score){
    if (score > 20){return 'happy';}
    if (score <21 && score > -21){ return 'indifferent';}
    if (score < -20){return 'angry';}
}

function getEmobyStrength(char1, char2){
    if (char1.strength > char2.strength+30){return 'happy';}
    else if (char1.strength+30 < char2.strength){return 'scared';}
    else {return 'indifferent';}
}

///////////////////////////////////////////////////////////////////// GLOBALS ////////////////////////////////////////////////////////

var sizeX = 30;
var sizeY = 30;
var townTotal = 6;
var dungeonTotal = 8;
var landmarkTotal = 6;
var passes = 2;
var grid = createGrid(sizeX);

var towns = [];
var dungeons = [];
var landmarks = [];
var keywords = [];
var characters = [];
var merchants = [];
var adventurers = [];
var commoners = [];
var mercenaries = [];
var legends = [];
var monsters = [];
var legendaryMonsters = [];
var creatures = [];
var legendaryCreatures = [];
var bandits = [];
var dead = [];
var artifacts = [];
var day = 100;
var kiloyear = 1;
var player;
var orsted;


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
        //this.ruins = false,
        this.desert = false,
        this.dungeon = false,
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

//dungeon Functions      ----------------------------------------------------------------
function choosedungeonName(){
    let mark = getRand(0, dungeonNames.length-1);
    return dungeonNames.splice(mark,1).toString();
}
function choosedungeonPlace(){
    let spot = new Loc();
    spot.x = getRand(1, sizeX-1);
    spot.y = getRand(1, sizeY-1);
    return spot;
}
function chooseDungDesc(){
    return 'A very spooky place';
}

class Dungeon{
    constructor(name=choosedungeonName(), loc=choosedungeonPlace(), description=chooseDungDesc(), countdown=50){
        this.name = name,
        this.loc = loc,
        this.description = description,
        this.countdown = countdown
    }
}

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
function chooseLandmarkDesc(){
    return 'A very enlightening place';
    //write my own? Use gpt3? Also, ultra sword is massive and stuck into the ground. Super huge.
}

class Landmark{
    constructor(name=chooseLandmarkName(), loc=chooseLandmarkPlace(), description=chooseLandmarkDesc(), countdown=50){
        this.name = name,
        this.loc = loc,
        this.description = description,
        this.countdown = countdown
    }
}

//Town                       ----------------------------------------------------------------

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
    constructor(name=chooseTownName(), loc=chooseTownPlace(), desc=chooseDesc(), mercs=[]){
        this.name = name,
        this.loc = loc,
        this.capital= false,
        this.desc = desc,
        this.mercs = mercs
    }
}

//Person                      ----------------------------------------------------------------

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
function choosePersonality(){
    let type = getRand(1,4);
    if (type == 1 || type == 2){return 'normal';}
    if (type == 3){return 'nice';}
    if (type == 4){return 'mean';}
    return 'normal';
}
function chooseHaircolor(){
    let col = getRand(0, hairColors.length-1);
    return hairColors[col];
}
function chooseEyecolor(){
    let col = getRand(0, eyeColors.length-1);
    return eyeColors[col];
}
function chooseHometown(loc){
    for (town of towns){
        if (town.loc == loc){
            return town.loc;
        }
    }
    let homeTown = towns[getRand(0, towns.length-1)];
    return homeTown;
}
function chooseGoals(homeName){
    let goals = [];
    let g = new Goal(homeName, 'live');
    goals.unshift(g);
    return goals;
}
function chooseClothing(){
    let clothes = [];
    let color1 = mutedColors[getRand(0, mutedColors.length-1)];
    let color2 = mutedColors[getRand(0, mutedColors.length-1)];
    let pants = getRand(0, lowerClothes.length-1);
    let shirt = getRand(0, upperClothes.length-1);
    clothes.push(color1+' '+lowerClothes[pants]);
    clothes.push(color2+' '+upperClothes[shirt]);
    clothes.push('nothing');
    clothes.push('nothing');
    return clothes;
}
function chooseMagic(){
    let magic = getRand(1,100);
    if (magic == 69){
        return true;
    } else {return false;}
}
function chooseOpinions(relations, hometown){
    //opinions
    characters = shuffle(characters);
    let opinions = [];
    for (topic of keywords){
        var opi = new Opinion(topic, undefined, undefined);
        opinions.push(opi);
    }
    //have better relationship with family.
    if (relations.length > 0){
        for (rel of relations){
            if (rel.relation == 'father' || rel.relation == 'mother' || rel.relation == 'married'){
                for (op of opinions){
                    if (rel.keyword == op.keyword){
                        op.affinity = getRand(40,80);
                        op.familiar = true;
                    }
                }
            }
            if (rel.relation == 'family' || rel.relation == 'child'){
                for (op of opinions){
                    if (rel.keyword == op.keyword){
                        if (op.affinity < 0){
                            op.affinity = getRand(0,60); 
                            op.familiar = true;}
                    }
                }
            }
            //better relationship between merchant and guard
            if (rel.relation == 'bodyguard' || rel.relation == 'employer'){
                for (op of opinions){
                    if (rel.keyword == op.keyword){
                        op.affinity = getRand(0,79); 
                        op.familiar = true;}
                }
                // for (char of characters){
                //     if (char.name == rel.keyword){
                //         this.party.push(char);
                //     }
                // }
                
            }
        }
    }
    // don't hate hometown too much
    for (op of opinions){
        if (op.keyword == hometown.name){
            op.familiar = true;
            if (op.affinity < 0){op.affinity = getRand(-20, 40)}
        }
    }
     
    // everyone knows and likes big 8
    for (legend of legends){
        for (op of opinions){
            if (op.keyword == legend){
                op.familiar = true;
                op.affinity = getRand(10, 50);
            }
        }
    }

    // everyone dislikes bandits
    for (bandit of bandits){
        for (op of opinions){
            if (op.keyword == bandit){
                op.affinity = getRand(-40, -10);
            }
        }
    }
    // everyone hates orsted
    for (op of opinions){
        if (op.keyword == 'ORSTED THE ANNIHILATOR'){
            op.familiar = true;
            op.affinity = getRand(-80, -60);
        }
    }
    
    //familiar and friendlier with locals
    for (p2 of characters){
        if (p2.hometown.name == hometown.name){
            for (op of opinions){
                if (op.keyword == p2.name){
                    op.familiar = true;
                    op.affinity = op.affinity + 20;
                }
            }
        }
    }
    return opinions;
}  
function chooseRelations(age, hometown, myname){
//mom
characters = shuffle(characters);
let mothered = false;
let relations = [];
for (rel of relations){
    if (rel.relation == 'mother'){mothered = true;}
}
if (mothered == false){
    for (p2 of characters){
        if (p2.age > age + 18 && p2.hometown.name == hometown.name){
            if (p2.gender == 'female'){
                let childCounter = 0;
                for (rel of p2.relations){
                    if (rel.relation == 'child'){childCounter++;}
                }
                if (childCounter < 4){
                    let a = new Relation(p2.name, 'mother');
                    relations.push(a);
                    let b = new Relation(myname, 'child');
                    p2.relations.push(b);

                    //check if married
                    for (rel of p2.relations){
                        if (rel.relation == 'married'){
                            let dad = rel.keyword;
                            let c = new Relation(dad, 'father');
                            relations.push(c);
                            for (dude of characters){
                                if (dude.name == dad){
                                    let d = new Relation(name, 'child');
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
for (rel of relations){
    if (rel.relation == 'mother'){mothered = true;}
}
if (mothered == false){
    let e = new Relation('Dead', 'mother');
    relations.push(e);
}

//dad
characters = shuffle(characters);
let fathered = false;
for (rel of relations){
    if (rel.relation == 'father'){fathered = true;}
}
if (fathered == false){
    for (p2 of characters){
        if (p2.age > age + 18 && p2.hometown.name == hometown.name){
            if (p2.gender == 'male' && p2.name != 'ORSTED THE ANNIHILATOR'){
                let childCounter = 0;
                for (rel of p2.relations){
                    if (rel.relation == 'child'){childCounter++;}
                }
                if (childCounter < 4){
                    let a = new Relation(p2.name, 'father');
                    relations.push(a);
                    let b = new Relation(myname, 'child');
                    p2.relations.push(b);

                    //check if married
                    for (rel of p2.relations){
                        if (rel.relation == 'married'){
                            let mom = rel.keyword;
                            let c = new Relation(mom, 'mother');
                            relations.push(c);
                            for (gal of characters){
                                if (gal.name == mom){
                                    let d = new Relation(myname, 'child');
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
for (rel of relations){
    if (rel.relation == 'father'){fathered = true;}
}
if (fathered == false){
    let f = new Relation('Dead', 'father');
    relations.push(f);
}


//find family
characters = shuffle(characters);

for (rel of relations){
    if (rel.relation == 'father' || rel.relation == 'mother'){
        let parent = rel.keyword;
        for (target of characters){
            if (target.name == parent){
                for (peep of target.relations){
                    //relations of the parents
                    if (peep.relation == 'child' && peep.keyword != myname){
                        let a = new Relation(peep.keyword, 'family');
                        relations.push(a);
                    }
                }
            }
        }
    }
}


//trim duplicates

// for (p1 in this.relations){
//     for (p2 in this.relations){
//         if (p1 != p2 && this.relations[p1].keyword == this.relations[p2].keyword && this.relations[p1].relation == this.relations[p2].relation){
//             this.relations.splice(p2,1);
//         }
//     }
// }


//dead parents if nothing

let momflag = false;
let dadflag = false;
for (p1 of relations){
    if (p1.relation == 'mother'){momflag = true;}
    if (p1.relation == 'father'){dadflag = true;}
}
if (momflag == false){relations.push(new Relation('Dead', 'mother'));}
if (dadflag == false){relations.push(new Relation('Dead', 'father'));}

return relations;
}

class Person {
    constructor(loc, gender=chooseGender(), name=chooseName(gender), age=getRand(18, 80), personality=choosePersonality(), haircolor=chooseHaircolor(),
    eyecolor=chooseEyecolor(), hometown=chooseHometown(loc), goals=chooseGoals(hometown.name), keyMemories=[], clothing=chooseClothing(),
    weapon='fists', strength=getRand(1,20), money=getRand(20,50), goods=(new Goods()), magic=chooseMagic(), relations=chooseRelations(age, hometown, name), opinions=chooseOpinions(relations, hometown), 
    party=[this], actions=[]){
        this.loc = loc,
        this.gender = gender,
        this.name = name,
        this.age = age,
        this.personality = personality,
        this.haircolor = haircolor,
        this.eyecolor = eyecolor,
        this.hometown = hometown,
        this.goals = goals,
        this.keyMemories = keyMemories,
        this.clothing = clothing,
        this.weapon = weapon,
        this.strength = strength,
        this.money = money,
        this.goods = goods,
        this.magic = magic,
        this.relations = relations,
        this.opinions = opinions,
        this.party = party ,
        this.actions = actions;
    }
}

function chooseArtifactType(){
    let roll = getRand(0,6);
    if (roll==1){return 'lower';}
    else if (roll==2){return 'upper';}
    else if (roll==3){return 'hat';}
    else if (roll==4){return 'cape';}
    else{ return 'weapon';}
}

function chooseArtifactName(gear){

    if (gear != 'weapon'){
        let allUp = niceUpper.concat(armorUpper);
        let type = 'dildo';
        if (gear == 'lower'){type = niceLower[getRand(0,niceLower.length-1)];}
        if (gear == 'upper'){type = allUp[getRand(0,allUp.length-1)];}
        if (gear == 'hat'){type = headgear[getRand(0,headgear.length-1)];}
        if (gear == 'cape'){type = capes[getRand(0,capes.length-1)];}

        let name = artifactNames[0,getRand(0,artifactNames.length-1)];
        artifactNames.splice(name,1);
        let color = colors[getRand(0,colors.length-1)];
        desc = artifactDesc[getRand(0, artifactDesc.length-1)]
        artifactDesc.splice(desc,1);
        return name+', '+color+' '+type+' of '+desc;
    }
    else {
        type = swords[getRand(0,swords.length-1)];
        let name = artifactNames[0,getRand(0,artifactNames.length-1)];
        artifactNames.splice(name,1);
        let color = colors[getRand(0,colors.length-1)];
        desc = artifactDesc[getRand(0, artifactDesc.length-1)]
        artifactDesc.splice(desc,1);
        return name+', '+color+' '+type+' of '+desc;
    }
}


class Artifact {
    constructor(loc, type=chooseArtifactType(), name=chooseArtifactName(type), bonus=getRand(50,300), value=getRand(500,3000)){
        this.name = name,
        this.loc = loc, //loc is only used if dropped. if in inventory then set loc to 0,0
        this.bonus = bonus,
        this.value = value,
        this.type = type // 'weapon' if sword
    }
}

function chooseMonsterStrength(name){
    if (containsItem(monsterMinor, name)){
        return getRand(10, 80);
    }
    if (containsItem(monsterMiddle, name)){
        return getRand(100, 180);
    }
    if (containsItem(monsterSuperior, name)){
        return getRand(200, 350);
    }
    if (containsItem(monsterLegend, name)){
        return getRand(700, 1500);
    }
    if (containsItem(creature, name)){
        return getRand(30, 80);
    }
    if (containsItem(legCreature, name)){
        return getRand(1000, 3000);
    }

    return getRand(10,300);
}
function chooseMonsterClothing(name){
    if (name == 'Goblin'){
        return ['leather wrappings','wooden clogs'];
    }
    if (name == 'Kobold'){
        return ['leather loincloth', 'skull helmet'];
    }
    if (name == 'Giant Spider'){
        return ['exoskeleton', 'spiny limbs'];
    }
    if (name == 'Starving Bear'){
        return ['tough fur', 'stubby tail'];
    }
    if (name == 'Animated Skeleton'){
        let clothing = [];
        let color1 = mutedColors[getRand(0, mutedColors.length-1)];
        let color2 = mutedColors[getRand(0, mutedColors.length-1)];
        let pants = getRand(0, lowerClothes.length-1);
        let armor = getRand(0, armorUpper.length-1);
        let hat = getRand(0, headgear.length-1);
        clothing.push(color1+' '+lowerClothes[pants]);
        clothing.push(armorUpper[armor]);
        clothing.push(color2+' '+headgear[hat]);
        return clothing;
    }
    if (name == 'Minotaur'){
        let armorRoll = getRand(0,1);
        if (armorRoll == 1){
            let color1 = mutedColors[getRand(0, mutedColors.length-1)];
            let armor = getRand(0, armorUpper.length-1);
            return ['leather loincloth', color1+' '+armorUpper[armor]]
        }else{
            return ['leather loincloth'];
        }
    }
    if (name == 'Orc'){
        let clothing = [];
        let color1 = mutedColors[getRand(0, mutedColors.length-1)];
        let color2 = mutedColors[getRand(0, mutedColors.length-1)];
        let color3 = colors[getRand(0, colors.length-1)];
        let pants = getRand(0, lowerClothes.length-1);
        let armor = getRand(0, armorUpper.length-1);
        let hat = getRand(0, headgear.length-1);
        clothing.push(color1+' '+lowerClothes[pants]);
        clothing.push(armorUpper[armor]);
        clothing.push(color2+' '+headgear[hat]);
        let cape = getRand(0, capes.length-1);
        clothing.push(color3+' '+capes[cape]);
        return clothing;
    }
    if (name == 'Great Wolf'){
        return ['tough fur'];
    }
    if (name == 'Reaper'){
        return ['cloak of shadows'];
    }
    if (name == 'Griffon'){
        return ['steely feathers', 'sturdy hide'];
    }
    if (name == 'Titan'){
        let clothing = [];
        let color1 = colors[getRand(0, colors.length-1)];
        let color2 = colors[getRand(0, colors.length-1)];
        let pants = getRand(0, lowerClothes.length-1);
        let armor = getRand(0, armorUpper.length-1);
        let hat = getRand(0, headgear.length-1);
        clothing.push(color1+' '+lowerClothes[pants]);
        clothing.push(armorUpper[armor]);
        clothing.push(color2+' '+headgear[hat]);
        return clothing;
    }
    if (name == 'Vampire'){
        return ['black suit', 'umbra cape'];
    }
    if (name == 'Dragon'){
        return ['sturdy scales', 'portruding spines', 'left wing', 'right wing'];
    }
    if (name == 'Hydra'){
        return ['sturdy scales', 'portruding spines', 'several heads', 'swinging tail'];
    }
    if (name == 'Chimera'){
        return ['lion head', 'goat body', 'serpent tail'];
    }
    if (name == 'Demon King'){
        return ['obsidian armor', 'cape of flames', 'shadowed hood'];
    }
    if (name == 'Ultra Serpent'){
        return ['jet black metal scales', 'red glowing eyes'];
    }
    if (name == 'Guardian Owl'){
        return ['Fluffy feathers'];
    }
    if (name == 'Lost Spirit'){
        return ['Ectoplasm'];
    }
    if (name == 'Curious Faerie'){
        return ['pretty wings'];
    }
    if (name == 'Noble Wyvern'){
        return ['sturdy hide', 'durable feathers'];
    }
    if (name == 'Wise Stag'){
        return ['sturdy hide'];
    }
    if (name == 'Pesky Gnome'){
        return ['cute little hat'];
    }
    if (name == 'Giant Turtle'){
        return ['mighty shell'];
    }
    if (name == 'Wild Pheonix'){
        return ['majestic feathers', 'flaming shroud'];
    }
    if (name == 'Great Fox'){
        return ['Sleek Fur'];
    }
    if (name == 'Wild Pegasus'){
        return ['Gorgeous wings'];
    }
    if (name == 'Spirit Wolf'){
        return ['Sleek Fur', 'spectral presence'];
    }
    if (name == 'Lightning Hawk'){
        return ['Crackling Wings', 'Shocking feathers'];
    }
    return ['big silly hat'];
}
function chooseMonsterWeapon(name){
    if (name == 'Goblin'){
        return 'knife';
    }
    if (name == 'Kobold'){
        return 'wooden spear';
    }
    if (name == 'Giant Spider'){
        return 'sharp mandibles';
    }
    if (name == 'Starving Bear'){
        return 'sharp claws';
    }
    if (name == 'Animated Skeleton'){
        return swords[getRand(0, swords.length-1)];
    }
    if (name == 'Minotaur'){
        return swords[getRand(0, swords.length-1)];
    }
    if (name == 'Orc'){
        return swords[getRand(0, swords.length-1)];
    }
    if (name == 'Great Wolf'){
        return 'sharp claws';
    }
    if (name == 'Griffon'){
        return 'sharp claws';
    }
    if (name == 'Vampire'){
        return 'blade fingers';
    }
    if (name == 'Reaper'){
        return 'razor sharp scythe';
    }
    if (name == 'Dragon'){
        return 'enormous fangs';
    }
    if (name == 'Titan'){
        return 'massive '+swords[getRand(0, swords.length-1)];
    }
    if (name == 'Hydra'){
        return 'enormous fangs';
    }
    if (name == 'Chimera'){
        return 'deadly fangs';
    }
    if (name == 'Demon King'){
        let wep = new Artifact({x:0,y:0}, 'weapon');
        artifacts.push(wep);
        keywords.push(wep.name);
        return wep.name;
    }
    if (name == 'Ultra Serpent'){
        return 'venomous fangs';
    }
    if (name == 'Guardian Owl'){
        return 'sharp beak';
    }
    if (name == 'Lost Spirit'){
        return 'spectral slap';
    }
    if (name == 'Curious Faerie'){
        return 'magic dust';
    }
    if (name == 'Noble Wyvern'){
        return 'savage claws';
    }
    if (name == 'Wise Stag'){
        return 'deadly antlers';
    }
    if (name == 'Pesky Gnome'){
        return 'annoying voice';
    }
    if (name == 'Giant Turtle'){
        return 'sharp beak';
    }
    if (name == 'Wild Pheonix'){
        return 'fireball strike';
    }
    if (name == 'Great Fox'){
        return 'sharp claws';
    }
    if (name == 'Wild Pegasus'){
        return 'powerful hooves';
    }
    if (name == 'Spirit Wolf'){
        return 'ghostly fangs';
    }
    if (name == 'Lightning Hawk'){
        return 'lightning bolt';
    }
    return 'giant dildo';
}
function chooseMonsterDescription(name){
    let size;
    let sizes1 = ['small', 'little', 'puny', 'short', 'weak'];
    let sizes2 = ['small', 'intimidating', 'big', 'large', 'huge', 'massive', 'imposing', 'strong'];
    let sizes3 = [ 'large', 'huge', 'massive', 'colossal', 'enormous', 'gigantic', 'powerful'];
    let color = colors[getRand(0, colors.length-1)];
    let emotions = ['pissed off', 'angry', 'annoyed', 'furious', 'enraged', 'hungry', 'evil', 'nefarious', 'insidious', 'predatory'];
    if (containsItem(monsterMinor, name)){size = sizes1;}
    if (containsItem(monsterMiddle, name)){size = sizes2;}
    if (containsItem(monsterSuperior, name)){size = sizes3;}
    if (containsItem(monsterLegend, name)){size = sizes3;}
    if (containsItem(creature, name)){size = sizes2;}
    if (containsItem(legCreature, name)){size = sizes3;}
    if (name == 'Pesky Gnome'){size = ['itty bitty'];}
    let emotion = emotions[getRand(0, emotions.length-1)]
    let sizer = size[getRand(0, size.length-1)];

    if (containsItem(creature,name) || containsItem(legCreature, name)){
        return 'The creature is a '+color+' '+name+'. It is '+sizer+' and looks peaceful.';
    }

    return 'The monster type is '+color+' '+name+'. It is '+sizer+' and looks '+emotion+'.';
}
function chooseMonsterGoal(name){
    if (containsItem(monsterLegend, name)){
        let goal = new Goal(name, 'monsterWander');
        let goals = [];
        goals.push(goal);
        return goals;
    }
    if (containsItem(creature,name) || containsItem(legCreature, name)){
        let goal = new Goal(name, 'wander');
        let goals = [];
        goals.push(goal);
        return goals;
    }

    let goal = new Goal(name, 'prowl');
    let goals = [];
    goals.push(goal);
    return goals;
}

class Monster {
    constructor(name, loc, goals=chooseMonsterGoal(name), strength=chooseMonsterStrength(name), clothing=chooseMonsterClothing(name), weapon=chooseMonsterWeapon(name), description=chooseMonsterDescription(name), party=[this], actions=[]){
        //I'm gonna keep the constructors this way so that if i wanted to make custom monsters later I can.
        this.name = name,
        this.loc = loc,
        this.goals = goals,
        this.strength = strength,
        this.clothing = clothing,
        this.weapon = weapon,
        this.description = description,
        this.party = party,
        this.actions = actions
    }
}

//Goods                      ----------------------------------------------------------------

class Goods{
    constructor(wood=0, iron=0, leather=0, food=getRand(1,5), inventory=[]){
        this.wood = wood,
        this.iron = iron,
        this.leather = leather,
        this.food = food,
        this.inventory = inventory
    }
}

//Opinion                      ----------------------------------------------------------------


class Opinion{
    constructor(keyword, affinity=getRand(-49,49), familiar=false){
        this.keyword = keyword,
        this.affinity = affinity,
        this.familiar = familiar
    }
}

//Relation                    ---------------------------------------------------------------------


class Relation{
    constructor(keyword, relation='acquaintance'){
        this.keyword = keyword,
        this.relation = relation
    }
}

//-100 -> -80 Hate, will attack on sight and actively hunt down target.
//-80 -> -60  despise, will attack on sight.
//-60 -> -40  annoyed, will only insult
//-40 -> -20  dislike, will barely talk
//-20 -> 0    neutral dislike, will say bare minimum
//0  -> 20    neutral like, will say a little
//20 -> 40    like, will give info
//40 -> 60    friend, will do their best to help
//60 -> 80    ally, might help you in battle and will aid in most ways
//80 -> 100   loved, will always help in battle and do everything they can for you

//Goal                       ------------------------------------------------------------------------

class Goal{
    constructor(keyword, action){
        this.keyword = keyword,
        this.action = action
    }
}

//Key Memory                ---------------------------------------------------------------------------

//A Key Memory is something that happened in the past that left an impression on the character. Examples: 
//Fighting or being attacked
//visiting a town or dungeons
//meeting a big 8 character or ruler
//finding an artifact
//someone they liked and was familiar with died

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
    constructor(time, people=[], place=chooseMemPlace(), takeAway=chooseMemTakeAway(), emotion=chooseEmotion()){
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
                //console.log("town created at: "+ roll1 + " , " + roll2);
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

    //each town needs to be accessible
    for (town1 of towns){
        for (town2 of towns){
            if (town1.name != town2.name){
                console.log('~~~')
                console.log(town1.loc);
                console.log(town2.loc);
                let route = findPath(town1.loc, town2.loc);
                if (route == false){
                    let bulldozer = findPathFlying(town1.loc, town2.loc);
                    console.log(bulldozer);
                    if (bulldozer != false){
                        for (tile of bulldozer){
                            let x = tile.x; 
                            let y = tile.y;
                            grid[x][y].mountain = false;
                            grid[x][y].water = false;
                            grid[x][y].grassland = true;
                            grid[x][y].tundra = false;
                            grid[x][y].desert = false;
                            grid[x][y].swamp = false;
                            grid[x][y].setRocks(1);
                            grid[x][y].setTrees(4);
                            grid[x][y].setWildlife(4);
                            grid[x][y].setFlowers(2);
                        }
                    }else{
                        console.log('couldnt find route????');
                    }
                }
            }
        }
    }
}

function seedLandmarks(){

    var dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}

    let z = 0; 
    let counter = 0;

    while(z<landmarkTotal){
        var roll1 = getRand(1,(sizeX-2));
        var roll2 = getRand(1,(sizeY-2));
        //console.log("checking: "+roll1+","+roll2);
        if (grid[roll1][roll2].water == false && grid[roll1][roll2].mountain == false && grid[roll1][roll2].town == false && grid[roll1][roll2].dungeon == false){
            var tooclose = false; //flag
            for (i=(roll1-dist); i<=(roll1+dist);i++){
                for (j=(roll2-dist); j<=(roll2+dist);j++){
                    //check if looking outside bounds
                    if ((i<0) || (i>(sizeX-1)) || (j<0) || (j>(sizeY-1))){
                        continue;
                    }
                    if (grid[i][j].landmark == true){
                        tooclose = true;
                        //console.log("too close!");
                    }
                }
            }
            if (tooclose == false){
                //console.log("town created at: "+ roll1 + " , " + roll2);
                grid[roll1][roll2].landmark = true;
                let place = new Loc();
                place.x = roll1;
                place.y = roll2;
                let mark = new Landmark(undefined, place, undefined);
                landmarks.push(mark);
                keywords.push(mark.name);
                z++;
                
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (sizeX*sizeY)){
            z = (landmarkTotal + 1);
        }
    }

    //each town needs to be accessible
    for (town1 of towns){
        for (town2 of landmarks){
            if (town1.name != town2.name){
                console.log('~~~')
                console.log(town1.loc);
                console.log(town2.loc);
                let route = findPath(town1.loc, town2.loc);
                if (route == false){
                    let bulldozer = findPathFlying(town1.loc, town2.loc);
                    console.log(bulldozer);
                    if (bulldozer != false){
                        for (tile of bulldozer){
                            let x = tile.x; 
                            let y = tile.y;
                            grid[x][y].mountain = false;
                            grid[x][y].water = false;
                            grid[x][y].grassland = true;
                            grid[x][y].tundra = false;
                            grid[x][y].desert = false;
                            grid[x][y].swamp = false;
                            grid[x][y].setRocks(1);
                            grid[x][y].setTrees(4);
                            grid[x][y].setWildlife(4);
                            grid[x][y].setFlowers(2);
                        }
                    }else{
                        console.log('couldnt find route????');
                    }
                }
            }
        }
    }
}

function seedDungeons(){
 
    var dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}

    var q = 0; 
    var counter = 0;
   
    while(q<dungeonTotal){
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
                    if (grid[i][j].dungeon == true){
                        tooclose = true;
                        //console.log("too close!");
                    }
                }
            }
            if (tooclose == false){
                //console.log("dungeon created at: "+ roll1 + " , " + roll2);
                grid[roll1][roll2].dungeon = true;
                let place = new Loc();
                place.x = roll1;
                place.y = roll2;
                let mark = new Dungeon(undefined, place, undefined);
                dungeons.push(mark);
                keywords.push(mark.name);

                //create artifacts!
                let place2 = new Loc();
                place2.x = roll1;
                place2.y = roll2;
                let artifact = new Artifact(place2);
                artifacts.push(artifact);
                keywords.push(artifact.name);
                q++;
            }
        }
        counter ++;
        //if impossible to make more dungeons
        if (counter > (sizeX*sizeY)){
            q = (dungeonTotal + 1);
        }
    }
        //each dungeon needs to be accessible
        for (dun1 of dungeons){
            for (town2 of towns){
                if (dun1.name != town2.name){
                    console.log('~~~')
                    console.log(dun1.loc);
                    console.log(town2.loc);
                    let route = findPath(dun1.loc, town2.loc);
                    if (route == false){
                        let bulldozer = findPathFlying(dun1.loc, town2.loc);
                        console.log(bulldozer);
                        if (bulldozer != false){
                            for (tile of bulldozer){
                                let x = tile.x; 
                                let y = tile.y;
                                grid[x][y].mountain = false;
                                grid[x][y].water = false;
                                grid[x][y].grassland = true;
                                grid[x][y].tundra = false;
                                grid[x][y].desert = false;
                                grid[x][y].swamp = false;
                                grid[x][y].setRocks(1);
                                grid[x][y].setTrees(4);
                                grid[x][y].setWildlife(4);
                                grid[x][y].setFlowers(2);
                            }
                        }else{
                            console.log('couldnt find route????');
                        }
                    }
                }
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
            if (roadRoute != false){
                for (item of roadRoute){
                    //console.log(item.x + "," + item.y);
                    if (grid[item.x][item.y].town == false){
                        grid[item.x][item.y].road = true;
                    }
                }
            }
            else {console.log('cannot build road');} 
        }
        townsDone.push(townStart.loc);
        closeby = [];
    }
}

function seedRelations(){
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
                if (p2.age > person.age + 18 && p2.hometown.name == person.hometown.name){
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
                                            let d = new Relation(person.name, 'child');
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
                if (p2.age > person.age + 18 && p2.hometown.name == person.hometown.name){
                    if (p2.gender == 'male' && p2.name != 'ORSTED THE ANNIHILATOR'){
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
                                            let d = new Relation(person.name, 'child');
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
            if (person.gender != p2.gender && p2.hometown.name == person.hometown.name){
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
                    if (p2.age < person.age + 5 && p2.age > person.age -5 && ismarried == false && p2.hometown.name == person.hometown.name){
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
        // for (merch of merchants){
        //     if (merch == person.name){
        //         person.relations.push(new Relation('Dead', 'mother'));
        //         person.relations.push(new Relation('Dead', 'father'));
        //     }
        // }

        
    }

    //trim duplicates

    // for (person of characters){
    //     console.log(person);
    //     for (p1 in person.relations){
    //         for (p2 in person.relations){
    //             console.log('p1: '+person.relations[p1].keyword);
    //             console.log('p2: '+person.relations[p2].keyword);
    //             if (p1 != p2 && person.relations[p1].keyword == person.relations[p2].keyword && person.relations[p1].relation == person.relations[p2].relation){
    //                 person.relations.splice(p2,1);
    //             }
    //         }
    //     }
    // }


}

function seedOpinions(){
    //opinions
    characters = shuffle(characters);
    for (person of characters){
        for (topic of keywords){
            var opi = new Opinion(topic, undefined, undefined);
            person.opinions.push(opi);
        }
        //have better relationship with family.
        for (rel of person.relations){
            if (rel.relation == 'father' || rel.relation == 'mother' || rel.relation == 'married'){
                for (op of person.opinions){
                    if (rel.keyword == op.keyword){
                        op.affinity = getRand(40,80);
                        op.familiar = true;
                    }
                }
            }
            if (rel.relation == 'family' || rel.relation == 'child'){
                for (op of person.opinions){
                    if (rel.keyword == op.keyword){
                        if (op.affinity < 0){
                            op.affinity = getRand(0,60); 
                            op.familiar = true;}
                    }
                }
            }
            //better relationship between merchant and guard
            if (rel.relation == 'bodyguard' || rel.relation == 'employer'){
                for (op of person.opinions){
                    if (rel.keyword == op.keyword){
                        op.affinity = getRand(0,79); 
                        op.familiar = true;}
                }
                //person.party.push(rel.keyword);
            }
        }
        // don't hate hometown too much
        for (op of person.opinions){
            if (op.keyword == person.hometown.name){
                op.familiar = true;
                if (op.affinity < 0){op.affinity = getRand(-20, 40)}
            }
        }
         
        // everyone knows and likes big 8
        for (legend of legends){
            for (op of person.opinions){
                if (op.keyword == legend){
                    op.familiar = true;
                    op.affinity = getRand(0, 80);
                }
            }
        }

        // everyone dislikes bandits
        for (bandit of bandits){
            for (op of person.opinions){
                if (op.keyword == bandit){
                    op.affinity = getRand(-59, -10);
                }
            }
        }
        // everyone dislikes legendary monsters
        for (monster of legendaryMonsters){
            for (op of person.opinions){
                if (op.keyword == monster){
                    op.affinity = getRand(-59, -30);
                    op.familiar = true;
                }
            }
        }
        // everyone hates orsted
        for (op of person.opinions){
            if (op.keyword == 'ORSTED THE ANNIHILATOR'){
                op.familiar = true;
                op.affinity = getRand(-70, -30);
            }
        }
        
        //familiar and friendlier with locals
        for (p2 of characters){
            if (p2.hometown.name == person.hometown.name){
                for (op of person.opinions){
                    if (op.keyword == p2.name){
                        op.familiar = true;
                        op.affinity = op.affinity + 20;
                    }
                }
            }
        }
        
    } 
    //ORSTED
    // for (topic of keywords){
    //     var opi = new Opinion(topic, undefined, undefined);
    //     orsted.opinions.push(opi);
    // }
     
    for (op of orsted.opinions){
        op.affinity = getRand(-60,0); 
        op.familiar = true;}
        if (player != undefined){
            if (op.keyword == player.name){
                op.affinity = -100;
            }
        }
            
}

function spawnCommoner(town, age=undefined, empty, empty2){
    let x = town.loc.x.valueOf();
    let y = town.loc.y.valueOf();
    let place = {x:x,y:y};
    let character = new Person(place, undefined, undefined, age, undefined, undefined, undefined, town, undefined, 
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, empty, empty2);
    characters.push(character);
    keywords.push(character.name);
    commoners.push(character.name);
    return character;
}

function spawnMercenary(town, age=undefined, empty, empty2){
    let goal = new Goal(town.name, 'live');
    let goals = [];
    goals.unshift(goal);
    let x = town.loc.x.valueOf();
    let y = town.loc.y.valueOf();
    let place = {x:x,y:y};
    let clothing = [];
    let color1 = mutedColors[getRand(0, mutedColors.length-1)];
    let color2 = mutedColors[getRand(0, mutedColors.length-1)];
    let pants = getRand(0, lowerClothes.length-1);
    let armor = getRand(0, armorUpper.length-1);
    let hat = getRand(0, headgear.length-1);
    clothing.push(color1+' '+lowerClothes[pants]);
    clothing.push(armorUpper[armor]);
    clothing.push(color2+' '+headgear[hat]);
    clothing.push('nothing');
    clothing.push('nothing');

    let weapon = swords[getRand(0, swords.length-1)];;
    let strength = getRand(20,100);
    let money = getRand(50,200);
    

    let character = new Person(place, undefined, undefined, age, undefined, undefined, undefined, town, goals, undefined, clothing, weapon, strength, money,
        undefined, undefined, empty, empty2);
    characters.push(character);
    keywords.push(character.name);
    town.mercs.push(character);
    mercenaries.push(character.name);
    return character;
}

function spawnBodyguard(town, employer, age=undefined, empty, empty2){
    let goals = [];
    let goal = new Goal(town.name, 'live');
    goals.unshift(goal);
    goal = new Goal(town.name, 'travel');
    goals.unshift(goal);
    goal = new Goal(employer.name, 'help');
    goals.unshift(goal);
    
    let x = town.loc.x.valueOf();
    let y = town.loc.y.valueOf();
    let place2 = {x:x,y:y};
    let clothing = [];
    let color1 = colors[getRand(0, colors.length-1)];
    
    let pants = getRand(0, niceLower.length-1);
    let armor = getRand(0, armorUpper.length-1);
    clothing.push(color1+' '+niceLower[pants]);
    clothing.push(armorUpper[armor]);

    if (1 == getRand(1,2)){
        let color = colors[getRand(0, colors.length-1)];
        let hat = getRand(0, merchHats.length-1);
        clothing.push(color+' '+merchHats[hat]);
    }
    else{
        let color = mutedColors[getRand(0, mutedColors.length-1)];
        let hat = getRand(0, headgear.length-1);
        clothing.push(color+' '+headgear[hat]);
    }
    clothing.push('nothing');
    

    let weapon = swords[getRand(0, swords.length-1)];
    let strength = getRand(60,160);
    let money = getRand(100,200);
    
    let guard = new Person(place2, undefined, undefined, age, undefined, undefined, undefined, town, goals, undefined, clothing, weapon, strength, money,
        undefined, undefined, empty, empty2, undefined);
    
    let a = new Relation(guard.name, 'bodyguard');
    let b = new Relation(employer.name, 'employer');
    employer.party.push(guard);
    guard.party.push(employer);
    employer.relations.push(a);
    guard.relations.push(b);
    

    characters.push(guard);
    keywords.push(guard.name);
    mercenaries.push(guard.name);
    return guard;
}

function spawnMerchant(town, age=undefined, empty, empty2){
    let goals = [];
    let target = towns[getRand(0,towns.length-1)];
    goal = new Goal(target.name, 'rest');
    goals.unshift(goal);
    goal = new Goal(target.name, 'travel');
    goals.unshift(goal);
    let i = town.loc.x.valueOf();
    let j = town.loc.y.valueOf();
    let place = {x:i,y:j};
    

    let clothing = [];
    let color1 = colors[getRand(0, colors.length-1)];
    let color2 = colors[getRand(0, colors.length-1)];
    let pants = getRand(0, niceLower.length-1);
    let shirt = getRand(0, niceUpper.length-1);
    let hat = getRand(0, merchHats.length-1);
    clothing.push(color1+' '+niceLower[pants]);
    clothing.push(color2+' '+niceUpper[shirt]);
    clothing.push(color2+' '+merchHats[hat]);
    clothing.push('nothing');

    let money = getRand(200,800);
    let goods = new Goods(getRand(0,100), getRand(0,100), getRand(0,100), getRand(0,100))
    let character = new Person(place, undefined, undefined, age, undefined, undefined, undefined, town, goals, 
        undefined, clothing, undefined, undefined, money, goods, undefined, empty, empty2, undefined);
    

    //bodyguards
    let bodynum = getRand(1,2);
    for (j=0; j<bodynum; j++){
        let e1 = [];
        let e2 = [];
       spawnBodyguard(town, character, undefined, e1, e2);
    }
    characters.push(character);
    keywords.push(character.name);
    merchants.push(character.name);
    return character;
}

function spawnAdventurer(town, age=undefined, empty, empty2){
    let goals = [];
    let target = dungeons[getRand(0,dungeons.length-1)];
    let goal = new Goal(target.name, 'travel');
    goals.unshift(goal);
    goal = new Goal(town.name, 'rest');
    goals.unshift(goal);
    let x = town.loc.x.valueOf();
    let y = town.loc.y.valueOf();
    let place = {x:x,y:y};
    
    let clothing = [];
        let color1 = colors[getRand(0, colors.length-1)];
        let color2 = colors[getRand(0, colors.length-1)];
        let color3 = colors[getRand(0, colors.length-1)]
        let pants = getRand(0, niceLower.length-1);
        let armor = getRand(0, armorUpper.length-1);
        clothing.push(color1+' '+niceLower[pants]);
        clothing.push(color2+' '+armorUpper[armor]);

        if (1 == getRand(1,2)){
            let color = colors[getRand(0, colors.length-1)];
            let hat = getRand(0, headgear.length-1);
            clothing.push(color+' '+headgear[hat]);
        }
        else {clothing.push('nothing');}
        
        let cape = getRand(0, capes.length-1);
        clothing.push(color3+' '+capes[cape]);

    let weapon = swords[getRand(0, swords.length-1)];
    let strength = getRand(120,240);
    let money = getRand(200,350);
    let magic = false;
    if (1 == getRand(0,1)){magic = true;}

    let character = new Person(place, undefined, undefined, age, undefined, undefined, undefined, town, goals, undefined, clothing, weapon, strength, money, 
        undefined, magic, empty, empty2);
    characters.push(character);
    keywords.push(character.name);
    adventurers.push(character.name);
    return character;
}

function spawnLegend(town, empty, empty2){
    let goals = [];
    let target = dungeons[getRand(0,dungeons.length-1)];
    let goal = new Goal(target.name, 'travel');
    goals.unshift(goal);
    goal = new Goal(town.name, 'rest');
    goals.unshift(goal);
    let x = town.loc.x.valueOf();
    let y = town.loc.y.valueOf();
    let place = {x:x,y:y};

    let clothing = [];
    let color1 = colors[getRand(0, colors.length-1)];
    let color2 = colors[getRand(0, colors.length-1)];
    let color3 = colors[getRand(0, colors.length-1)]
    let pants = getRand(0, niceLower.length-1);
    let armor = getRand(0, armorUpper.length-1);
    clothing.push(color1+' '+niceLower[pants]);
    clothing.push(color2+' '+armorUpper[armor]);

    if (1 == getRand(1,2)){
        let color = colors[getRand(0, colors.length-1)];
        let hat = getRand(0, headgear.length-1);
        clothing.push(color+' '+headgear[hat]);
    }
    else{clothing.push('nothing');}
    
    let cape = getRand(0, capes.length-1);
    clothing.push(color3+' '+capes[cape]);

    let weapon = swords[getRand(0, swords.length-1)];
    let strength = getRand(300,400);
    let money = getRand(700,1000);
    let magic = false;
    if (1 == getRand(0,1)){magic = true;}
    
    let gender = 'male';
    if (getRand(0, 1) == 1) {gender = 'male';}
    else {gender = 'female';}

    let name = '---'
    if (gender == 'male'){
        name = getRand(0, maleNames.length-1);
        name = maleNames.splice(name,1).toString();
    }
    else {
        name = getRand(0, femaleNames.length-1);
        name = femaleNames.splice(name,1).toString();
    }

    let color = getRand(0, colors.length-1);
    let eyecolor = colors[color];
    let haircolor = eyecolor;

    if ( 1 == getRand(0,1)){
        name = name+', '+titles.splice(getRand(0,titles.length-1),1).toString();
    }
    else{
        let fulltitles = ['The Hero of '+town.name, 'The Savior of '+town.name, 'The Legend of '+town.name, 
            dungeons[getRand(0,dungeons.length-1)].name+'\'s Warden', dungeons[getRand(0,dungeons.length-1)].name+'\'s Tyrant', dungeons[getRand(0,dungeons.length-1)].name+'\'s Watcher', 
            'The '+haircolor+' Pheonix', 'The '+haircolor+' Fox', 'The '+haircolor+' Hawk', 'The '+haircolor+' Lion', 'The '+haircolor+' Shark', 
            'The '+haircolor+' Eagle', 'The '+haircolor+' Bear', 'The '+haircolor+' Snake', 'The '+haircolor+' Menace', 'The '+haircolor+' Hero', 'The '+eyecolor+' eyed Master'];

        name = name+', '+fulltitles.splice(getRand(0,fulltitles.length-1),1).toString();
        }

    let character = new Person(place, gender, name, undefined, undefined, haircolor, eyecolor, town, goals, undefined, 
        clothing, weapon, strength, money, undefined, magic, empty, empty2);
    characters.push(character);
    keywords.push(character.name);
    legends.push(character.name);
    return character;
}

function spawnMinorM(x,y,goals=undefined){
    let mon = monsterMinor[getRand(0,monsterMinor.length-1)];
    let i = x;
    let j = y;
    let monster = new Monster(mon, {x:i,y:j}, goals);
    monsters.push(monster);
}

function spawnMiddleM(x,y,goals=undefined){
    let i = x;
    let j = y;
    let mon = monsterMiddle[getRand(0,monsterMiddle.length-1)];
    let monster = new Monster(mon, {x:i,y:j}, goals);
    monsters.push(monster);
}

function spawnSuperiorM(x,y, goals=undefined){
    let i = x;
    let j = y;
    let mon = monsterSuperior[getRand(0,monsterSuperior.length-1)];
    let monster = new Monster(mon, {x:i,y:j}, goals);
    monsters.push(monster);
}

function spawnMonsterLegend(x,y, goals=undefined){
    let i = x;
    let j = y;
    let mon = monsterLegend[getRand(0,monsterLegend.length-1)];
    let monster = new Monster(mon, {x:i,y:j}, goals);
    monster.name = (artifactNames.splice(getRand(0,artifactNames.length-1),1).toString()+' '+monsterTitles.splice(getRand(0,monsterTitles.length-1),1).toString());
    monsters.push(monster);
    legendaryMonsters.push(monster.name);
    keywords.push(monster.name);
}

function spawnCreature(x,y,goals=undefined){
    let creat = creature[getRand(0,creature.length-1)];
    let i = x;
    let j = y;
    let creatured = new Monster(creat, {x:i,y:j}, goals);
    creatures.push(creatured);
    monsters.push(creatured);
}

function spawnCreatureLegend(x,y,goals=undefined){
    let creat = legCreature[getRand(0,legCreature.length-1)];
    let i = x;
    let j = y;
    let creature = new Monster(creat, {x:i,y:j}, goals);
    creature.name = (artifactNames.splice(getRand(0,artifactNames.length-1),1).toString()+', The '+creature.name);
    creatures.push(creature);
    monsters.push(creature);
    legendaryCreatures.push(creature.name);
    keywords.push(creature.name);
}

function spawnBandit(x,y, empty, empty2){
    let goals = [];
    let goal = new Goal(x+','+y, 'rob');
    goals.unshift(goal);
    
    
    let clothing = [];
    let color1 = mutedColors[getRand(0, mutedColors.length-1)];
    let color2 = mutedColors[getRand(0, mutedColors.length-1)];
    let pants = getRand(0, lowerClothes.length-1);
    let shirt = getRand(0, upperClothes.length-1);
    clothing.push(color1+' '+lowerClothes[pants]);
    clothing.push(color2+' '+upperClothes[shirt]);
    clothing.push('nothing');
    clothing.push('nothing');
    let i = x;
    let j = y;

    let weapon = swords[getRand(0, swords.length-1)];;
    let strength = getRand(10,60);
    let money = getRand(1,40);
    loc = {x:i,y:j};
    //let town = towns[getRand(0, towns.length-1)];
 
    let character = new Person(loc, undefined, undefined, undefined, undefined, undefined, undefined, undefined, goals, undefined, clothing, weapon, strength, money, undefined, 
        undefined, empty, empty2);
    characters.push(character);
    keywords.push(character.name);
    bandits.push(character.name);
    return character;
}

function seedCharacters(){

    //1. add commoners
    //2. add mercenaries/ soldiers
    //3. add merchants and their bodyguards
    //4. add adventurers
    //5. add big 8
    //6. add Orsted

    //these values are per town
    let commonies = 20;
    let mercies = 6;
    let merchies = 5;
    let adventies = 4;
    let legendmon = 3;
    let legendcreat = 3;

    //commoners
    //mostly just mill about in town. Every so often will travel to a new town.
    createCommoners = function(){
        for (town of towns){
            for (i=0; i<commonies;i++){
                let e1 = [];
                let e2 = [];
                spawnCommoner(town,undefined, e1, e2);
            } 
        } 
    }
    //mercenaries
    //these guys wait around for a job. If a bounty is posted or the ruler orders them to fight, they will mobilize. Can be hired by anyone for protection.
    createMercenaries = function(){
        for (town of towns){
            for (i=0; i<mercies;i++){
                let e1 = [];
                let e2 = [];
                spawnMercenary(town, undefined, e1, e2);
            }
        }
    }

    //merchants
    //these guys travel between towns trading goods. accompanied by 1-2 bodyguards.
    createMerchants = function(){
        for (town of towns){
            for (i=0; i<merchies;i++){
                let e1 = [];
                let e2 = [];
                spawnMerchant(town, undefined, e1, e2);
            }
        }
    }

    //adventurers
    //travel between dungeons, occasionally rest at a town
    createAdventurers = function(){
        for (town of towns){
            for (i=0; i<adventies;i++){
                let e1 = [];
                let e2 = [];
                spawnAdventurer(town, undefined, e1, e2);
            }
        }
    }

    //Legends (the best of these will become the big 8)
    //travel between dungeons, occasionally rest at a town
    createLegends = function(){
        for (town of towns){
            for (i=0; i<2;i++){
                let e1 = [];
                let e2 = [];
                spawnLegend(town, e1, e2);
            }
        }
    }

    //ORSTED THE ANNHILIATOR
    //travels between dungeons and towns, hunting down the player.
    createOrsted = function(){
        let startloc = dungeons[getRand(0,dungeons.length-1)];
        let gender = 'male';
        let goals = [];

        let artifact = new Artifact({x:0,y:0}, 'weapon', 'THE GODSWORD', 10000, 100000);
        artifacts.push(artifact);
        keywords.push(artifact.name);

        let artifact2 = new Artifact({x:0,y:0}, 'lower', 'perfectly clean white pants', 1000, 100000);
        artifacts.push(artifact2);
        keywords.push(artifact2.name);

        let artifact3 = new Artifact({x:0,y:0}, 'upper', 'pure white coat with a high collar and golden buttons', 1000, 100000);
        artifacts.push(artifact3);
        keywords.push(artifact3.name);

        let artifact4 = new Artifact({x:0,y:0}, 'hat', 'white hood with intricate black markings', 1000, 100000);
        artifacts.push(artifact4);
        keywords.push(artifact4.name);

        let artifact5 = new Artifact({x:0,y:0}, 'cape', 'jet black cape strung from golden chains', 1000, 100000);
        artifacts.push(artifact5);
        keywords.push(artifact5.name);

        // let goal = new Goal(player.name, 'kill '+player.name);
        // goals.push(goal);
        let target = dungeons[getRand(0,dungeons.length-1)];
        goal = new Goal(target.name, 'travel');
        goals.unshift(goal);

        let clothing = [];
        
        clothing.push('perfectly clean white pants');
        clothing.push('pure white coat with a high collar and golden buttons');
        clothing.push('white hood with intricate black markings');
        clothing.push('jet black cape strung from golden chains');

        let weapon = 'THE GODSWORD';
        let strength = 10000;
        let money = 0;
        let magic = true;
        let name = 'ORSTED THE ANNIHILATOR';
        let eyecolor = 'Golden';
        let haircolor = 'White';
        let empty1 = [];
        let empty2 = [];

        let x = startloc.loc.x.valueOf();
        let y = startloc.loc.y.valueOf();
        let place = {x:x,y:y};

        orsted = new Person(place, gender, name, 100, 'GOD', haircolor, eyecolor, towns[getRand(0,towns.length-1)], goals, undefined, clothing, weapon, strength, money, undefined, magic, empty1, empty2);
        characters.push(orsted);
        keywords.push(orsted.name);
        legends.push(orsted.name);
    } 

    //monsterSuperior
    //on average about 1 monster every four tiles would be good...
    //lesser monsters on grasslands
    //middle monsters and lesser monsters on desert and tundra
    //superior monsters on dungeons and swamps
    createMonsters = function(){
        //spawn normal monsters
        for (i=1; i<sizeX;i++){
            for (j=1; j<sizeY; j++){
                if (grid[i][j].water == false && grid[i][j].mountain == false){

                    //creatures
                    let roll = getRand(0,15);
                    if (roll == 1 && grid[i][j].dungeon == false && grid[i][j].town == false && grid[i][j].road == false){
                        spawnCreature(i,j,goals=undefined);
                    }

                    //monsters
                    if (grid[i][j].dungeon == true){
                        spawnSuperiorM(i,j,goals=undefined);
                    }
                    else if (grid[i][j].grassland == true){
                        let roll = getRand(0,5);
                        if (roll == 1){
                            spawnMinorM(i,j,goals=undefined);
                        }
                    }
                    else if (grid[i][j].tundra == true){
                        let roll = getRand(0,3);
                        if (roll == 1){
                            spawnMiddleM(i,j,goals=undefined);
                        }
                    }
                    else if (grid[i][j].desert == true){
                        let roll = getRand(0,2);
                        if (roll == 1){
                            if (roll == 1){
                                spawnMiddleM(i,j,goals=undefined);
                            }
                            roll = getRand(0,2);
                            if (roll == 1){
                                spawnMinorM(i,j,goals=undefined);
                            }
                        }
                    }
                    else if (grid[i][j].swamp == true){
                        let roll = getRand(0,2);
                        if (roll == 1){
                            spawnSuperiorM(i,j,goals=undefined);
                        }
                    }
                }
            }
        }
        //Spawn Legendary Monsters
        for (i=0;i<legendmon;i++){
            let flag = true;
            while(flag){
                flag = false;
                var roll1 = getRand(2, sizeX-2);
                var roll2 = getRand(2, sizeY-2);
                if (grid[roll1][roll2].mountain == true || grid[roll1][roll2].water == true || grid[roll1][roll2].town == true || grid[roll1][roll2].road == true){
                    flag = true;
                }
            }
            spawnMonsterLegend(roll1, roll2, goals=undefined);
        }

        //Spawn Legendary Creatures
        for (i=0;i<legendcreat;i++){
            let flag = true;
            while(flag){
                flag = false;
                var roll1 = getRand(2, sizeX-2);
                var roll2 = getRand(2, sizeY-2);
                if (grid[roll1][roll2].mountain == true || grid[roll1][roll2].water == true || grid[roll1][roll2].town == true || grid[roll1][roll2].road == true){
                    flag = true;
                }
            }
            spawnCreatureLegend(roll1, roll2, goals=undefined);
        }

    }

    createBandits = function(){
        for (i=1; i<sizeX;i++){
            for (j=1; j<sizeY; j++){
                if (grid[i][j].road == true){
                    let roll = getRand(0,9);
                    if (roll == 1){
                        let e1 = [];
                        let e2 = [];
                        spawnBandit(i,j, e1, e2);
                    }
                }
            }
        }             
    }

    //createPlayer();
    createCommoners();
    createMercenaries();
    createMerchants();
    createAdventurers(); 
    createLegends();
    createOrsted();
    createMonsters();
    createBandits();

    seedRelations();
    seedOpinions();

    console.log(characters[0,characters.length-1]);
   
}

function generateWorld(){
    //generates a new world. Will eventually integrate sliders for different vars.
    console.log("Generating World...");
    seedMap();

    //init towns
    console.log("building towns...");
    seedTowns();

    //init dungeons
    console.log("creating dungeons...");
    seedDungeons();

    //init landmarks
    console.log("creating Landmarks...");
    seedLandmarks();

    //build roads
    console.log("building roads...");
    seedRoads();

    //Init characters!
    console.log("birthing characters...")
    seedCharacters();
    
}

generateWorld();
dispGrid();
console.log(towns);
console.log(dungeons);
console.log('---------');
simulate(0, 10);
console.log('done');
//playgame();
