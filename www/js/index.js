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
            if (grid[i][j].Dungeon == true){arr = arr+' @ ';}
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

///////////////////////////////////////////////////////////////////// GLOBALS ////////////////////////////////////////////////////////

var sizeX = 30;
var sizeY = 30;
var townTotal = 6;
var DungeonTotal = 8;
var passes = 2;
var grid = createGrid(sizeX);

var towns = [];
var Dungeons = [];
var keywords = [];
var characters = [];
var merchants = [];
var adventurers = [];
var commoners = [];
var mercenaries = [];
var legends = [];
var monsters = [];
var bandits = [];
var dead = [];
var day = 1000;
var kiloyear = 100;
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
        this.ruins = false,
        this.desert = false,
        this.Dungeon = false,
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

//Dungeon Functions      ----------------------------------------------------------------
function chooseDungeonName(){
    let mark = getRand(0, dungeonNames.length-1);
    return dungeonNames.splice(mark,1).toString();
}
function chooseDungeonPlace(){
    let spot = new Loc();
    spot.x = getRand(1, sizeX-1);
    spot.y = getRand(1, sizeY-1);
    return spot;
}
function chooseDungDesc(){
    return 'A very spooky place';
}

class Dungeon{
    constructor(name=chooseDungeonName(), loc=chooseDungeonPlace(), description=chooseDungDesc()){
        this.name = name,
        this.loc = loc,
        this.description = description
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
    let g = new Goal(homeName, 'live peacefully');
    goals.push(g);
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
    return clothes;
}
function chooseMagic(){
    let magic = getRand(1,100);
    if (magic == 69){
        return true;
    } else {return false;}
}

class Person {
    constructor(loc, gender=chooseGender(), name=chooseName(gender), age=getRand(18, 80), personality=choosePersonality(), haircolor=chooseHaircolor(),
    eyecolor=chooseEyecolor(), hometown=chooseHometown(loc), opinions=[], goals=chooseGoals(hometown.name), keyMemories=[], clothing=chooseClothing(),
    weapon='fists', strength=getRand(1,20), money=getRand(20,50), goods=(new Goods()), magic=chooseMagic(), relations=[], party=[name]){
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
        this.goods = goods,
        this.magic = magic,
        this.relations = relations,
        this.party = party 
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
    if (name == 'Eldritch Horror'){
        return ['primordial ooze', 'cloak of shadows'];
    }
    if (name == 'Dragon'){
        return ['sturdy scales', 'portruding spines', 'left wing', 'right wing'];
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
    if (name == 'Hydra'){
        return ['sturdy scales', 'portruding spines', 'several heads', 'swinging tail'];
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
    if (name == 'Eldritch Horror'){
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
    let emotion = emotions[getRand(0, emotions.length-1)]
    let sizer = size[getRand(0, size.length-1)];

    return 'The monster type is '+color+' '+name+'. It is '+sizer+' and looks '+emotion+'.';
}
function chooseMonsterGoal(name){
    let goal = new Goal(name, 'prowl for prey');
    let goals = [];
    goals.push(goal);
}

class Monster {
    constructor(name, loc, goals=chooseMonsterGoal(name), strength=chooseMonsterStrength(name), clothing=chooseMonsterClothing(name), weapon=chooseMonsterWeapon(name), description=chooseMonsterDescription(name), party=[name]){
        //I'm gonna keep the constructors this way so that if i wanted to make custom monsters later I can.
        this.name = name,
        this.loc = loc,
        this.goals = goals,
        this.strength = strength,
        this.clothing = clothing,
        this.weapon = weapon,
        this.description = description,
        this.party = party
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

//-100 -> -80 Hate, will attack on sight
//-80 -> -60  despise, might attack on sight
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
//visiting a town or Dungeons
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
}

function seedDungeons(){
 
    var dist = (((sizeX + sizeY)/2)/10);
    if (dist <2){dist = 2;}

    var q = 0; 
    var counter = 0;
   
    while(q<DungeonTotal){
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
                    if (grid[i][j].Dungeon == true){
                        tooclose = true;
                        //console.log("too close!");
                    }
                }
            }
            if (tooclose == false){
                //console.log("Dungeon created at: "+ roll1 + " , " + roll2);
                grid[roll1][roll2].Dungeon = true;
                let place = new Loc();
                place.x = roll1;
                place.y = roll2;
                let mark = new Dungeon(undefined, place, undefined);
                Dungeons.push(mark);
                keywords.push(mark.name);
                q++;
            }
        }
        counter ++;
        //if impossible to make more towns
        if (counter > (sizeX*sizeY)){
            q = (DungeonTotal + 1);
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
                person.party.push(rel.keyword);
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
                    op.affinity = getRand(-60, -10);
                }
            }
        }
        // everyone hates orsted
        for (op of person.opinions){
            if (op.keyword == 'ORSTED THE ANNIHILATOR'){
                op.familiar = true;
                op.affinity = getRand(-80, -60);
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
    for (op of orsted.opinions){
        op.affinity = getRand(-60,0); 
        op.familiar = true;}
        if (player != undefined){
            if (op.keyword == player.name){
                op.affinity = -100;
            }
        }
            
}

function spawnCommoner(town, age=undefined){
    let character = new Person(town.loc, undefined, undefined, age, undefined, undefined, undefined, town);
    characters.push(character);
    keywords.push(character.name);
    commoners.push(character.name);
}

function spawnMercenary(town, age=undefined){
    let goal = new Goal(town.name, 'wait for mercenary work');
    let goals = [];
    goals.push(goal);

    let clothing = [];
    let color1 = mutedColors[getRand(0, mutedColors.length-1)];
    let color2 = mutedColors[getRand(0, mutedColors.length-1)];
    let pants = getRand(0, lowerClothes.length-1);
    let armor = getRand(0, armorUpper.length-1);
    let hat = getRand(0, headgear.length-1);
    clothing.push(color1+' '+lowerClothes[pants]);
    clothing.push(armorUpper[armor]);
    clothing.push(color2+' '+headgear[hat]);

    let weapon = swords[getRand(0, swords.length-1)];;
    let strength = getRand(20,100);
    let money = getRand(50,200);

    let character = new Person(town.loc, undefined, undefined, age, undefined, undefined, undefined, town, undefined, goals, undefined, clothing, weapon, strength, money);
    characters.push(character);
    keywords.push(character.name);
    town.mercs.push(character.name);
    mercenaries.push(character.name);
}

function spawnMerchant(town, age=undefined){
    let goals = [];
    let target = towns[getRand(0,towns.length-1)];
    let goal = new Goal(town.name, 'rest between trips');
    goals.push(goal);
    goal = new Goal(target.name, 'travel to '+target.name);
    goals.push(goal);
    goal = new Goal(target.name, 'rest between trips');
    goals.push(goal);

    let clothing = [];
    let color1 = colors[getRand(0, colors.length-1)];
    let color2 = colors[getRand(0, colors.length-1)];
    let pants = getRand(0, niceLower.length-1);
    let shirt = getRand(0, niceUpper.length-1);
    let hat = getRand(0, merchHats.length-1);
    clothing.push(color1+' '+niceLower[pants]);
    clothing.push(color2+' '+niceUpper[shirt]);
    clothing.push(color2+' '+merchHats[hat]);

    let money = getRand(200,800);
    let goods = new Goods(getRand(0,100), getRand(0,100), getRand(0,100), getRand(0,100))
    let character = new Person(town.loc, undefined, undefined, age, undefined, undefined, undefined, town, undefined, goals, undefined, clothing, undefined, undefined, money, goods);
    

    //bodyguards
    let bodynum = getRand(1,2);
    for (j=0; j<bodynum; j++){

        let goals = [];
        let goal = new Goal(character.name, 'help '+character.name);
        goals.push(goal);
        goal = new Goal(town.name, 'travel to '+town.name);
        goals.push(goal);
        goal = new Goal(town.name, 'wait for mercenary work');
        goals.push(goal);
        

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
        

        let weapon = swords[getRand(0, swords.length-1)];
        let strength = getRand(60,160);
        let money = getRand(100,200);
        let guard = new Person(town.loc, undefined, undefined, undefined, undefined, undefined, undefined, town, undefined, goals, undefined, clothing, weapon, strength, money);
        
        let a = new Relation(guard.name, 'bodyguard');
        let b = new Relation(character.name, 'employer');
        guard.relations.push(b);
        character.relations.push(a);

        characters.push(guard);
        keywords.push(guard.name);
        mercenaries.push(guard.name);
    }
    characters.push(character);
    keywords.push(character.name);
    merchants.push(character.name);
}

function spawnAdventurer(town, age=undefined){
    let goals = [];
    let goal = new Goal(town.name, 'rest between trips');
    goals.push(goal);
    let target = Dungeons[getRand(0,Dungeons.length-1)];
    goal = new Goal(target.name, 'travel to '+target.name);
    goals.push(goal);
    goal = new Goal(target.name, 'rest between trips');
    goals.push(goal);
    
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
        
        let cape = getRand(0, capes.length-1);
        clothing.push(color3+' '+capes[cape]);

    let weapon = swords[getRand(0, swords.length-1)];
    let strength = getRand(120,240);
    let money = getRand(200,350);
    let magic = false;
    if (1 == getRand(0,1)){magic = true;}
    

    let character = new Person(town.loc, undefined, undefined, age, undefined, undefined, undefined, town, undefined, goals, undefined, clothing, weapon, strength, money, undefined, magic);
    characters.push(character);
    keywords.push(character.name);
    adventurers.push(character.name);
}

function spawnLegend(town){
    let goals = [];
    let goal = new Goal(town.name, 'rest between trips');
    goals.push(goal);
    let target = Dungeons[getRand(0,Dungeons.length-1)];
    goal = new Goal(target.name, 'travel to '+target.name);
    goals.push(goal);
    goal = new Goal(target.name, 'rest between trips');
    goals.push(goal);
    

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
        let fulltitles = ['The Hero of '+towns[getRand(0,towns.length-1)].name, 'The Savior of '+towns[getRand(0,towns.length-1)].name, 'The Legend of '+town.name, 
        'The Bane of '+towns[getRand(0,towns.length-1)].name,
        'Warden of '+Dungeons[getRand(0,Dungeons.length-1)].name, 'Tyrant of '+Dungeons[getRand(0,Dungeons.length-1)].name, 'Keeper of '+Dungeons[getRand(0,Dungeons.length-1)].name, 
        'Deacon of '+Dungeons[getRand(0,Dungeons.length-1)].name,  'The '+haircolor+' Pheonix', 'The '+haircolor+' Fox', 'The '+haircolor+' Hawk', 'The '+haircolor+' Lion', 'The '+haircolor+' Shark', 
        'The '+haircolor+' Eagle', 'The '+haircolor+' Bear', 'The '+haircolor+' Snake', 'The '+haircolor+' Menace', 'The '+haircolor+' Hero', 'The '+eyecolor+' eyed Master'];

        name = name+', '+fulltitles.splice(getRand(0,fulltitles.length-1),1).toString();
        }

    let character = new Person(town.loc, gender, name, undefined, undefined, haircolor, eyecolor, town, undefined, goals, undefined, clothing, weapon, strength, money, undefined, magic);
    characters.push(character);
    keywords.push(character.name);
    legends.push(character.name);
}

function spawnMinorM(x,y,goals=undefined){
    let mon = monsterMinor[getRand(0,monsterMinor.length-1)];
    monster = new Monster(mon, {x:x,y:y}, goals);
    monsters.push(monster);
}

function spawnMiddleM(x,y,goals=undefined){
    let mon = monsterMiddle[getRand(0,monsterMiddle.length-1)];
    monster = new Monster(mon, {x:x,y:y}, goals);
    monsters.push(monster);
}

function spawnSuperiorM(x,y, goals=undefined){
    let mon = monsterSuperior[getRand(0,monsterSuperior.length-1)];
    monster = new Monster(mon, {x:x,y:y}, goals);
    monsters.push(monster);
}

function spawnBandit(x,y){
    let goals = [];
    let goal = new Goal(x+','+y, 'rest');
    goals.push(goal);
    let goal = new Goal(x+','+y, 'rob weak passerby');
    goals.push(goal);
    let goal = new Goal(x+','+y, 'rest');
    goals.push(goal);
    let goal = new Goal(x+','+y, 'rob weak passerby');
    goals.push(goal);
    let goal = new Goal(x+','+y, 'rest');
    goals.push(goal);
    let goal = new Goal(x+','+y, 'rob weak passerby');
    goals.push(goal);
    let target = towns[getRand(0,towns.length-1)];
    goal = new Goal(target.name, 'travel to '+target.name);
    goals.push(goal);
    goal = new Goal(target.name, 'live peacefully');
    goals.push(goal);
    
    let clothing = [];
    let color1 = mutedColors[getRand(0, mutedColors.length-1)];
    let color2 = mutedColors[getRand(0, mutedColors.length-1)];
    let pants = getRand(0, lowerClothes.length-1);
    let shirt = getRand(0, upperClothes.length-1);
    clothing.push(color1+' '+lowerClothes[pants]);
    clothing.push(color2+' '+upperClothes[shirt]);
    

    let weapon = swords[getRand(0, swords.length-1)];;
    let strength = getRand(10,60);
    let money = getRand(1,40);
    loc = {x:x,y:y};
    let town = towns[getRand(0, towns.length-1)];

    let character = new Person(loc, undefined, undefined, undefined, undefined, undefined, undefined, town, undefined, goals, undefined, clothing, weapon, strength, money);
    characters.push(character);
    keywords.push(character.name);
    bandits.push(character.name);
}

function seedCharacters(){

    //1. add commoners
    //2. add mercenaries/ soldiers
    //3. add merchants and their bodyguards
    //4. add adventurers
    //5. add big 8
    //6. add Orsted

    let commonies = 20;
    let mercies = 6;
    let merchies = 5;
    let adventies = 4;

    //player
    //I'll come back and put in the special birth stuff later
    createPlayer = function(){
        let birthplace = towns[getRand(0,towns.length-1)]
        let mark =Dungeons[getRand(0,Dungeons.length-1)]
        let goal = new Goal(mark.name, 'Have an Adventure! Explore '+mark.name);
        let goals = [];
        goals.push(goal);
        age = getRand(18,30);
        player = new Person(birthplace.loc,undefined,undefined,age,undefined,undefined,undefined,birthplace,undefined, goals);
        characters.push(player);
        keywords.push(player.name);
    }

    //commoners
    //mostly just mill about in town. Every so often will travel to a new town.
    createCommoners = function(){
        for (town of towns){
            for (i=0; i<commonies;i++){
                spawnCommoner(town);
            } 
        }
    }
    //mercenaries
    //these guys wait around for a job. If a bounty is posted or the ruler orders them to fight, they will mobilize. Can be hired by anyone for protection.
    createMercenaries = function(){
        for (town of towns){
            for (i=0; i<mercies;i++){
                spawnMercenary(town);
            }
        }
    }

    //merchants
    //these guys travel between towns trading goods. accompanied by 1-2 bodyguards.
    createMerchants = function(){
        for (town of towns){
            for (i=0; i<merchies;i++){
                spawnMerchant(town);
            }
        }
    }

    //adventurers
    //travel between Dungeons, occasionally rest at a town
    createAdventurers = function(){
        for (town of towns){
            for (i=0; i<adventies;i++){
                spawnAdventurer(town);
            }
        }
    }

    //Legends (the best of these will become the big 8)
    //travel between Dungeons, occasionally rest at a town
    createLegends = function(){
        for (town of towns){
            for (i=0; i<2;i++){
                spawnLegend(town);
            }
        }
    }

    //ORSTED THE ANNHILIATOR
    //travels between Dungeons and towns, hunting down the player.
    createOrsted = function(){
        let startloc = Dungeons[getRand(0,Dungeons.length-1)];
        let gender = 'male';
        let goals = [];
        // let goal = new Goal(player.name, 'kill '+player.name);
        // goals.push(goal);
        let target = Dungeons[getRand(0,Dungeons.length-1)];
        goal = new Goal(target.name, 'travel to '+target.name);
        goals.push(goal);

        let clothing = [];
        
        clothing.push('perfectly clean white pants');
        clothing.push('pure white coat with a high collar and golden buttons.');
        clothing.push('Jet black cape strung from golden chains');

        let weapon = 'fists';
        let strength = getRand(10,000);
        let money = 0;
        let magic = true;
        let name = 'ORSTED THE ANNIHILATOR';
        let eyecolor = 'Golden';
        let haircolor = 'White';

        orsted = new Person(startloc.loc, gender, name, 100, 'Evil', haircolor, eyecolor, towns[getRand(0,towns.length-1)], undefined, goals, undefined, clothing, weapon, strength, money, undefined, magic);
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
        for (i=1; i<sizeX;i++){
            for (j=1; j<sizeY; j++){
                if (grid[i][j].water == false && grid[i][j].mountain == false){
                    if (grid[i][j].Dungeon == true){
                        spawnSuperiorM(i,j,goals=undefined);
                    }
                    else if (grid[i][j].grassland == true){
                        let roll = getRand(0,3);
                        if (roll == 1){
                            spawnMinorM(i,j,goals=undefined);
                        }
                    }
                    else if (grid[i][j].tundra == true){
                        let roll = getRand(0,2);
                        if (roll == 1){
                            spawnMiddleM(i,j,goals=undefined);
                        }
                    }
                    else if (grid[i][j].desert == true){
                        let roll = getRand(0,1);
                        if (roll == 1){
                            if (roll == 1){
                                spawnMiddleM(i,j,goals=undefined);
                            }
                            roll = getRand(0,1);
                            if (roll == 1){
                                spawnMinorM(i,j,goals=undefined);
                            }
                        }
                    }
                    else if (grid[i][j].swamp == true){
                        let roll = getRand(0,1);
                        if (roll == 1){
                            spawnSuperiorM(i,j,goals=undefined);
                        }
                    }
                }
            }
        }
    }

    createBandits = function(){
        for (i=1; i<sizeX;i++){
            for (j=1; j<sizeY; j++){
                if (grid[i][j].road == true){
                    let roll = getRand(0,9);
                    if (roll == 1){
                        spawnBandit(i,j);
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
   
}

function generateWorld(){
    //generates a new world. Will eventually integrate sliders for different vars.
    console.log("Generating World...");
    seedMap();

    //init towns
    console.log("building towns...");
    seedTowns();

    //init Dungeons
    console.log("creating Dungeons...");
    seedDungeons();

    //build roads
    console.log("building roads...");
    seedRoads();

    //Init characters!
    console.log("birthing characters...")
    seedCharacters();
    
}

generateWorld();
dispGrid();
console.log('---------')
//simulate(10, 0);
//playgame();
