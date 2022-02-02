// This is meant to simulate the world progress for a specified amount of time. I will have a seperate .js file for when the player can interact.
// The two files should be largely similar however.

// const { splice } = require("../../platforms/browser/platform_www/cordova_plugins");
// const help = require("cordova/src/help");
// const { find } = require("../../platforms/browser/platform_www/cordova_plugins");

//Basic(0-20) -> intermediate(20-60) -> advanced(60-120) -> expert(120-200) -> master(200-300) -> Queen(300-500) -> King(500-1000) -> God(1000+)

var simulate = function(yeers, days){
    var history = [];
    // %%%%%%%%%%%%%%%%%%%%%% functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    getbig8 = function(){
        let arr = [];
        
        console.log('^^^^^^^');
        for (c of characters){
            //console.log('finding big 8, checking '+c.name);
            arr.push(c);
            //console.log(empty);
            sortArr(arr);
            //console.log(empty);
            if (arr.length>8){arr.shift();}
        }
        return arr;
    }
        //ok so goals are a big picture look at what the character wants to accomplish. active goals are the actions the character are going to take,
    //sequentially, that phase. actions are born from goals. once an active goal is accomplished, the action is evaluated and the characters
    //goals are then changed.
    live = function(char, goal){
        //stay put indefinitely. has small chance to add goal of traveling to a different town and back
        console.log(char.name+' is living peacefully.');            
        char.actions.push(new Goal(char.name, 'skip', false));
        let roll = (getRand(0, 600)); //dont forget about phases for likelyhood
        if (roll == 69){
            for (let i=0;i<1;i++){
                let destination = towns[getRand(0, towns.length-1)];
                if (destination.name == char.hometown.name) {i--; continue;}
                char.goals.unshift(new Goal(destination.name, 'travel'));
            }
        }
    }

    travel = function(char, goal){
        //find path to a loc. can be based on coords or keyword
    
        console.log('moving to '+goal.keyword);
        console.log('char position is: '+char.loc.x+','+char.loc.y);
        
        let target = goal.keyword;
       
        if (containsItem(keywords, target)){
            //target is not a loc, but actually a keyword
            for (town of towns){
                if (town.name == target){
                    target = town.loc;
                }
            }
            for (dung of Dungeons){
                if (dung.name == target){
                    target = dung.loc;
                }
            }
            for (person of characters){
                if (person.name == target){
                    target = person.loc;
                }
            }
        }
        console.log(goal.keyword+' position is: '+target.x+','+target.y);
        if (target.x == char.loc.x && target.y == char.loc.y){
            //made it to destination
            char.goals.shift();
            

            //add mem and clean up find goal and get fam with loc
            let emotion = getEmo(getAff(char, goal.keyword));
            let myParty = char.party;
            let mem = new KeyMemory(day, myParty, {x:char.loc.x.valueOf(),y:char.loc.y.valueOf()}, 'Arrived at '+goal.keyword, emotion);
            char.keyMemories.push(mem); 
            history.push(mem);
            for (partyMem of char.party){
                for (opi of partyMem.opinions){
                    if (opi.keyword == goal.keyword){
                        opi.familiar = true;
                    }
                }
            }
            for (goalee in char.goals){
                if (char.goals[goalee].action == 'find' && char.goals[goalee].keyword == goal.keyword){
                    char.goals.splice(goalee,1); 
                }
            }
            
            //setup next goal for indefinite char action
            if (containsItem(merchants, char.name) && char.goals.length < 2){
                let destination = towns[getRand(0,towns.length-1)];
                char.goals.unshift(new Goal(destination.name, 'travel'));
                char.goals.unshift(new Goal(destination.name, 'rest'));
                char.goods.food = getRand(0,100);
                char.goods.wood = getRand(0,100);
                char.goods.leather = getRand(0,100);
                char.goods.iron = getRand(0,100);
                char.money = getRand(200,800);
                if (char.party.length < 2){
                    //hire bodyguard
                    var targetTown = 'h';
                    for(town of towns){
                        if (town.loc.x == char.loc.x && town.loc.y == char.loc.y){
                            targetTown = town;
                        }
                    }
                    if (targetTown == 'h'){
                        targetTown = towns[getRand(0, towns.length-1)];
                    }
                    let toHire = getRand(1,3);
                    for (i=0;i<toHire;i++){
                        if (targetTown.mercs.length > 0){
                            let targetMerc = targetTown.mercs[getRand(0,targetTown.mercs.length-1)];
                            targetMerc.goals.unshift(new Goal(char.name, 'help'));
                            targetMerc.party.push(char);
                            char.party.push(targetMerc);
                            for (merc in targetTown.mercs){
                                if (targetTown.mercs[merc].name == targetMerc.name){
                                    targetTown.mercs.splice(merc,1);
                                }
                            }
                        }else{
                            //if no mercenaries to hire then just generate one
                            spawnBodyguard(targetTown, char);
                        } 
                    }
                }
            }
            if (containsItem(mercenaries, char.name) || containsItem(adventurers, char.name) || containsItem(legends, char.name)){
                if (char.weapon == 'fists'){
                    let weapon = swords[getRand(0, swords.length-1)];
                    char.weapon = weapon;
                }
            }

            if (containsItem(commoners, char.name) || containsItem(mercenaries, char.name)){
                
                if (char.goals.length < 2){
                    if (char.loc.x != char.hometown.loc.x && char.loc.y != char.hometown.loc.y){
                        char.goals.unshift(new Goal(char.hometown.name, 'travel'));
                        char.goals.unshift(new Goal('here', 'rest'));
                    }
                    else{
                        
                        //char.goals.unshift(new Goal(char.hometown.name, 'live'));
                        char.goals.unshift(new Goal(char.hometown.name, 'rest'));
                    } 
                }
            }
            if (containsItem(adventurers, char.name) && char.goals.length < 2){
                
                let roll = getRand(0,3);
                if (roll == 1){
                    //go to a town
                    
                    let destination = towns[getRand(0,towns.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
                else {
                    //go to a dungeon
                    
                    let destination = Dungeons[getRand(0,Dungeons.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
                
            }
            if (containsItem(legends, char.name) && char.goals.length < 2){
                
                let roll = getRand(0,19);
                if (roll == 1){
                    //go to a town
                    
                    let destination = towns[getRand(0,towns.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
                else {
                    //go to a dungeon
                    
                    let destination = Dungeons[getRand(0,Dungeons.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
            
            }
        }
        else{
            //move towards destination
          
            let path = findPath(char.loc, target);
            //console.log(path);
            char.actions.push(new Goal(path[1], 'move'));
            
            
        
        }
    }

    rob = function(char, goal){
        //rob weaker passerby
        console.log(char.name+' is wanting to rob.');  
        let roll = getRand(0,2);
        if (roll == 1){
            let nearby = [];
            for (character of characters){
                if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                    if (character.name != char.name){
                        nearby.push(character);
                    }
                }
            }
            let target = nearby[getRand(0, nearby.length-1)];
            if (nearby.length > 0 && target.strength < char.strength){
                char.actions.push(new Goal(target.name, 'fight'));
            }
        }
    }

    help = function(char, goal){
        console.log(char.name+' is helping '+goal.keyword);  
        //used for people helping the leader of their party
        let target = goal.keyword;
        var waste = false;
        //if person char is trying to help is dead, then stop trying to help them
        for(ghost of dead){
            if (ghost.name == target){
                waste = true;
            }
        }
        if (waste = false){
                for (character of characters){
                    if (character.name == target){
                        target = character;
                    }
                }
            if (char.loc.x != target.loc.x || char.loc.y != target.loc.y){
                path = findPath(char.loc, target.loc);
                char.actions.push(new Goal(path[1], 'move'));
            }
        }
        else{
            char.goals.shift();
        }
    }

    prowl = function(char, goal){
        console.log(char.name+' is on the prowl.');  
        //initiates a fight with any character in the same tile regardless of strength. people help fight vs monsters
        let nearby = [];
        for (character of characters){
            if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                if (character.name != char.name){
                    nearby.push(character);
                }
            }
        }
        if (nearby.length >0){
            let target = nearby[getRand(0, nearby.length-1)];
            char.actions.push(new Goal(target.name, 'fight'));
            
        }
    }

    find = function(char, goal){
        //find information about a keyword. this is npc only. involves taking a couple turns to rest and checking if anyone
        //nearby is familiar with the keyword. if yes, they instantly get the location and travel there. dont forget to add 
        //a travel back to a town after in case they dont find the person.
        let targetKey = goal.keyword;
        var target;
        console.log(char.name+' wants to find '+targetKey); 
        //console.log(characters);
        for (ghost of dead){
            if (ghost.name == targetKey){
                console.log('person is dead');
                char.goals.shift();
                return;
            }
        }

        for (goal in char.goals){
            if (char.goals[goal].keyword == 'undefined' || char.goals[goal].keyword == undefined){
                char.goals.splice(goal,1);
                return;
            }
        }
            //get object for target instead of keyword////////////////////////////////
            

            
        for (character of characters){
            let final = character.name;
            if (character.name.includes(",")){
                let name = character.name;
                let nArr =  name.split(",");
                final = nArr[0];
                console.log(final);
                char.goals.shift();
                char.goals.unshift(new Goal(name, 'find'));
            }
            
            if (final == targetKey || final == character.name){
                
                target = character;
                //i'd like to delete this next part if i get combat working 100%
                if (target.loc.x == 0){
                    console.log('person has loc 0');
                    char.goals.shift();
                    killcharacter(target);
                    return;
                }
            }
        }
        
        for (artifact of artifacts){
            //if artifact on the ground, set target to it. otherwise, set target to who has it.
            if (artifact.name == targetKey){
                
                if (artifact.loc.x == 0 && artifact.loc.y == 0){
                    for (character of characters){
                        for (item of character.clothing){
                            if (item == targetKey){
                                target = character;
                                //char.goals.shift();
                                //add check if they already have these two goals
                                char.goals.unshift(new Goal(character.name, 'kill'));
                                char.goals.unshift(new Goal(character.name, 'find'));
                            }
                        }
                        if (character.weapon == targetKey){
                            target = character;
                                //char.goals.shift();
                                char.goals.unshift(new Goal(character.name, 'kill'));
                                char.goals.unshift(new Goal(character.name, 'find'));
                        }
                    }
                }else{
                    target = artifact;
                }
            }
        }
        for (dung of Dungeons){
            if (dung.name == targetKey){
                
                target = dung;
            }
        }
        for (town of towns){
            if (town.name == targetKey){
                
                target = town;
            }
        
        }///////////////////////////////////////////////////////////////
        //is person, place, or thing here with me?
        //if yes, then done trying to find them. shift(). i'll put this in default actions
        //otherwise, ask around. should ask people each turn, if able.

        //within ask, ask around about the target. if people asked not familiar, then keep asking.
        //once someone found that is familiar, set new goal of travel to that location.
        //if nobody nearby is familiar with target then travel to a new town

        //have noticenearby() ask people nearby if one of goals is to find something, similar to what you did for kill.

        if (char.goals.length < 2){
            char.goals.unshift(towns[getRand(0,towns.length-1)].name,'travel');
            char.goals.unshift('here','rest');
        }
        console.log(target);
        console.log(target.loc.x);
        if (target.loc.x != char.loc.x && target.loc.y != char.loc.y){
            char.actions.push(new Goal(target.name, 'ask'));
        }
        else{
            //we are at target location
            console.log('found '+target);
            char.goals.shift();
            //mems and goals and party are updated
            let emotion = getEmo(getAff(char, target.name));
            mem = new KeyMemory(day, [char.name, target.name], {x:char.loc.x.valueOf(), y:char.loc.y.valueOf()}, 'I found '+target.name, emotion);
            char.keyMemories.push(mem);
            history.push(mem);
            emotion = getEmo(getAff(target, char.name));
            mem = new KeyMemory(day, [target.name, char.name], {x:char.loc.x.valueOf(), y:char.loc.y.valueOf()}, 'I was found by '+char.name, emotion);
            target.keyMemories.push(mem);
            for (opi of char.opinions){
                if (opi.keyword == target.name){
                    if (opi.affinity >59){
                        char.goals.unshift(new Goal(target.name, 'help'))
                        char.party.push(target);
                        target.party.push(char);
                        emotion = getEmo(getAff(char, target.name));
                        mem = new KeyMemory(day, [char.name, target.name], {x:char.loc.x.valueOf(), y:char.loc.y.valueOf()}, 'I joined '+target.name+' party', emotion);
                        char.keyMemories.push(mem);
                        history.push(mem);
                        emotion = getEmo(getAff(target, char.name));
                        mem = new KeyMemory(day, [target.name, char.name], {x:char.loc.x.valueOf(), y:char.loc.y.valueOf()}, char.name+' joined my party', emotion);
                        target.keyMemories.push(mem);
                    }
                }
            }
            
        }

   
    }

    kill = function(char, goal){
        //want to fight a character
        
        // Don't worry about checking nearby, because that is handled already in noticeNearby()!
        let target = goal.keyword;
        console.log(char.name+' wants to kill '+target);  
        var waste = false;
        for(ghost of dead){
            if (ghost.name == target){
                waste = true;
            }
            if (ghost.name.includes(",")){
                let name = character.name;
                let nArr =  name.split(",");
                let final = nArr[0];
                if (ghost.name == final){
                    waste = true;
                }
            }
        }
        if (waste == true){
            char.goals.shift();
        }
    }

    fight = function(char, goal){
        //differentiate between monster fight and human fight
        //make sure party members are involved
        //everyones opinions on both sides change based on their opinions of both (do this before bystander help)
        //bystanders help vs monsters
        //bystanders help those they really like >60
        //once everyone is in the party and its time to fight, if one side is far lower strength than the other then they run
        //dying has very low chance of happening unless huge strength descrepency
        //you can add scars to clothing array starting after 4th index
        //if character dies then dont forget to drop their stuff and call killcharacter()
        let target = goal.keyword;
        console.log(char.name+' is fighting '+target);
        let monsterFight = false;
        let p1 = char;
        let p2 = undefined;
        for (c of characters){
            if (c.name == target){
                p2 = c;
            }
        }

        for (monster of monsters){
            if (monster.name == target || monster.name == char.name){
                console.log('monster fight');
                monsterFight = true;
                p1 = char;
                p2 = monster;

            }
        }
        //this is for if monster starts the fight, reverses monster from p1 to p2
        for (monster of monsters){
            if (monster.name == char.name){
                p1 = target;
                p2 = char;
                for (dude of characters){
                    if (dude.name == p1){
                        p1 = dude;
                    }
                }
            }
        }
        
        let p1Party = [];
        p1Party = p1Party.concat(p1.party);
        let p2Party = [];
        p2Party = p2Party.concat(p2.party);
        
        
        //monster fight
        if (monsterFight == true){
            
            let nearby = [];
            for (character of characters){
                if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                    if (character.name != char.name && character.strength > p2.strength - 50 && character.name != p1.name){
                        let cooldownFlag = false;
                        for (g of character.goals){
                            if (g.action == 'fightCooldown'){
                                cooldownFlag = true;
                            }
                        }
                        if (cooldownFlag == false){
                            nearby.push(character);   
                        }
                    }
                }
            }
            
            //make sure people nearby help if they like person enough
            if (nearby.length>0){
                for (near of nearby){
                    let helping = false;
                    for (opi of near.opinions){
                        for (person of p1Party){
                            if (opi.keyword == person.name){
                                if (opi.affinity > -30){
                                    helping = true;
                                }
                            }
                        }
                        
                    }
                    if (helping == true){
                        console.log(near.name+' joining the fight for p1 side');
                        p1Party.push(near);
                    }
                }
            }
            
            //size eachother up
            let score1 = 0;
            for (member of p1Party){
                score1 = score1 + member.strength;
                
            }
            let score2 = 0;
            for (member of p2Party){
                score2 = score2 + member.strength;
            }

            console.log (p1.name + ' party: '+score1+' vs. '+p2.name+' party: '+score2);
            console.log(p1Party);
            console.log(p2Party);
            
            //decide if p1 runs
            if (score1 < score2-30){
                let roll = getRand(0,2);
                if (roll != 2){
                    console.log(p1Party[0].name+' running away');
                    partyRunAway(p1Party);
                    return;
                }else{
                    console.log(p1.name+' party cant escape!');
                }
            }
            //fight

            let roll = getRand(1,p1Party.length);
            let p1Final = [];
            for (i=0;i<roll;i++){
                let index = getRand(0,p1Party.length-1);
                p1Final.push(p1Party[index]);
                p1Party.splice(index,1);
            }

            roll = getRand(1,p2Party.length);
            let p2Final = [];
            for (i=0;i<roll;i++){
                let index2 = getRand(0,p2Party.length-1);
                p2Final.push(p2Party[index2]);
                p2Party.splice(index2,1);
            }
            console.log('This round: '+p1Final+' vs '+p2Final);
            console.log(p1Final);
            console.log(p2Final);

            score1 = 0;
            for (member of p1Final){
                for (i=0; i<member.strength;i++){
                    let roll = getRand(1,6);
                    score1 = score1 + roll;
                }
            }
            score2 = 0;
            for (member of p2Final){
                for (i=0; i<member.strength;i++){
                    let roll = getRand(1,6);
                    score2 = score2 + roll;
                }
            }

            console.log('p1: '+score1+ ' p2: '+score2);

            for (i=0;i<p1Final.length;i++){
                p1Final[i].goals.unshift(new Goal('cooldown', 'fightCooldown'));
            }
            for (i=0;i<p2Final.length;i++){
                p2Final[i].goals.unshift(new Goal('cooldown', 'fightCooldown'));
            }
            for (a of p2.actions){
                p2.actions.pop();
            }

            //before we decide who wins, alter opinions
            for (fighter of p1Final){
                for (f2 of p2Final){
                    for (opi of fighter.opinions){
                        if (opi.keyword == f2.name){
                            opi.familiar = true;
                            opi.affinity = opi.affinity-10;
                            let emotion = getEmobyStrength(fighter, f2);
                            let mem = new KeyMemory(day, [fighter.name, f2.name], {x:fighter.loc.x.valueOf(),y:fighter.loc.y.valueOf()}, 'I fought '+f2.name+'.', emotion);
                            fighter.keyMemories.push(mem);
                            history.push(mem);
                        }
                    }
                }
            }
            
            //p1 wins
            if (score1 >= score2){
                console.log('p1 wins');

                for (gainer of p1Final){
                    for (enemy of p2Final){
                        gainer.strength = gainer.strength + 5;
                    }
                }
                let team1 = [];
                
                for (f of p2Final){
                    team1.push(f.name);
                }
                for (f of p1Final){
                    team1.push(f.name);
                }
                
                for (guy1 of p1Final){
                    for (guy2 of p2Final){
                        let mem = new KeyMemory(day, team1, {x:guy1.loc.x.valueOf(),y:guy1.loc.y.valueOf()}, 'I defeated '+guy2.name+'.', 'happy');
                        guy1.keyMemories.push(mem);
                        history.push(mem);
                    }
                }

                //calculate who dies
                //for monsters its everyone
                //for humans if they die drop all their stuff. also change opinions, also key memories
                for (monster of p2Final){
                    monster.loc.x = 0;
                    monster.loc.y = 0;
                    killCharacter(monster);
                }

                //partyRunAway(p2Final);

            }
            //p2 wins
            else{
                console.log('monster wins');
                let team1 = [];
                
                for (f of p2Final){
                    team1.push(f.name);
                }
                for (f of p1Final){
                    team1.push(f.name);
                }
                for (guy1 of p1Final){
                    for (guy2 of p2Final){
                        let i = guy1.loc.x.valueOf();
                        let j = guy1.loc.y.valueOf();
                        let mem = new KeyMemory(day, team1, {x:i,y:j}, 'I was defeated by '+guy2.name+'.', 'scared');
                        guy1.keyMemories.push(mem);
                        history.push(mem);
                        for (opi of guy1.opinions){
                            if (opi.keyword == guy2.name){
                                opi.affinity = opi.affinity-20;
                            }
                        }
                    }
                }
                

                
                //at a minimum characters should get scarred or maimed
                //small chance to drop artifact or clothing item as well. add key mems
                for ( person of p1Final){
                
                    let result = 'scar';

                    if (score1+200 < score2){
                        let roll = getRand(0, 9);
                        if (roll < 5){
                            result = 'kill';
                        }else{
                            result = 'maim';
                        }

                    }else{
                        let roll = getRand(0,9);
                        if (roll == 0){
                            result = 'kill';
                        }
                        if (roll == 1 || roll == 2){
                            result = 'maim';
                        }
                        if (roll == 3 || roll == 4 || roll == 5 || roll == 6){
                            result = 'scar';
                        }
                        if (roll == 7 || roll == 8 || roll == 9){
                            result = 'lose';
                        }
                    }

                    //scars
                    if (result == 'scar'){
                        console.log(person.name+'get scar');
                        let repeat = true;
                        let counter = 0;
                        while (repeat == true){
                            repeat = false;
                            var scarDesc = scars[getRand(0,scars.length-1)];
                            for (cloth of person.clothing){
                                if (cloth == scarDesc){repeat = true;}
                            }
                            counter++;
                            if (counter == 100){
                                console.log('scarcounterr error');
                                break;
                            }
                        }

                        if (person.clothing.length <= 4){
                            person.clothing[4] = scarDesc;
                        }
                        else{
                            person.clothing.push(scarDesc);
                        }
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        let i = person.loc.x.valueOf();
                        let j = person.loc.y.valueOf();
                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j},'I was scarred by '+culprit.name+'.', 'angry');
                        person.keyMemories.push(mem);
                        history.push(mem);
                        for (opi of person.opinions){
                            if (opi.keyword == culprit.name){
                                opi.affinity = opi.affinity -20;
                                opi.familiar = true;
                            }
                        }
                        
                    }

                    //maims
                    if (result == 'maim'){
                        console.log(person.name+'get maim');
                        let repeat = true;
                        let counter = 0;
                        while (repeat == true){
                            repeat = false;
                            var maimDesc = maims[getRand(0,maims.length-1)];
                            for (cloth of person.clothing){
                                if (cloth == maimDesc){repeat = true;}
                            }
                            counter++;
                            if (counter == 100){
                                console.log('maimcounter error');
                                break;
                            }
                        }

                        if (person.clothing.length <= 4){
                            person.clothing[4] = maimDesc;
                        }
                        else{
                            person.clothing.push(maimDesc);
                        }
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        let i = person.loc.x.valueOf();
                        let j = person.loc.y.valueOf();
                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j},'I was maimed by '+culprit.name+'.', 'angry');
                        person.keyMemories.push(mem);
                        history.push(mem);
                        person.strength = parseInt(person.strength - (person.strength/4));
                        for (opi of person.opinions){
                            if (opi.keyword == culprit.name){
                                opi.affinity = opi.affinity -40;
                                opi.familiar = true;
                            }
                        }
                        
                    }


                    //items lost or damaged
                    if (result == 'lose' || roll == 2){
                        console.log(person.name+' lose item');
                        let roll = getRand(0,1);
                        if (roll == 0){
                            //lose weapon
                            let wepFlag = false;
                            for (arti of artifacts){
                                if (arti.name == person.weapon){
                                    let tempx = person.loc.x.valueOf();
                                    let tempy = person.loc.y.valueOf();
                                    arti.loc.x = tempx;
                                    arti.loc.y = tempy;
                                    person.strength = person.strength - arti.bonus;
                                    person.weapon = 'fists';
                                    let culprit = p2Final[getRand(0,p2Final.length-1)];
                                    let mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I was disarmed by '+culprit.name+'.', 'angry');
                                    person.keyMemories.push(mem);
                                    history.push(mem);
                                    for (opi of person.opinions){
                                        if (opi.keyword == culprit.name){
                                            opi.affinity = opi.affinity -20;
                                            opi.familiar = true;
                                        }
                                    }
                                    wepFlag = true;
                                }
                            }
                            if (wepFlag == false){
                                let tempx = person.loc.x.valueOf();
                                let tempy = person.loc.y.valueOf();
                                person.weapon = 'fists';
                                let culprit = p2Final[getRand(0,p2Final.length-1)];
                                let mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I was disarmed by '+culprit.name+'.', 'angry');
                                person.keyMemories.push(mem);
                                history.push(mem);
                                for (opi of person.opinions){
                                    if (opi.keyword == culprit.name){
                                        opi.affinity = opi.affinity -10;
                                        opi.familiar = true;
                                    }
                                }

                                
                            }
                        }else{
                            let destFlag = false;
                            let clothFlag = false;
                            //lose or damage clothing
                            for (arti of artifacts){
                                for (cloth of person.clothing){
                                    if(destFlag == true){break;}
                                    if (arti.name == cloth){
                                        let tempx = person.loc.x;
                                        let tempy = person.loc.y;
                                        arti.loc.x = tempx.valueOf();
                                        arti.loc.y = tempy.valueOf();
                                        person.strength = person.strength - arti.bonus;
                                        cloth = 'nothing';
                                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'My '+arti.name+' was torn off of me during the fight by '+culprit.name+'.', 'angry');
                                        person.keyMemories.push(mem);
                                        history.push(mem);
                                        for (opi of person.opinions){
                                            if (opi.keyword == culprit.name){
                                                opi.affinity = opi.affinity -20;
                                                opi.familiar = true;
                                            }
                                        }
                                        destFlag = true;
                                        clothFlag = true;
                                    }
                                }
                            }
                            if (clothFlag == false){
                                let limit = 4;
                                if(person.clothing.length < 4){ limit = person.clothing.length; }
                                let roll = getRand(0, limit-1);
                                let err = 0;
                                while(person.clothing[roll] == 'nothing' || person.clothing[roll] == 'damaged tatters'){
                                    roll = getRand(0, limit-1);
                                    err++;
                                    if (err > 100){break;}
                                }
                                let itemLost = person.clothing[roll];
                                person.clothing[roll] = 'damaged tatters';
                                let culprit = p2Final[getRand(0,p2Final.length-1)];
                                let tempx = person.loc.x.valueOf();
                                let tempy = person.loc.y.valueOf();
                                let mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'My '+itemLost+' was ruined by '+culprit.name+'.', 'angry');
                                person.keyMemories.push(mem);
                                history.push(mem);
                                for (opi of person.opinions){
                                    if (opi.keyword == culprit.name){
                                        opi.affinity = opi.affinity -10;
                                        opi.familiar = true;
                                    }
                                }
                                destFlag = true;
                                    
                            }
                        }    
                    }


                    //calculate who dies
                    
                    //for humans if they die drop all their stuff. also change opinions, also key memories

                    if (result == 'kill'){
                        console.log(person.name+'gets killed');
                        //person is from p1FInal
                        //make everyone who knew and liked the person who died dislike the killer. also key mem
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        for (guy of characters){
                            for (opi of guy.opinions){
                                if (opi.keyword == person.name){
                                    if (opi.familiar == true){
                                        //they liked the person
                                        if (opi.affinity >40){
                                            for (opii of guy.opinions){
                                                if (opii.keyword == culprit.name){
                                                    opii.affinity = opi.affinity -40;
                                                    opii.familiar = true;
                                                }
                                            }
                                            let tempx = person.loc.x.valueOf();
                                            let tempy = person.loc.y.valueOf();
                                            mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I learned that '+person.name+' was killed by '+culprit.name+'.', 'angry');
                                            guy.keyMemories.push(mem);
                                            //they disliked the person
                                        }else if (opi.affinity < -40){
                                            for (opii of guy.opinions){
                                                if (opii.keyword == culprit.name){
                                                    opii.affinity = opi.affinity +30;
                                                    opii.familiar = true;
                                                }
                                            }
                                            let tempx = person.loc.x.valueOf();
                                            let tempy = person.loc.y.valueOf();
                                            mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I learned that '+person.name+' was killed by '+culprit.name+'.', 'happy');
                                            guy.keyMemories.push(mem);
                                        }else{
                                            let tempx = person.loc.x.valueOf();
                                            let tempy = person.loc.y.valueOf();
                                            mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I learned that '+person.name+' was killed by '+culprit.name+'.', 'sad');
                                            guy.keyMemories.push(mem);
                                        }
                                    } 
                                }
                            }
                        }  
                        //for vs human also include memories for killer
                        
                        killCharacter(person);

                        for (index in p1Final){
                            if (p1Final[index].name == person.name){
                                p1Final.splice(index,1);
                            }
                        }
                    }
                    if (p1Final.length > 0){
                        partyRunAway(p1Final);
                    }
                }
            }
        }
        //human fight
        else {
            //theres a good chance i am adding party members to nearby and will double add them by accident.
            let nearby = [];
            for (character of characters){
                if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                    if (character.name != char.name && character.name != target){
                        let cooldownFlag = false;
                        for (g of character.goals){
                            if (g.action == 'fightCooldown'){
                                cooldownFlag = true;
                            }
                        }
                        if (cooldownFlag == false){
                            nearby.push(character);   
                        }
                    }
                }
            }
            for (near of nearby){

            }
            
            
            //choose if bystanders help
            if (nearby.length >0){
                for (near of nearby){
                    let overall1 = 0;
                    let overall2 = 0;
                    for (opi of near.opinions){
                        for (person of p1Party){
                            if (opi.keyword == person.name){
                                overall1 = overall1 + opi.affinity;
                            }
                        }
                        for (person of p2Party){
                            if (opi.keyword == person.name){
                                overall2 = overall2 + opi.affinity;
                            }
                        }
                    }
                    if (near.name != 'ORSTED THE ANNIHILATOR'){
                        console.log(near.name +' has affinity for p1 and p2 '+overall1+' vs '+overall2);
                        if (overall1 >= overall2){
                            console.log(near.name+' joining the fight for p1 side');
                            p1Party.push(near);
                        }
                        else{
                            console.log(near.name+' joining the fight for p2 side');
                            p2Party.push(near);
                        }
                    }
                }
            }
            
            //size eachother up
            let score1 = 0;
            for (member of p1Party){
                score1 = score1 + member.strength;
                
            }
            let score2 = 0;
            for (member of p2Party){
                score2 = score2 + member.strength;
            }
            
            console.log (p1.name + ' party: '+score1+' vs. '+p2.name+' party: '+score2);
            console.log(p1Party);
            console.log(p2Party);

            for (i=1;i<p1Party.length;i++){
                p1Party[i].goals.unshift(new Goal('cooldown', 'fightCooldown'));
            }
            for (i=0;i<p2Party.length;i++){
                p2Party[i].goals.unshift(new Goal('cooldown', 'fightCooldown'));
            }
            for (a of p1.actions){
                p1.actions.pop();
            }

            //decide if p1 runs
            if (score1 < score2-30){
                let roll = getRand(0,2);
                if (roll != 2){
                    partyRunAway(p1Party);
                    console.log(p1Party[0].name+' p1 party decides to run away');
                    return;
                }else{
                    console.log(p1.name+' party cant escape!');
                }
            }
            //decide if p2 runs
            if (score2 < score1-30){
                let roll = getRand(0,2);
                if (roll != 2){
                    partyRunAway(p2Party);
                    console.log(p2Party[0].name+' p2 party decides to run away');
                    return;
                }else{
                    console.log(p2.name+' party cant escape!');
                }
            }
            //fight
            
            let roll = getRand(1,p1Party.length);
            let p1Final = [];
            for (i=0;i<roll;i++){
                let index = getRand(0,p1Party.length-1);
                p1Final.push(p1Party[index]);
                p1Party.splice(index,1);
            }

            roll = getRand(1,p2Party.length);
            let p2Final = [];
            for (i=0;i<roll;i++){
                let index = getRand(0,p2Party.length-1);
                p2Final.push(p2Party[index]);
                p2Party.splice(index,1);
            }
            console.log('This round: p1 vs p2');
            console.log(p1Final);
            console.log(p2Final);
           

            score1 = 0;
            for (member of p1Final){
                for (i=0; i<member.strength;i++){
                    let roll = getRand(1,6);
                    score1 = score1 + roll;
                }
            }
            score2 = 0;
            for (member of p2Final){
                for (i=0; i<member.strength;i++){
                    let roll = getRand(1,6);
                    score2 = score2 + roll;
                }
            }

            console.log('p1: '+score1+ ' p2: '+score2);

            //before we decide who wins, alter opinions
            for (fighter of p1Final){
                for (f2 of p2Final){
                    for (opi of fighter.opinions){
                        if (opi.keyword == f2.name){
                            opi.familiar = true;
                            opi.affinity = opi.affinity-getRand(10,20);
                            let emotion = getEmobyStrength(fighter, f2);
                            let i = fighter.loc.x.valueOf();
                            let j = fighter.loc.y.valueOf();
                            let mem = new KeyMemory(day, [fighter.name, f2.name], {x:i,y:j}, 'I fought '+f2.name+'.', emotion);
                            fighter.keyMemories.push(mem);
                            history.push(mem);
                        }
                    }
                }
            }
            for (fighter of p2Final){
                for (f2 of p1Final){
                    for (opi of fighter.opinions){
                        if (opi.keyword == f2.name){
                            opi.familiar = true;
                            opi.affinity = opi.affinity-getRand(10,20);
                            let emotion = getEmobyStrength(fighter, f2);
                            let i = fighter.loc.x.valueOf();
                            let j = fighter.loc.y.valueOf();
                            let mem = new KeyMemory(day, [fighter.name, f2.name], {x:i,y:j}, 'I fought '+f2.name+'.', emotion);
                            fighter.keyMemories.push(mem);
                        }
                    }
                }
            }
            
            //p1 wins ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (score1 >= score2){
                for (gainer of p1Final){
                    for (enemy of p2Final){
                        gainer.strength = gainer.strength + 10;
                    }
                }
                console.log('p1 wins with score of '+score1+' vs '+score2);
                fightWinner(p1Final, p2Final, score1, score2);
            
            }
            //p2 wins //////////////////////////////////////////////////////////////////////////////////////////////////////////////
            else{
                for (gainer of p2Final){
                    for (enemy of p1Final){
                        gainer.strength = gainer.strength + 10;
                    }
                }
                console.log('p2 wins with score of '+score2+' vs '+score1);
                fightWinner(p2Final, p1Final, score2, score1);

            }
        }
    }

    rest = function(char, goal){
        //stay put for a while
        char.actions.push(new Goal(char.name, 'skip'));
        console.log(char.name+' is resting');  
        roll = getRand(1,5); //*3 for each phase
        if (roll == 1){
            char.goals.shift();
        }
    }

    fightCooldown = function(char, goal){
        //dont engage until next phase
        char.actions.push(new Goal(char.name, 'skip'));
        console.log(char.name+' is on cooldown');  
        
        char.goals.shift();
        
    }

    doNothing = function(char){
        console.log(char.name+' is doing nothing (prob for fighting reasons)');  
        char.goals.shift();
    }

    partyRunAway = function(party){
        for (person of party){
            console.log(person.name);
        }
        console.log(party[0].name+' party runs away!');
        
        for (man of party){
            //console.log(man.name);
            var blocked = true;
            var counter = 0;
            while (blocked == true){
                blocked = false;
                var x = man.loc.x.valueOf();
                var y = man.loc.y.valueOf();
                //console.log(man.loc.x+','+man.loc.y);
                rollX = getRand(0,1);
                rollY = getRand(0,1);

                if (rollX == 0 && rollY == 0){
                    x = x-1;
                    y = y;
                }
                if (rollX == 0 && rollY == 1){
                    x = x+1;
                    y = y;
                }
                if (rollX == 1 && rollY == 0){
                    x = x;
                    y = y+1;
                }
                if (rollX == 1 && rollY == 1){
                    x = x;
                    y = y-1;
                }
                if (grid[x][y].mountain == true || grid[x][y].water == true){
                    blocked = true;
                }
                counter++;
                if (counter > 100){
                    console.log('counter maxed run away');
                    break;
                }
                
            }

            man.loc.x = x;
            man.loc.y = y;
            
        }
       
        
       
        let supercounter = 0;
        for (man of party){
            supercounter ++;
            let wantsToHelp = false;
            //console.log(man);

            for (g in man.goals){
                if (man.goals[g].action == 'fightCooldown'){
                    man.goals.splice(g,1);
                }
            }
            
            for (g of man.goals){
                if (g.action == 'help'){
                    man.goals.unshift(new Goal(g.keyword, 'find'));
                    man.goals.unshift(new Goal(man.hometown.name, 'travel'));
                    wantsToHelp = true;
                    break;
                }
            }
            
            if (wantsToHelp == false){
                man.goals.unshift(new Goal(man.hometown.name, 'travel'));
                
            }
            if (supercounter > 100){
                console.log('whaaaaat supercounter!?');
                break;
            }
            
        }
       
    }

    checkGoals = function(char){
        //GOALS are taken care of one at a time, until deemed complete. ACTIONS are all checked each turn in order to accomplish goals.
        console.log(char.goals);
        let goal = char.goals[0];

        //remove duplicates
        for (g=0;g+1<char.goals.length;g++){
            if (char.goals[g].keyword == char.goals[g+1].keyword && char.goals[g].action == char.goals[g+1].action){
                char.goals.splice(g+1,1);
            }
            
        }
        //console.log(goal);
        switch (goal.action){
            
            case 'live':///////////////////////////////////////////////////////////////////////////////////
                live(char, goal);
                break;
            case 'travel':///////////////////////////////////////////////////////////////////////
                travel(char, goal);
                break;
            case 'rob'://////////////////////////////////////////////////////////////////////////////////
                rob(char, goal);
                break;
            case 'help':////////////////////////////////////////////////////////////////////////////////
                help(char, goal);
                break;
            case 'prowl':///////////////////////////////////////////////////////////////////////////////
                prowl(char, goal);
                break;
            case 'find':///////////////////////////////////////////////////////////////////////////////
                find(char, goal);
                break;
            case 'doNothing':///////////////////////////////////////////////////////////////////////////////
                doNothing(char, goal);
                break;
            case 'kill':////////////////////////////////////////////////////////////////////////////////////
                kill(char, goal);
                break;
            case 'rest':////////////////////////////////////////////////////////////////////////////////////////
                rest(char, goal);
            break;
            case 'fightCooldown':////////////////////////////////////////////////////////////////////////////////////////
                fightCooldown(char, goal);
            break;

            default:
                console.log('goal eval didnt work. goal: '+goal.action);

        
        }    
        
    }

    takeAction = function(char){
        let wipeFlag = false;
        for (g of char.goals){
            if (g.action == 'fight'){
                wipeFlag = true;
            }
        }
        if (wipeFlag == true){
            for (g in char.goals){
                if (char.goals[g].action != 'fight'){
                    char.goals.splice(g,1);
                }
            }
            if (char.goals.length>1){
                for (i=1;i<char.goals.length;i++){
                    char.goals.splice(i,1);
                }
            }
        }

        

        for (goal of char.actions){
            let target = goal.keyword;
            switch (goal.action){
                
                case 'move'://///////////////////////////////////////////////
                 
                    
                    if (containsItem(keywords, target)){
                        //target is not a loc, but actually a keyword
                        for (town of towns){
                            if (town.name == target){
                                target = town.loc;
                                
                            }
                        }
                        for (dung of Dungeons){
                            if (dung.name == target){
                                target = dung.loc;
                                
                            }
                        }
                    }
                    console.log('Move called. Moving from '+char.loc.x+','+char.loc.y+' to '+target.x+','+target.y)

                    let x = target.x;
                    let y = target.y;
                    if (grid[x][y].mountain == true || grid[x][y].water == true){
                        console.log('Cant go there! '+char.name+' to '+loc.x+','+loc.y);
                    }
                    else{
                        char.loc.x = x;
                        char.loc.y = y;
                    }
                    break; 

                

                case 'skip'://///////////////////////////////////////////////////
                    console.log(char.name+' is skipping turn');
                    break;


                case 'fight'://///////////////////////////////////////////////////000000000000000000
                for (g of char.goals){
                    if (g.action == 'fightCooldown'){
                        console.log(char.name+' on fightCooldown');
                        return;
                    }
                }
                fight(char, goal);
                break;

                case 'ask'://///////////////////////////////////////////////////
                // ask a person nearby about keyword, create memories for everyone
                // person doesnt help if they dont like the asker, or if unfamiliar
                
                let nearby = [];
                
                for (character of characters){
                    if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                        if (character.name != char.name){
                            nearby.push(character);
                        }
                    }
                }

                //select who to ask
                roll = getRand(2,10);
                let timeAsk = 1;
                if (roll < nearby.length){
                    timeAsk = roll;
                }else{
                    timeAsk = nearby.length;
                }
                let exitFlag = false;
                for (i=0; i<timeAsk;i++){
                    toAsk = nearby.pop([getRand(0, nearby.length-1)]);

                    //ask about target
                    let emotion = getEmo(getAff(char, toAsk.name));
                    let mem = new KeyMemory(day, [char.name, toAsk.name], {x:char.loc.x.valueOf(),y:char.loc.y.valueOf()}, 'I asked if '+toAsk.name+' could help me find '+target.name+'.', emotion);
                    char.keyMemories.push(mem); 

                    emotion = getEmo(getAff(toAsk, char.name));
                    mem = new KeyMemory(day, [char.name, toAsk.name], {x:toAsk.loc.x.valueOf(),y:toAsk.loc.y.valueOf()}, char.name+' asked if I could help them find '+target.name+'.', emotion);
                    toAsk.keyMemories.push(mem);
                    
                    //give directions if target knows about target (might switch this to has key memory about target within a certain amount of time)
                    for (fam of toAsk.opinions){
                        if (fam.familiar == true && fam.keyword == target.name){
                            let score = getAff(toAsk, char.name);
                            if (score >-40){

                                if (target.loc.x != 0){
                                    mem = new KeyMemory(day, [char.name, toAsk.name], {x:char.loc.x.valueOf(),y:char.loc.y.valueOf()}, toAsk.name+' told me where to find '+target.name+'.', 'happy');
                                    char.keyMemories.push(mem);
                                    history.push(mem); 
        
                                    mem = new KeyMemory(day, [char.name, toAsk.name], {x:toAsk.loc.x.valueOf(),y:toAsk.loc.y.valueOf()}, 'I told '+char.name+' where to find '+target.name+'.', 'happy');
                                    toAsk.keyMemories.push(mem);


                                    char.goals.unshift(new Goal(target.loc, 'travel'));
                                    exitFlag = true;
                                    break;
                                }
                                else{
                                    mem = new KeyMemory(day, [char.name, toAsk.name], {x:char.loc.x.valueOf(),y:char.loc.y.valueOf()}, toAsk.name+' told me '+target.name+' is dead or missing.', 'sad');
                                    char.keyMemories.push(mem);
                                    history.push(mem); 
                                    char.goals.shift();
                                    break;
                                }
                            }   
                        }
                    }
                    if (exitFlag == true){break;}

                    
                }  
          

                    break;

                default:
                    console.log('goal action didnt work. action: '+goal.action);
            }
        }
        char.actions = [];
    }

    fightWinner = function(p2Final, p1Final, score1, score2){
        //when paramater 1 beats parameter 2, here are the consequences
        let team1 = [];
                
        for (f of p2Final){
            team1.push(f.name);
        }
        for (f of p1Final){
            team1.push(f.name);
        }
        for (guy2 of p2Final){
            for (guy1 of p1Final){
                
                let mem = new KeyMemory(day, team1, {x:guy2.loc.x.valueOf(),y:guy2.loc.y.valueOf()}, 'I defeated '+guy1.name+'.', 'happy');
                guy2.keyMemories.push(mem);
                history.push(mem);
            }
        }
        
        for (guy2 of p2Final){
            let mem = new KeyMemory(day, team1, {x:guy1.loc.x.valueOf(),y:guy1.loc.y.valueOf()}, 'I was defeated by '+guy2.name+'.', 'scared');
            guy1.keyMemories.push(mem);
            for (opi of guy1.opinions){
                if (opi.keyword == guy2.name){
                    opi.affinity = opi.affinity-20;
                }
            }
        }
        
        let z = 0;
        for (person of p1Final){
            console.log(person.name);
        
            var result = 'scar';

            if (score1 > score2+200){
                let roll = getRand(0, 9);
                if (roll < 5){
                    result = 'kill';
                }else{
                    result = 'maim';
                }

            }else{
                let roll = getRand(0,9);
                if (roll == 0){
                    result = 'kill';
                }
                if (roll == 1 || roll == 2){
                    result = 'maim';
                }
                if (roll == 3 || roll == 4 || roll == 5 || roll == 6){
                    result = 'scar';
                }
                if (roll == 7 || roll == 8 || roll == 9){
                    result = 'lose';
                }
            }

            //scars
            if (result == 'scar'){
                
                let repeat = true;
                let counter = 0;
                while (repeat == true){
                    repeat = false;
                    var scarDesc = scars[getRand(0,scars.length-1)];
                    for (cloth of person.clothing){
                        if (cloth == scarDesc){repeat = true;}
                    }
                    counter++;
                    if (counter == 100){
                        console.log('scarcounter errorrrrr');
                        break;
                    }
                }

                if (person.clothing.length <= 4){
                    person.clothing[4] = scarDesc;
                }
                else{
                    person.clothing.push(scarDesc);
                }
                let i = person.loc.x.valueOf();
                let j = person.loc.y.valueOf();
                let culprit = p2Final[getRand(0,p2Final.length-1)];
                let mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'I was scarred by '+culprit.name+'.', 'angry');
                person.keyMemories.push(mem);
                history.push(mem);
                mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'I left a scar on '+person.name+'.', 'indifferent');
                culprit.keyMemories.push(mem);
                for (opi of person.opinions){
                    if (opi.keyword == culprit.name){
                        opi.affinity = opi.affinity -30;
                        opi.familiar = true;
                    }
                }
                for (guy of characters){
                    for (rel of guy.relations){
                        if (rel.keyword == person.name){
                            if (rel.relation == 'mother' || rel.relation == 'father' ||rel.relation == 'child' ||rel.relation == 'family' || rel.relation == 'married'){
                                for (opii of guy.opinions){
                                    if (opii.keyword == culprit.name){
                                        opii.affinity = opi.affinity -20;
                                        opii.familiar = true;
                                    }
                                }
                                let relTitle = rel.relation;
                                if (relTitle == 'family'){ relTitle = 'family member';}
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'I learned that my '+relTitle+' was hurt.', 'sad');
                                guy.keyMemories.push(mem);
                            }
                        }
                    }
                }
            }

            //maims
            if (result == 'maim'){
               
                let repeat = true;
                let counter = 0;
                while (repeat == true){
                    repeat = false;
                    var maimDesc = maims[getRand(0,maims.length-1)];
                    for (cloth of person.clothing){
                        if (cloth == maimDesc){repeat = true;}
                    }
                    counter++;
                    if (counter == 100){
                        console.log('maimcounter errererror');
                        break;
                    }
                }

                if (person.clothing.length <= 4){
                    person.clothing[4] = maimDesc;
                }
                else{
                    person.clothing.push(maimDesc);
                }
                let i = person.loc.x.valueOf();
                let j = person.loc.y.valueOf();
                let culprit = p2Final[getRand(0,p2Final.length-1)];
                let mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j},'I was maimed by '+culprit.name+'.', 'angry');
                person.keyMemories.push(mem);
                history.push(mem);
                mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j},'I maimed '+person.name+'.', 'disgusted');
                culprit.keyMemories.push(mem);
                person.strength = parseInt(person.strength - (person.strength/4));
                for (opi of person.opinions){
                    if (opi.keyword == culprit.name){
                        opi.affinity = opi.affinity -60;
                        opi.familiar = true;
                    }
                }
                for (guy of characters){
                    for (rel of guy.relations){
                        if (rel.keyword == person.name){
                            if (rel.relation == 'mother' || rel.relation == 'father' ||rel.relation == 'child' ||rel.relation == 'family' || rel.relation == 'married'){
                                for (opii of guy.opinions){
                                    if (opii.keyword == culprit.name){
                                        opii.affinity = opi.affinity -30;
                                        opii.familiar = true;
                                    }
                                }
                                let relTitle = rel.relation;
                                if (relTitle == 'family'){ relTitle = 'family member';}
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I learned that my '+relTitle+' was maimed.', 'sad');
                                guy.keyMemories.push(mem);
                            }
                        }
                    }
                }
            }

            //items lost or damaged
            if (result == 'lose' || roll == 2){
                
                let roll = getRand(0,1);
                if (roll == 0){
                    //lose weapon
                    let wepFlag = false;
                    for (arti of artifacts){
                        if (arti.name == person.weapon){
                            let tempx = person.loc.x.valueOf();
                            let tempy = person.loc.y.valueOf();
                            arti.loc.x = tempx;
                            arti.loc.y = tempy;
                            person.strength = person.strength - arti.bonus;
                            person.weapon = 'fists';
                            let culprit = p2Final[getRand(0,p2Final.length-1)];
                            let mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I was disarmed by '+culprit.name+'.', 'angry');
                            person.keyMemories.push(mem);
                            history.push(mem);
                            mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I  disarmed '+person.name+'.', 'happy');
                            culprit.keyMemories.push(mem);
                            for (opi of person.opinions){
                                if (opi.keyword == culprit.name){
                                    opi.affinity = opi.affinity -20;
                                    opi.familiar = true;
                                }
                            }
                            wepFlag = true;
                        }
                    }
                    if (wepFlag == false){
                        person.weapon = 'fists';
                        let i = person.loc.x.valueOf();
                        let j = person.loc.y.valueOf();
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'I was disarmed by '+culprit.name+'.', 'angry');
                        person.keyMemories.push(mem);
                        history.push(mem);
                        mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'I  disarmed '+person.name+'.', 'happy');
                        culprit.keyMemories.push(mem);
                        for (opi of person.opinions){
                            if (opi.keyword == culprit.name){
                                opi.affinity = opi.affinity -10;
                                opi.familiar = true;
                            }
                        }

                    }
                    
                }else{
                    let destFlag = false;
                    let clothFlag = false;
                    //lose or damage clothing
                    shuffle(artifacts);
                    for (arti of artifacts){
                        for (cloth of person.clothing){
                            if(destFlag == true){break;}
                            if (arti.name == cloth){
                                tempx = person.loc.x.valueOf();
                                tempy = person.loc.y.valueOf();
                                arti.loc.x = tempx;
                                arti.loc.y = tempy;
                                person.strength = person.strength - arti.bonus;
                                cloth = 'nothing';
                                let culprit = p2Final[getRand(0,p2Final.length-1)];
                                let mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'My '+arti.name+' was torn off of me during the fight by '+culprit.name+'.', 'angry');
                                person.keyMemories.push(mem);
                                history.push(mem);
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:tempx,y:tempy}, 'I made '+person.name+' drop their '+arti.name+'.', 'happy');
                                culprit.keyMemories.push(mem);
                                for (opi of person.opinions){
                                    if (opi.keyword == culprit.name){
                                        opi.affinity = opi.affinity -20;
                                        opi.familiar = true;
                                    }
                                }
                                destFlag = true;
                                clothflag = true;
                            }
                        }
                    }
                    if (clothFlag == false){
                        let limit = 4;
                        if(person.clothing.length < 4){ limit = person.clothing.length; }

                        let roll = getRand(0, limit-1);
                        let err = 0;
                        while(person.clothing[roll] == 'nothing' || person.clothing[roll] == 'damaged tatters'){
                            roll = getRand(0, limit-1);
                            err++;
                            if (err > 100){break;}
                        }
                        
                        lostItem = person.clothing[roll];
                        person.clothing[roll] = 'damaged tatters';
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        let i = person.loc.x.valueOf();
                        let j = person.loc.y.valueOf();
                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'My '+lostItem+' was ruined by '+culprit.name+'.', 'angry');
                        person.keyMemories.push(mem);
                        history.push(mem);
                        mem = new KeyMemory(day, [person.name, culprit.name], {x:i,y:j}, 'I destroyed '+person.name+'s '+lostItem+'.', 'happy');
                        culprit.keyMemories.push(mem);
                        for (opi of person.opinions){
                            if (opi.keyword == culprit.name){
                                opi.affinity = opi.affinity -10;
                                opi.familiar = true;
                            }
                        }
                        destFlag = true;
                    }     
                        
                }
            }
            //calculate who dies
            //for humans if they die drop all their stuff. also change opinions, also key memories

            if (result == 'kill'){
                
                //make everyone who knew and liked the person who died dislike the killer. also key mem
                let culprit = p2Final[getRand(0,p2Final.length-1)];

                //killer remembers killing them
                mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y}, 'I killed '+person.name+'.', 'indifferent');
                culprit.keyMemories.push(mem);
                history.push(mem);

                //people dont want to kill them now hopefully
                for (killer of characters){
                    for (index in killer.goals){
                        if (killer.goals[index].keyword == person.name && killer.goals[index].action == 'kill'){
                            killer.goals.splice(index,1);
                        }
                    }
                }

                for (guy of characters){
                    for (opi of guy.opinions){
                        if (opi.keyword == person.name){
                            if (opi.familiar == true){
                                //they liked the person
                                if (opi.affinity >40){
                                    for (opii of guy.opinions){
                                        if (opii.keyword == culprit.name){
                                            opii.affinity = opi.affinity -40;
                                            opii.familiar = true;
                                        }
                                    }
                                    mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I learned that '+person.name+' was killed by '+culprit.name+'.', 'angry');
                                    guy.keyMemories.push(mem);
                                    //they disliked the person
                                }else if (opi.affinity < -40){
                                    for (opii of guy.opinions){
                                        if (opii.keyword == culprit.name){
                                            opii.affinity = opi.affinity +30;
                                            opii.familiar = true;
                                        }
                                    }
                                    mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I learned that '+person.name+' was killed by '+culprit.name+'.', 'happy');
                                    guy.keyMemories.push(mem);
                                }
                            } 
                        }
                    }
                    for (rel of guy.relations){
                        if (rel.keyword == person.name){
                            if (rel.relation == 'mother' || rel.relation == 'father' ||rel.relation == 'child' ||rel.relation == 'family' || rel.relation == 'married'){
                                for (opii of guy.opinions){
                                    if (opii.keyword == culprit.name){
                                        opii.affinity = opi.affinity -40;
                                        opii.familiar = true;
                                    }
                                }
                                let relTitle = rel.relation;
                                if (relTitle == 'family'){ relTitle = 'family member';}
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I learned that my '+relTitle+' was killed.', 'sad');
                                guy.keyMemories.push(mem);
                            }
                        }
                    }
                } 
                //for vs human also include memories for killer
                
                killCharacter(person);
                
                //for (index in p1Final){
                   // if (p1Final[index].name == person.name){
                        p1Final.splice(z,1);
                   // }
                //}
                
            }  
            z++; 
        }
        //might need to make it so that kill goal is added for each person on other team,
        //and that goal is removed after running away or winning.
        if (p1Final.length >0){
            partyRunAway(p1Final);
        }
        
    }

    cleanMems = function(char){
        let z = 0;
        for (mem of char.keyMemories){
            if (mem.time < day-20){
                
                if (mem.takeAway.includes("I saw")){
                    char.keyMemories.splice(z,1);
                }
                else if (mem.takeAway.includes("I talked")){
                    char.keyMemories.splice(z,1);
                }
            }
            z++;
        }
    }

    interact = function(char){
        //interact with characters or monsters on current tile. Talk, pick up artifacts, etc.
        famwith8(char);
        pickupArtifact(char);
        noticeNearby(char);
        cleanMems(char);
        

        roll = getRand(1,3);
        for (i=0;i<roll;i++){
            talktoNearby(char);
        }

        //if planning to fight someone, then only fight that one person. also dont perform other goals
        for (g of char.actions){
            if (g.action == 'fight'){
                char.goals.unshift(new Goal('here', 'doNothing'));
                char.actions[0] = g;
                for (i=1;i<char.actions.length;i++){
                    char.actions.splice(i,1);
                }
            }
        }

        //a double check for if dead
        if (char.loc.x == 0 && char.loc.y == 0){
            killCharacter(char);
        }
    
    }

    spreadMonster = function(mon){
    }

    reportEvents = function(){
        //eventually i'll try to add cool key memories to an array and output it here
        console.log(history);
        console.log(characters); 
        console.log(dead);
        //history = [];
    }

    killCharacter = function(character, peopleNearby=[character.name]){
        console.log('cleaning up and killing data for '+character.name);
        //everyone that knows this person gets a key memory about their death 
        let place = {x:character.loc.x.valueOf(), y:character.loc.y.valueOf()};
        for (char of characters){
            for (op of char.opinions){
                if (op.keyword == character.name){
                    if (op.familiar == true){
                        if (op.affinity >10){emotion = 'sad';}
                        else if (op.affinity <11 ){emotion = 'indifferent';}
                        else if (op.affinity <-40){emotion = 'happy';}
                        let takeAway = 'I learned that '+character.name+' died.'
                        mem = new KeyMemory(day, peopleNearby, place, takeAway, emotion);
                        char.keyMemories.push(mem);
                    }
                }
            }
        }
        let takeAway = character.name+' died.'
        mem = new KeyMemory(day, peopleNearby, place, takeAway, 'sad');
        history.push(mem);

        
        //clean up party and the other persons partyRunAway
        for (member of character.party){
            if (member.name != character.name){
                for (par2 in member.party){
                    if (member.party[par2].name == character.name){
                        member.party.splice(par2,1);
                    }
                }
            }
        }
        character.party = [character];


    
        //clean up lists
        dead.push(character);

        for (charindex in characters){
            if (characters[charindex].name == character.name){
                characters.splice(charindex,1);
            }
        }
        for (i in keywords){
            if (keywords[i] == character.name){
                keywords.splice(i,1);
            }
        }
        for (i in commoners){
            if (commoners[i] == character.name){
                commoners.splice(i,1);
            }
        }
        for (i in merchants){
            if (merchants[i] == character.name){
                merchants.splice(i,1);
            }
        }
        for (i in adventurers){
            if (adventurers[i] == character.name){
                adventurers.splice(i,1);
            }
        }
        for (i in legends){
            if (legends[i] == character.name){
                legends.splice(i,1);
            }
        }
        for (i in bandits){
            if (bandits[i] == character.name){
                bandits.splice(i,1);
            }
        }
        for (i in mercenaries){
            if (mercenaries[i] == character.name){
                mercenaries.splice(i,1);
            }
        }
        for (town of towns){
            for (m in town.mercs){
                if (town.mercs[m].name == character.name){
                    town.mercs.splice(m,1);
                }
            }
        }

        for (i in monsters){
            if (monsters[i].name == character.name){
                if (monsters[i].description == character.description && monsters[i].strength == character.strength){
                    monsters.splice(i,1);
                }
            }
        }
        
        character.goals = [];
        character.actions = [];
        character.loc.x = 0;
        character.loc.y = 0;

        //sanitize name in case they have a title, then add name back to name bank with 'I' added.
        let name = character.name;
        let nArr =  name.split(",");
        let final = nArr[0];
        if (character.gender = 'male'){
            maleNames.push(final+' I');
        }
        else if (character.gender = 'female'){
            femaleNames.push(final+' I');
        }

    }

    transformToLegend = function(character){
        console.log('transforming '+character.name+' to a legend');
        for (i in adventurers){
            if (adventurers[i] == character.name){
                adventurers.splice(i,1);
            }
        }
        

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
        //add scars and maims
        if (character.clothing.length >=4){
            for (i=4;i<character.clothing.length;i++){
                clothing.push(character.clothing[i]);
            }
        }
        character.clothing = clothing;

        
        if ( 1 == getRand(0,1)){
            character.name = character.name+', '+titles.splice(getRand(0,titles.length-1),1).toString();
        }
        else{
            let fulltitles = ['The Hero of '+character.hometown.name, 'The Savior of '+character.hometown.name, 'The Legend of '+character.hometown.name, 
            Dungeons[getRand(0,Dungeons.length-1)].name+'\'s Warden', Dungeons[getRand(0,Dungeons.length-1)].name+'\'s Tyrant', Dungeons[getRand(0,Dungeons.length-1)].name+'\'s Watcher', 
            'The '+character.haircolor+' Pheonix', 'The '+character.haircolor+' Fox', 'The '+character.haircolor+' Hawk', 'The '+character.haircolor+' Lion', 'The '+character.haircolor+' Shark', 
            'The '+character.haircolor+' Eagle', 'The '+character.haircolor+' Bear', 'The '+character.haircolor+' Snake', 'The '+character.haircolor+' Menace', 'The '+character.haircolor+' Hero', 'The '+character.eyecolor+' eyed Master'];

            character.name = character.name+', '+fulltitles.splice(getRand(0,fulltitles.length-1),1).toString();
        }
        legends.push(character.name);

        let mem = new KeyMemory(day, character.name, character.loc, character.name+' is now a legend!', 'happy');
        history.push(mem);
    }

    pickupArtifact = function(char){
        //pick up artifacts and equip it
        let pickup = false;
        for (artifact of artifacts){
            if (artifact.loc.x == char.loc.x && artifact.loc.y == char.loc.y && artifact.loc.x != 0 && artifact.loc.y != 0){
                let mem = new KeyMemory(day, [char.name], {x:char.loc.x.valueOf(),y:char.loc.y.valueOf()}, 'I found the '+artifact.name, 'happy');
                char.keyMemories.push(mem);
                history.push(mem);

                //remove find goal
                
                for (goal in char.goals){
                    if (char.goals[goal].action == 'find' && char.goals[goal].keyword == artifact.name){
                        char.goals.splice(goal,1);
                    }
                }

                for (op of char.opinions){
                    if (op.keyword == artifact.name){
                        op.familiar == true;
                        op.affinity = op.affinity + 10;
                    }
                }
                console.log(char.name+' found '+artifact.name+' at '+artifact.loc.x+','+artifact.loc.y);
                if (artifact.type == 'weapon'){
                    //check if artifact weapon already
                    for (arti of artifacts){
                        if (char.weapon == arti.name){
                            if (artifact.bonus > arti.bonus){
                                char.strength = char.strength - arti.bonus;
                                char.weapon = artifact.name;
                                char.strength = char.strength + artifact.bonus;
                                arti.loc.x = char.loc.x.valueOf(); //dropped it
                                arti.loc.y = char.loc.y.valueOf();
                                artifact.loc.x = 0; //picked it up
                                artifact.loc.y = 0;
                                pickup = true;
                            }
                        }
                    }
                    if (pickup == false){
                        char.weapon = artifact.name;
                        char.strength = char.strength + artifact.bonus;
                        artifact.loc.x = 0; //picked it up
                        artifact.loc.y = 0;
                    }
                    
                }
                else{
                    //artifact is clothing
                    if (artifact.type == 'lower'){

                        //check if already have a diff artifact
                        for (arti of artifacts){
                            if (char.clothing[0] == arti.name){
                                if (artifact.bonus > arti.bonus){
                                    char.strength = char.strength - arti.bonus;
                                    char.clothing[0] = artifact.name;
                                    char.strength = char.strength + artifact.bonus;
                                    arti.loc.x = char.loc.x.valueOf(); //dropped it
                                    arti.loc.y = char.loc.y.valueOf();
                                    artifact.loc.x = 0; //picked it up
                                    artifact.loc.y = 0;
                                    pickup = true;
                                }
                            
                            }
                        }
                        if (pickup == false){
                            char.clothing[0] = artifact.name;
                            char.strength = char.strength + artifact.bonus;
                            artifact.loc.x = 0; //picked it up
                            artifact.loc.y = 0;
                        }
                    }
                    if (artifact.type == 'upper'){
                        //check if already have a diff artifact
                        for (arti of artifacts){
                            if (char.clothing[1] == arti.name){
                                if (artifact.bonus > arti.bonus){
                                    char.strength = char.strength - arti.bonus;
                                    char.clothing[1] = artifact.name;
                                    char.strength = char.strength + artifact.bonus;
                                    arti.loc.x = char.loc.x.valueOf(); //dropped it
                                    arti.loc.y = char.loc.y.valueOf();
                                    artifact.loc.x = 0; //picked it up
                                    artifact.loc.y = 0;
                                    pickup = true;
                                }
                               
                            }
                        }
                        if (pickup == false){
                            char.clothing[1] = artifact.name;
                            char.strength = char.strength + artifact.bonus;
                            artifact.loc.x = 0; //picked it up
                            artifact.loc.y = 0;
                        }
                        
                    }
                    if (artifact.type == 'hat'){
                        //check if already have a diff artifact
                        for (arti of artifacts){
                            if (char.clothing[2] == arti.name){
                                if (artifact.bonus > arti.bonus){
                                    char.strength = char.strength - arti.bonus;
                                    char.clothing[2] = artifact.name;
                                    char.strength = char.strength + artifact.bonus;
                                    arti.loc.x = char.loc.x; //dropped it
                                    arti.loc.y = char.loc.y;
                                    artifact.loc.x = 0; //picked it up
                                    artifact.loc.y = 0;
                                    pickup = true;
                                }
                                
                            }
                        }
                        if (pickup == false){
                            char.clothing[2] = artifact.name;
                            char.strength = char.strength + artifact.bonus;
                            artifact.loc.x = 0; //picked it up
                            artifact.loc.y = 0;
                        }
                        
                    }
                    if (artifact.type == 'cape'){
                        //check if already have a diff artifact
                        for (arti of artifacts){
                            if (char.clothing[3] == arti.name){
                                if (artifact.bonus > arti.bonus){
                                    char.strength = char.strength - arti.bonus;
                                    char.clothing[3] = artifact.name;
                                    char.strength = char.strength + artifact.bonus;
                                    arti.loc.x = char.loc.x.valueOf(); //dropped it
                                    arti.loc.y = char.loc.y.valueOf();
                                    artifact.loc.x = 0; //picked it up
                                    artifact.loc.y = 0;
                                    pickup = true;
                                }
                               
                            }
                        }
                        if (pickup == false){
                            char.clothing[3] = artifact.name;
                            char.strength = char.strength + artifact.bonus;
                            artifact.loc.x = 0; //picked it up
                            artifact.loc.y = 0;
                        }
                    }
                }
            }
        }
    }

    talktoNearby = function(me){
        //npc's will chat with 3 other people max. They do not initiate conversations with people whose strength is 100 less
        if (me.name == 'ORSTED THE ANNIHILATOR'){
            return;
        }
       
        let nearby = [];
        for (character of characters){
            if (character.loc.x == me.loc.x && character.loc.y == me.loc.y){
                for (partyMem of me.party){
                    if (character.name != me.name){
                        nearby.push(character);
                    }
                }
                if (character.name != me.name && character.strength > (me.strength-100)){
                    nearby.push(character);
                }
                
            }
        }
        if (nearby.length > 0 ){
            let target = nearby[getRand(0, nearby.length-1)];
            if (isFamiliar(me, target.name)){
                let roll = getRand(0,3);
                if (roll ==2 || roll == 1 || roll == 3){
                    for (op of me.opinions){
                        if (op.keyword == target.name){
                            if (target.personality == me.personality){
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(0,4);
                                    }
                                }
                                op.affinity=op.affinity+getRand(0,4);
                            }
                            else if (target.personality == 'normal' || me.personality == 'normal'){
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(-2,2);
                                    }
                                }
                                op.affinity = op.affinity+getRand(-2,2);
                            }
                            else {
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(-4,0);
                                    }
                                }
                                op.affinity = op.affinity+getRand(-4,0);
                            }
                        }
                    }
                    //if (target is player){talk to them} <== come back and do this eventually

                    let emotion = getEmo(getAff(me, target.name));
                    mem = new KeyMemory(day, [me.name, target.name], {x:me.loc.x,y:me.loc.y}, 'I talked to '+target.name, emotion);
                    me.keyMemories.push(mem); 
                    console.log(me.name+' talked to '+target.name);
                    emotion = getEmo(getAff(target, me.name));
                    mem = new KeyMemory(day, [target.name, me.name], {x:target.loc.x,y:target.loc.y}, 'I talked to '+me.name, emotion);
                    target.keyMemories.push(mem); 

                }
                
            }else{
                //unfamiliar

                let roll = getRand(0,3);
                if (roll ==2){
                    for (op of me.opinions){
                        if (op.keyword == target.name){
                            if (target.personality == me.personality){
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(2,10);
                                        opi.familiar = true;
                                    }
                                }
                                op.affinity=op.affinity+getRand(2,10);
                                op.familiar = true;
                            }
                            else if (target.personality == 'normal' || me.personality == 'normal'){
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(-5,5);
                                        opi.familiar = true;
                                    }
                                }
                                op.affinity = op.affinity+getRand(-5,5);
                                op.familiar = true;
                            }
                            else {
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(-10,-2);
                                        opi.familiar = true;
                                    }
                                }
                                op.affinity = op.affinity+getRand(-10,-2);
                                op.familiar = true;
                            }
                        }
                    }
                    //if (target is player){talk to them} <== come back and do this eventually

                    let emotion = getEmo(getAff(me, target.name));
                    mem = new KeyMemory(day, [me.name, target.name], {x:me.loc.x,y:me.loc.y}, 'I met '+target.name, emotion);
                    me.keyMemories.push(mem); 
                    emotion = getEmo(getAff(target, me.name));
                    mem = new KeyMemory(day, [target.name, me.name], {x:target.loc.x,y:target.loc.y}, 'I met '+me.name, emotion);
                    target.keyMemories.push(mem); 


                }
            }
            
      
        }

    }

    famwith8 = function(char){
        for (op of char.opinions){
            for (big of big8){
                if (op.keyword == big.name){
                    op.familiar = true;
                }
            }
        }
    }

    sortArr = function(array){
        var temp = 0;
        for (var i = 0; i < array.length; i++) {
            for (var j = i; j < array.length; j++) {
                if (array[j].strength < array[i].strength) {
                    temp = array[j];
                    array[j] = array[i];
                    array[i] = temp;
                }
            }
        }
        return array;
        // for (i = 1; i<arr.length; i++){
        //     let j = i;
        //     let y = arr[i].strength;
        //     while ((j > 0) && (arr[j-1].strength > y)){
        //         arr[j] = arr[j-1];
        //         j--;
        //     }
        //     arr[j]=arr[i];
        // }
    }

    noticeNearby = function(me){
        //the point of this is to notice when people nearby have an artifact equipped and add a key memory
        //same thing for if the person is part of the big 8
        //same thing for if they are familiar with a person and see them in the same tile
        //same thing for if they notice a monster in the same tile
        //fight people they hate in the same tile
        //when people arrive at a location i'll add the key memory within that function.

        
        let nearby = [];
        for (character of characters){
            if (character.loc.x == me.loc.x && character.loc.y == me.loc.y){
                if (character.name != me.name){
                    nearby.push(character);
                }
            }
        }
        //artifact equipped
        for (near of nearby){
            for (artifact of artifacts){
                //weapon
                if (near.weapon == artifact.name){
                    if (isFamiliar(me, near.name)){
                        mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw '+near.name+' with the '+near.weapon, 'surprised');
                        me.keyMemories.push(mem);
                        for (op of char.opinions){
                            if (op.keyword == artifact.name){
                                op.familiar == true;
                                op.affinity = op.affinity + 2;
                            }
                        }
                    }
                    else{
                        mem = new KeyMemory(day, [me.name, 'a stranger'], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw a stranger with the '+near.weapon, 'surprised');
                        me.keyMemories.push(mem);
                        for (op of char.opinions){
                            if (op.keyword == artifact.name){
                                op.familiar == true;
                                op.affinity = op.affinity + 1;
                            }
                        }
                    }
                }
                //clothing
                if (containsItem(near.clothing, artifact.name)){
                    if (isFamiliar(me, near.name)){
                        mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw '+near.name+' with the '+artifact.name, 'surprised');
                        me.keyMemories.push(mem);
                        for (op of char.opinions){
                            if (op.keyword == artifact.name){
                                op.familiar == true;
                                op.affinity = op.affinity + 2;
                            }
                        }
                    }
                    else{
                        mem = new KeyMemory(day, [me.name, 'a stranger'], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw a stranger with the '+artifact.name, 'surprised');
                        me.keyMemories.push(mem);
                        for (op of char.opinions){
                            if (op.keyword == artifact.name){
                                op.familiar == true;
                                op.affinity = op.affinity + 1;
                            }
                        }
                    }
                }
            }
        }

        //notice big 8
        for (near of nearby){
            for (big of big8){
                if (near.name == big.name){
                    let emotion = getEmo(getAff(me, big.name));
                    mem = new KeyMemory(day, [me.name, big.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw '+big.name+', one of the Legendary Big 8!', emotion);
                    me.keyMemories.push(mem); 
                }
            }
        }

        //notice someone they are familiar with
        for (near of nearby){
            if (isFamiliar(me, near.name)){
                let emotion = getEmo(getAff(me, near.name));
                mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw '+near.name, emotion);
                me.keyMemories.push(mem); 
            }
            else {
                mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw a stranger with '+near.clothing.toString()+' pass by.', 'indifferent');
                me.keyMemories.push(mem); 
            }
        }
        //notice a monster nearby
        for (monster of monsters){
            if (monster.loc.x == me.loc.x && monster.loc.y == me.loc.y){
                let emotion = getEmobyStrength(me, monster);
                mem = new KeyMemory(day, [me.name, monster.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw a '+monster.name, emotion);
                me.keyMemories.push(mem); 
            }
        }

        //notice a bandit nearby
        for (near of nearby){
            if (containsItem(bandits, near.name)){
                if (isFamiliar(me, near.name)){
                    let emotion = getEmobyStrength(me, near);
                    mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw '+near.name+' the bandit', emotion);
                    me.keyMemories.push(mem); 
                }
                else {
                    let emotion = getEmobyStrength(me, near);
                    mem = new KeyMemory(day, [me.name, 'a stranger'], {x:me.loc.x.valueOf(),y:me.loc.y.valueOf()}, 'I saw a bandit', emotion);
                    me.keyMemories.push(mem); 
                }
            }
        }

        //notice someone they want to kill nearby
        let cooldownFlag = false;
        for (g of me.goals){
            if (g.action == 'fightCooldown'){
                cooldownFlag = true;
            }
        }
        if (cooldownFlag == false){
            let hated = [];
            for (opinion of me.opinions){
                if (opinion.familiar == true && opinion.affinity<-59 && me.name != 'ORSTED THE ANNIHILATOR'){
                    hated.push(opinion.keyword);
                }
            }
            //fight hated people nearby
            var enemyNear = false;
            for (near of nearby){
                for (bad of hated){
                    if (near.name == bad){
                        console.log('I saw '+bad+ ' nearby and want to fight them');
                        me.actions.push(new Goal(bad, 'fight'));
                        enemyNear = true;
                    }
                }
            }
            let hitlist = [];
            let alreadyfindingenemy = false;
            //add goal to kill hated people
            if (enemyNear == false){
                for (target of hated){
                    for (g of me.goals){
                        if (g.keyword == target && g.action == 'find'){
                            alreadyfindingenemy = true;
                        }
                    }
                    if (alreadyfindingenemy == false && target != 'ORSTED THE ANNIHILATOR'){
                        for (opi of me.opinions){
                            if (opi.keyword == target && opi.affinity <-79){
                                hitlist.push(target);
                            }
                        }  
                    }
                }
            }
            let noRepeat = true;
            for (dude of hitlist){
                for (g of char.goals){
                    if (g.action == 'kill' && g.keyword == dude){
                        noRepeat = false;
                    }
                }
                if (noRepeat == true){
                    char.goals.unshift(new Goal(dude,'kill'));
                    char.goals.unshift(new Goal(dude,'find'));
                }
            }
        }        

        //when you come here for player version, make sure to add checker if Orsted is nearby.
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    days = days + (yeers*100); //convert kiloyears to days
    let yearCounter = 0;
    let kiloYear = 0;

    for (day=0; day<days; day++){
        console.log('day '+day);
        var big8 = getbig8();
        
        //each day has 3 phase
        for (phase = 0; phase<3; phase++){
            console.log(big8);
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ character logic ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            shuffle(characters);
            console.log(towns);
            console.log(Dungeons);
            for (char of characters){
                console.log(char);
                console.log(char.loc.x+','+char.loc.y);
                //interact with characters or monsters on current tile. Talk, pick up artifacts, etc.
                interact(char);

                //add actions based on current goal
                checkGoals(char);
                
                //take action and edit goals based on result
                //infinite loop in here somewhere
                takeAction(char);
                
                //console.log(char);
                //console.log(char.loc.x+','+char.loc.y);
                console.log('-----');

            }

            //+++++++++++++++++++++++++++++++++++++++++++++++++++ monster logic +++++++++++++++++++++++++++++++++
            console.log('monsters');
            for (mon of monsters){
                console.log(mon.name);
                console.log(mon);
                //spreadMonster(mon);
                checkGoals(mon);
                takeAction(mon);
                //check if too many monsters on tile and spread out if so
                
            }
            
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& things that happen at the end of the phase &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            for (char of characters){
                for (opi of char.opinions){
                    if (opi.affinity >100){opi.affinity=100;}
                    if (opi.affinity <-100)(opi.affinity=-100);
                }
            }

            //as interesting things happen a list is populated with those occurances. clear it out and console log it here.
            reportEvents();
            
            //const input = prompt();
            

        }
        //********************************************* things that happen at the end of the day *******************************************************************
        
        yearCounter++;
        if (yearCounter == 100){
            kiloYear++; 
            yearCounter = 0;
            for (character of characters){
                character.age++;
                //opinions of things slowly get less strong as the years go by
                for (opi of character.opinions){
                    if (opi.value < -41){opi.value = opi.value+2;}
                    if (opi.value > 41){opi.value = opi.value-2;}
                }
            }
        }

        for (character of characters){
            if (character.strength > 299 && containsItem(legends, character.name) == false){
                transformToLegend(character);
            }
        }
        //new people come of age over time
        for (town of towns){
            //it is very important you include undefined at the end!
            if (69 == getRand(0,200)){
                console.log('spawning commoner');
                let guy = spawnCommoner(town, 18, undefined, undefined);
                for (dude of characters){
                    dude.opinions.push(new Opinion(guy.name, undefined, false));
                }

            }
            if (69 == getRand(0,200)){
                console.log('spawning merchant');
                let guy = spawnMerchant(town, 18, undefined, undefined);
                for (dude of characters){
                    dude.opinions.push(new Opinion(guy.name, undefined, false));
                }
                
            }
            if (69 == getRand(0,200)){
                console.log('spawning merc');
                let guy = spawnMercenary(town, 18, undefined, undefined);
                for (dude of characters){
                    dude.opinions.push(new Opinion(guy.name, undefined, false));
                }
                town.mercs.push(guy);
               
            }
            if (69 == getRand(0,200)){
                console.log('spawning adventurer');
                let guy = spawnAdventurer(town, 18, undefined, undefined);
                for (dude of characters){
                    dude.opinions.push(new Opinion(guy.name, undefined, false));
                }
                
            }
        }
        //die of old age
        for (character of characters){
            if (character.age > 75 && containsItem(legends, character.name)==false){
                if (69 == getRand(0,1000)){
                    //character dies of old age
                    let mem = new KeyMemory(day, [character.name], {x:character.loc.x.valueOf(), y:character.loc.y.valueOf()}, character.name+' died of old age', 'indifferent');
                    history.push(mem);
                    killCharacter(character);
                }
                if (character.age > 90){
                    if (69 == getRand(0,100)){
                        //character dies of old age
                        let mem = new KeyMemory(day, [character.name], {x:character.loc.x.valueOf(), y:character.loc.y.valueOf()}, character.name+' died of old age', 'indifferent');
                        history.push(mem);
                        killCharacter(character);
                    }
                }
            }
            if (character.age > 200 && character.name != 'ORSTED THE ANNIHILATOR'){
                if (69 == getRand(0,3000)){
                    //character dies of old age
                    let mem = new KeyMemory(day, [character.name], {x:character.loc.x.valueOf(), y:character.loc.y.valueOf()}, character.name+' died of old age', 'indifferent');
                    history.push(mem);
                    killCharacter(character);
                }
                if (character.age > 300){
                    if (69 == getRand(0,1000)){
                        //character dies of old age
                        let mem = new KeyMemory(day, [character.name], {x:character.loc.x.valueOf(), y:character.loc.y.valueOf()}, character.name+' died of old age', 'indifferent');
                        history.push(mem);
                        killCharacter(character);
                    }
                }
                if (character.age > 400){
                    if (69 == getRand(0,500)){
                        //character dies of old age
                        let mem = new KeyMemory(day, [character.name], {x:character.loc.x.valueOf(), y:character.loc.y.valueOf()}, character.name+' died of old age', 'indifferent');
                        history.push(mem);
                        killCharacter(character);
                    }
                }
            }
        }
        //new bandits
        if (1 == getRand(0,9)){
            console.log('spawning bandit');
            let bandFlag = true;
            let counter = 0;
            while (bandFlag){
                let i = getRand(1,sizeX-2);
                let j = getRand(1,sizeY-2);
                if (grid[i][j].road == true && grid[i][j].town == false && grid[i][j].mountain == false && grid[i][j].water == false){
                    bandFlag = false;
                    let guy = spawnBandit(i,j, undefined, undefined);
                    for (dude of characters){
                        dude.opinions.push(new Opinion(guy.name, getRand(-40,-10), false));
                    }
                }
                counter++;
                if (counter == 1000){
                    console.log('bandit counter error');
                    break;
                }
            }    
        }
        
        //new monsters
        if (1 == getRand(0,9)){
            console.log('spawning monster');
            let bandFlag = true;
            let counter = 0;
            while (bandFlag){
                let i = getRand(1,sizeX-2);
                let j = getRand(1,sizeY-2);
                if (grid[i][j].road == false && grid[i][j].town == false && grid[i][j].mountain == false && grid[i][j].water == false){
                    
                    if (grid[i][j].Dungeon == true){
                        spawnSuperiorM(i,j,goals=undefined);
                    }
                    else if (grid[i][j].grassland == true){
                        
                            spawnMinorM(i,j,goals=undefined);
                        
                    }
                    else if (grid[i][j].tundra == true){
                        
                            spawnMiddleM(i,j,goals=undefined);
                        
                    }
                    else if (grid[i][j].desert == true){
                        let roll = getRand(0,1);
                        if (roll == 1){
                            spawnMiddleM(i,j,goals=undefined);
                        }  
                        else{
                            spawnMinorM(i,j,goals=undefined);
                        }
                        
                    }
                    else if (grid[i][j].swamp == true){
                       
                            spawnSuperiorM(i,j,goals=undefined);
                        
                    }

                    bandFlag = false;
                    
                }
                counter++;
                if (counter == 1000){
                    console.log('monster counter error');
                    break;
                }
            }    
        }      

        //replenish monsters and artifacts at dungeons after 50 days
        for (dung of Dungeons){
            let flag = false;
            for (arti of artifacts){
                if (arti.loc.x == dung.loc.x && arti.loc.y == dung.loc.y){
                    flag = true;
                }
            }
            if (flag == false){
                dung.countdown--;
                if (dung.countdown < 1){
                    dung.countdown = 50;
                    console.log(dung.name+' replenishing monster & loot.')
                    spawnSuperiorM(dung.loc.x.valueOf(), dung.loc.y.valueOf(), undefined);
                    let artifact = new Artifact({x:dung.loc.x.valueOf(),y:dung.loc.y.valueOf()});
                    artifacts.push(artifact);
                    keywords.push(artifact.name);
                    for (dude of characters){
                        dude.opinions.push(new Opinion(artifact.name, undefined, false));
                    }
                }  
            }
        }
        //characters like those they travel with.
        for (char of characters) {
            for (key of char.party){
                for (opi of char.opinions){
                    if (opi.keyword == key && opi.keyword != char.name){
                        if (opi.affinity <80){opi.affinity++;}
                    }
                }
            }
        }
        







    }////////////////////
}