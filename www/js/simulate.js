// This is meant to simulate the world progress for a specified amount of time. I will have a seperate .js file for when the player can interact.
// The two files should be largely similar however.

//const help = require("cordova/src/help");
//const { find } = require("../../platforms/browser/platform_www/cordova_plugins");

//Basic(0-20) -> intermediate(20-60) -> advanced(60-120) -> expert(120-200) -> master(200-300) -> Queen(300-500) -> King(500-1000) -> God(1000+)
var big8;

var simulate = function(yeers, days){
    
    // %%%%%%%%%%%%%%%%%%%%%% functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    getbig8 = function(){
        let big = [];
        
        for (c of characters){
            big.push(c);
            sortArr(big);
            if (big.length>8){big.pop();}
        }
        return big;
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
            let mem = new KeyMemory(day, myParty, {x:char.loc.x,y:char.loc.y}, 'Arrived at '+goal.keyword, emotion);
            char.keyMemories.push(mem); 
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
            if (containsItem(merchants, char.name) && char.goals.length < 1){
                destination = towns[getRand(0,towns.length-1)];
                char.goals.unshift(new Goal(destination.name, 'travel'));
                char.goals.unshift(new Goal(destination.name, 'rest'));
            }
            if (containsItem(commoners, char.name) || containsItem(mercenaries, char.name)){
                if (char.goals.length < 2){
                    if (char.loc.x != char.hometown.loc.x && char.loc.y != char.hometown.loc.y){
                        char.goals.unshift(new Goal(char.hometown.name, 'travel'));
                        char.goals.unshift(new Goal('here', 'rest'));
                    }
                    else{
                        
                        char.goals.unshift(new Goal(char.hometown.name, 'live'));
                        char.goals.unshift(new Goal(char.hometown.name, 'rest'));
                    } 
                }
            }
            if (containsItem(adventurers, char.name) && char.goals.length < 1){
                
                let roll = getRand(0,3);
                if (roll == 1){
                    //go to a town
                    
                    destination = towns[getRand(0,towns.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
                else {
                    //go to a dungeon
                    
                    destination = Dungeons[getRand(0,Dungeons.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
                
            }
            if (containsItem(legends, char.name) && char.goals.length < 1){
                
                let roll = getRand(0,19);
                if (roll == 1){
                    //go to a town
                    
                    destination = towns[getRand(0,towns.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
                else {
                    //go to a dungeon
                    
                    destination = Dungeons[getRand(0,Dungeons.length-1)];
                    char.goals.unshift(new Goal(destination.name, 'travel'));
                    char.goals.unshift(new Goal(destination.name, 'rest'));
                }
            
            }
        }
        else{
            //move towards destination
          
            path = findPath(char.loc, target);
            console.log(path);
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
            let target = goal.keyword;
            console.log(char.name+' wants to find '+target);  
             //get object for target instead of keyword////////////////////////////////
             for (character of characters){
                if (character.name == target){
                    target = character;
                }
            }
            for (artifact of artifacts){
                //if artifact on the ground, set target to it. otherwise, set target to who has it.
                if (artifact.name == target){
                    if (artifact.loc.x == 0 && artifact.loc.y == 0){
                        for (character of characters){
                            for (item of character.clothing){
                                if (item == target){
                                    target = character;
                                    //char.goals.shift();
                                    //add check if they already have these two goals
                                    char.goals.unshift(new Goal(character.name, 'kill'));
                                    char.goals.unshift(new Goal(character.name, 'find'));
                                }
                            }
                            if (character.weapon == target){
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
                if (dung.name == target){
                    target = dung;
                }
            }
            for (town of towns){
                if (town.name == target){
                    target = town;
                }
            }
            if (target.loc.x === undefined){
                //target is dead or something
                console.log('tried to find '+target+'but to no avail.');
                char.goals.shift();
            }///////////////////////////////////////////////////////////////
            //is person, place, or thing here with me?
            //if yes, then done trying to find them. shift(). i'll put this in default actions
            //otherwise, ask around. should ask people each turn, if able.

            //within ask, ask around about the target. if people asked not familiar, then keep asking.
            //once someone found that is familiar, set new goal of travel to that location.
            //if nobody nearby is familiar with target then travel to a new town

            //have noticenearby() ask people nearby if one of goals is to find something, similar to what you did for kill.

            if (char.goals.length < 3){
                char.goals.unshift(towns[getRand(0,towns.length-1)].name,'travel');
                char.goals.unshift('here','rest');
            }
            if (target.loc.x != char.loc.x && target.loc.y != char.loc.y){
                char.actions.push(new Goal(target, 'ask'));
            }
            else{
                char.goals.shift();
            }


            
           
            //if char is at target position  
            

           
                                    
            
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
        let p2 = undefined;
        let p1 = undefined;
        
        
        for (monster of monsters){
            if (monster.name = target){
                console.log('monster fight');
                monsterFight = true;
                p1 = char;
                p2 = monster;

            }
        }
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

        let p1Party = p1.party;
        let p2Party = p2.party;

        //monster fight
        if (monsterFight == true){

            let nearby = [];
            for (character of characters){
                if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                    if (character.name != char.name){
                        nearby.push(character);   
                    }
                }
            }
            //add people from party
            // for (dude of char.party){
            //     if (dude.name != character.name){
            //         let repeat = false;
            //         for (thing of nearby){
            //             if (thing.name == dude.name){
            //                 repeat == true;
            //             }
            //         }
            //         if (repeat == false){
            //             nearby.push(dude);
            //         }   
            //     }
            // }
            
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
                score1 = score1 + member.strength;
            }

            console.log (p1.name + ' party: '+score1+' vs. '+p2.name+' party: '+score2);
            console.log(p1Party);
            console.log(p2Party);
            
            //decide if p1 runs
            if (score1 < score2-30){
                let roll = getRand(0,2);
                if (roll != 2){
                    partyRunAway(p1Party);
                    console.log(p1Party[0].name+' running away');
                    return;
                }else{
                    console.log(p1.name+' party cant escape!');
                }
            }
            //fight

            let roll = getRand(1,p1Party.length);
            let p1Final = [];
            for (i=0;i<roll;i++){
                p1Final.concat(p1Party.splice(getRand(0,p1Final.length-1),1))
            }

            roll = getRand(1,p2Party.length);
            let p2Final = [];
            for (i=0;i<roll;i++){
                p2Final.concat(p2Party.splice(getRand(0,p2Final.length-1),1))
            }
            console.log('This round: '+p1Final+' vs '+p2Final);
            console.log(p1Final);
            console.log(p2Final);

            score1 = 0;
            for (member of p1Final){
                for (i=0; i<member.strengh;i++){
                    let roll = getRand(1,6);
                    score1 = score1 + roll;
                }
            }
            score2 = 0;
            for (member of p2Final){
                for (i=0; i<member.strengh;i++){
                    let roll = getRand(1,6);
                    score2 = score2 + roll;
                }
            }

            //before we decide who wins, alter opinions
            for (fighter of p1Final){
                for (f2 of p2Final){
                    for (opi of fighter.opinions){
                        if (opi.keyword == f2.name){
                            opi.familiar = true;
                            opi.affinity = opi.affinity-10;
                            let emotion = getEmobyStrength(fighter, f2);
                            let mem = new KeyMemory(day, [fighter.name, f2.name], {x:fighter.loc.x,y:fighter.loc.y}, 'I fought '+f2.name+'.', emotion);
                            fighter.keyMemories.push(mem);
                        }
                    }
                }
            }
            
            //p1 wins
            if (score1 >= score2){
                console.log('p1 wins');
                
                for (guy1 of p1Final){
                    for (guy2 of p2Final){
                        let mem = new KeyMemory(day, [guy1.name, guy2.name], {x:guy1.loc.x,y:guy1.loc.y}, 'I defeated '+guy2.name+'.', 'happy');
                        guy1.keyMemories.push(mem);
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
                for (guy1 of p2Final){
                    for (guy2 of p1Final){
                        let mem = new KeyMemory(day, [guy1.name, guy2.name], {x:guy1.loc.x,y:guy1.loc.y}, 'I was defeated by '+guy2.name+'.', 'scared');
                        guy1.keyMemories.push(mem);
                        for (opi of guy2.opinions){
                            if (opi.keyword == guy1.name){
                                opi.affinity = opi.affinity-20;
                            }
                        }
                    }
                }
                

                
                //at a minimum characters should get scarred or maimed
                //small chance to drop artifact or clothing item as well. add key mems
                for ( person of p1Final){
                
                    let result = 'scar';

                    if (score2 > score1+100){
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
                        let repeat = false;
                        while (repeat == false){
                            var scarDesc = getRand(0,scars.length-1);
                            for (cloth of person.clothing){
                                if (cloth == scarDesc){repeat = true;}
                            }
                        }

                        if (person.clothing.length <= 4){
                            person.clothing[5] = scarDesc;
                        }
                        else{
                            person.clothing.push(scarDesc);
                        }
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y},'I was scarred by '+culprit.name+'.', 'angry');
                        person.keyMemories.push(mem);
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
                        let repeat = false;
                        while (repeat == false){
                            var maimDesc = getRand(0,maims.length-1);
                            for (cloth of person.clothing){
                                if (cloth == maimDesc){repeat = true;}
                            }
                        }

                        if (person.clothing.length <= 4){
                            person.clothing[5] = maimDesc;
                        }
                        else{
                            person.clothing.push(maimDesc);
                        }
                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y},'I was maimed by '+culprit.name+'.', 'angry');
                        person.keyMemories.push(mem);
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
                            for (arti of artifacts){
                                if (arti.name == person.weapon){
                                    arti.loc.x = person.loc.x;
                                    arti.loc.y = person.loc.y;
                                    person.strength = person.strength - arti.bonus;
                                    person.weapon = 'fists';
                                    let culprit = p2Final[getRand(0,p2Final.length-1)];
                                    let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I was disarmed by '+culprit.name+'.', 'angry');
                                    person.keyMemories.push(mem);
                                    for (opi of person.opinions){
                                        if (opi.keyword == culprit.name){
                                            opi.affinity = opi.affinity -20;
                                            opi.familiar = true;
                                        }
                                    }
                                }else{
                                    person.weapon = 'fists';
                                    let culprit = p2Final[getRand(0,p2Final.length-1)];
                                    let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I was disarmed by '+culprit.name+'.', 'angry');
                                    person.keyMemories.push(mem);
                                    for (opi of person.opinions){
                                        if (opi.keyword == culprit.name){
                                            opi.affinity = opi.affinity -10;
                                            opi.familiar = true;
                                        }
                                    }

                                }
                            }
                        }else{
                            let destFlag = false;
                            //lose or damage clothing
                            for (arti of artifacts){
                                for (cloth of person.clothing){
                                    if(desFlag == true){break;}
                                    if (arti.name == cloth){
                                        arti.loc.x = person.loc.x;
                                        arti.loc.y = person.loc.y;
                                        person.strength = person.strength - arti.bonus;
                                        cloth = 'nothing';
                                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'My '+arti.name+' was torn off of me during the fight by '+culprit.name+'.', 'angry');
                                        person.keyMemories.push(mem);
                                        for (opi of person.opinions){
                                            if (opi.keyword == culprit.name){
                                                opi.affinity = opi.affinity -20;
                                                opi.familiar = true;
                                            }
                                        }
                                        destFlag = true;
                                    }else{
                                        let limit = 4;
                                        if(person.clothing.length < 4){ limit = person.clothing.length; }
                                        let roll = getRand(0, limit-1);
                                        let itemLost = person.clothing[roll];
                                        person.clothing[roll] = 'damaged tatters';
                                        let culprit = p2Final[getRand(0,p2Final.length-1)];
                                        let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'My '+itemLost+' was ruined by '+culprit.name+'.', 'angry');
                                        person.keyMemories.push(mem);
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
                                            }else{
                                                mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I learned that '+person.name+' was killed by '+culprit.name+'.', 'sad');
                                                guy.keyMemories.push(mem);
                                            }
                                        } 
                                    }
                                }
                            }  
                            //for vs human also include memories for killer
                            
                            killCharacter(person);
                            p1Final = p1Final.filter(entry , entry.name != person.name);
                    }
                    partyRunAway(p1Final);
                }

            }
        }
        //human fight
        else {
            //theres a good chance i am adding party members to nearby and will double add them by accident.
            let nearby = [];
            for (character of characters){
                if (character.loc.x == char.loc.x && character.loc.y == char.loc.y){
                    if (character.name != char.name){
                        nearby.push(character);   
                    }
                }
            }
            let overall1 = 0;
            let overall2 = 0;
            
            //choose if bystanders help
            for (near of nearby){
                for (opi of near){
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
                console.log(near.name +' has affinity for p1 and p2 '+overall1+' vs '+overall2);
                if (overall1 >= overall2){
                    console.log(nearby.name+' joining the fight for p1 side');
                    p1Party.push(nearby);
                }
                else{
                    console.log(nearby.name+' joining the fight for p2 side');
                    p2Party.push(nearby);
                }
            }

            //size eachother up
            let score1 = 0;
            for (member of p1Party){
                score1 = score1 + member.strength;
                
            }
            let score2 = 0;
            for (member of p2Party){
                score1 = score1 + member.strength;
            }

            console.log (p1.name + ' party: '+score1+' vs. '+p2.name+' party: '+score2);
            console.log(p1Party);
            console.log(p2Party);
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
                p1Final.push(p1Party.splice(getRand(0,p1Final.length-1),1));
            }

            roll = getRand(1,p2Party.length);
            let p2Final = [];
            for (i=0;i<roll;i++){
                p2Final.push(p2Party.splice(getRand(0,p2Final.length-1),1));
            }
            console.log(p1Final);
            console.log(p2FInal);
            console.log('This round: '+p1Final+' vs '+p2Final);

            score1 = 0;
            for (member of p1Final){
                for (i=0; i<member.strengh;i++){
                    let roll = getRand(1,6);
                    score1 = score1 + roll;
                }
            }
            score2 = 0;
            for (member of p2Final){
                for (i=0; i<member.strengh;i++){
                    let roll = getRand(1,6);
                    score2 = score2 + roll;
                }
            }

            //before we decide who wins, alter opinions
            for (fighter of p1Final){
                for (f2 of p2Final){
                    for (opi of fighter.opinions){
                        if (opi.keyword == f2.name){
                            opi.familiar = true;
                            opi.affinity = opi.affinity-10;
                            let emotion = getEmobyStrength(fighter, f2);
                            let mem = new KeyMemory(day, [fighter.name, f2.name], {x:fighter.loc.x,y:fighter.loc.y}, 'I fought '+f2.name+'.', emotion);
                            fighter.keyMemories.push(mem);
                        }
                    }
                }
            }
            for (fighter of p2Final){
                for (f2 of p1Final){
                    for (opi of fighter.opinions){
                        if (opi.keyword == f2.name){
                            opi.familiar = true;
                            opi.affinity = opi.affinity-10;
                            let emotion = getEmobyStrength(fighter, f2);
                            let mem = new KeyMemory(day, [fighter.name, f2.name], {x:fighter.loc.x,y:fighter.loc.y}, 'I fought '+f2.name+'.', emotion);
                            fighter.keyMemories.push(mem);
                        }
                    }
                }
            }
            
            //p1 wins ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (score1 >= score2){
                fightWinner(p1Final, p2Final);
            
            }
            //p2 wins //////////////////////////////////////////////////////////////////////////////////////////////////////////////
            else{
                fightWinner(p2Final, p1Final);

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

    partyRunAway = function(party){

        console.log(party.name+' party runs away!');
        let blocked = false;
        for (man of party){
            while (blocked != false){
                let x = man.loc.x;
                let y = man.loc.y;
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
            }

            man.loc.x = x;
            man.loc.y = y;
            for (guy of party){
                for (g of man.goals){
                    if (g.action == 'help' && g.keyword == guy.name){
                        man.goals.unshift(new Goal(guy.name, 'find'));
                        man.goals.unshift(new Goal(towns[getRand(0,towns.length-1)].name, 'travel'));
                        
                    }
                }
            }

        }

    }

    checkGoals = function(char){
        //GOALS are taken care of one at a time, until deemed complete. ACTIONS are all checked each turn in order to accomplish goals.
        console.log(char.goals);
        let goal = char.goals[0];
        console.log(goal);
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
            case 'kill':////////////////////////////////////////////////////////////////////////////////////
                kill(char, goal);
                break;
            case 'rest':////////////////////////////////////////////////////////////////////////////////////////
                rest(char, goal);
            break;

            default:
                console.log('goal eval didnt work. goal: '+goal.action);

        
        }    
        
    }

    takeAction = function(char){
        for (goal of char.actions){
            switch (goal.action){
                case 'move'://///////////////////////////////////////////////
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


                case 'fight'://///////////////////////////////////////////////////
                
                fight(char, goal);
                break;

                case 'ask'://///////////////////////////////////////////////////
                // ask a person nearby about keyword, create memories for everyone
                // person doesnt help if they dont like the asker, or if unfamiliar
                    
                let nearby = [];
                target = goal.keyword;
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
                    let mem = new KeyMemory(day, [char.name, toAsk.name], {x:char.loc.x,y:char.loc.y}, 'I asked if '+toAsk.name+' could help me find '+target.name+'.', emotion);
                    char.keyMemories.push(mem); 

                    emotion = getEmo(getAff(toAsk, char.name));
                    mem = new KeyMemory(day, [char.name, toAsk.name], {x:toAsk.loc.x,y:toAsk.loc.y}, char.name+' asked if I could help them find '+target.name+'.', emotion);
                    toAsk.keyMemories.push(mem);
                    
                    //give directions if target knows about target (might switch this to has key memory about target within a certain amount of time)
                    for (fam of toAsk.opinions){
                        if (fam.familiar == true && fam.keyword == target.name){
                            let score = getAff(toAsk, char.name);
                            if (score >-40){
                                mem = new KeyMemory(day, [char.name, toAsk.name], {x:char.loc.x,y:char.loc.y}, toAsk.name+' told me where to find '+target.name+'.', 'happy');
                                char.keyMemories.push(mem); 
    
                                mem = new KeyMemory(day, [char.name, toAsk.name], {x:toAsk.loc.x,y:toAsk.loc.y}, 'I told '+char.name+' where to find '+target.name+'.', 'happy');
                                toAsk.keyMemories.push(mem);

                                char.goals.unshift(new Goal(target.loc, 'travel'));
                                exitFlag = true;
                                break;
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

    fightWinner = function(p2Final, p1Final){
        //when paramater 1 beats parameter 2, here are the consequences
        for (guy2 of p2Final){
            for (guy1 of p1Final){
                let mem = new KeyMemory(day, [guy1.name, guy2.name], {x:guy2.loc.x,y:guy2.loc.y}, 'I defeated '+guy1.name+'.', 'happy');
                guy2.keyMemories.push(mem);
            }
        }
        
        for (guy1 of p1Final){
            for (guy2 of p2Final){
                let mem = new KeyMemory(day, [guy1.name, guy2.name], {x:guy1.loc.x,y:guy1.loc.y}, 'I was defeated by '+guy2.name+'.', 'scared');
                guy1.keyMemories.push(mem);
                for (opi of guy1.opinions){
                    if (opi.keyword == guy2.name){
                        opi.affinity = opi.affinity-20;
                    }
                }
            }
        }
        
        for (person of p1Final){
        
            let result = 'scar';

            if (score2 > score1+100){
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
                
                let repeat = false;
                while (repeat == false){
                    var scarDesc = getRand(0,scars.length-1);
                    for (cloth of person.clothing){
                        if (cloth == scarDesc){repeat = true;}
                    }
                }

                if (person.clothing.length <= 4){
                    person.clothing[5] = scarDesc;
                }
                else{
                    person.clothing.push(scarDesc);
                }
                let culprit = p2Final[getRand(0,p2Final.length-1)];
                let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I was scarred by '+culprit.name+'.', 'angry');
                person.keyMemories.push(mem);
                mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y}, 'I left a scar on '+person.name+'.', 'indifferent');
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
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I learned that my '+relTitle+' was hurt.', 'sad');
                                guy.keyMemories.push(mem);
                            }
                        }
                    }
                }
            }

            //maims
            if (result == 'maim'){
               
                let repeat = false;
                while (repeat == false){
                    var maimDesc = getRand(0,maims.length-1);
                    for (cloth of person.clothing){
                        if (cloth == maimDesc){repeat = true;}
                    }
                }

                if (person.clothing.length <= 4){
                    person.clothing[5] = maimDesc;
                }
                else{
                    person.clothing.push(maimDesc);
                }
                let culprit = p2Final[getRand(0,p2Final.length-1)];
                let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y},'I was maimed by '+culprit.name+'.', 'angry');
                person.keyMemories.push(mem);
                mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y},'I maimed '+person.name+'.', 'disgusted');
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
                    for (arti of artifacts){
                        if (arti.name == person.weapon){
                            arti.loc.x = person.loc.x;
                            arti.loc.y = person.loc.y;
                            person.strength = person.strength - arti.bonus;
                            person.weapon = 'fists';
                            let culprit = p2Final[getRand(0,p2Final.length-1)];
                            let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I was disarmed by '+culprit.name+'.', 'angry');
                            person.keyMemories.push(mem);
                            mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y}, 'I  disarmed '+person.name+'.', 'happy');
                            culprit.keyMemories.push(mem);
                            for (opi of person.opinions){
                                if (opi.keyword == culprit.name){
                                    opi.affinity = opi.affinity -20;
                                    opi.familiar = true;
                                }
                            }
                        }else{
                            person.weapon = 'fists';
                            let culprit = p2Final[getRand(0,p2Final.length-1)];
                            let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'I was disarmed by '+culprit.name+'.', 'angry');
                            person.keyMemories.push(mem);
                            mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y}, 'I  disarmed '+person.name+'.', 'happy');
                            culprit.keyMemories.push(mem);
                            for (opi of person.opinions){
                                if (opi.keyword == culprit.name){
                                    opi.affinity = opi.affinity -10;
                                    opi.familiar = true;
                                }
                            }

                        }
                    }
                }else{
                    let destFlag = false;
                    //lose or damage clothing
                    for (arti of artifacts){
                        for (cloth of person.clothing){
                            if(desFlag == true){break;}
                            if (arti.name == cloth){
                                arti.loc.x = person.loc.x;
                                arti.loc.y = person.loc.y;
                                person.strength = person.strength - arti.bonus;
                                cloth = 'nothing';
                                let culprit = p2Final[getRand(0,p2Final.length-1)];
                                let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'My '+arti.name+' was torn off of me during the fight by '+culprit.name+'.', 'angry');
                                person.keyMemories.push(mem);
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y}, 'I made '+person.name+' drop their '+arti.name+'.', 'happy');
                                culprit.keyMemories.push(mem);
                                for (opi of person.opinions){
                                    if (opi.keyword == culprit.name){
                                        opi.affinity = opi.affinity -20;
                                        opi.familiar = true;
                                    }
                                }
                                destFlag = true;
                            }else{
                                let limit = 4;
                                if(person.clothing.length < 4){ limit = person.clothing.length; }
                                let roll = getRand(0, limit-1);
                                lostItem = person.clothing[roll];
                                person.clothing[roll] = 'damaged tatters';
                                let culprit = p2Final[getRand(0,p2Final.length-1)];
                                let mem = new KeyMemory(day, [person.name, culprit.name], {x:person.loc.x,y:person.loc.y}, 'My '+lostItem+' was ruined by '+culprit.name+'.', 'angry');
                                person.keyMemories.push(mem);
                                mem = new KeyMemory(day, [person.name, culprit.name], {x:culprit.loc.x,y:culprit.loc.y}, 'I destroyed '+person.name+'s '+lostItem+'.', 'happy');
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

                //people dont want to kill them now hopefully
                for (killer of characters){
                    for (goal of killer.goals){
                        if (goal.keyword == person.name && goal.action == 'kill'){
                            killer.goals = killer.goals.filter(entry, entry.keyword != person.name && entry.action != 'kill');
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
                //this might give me an error when parsing through persons, so might need alternative to filter()
                p1Final = p1Final.filter(entry , entry.name != person.name);
            }   
        }
        //might need to make it so that kill goal is added for each person on other team,
        //and that goal is removed after running away or winning.
        partyRunAway(p1Final);

    }

    interact = function(char){
        //interact with characters or monsters on current tile. Talk, pick up artifacts, etc.
        famwith8(char);
        pickupArtifact(char);
        noticeNearby(char);
        //attackNearby(char);

        roll = getRand(1,3);
        for (i=0;i<roll;i++){
            talktoNearby(char);
        }
    
    }

    spreadMonster = function(mon){
    }

    reportEvents = function(){
    //KeyMemory (time, people[], loc, takeaway, emotion) 
    }

    killCharacter = function(character, peopleNearby=[character.name]){
        console.log('cleaning up and killing data for '+character.name);
        //everyone that knows this person gets a key memory about their death 
        let place = {x:character.loc.x, y:character.loc.y};
        for (char of characters){
            for (op of char.opinions){
                if (op.keyword == character.name){
                    if (op.familiar == true){
                        if (reactionScore >10){emotion = 'sad';}
                        else if (reactionScore <11 && reactionScore > -41){emotion = 'indifferent';}
                        else if (reactionScore <-40){emotion = 'happy';}
                        let takeAway = 'I learned that '+character.name+' died.'
                        mem = new KeyMemory(day, peopleNearby, place, takeAway, emotion);
                        char.keyMemories.push(mem);
                    }
                }
            }
        }
    
        //clean up lists
        for (charindex in characters){
            if (characters[charindex].name == character.name){
                dead.push(characters[charindex]);
                characters.splice(charindex,1);
                keywords.splice(characters[charindex].name,1);

                if (containsItem(commoners, characters[charindex].name)){
                    commoners.splice(characters[charindex].name,1);
                }
                if (containsItem(merchants, characters[charindex].name)){
                    merchants.splice(characters[charindex].name,1);
                }
                if (containsItem(adventurers, characters[charindex].name)){
                    adventurers.splice(characters[charindex].name,1);
                }
                if (containsItem(legends, characters[charindex].name)){
                    legends.splice(characters[charindex].name,1);
                }
                if (containsItem(bandits, characters[charindex].name)){
                    bandits.splice(characters[charindex].name,1);
                }
                if (containsItem(mercenaries, characters[charindex].name)){
                    mercenaries.splice(characters[charindex].name,1);
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
        legends.push(character.name);
        //no way this splice works right
        adventurers.splice(character.name,1);

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

        character.clothing = clothing;

        
        if ( 1 == getRand(0,1)){
            character.name = character.name+', '+titles.splice(getRand(0,titles.length-1),1).toString();
        }
        else{
            let fulltitles = ['The Hero of '+character.town.name, 'The Savior of '+character.town.name, 'The Legend of '+character.town.name, 
            'Warden of '+Dungeons[getRand(0,Dungeons.length-1)].name, 'Tyrant of '+Dungeons[getRand(0,Dungeons.length-1)].name, 'Keeper of '+Dungeons[getRand(0,Dungeons.length-1)].name, 
            'The '+haircolor+' Pheonix', 'The '+haircolor+' Fox', 'The '+haircolor+' Hawk', 'The '+haircolor+' Lion', 'The '+haircolor+' Shark', 
            'The '+haircolor+' Eagle', 'The '+haircolor+' Bear', 'The '+haircolor+' Snake', 'The '+haircolor+' Menace', 'The '+haircolor+' Hero', 'The '+eyecolor+' eyed Master'];

            character.name = character.name+', '+fulltitles.splice(getRand(0,fulltitles.length-1),1).toString();
            }
    }

    pickupArtifact = function(char){
        //pick up artifacts and equip it
        let pickup = false;
        for (artifact of artifacts){
            if (artifact.loc.x == char.loc.x && artifact.loc.y == char.loc.y && artifact.loc.x != 0 && artifact.loc.y != 0){
                let mem = new KeyMemory(day, [char.name], {x:char.loc.x,y:char.loc.y}, 'I found the '+artifact.name, 'happy');
                char.keyMemories.push(mem);

                //remove find goal
                for (goal in char.goals){
                    if (char.goals[goal] == 'find'){
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
                                arti.loc.x = char.loc.x; //dropped it
                                arti.loc.y = char.loc.y;
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
                                    arti.loc.x = char.loc.x; //dropped it
                                    arti.loc.y = char.loc.y;
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
                                    arti.loc.x = char.loc.x; //dropped it
                                    arti.loc.y = char.loc.y;
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
                            if (char.clothing[3] == arti.name){
                                if (artifact.bonus > arti.bonus){
                                    char.strength = char.strength - arti.bonus;
                                    char.clothing[3] = artifact.name;
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
                            char.clothing[3] = artifact.name;
                            char.strength = char.strength + artifact.bonus;
                            artifact.loc.x = 0; //picked it up
                            artifact.loc.y = 0;
                        }
                        
                    }
                    if (artifact.type == 'cape'){
                        //check if already have a diff artifact
                        for (arti of artifacts){
                            if (char.clothing[4] == arti.name){
                                if (artifact.bonus > arti.bonus){
                                    char.strength = char.strength - arti.bonus;
                                    char.clothing[4] = artifact.name;
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
                            char.clothing[4] = artifact.name;
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
        let nearby = [];
        for (character of characters){
            if (character.loc.x == me.loc.x && character.loc.y == me.loc.y){
                for (partyMem of me.party){
                    if (character.name != me.name){
                        nearby.push(character);
                    }
                }
                if (character.name != me.name && character.strength > me.strength-100){
                    nearby.push(character);
                }
                
            }
        }
        if (nearby.length > 0){
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
                                    }
                                }
                                op.affinity=op.affinity+getRand(2,10);
                            }
                            else if (target.personality == 'normal' || me.personality == 'normal'){
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(-5,5);
                                    }
                                }
                                op.affinity = op.affinity+getRand(-5,5);
                            }
                            else {
                                for (opi of target.opinions){
                                    if (opi.keyword == me.name){
                                        opi.affinity=opi.affinity+getRand(-10,-2);
                                    }
                                }
                                op.affinity = op.affinity+getRand(-10,-2);
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

    sortArr = function(arr){
        for (i = 1; i<arr.length; i++){
            let j = i;
            let y = arr[i].strength;
            while ((j > 0) && (arr[j-1].strength > y)){
                arr[j] = arr[j-1];
                j--;
            }
            arr[j]=arr[i];
        }
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
                        mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name+' with the '+near.weapon, 'surprised');
                        me.keyMemories.push(mem);
                        for (op of char.opinions){
                            if (op.keyword == artifact.name){
                                op.familiar == true;
                                op.affinity = op.affinity + 2;
                            }
                        }
                    }
                    else{
                        mem = new KeyMemory(day, [me.name, 'a stranger'], {x:me.loc.x,y:me.loc.y}, 'I saw a stranger with the '+near.weapon, 'surprised');
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
                        mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name+' with the '+artifact.name, 'surprised');
                        me.keyMemories.push(mem);
                        for (op of char.opinions){
                            if (op.keyword == artifact.name){
                                op.familiar == true;
                                op.affinity = op.affinity + 2;
                            }
                        }
                    }
                    else{
                        mem = new KeyMemory(day, [me.name, 'a stranger'], {x:me.loc.x,y:me.loc.y}, 'I saw a stranger with the '+artifact.name, 'surprised');
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
                    mem = new KeyMemory(day, [me.name, big.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+big.name, emotion);
                    me.keyMemories.push(mem); 
                }
            }
        }

        //notice someone they are familiar with
        for (near of nearby){
            if (isFamiliar(me, near.name)){
                let emotion = getEmo(getAff(me, near.name));
                mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name, emotion);
                me.keyMemories.push(mem); 
            }
            else {
                mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw a stranger with '+near.clothing.toString()+' pass by.', 'indifferent');
                me.keyMemories.push(mem); 
            }
        }
        //notice a monster nearby
        for (monster of monsters){
            if (monster.loc.x == me.loc.x && monster.loc.y == me.loc.y){
                let emotion = getEmobyStrength(me, monster);
                mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw a '+monster.name+'!', emotion);
                me.keyMemories.push(mem); 
            }
        }

        //notice a bandit nearby
        for (near of nearby){
            if (containsItem(bandits, near.name)){
                if (isFamiliar(me, near.name)){
                    let emotion = getEmobyStrength(me, near);
                    mem = new KeyMemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name+' the bandit!', emotion);
                    me.keyMemories.push(mem); 
                }
                else {
                    let emotion = getEmobyStrength(me, near);
                    mem = new KeyMemory(day, [me.name, 'a stranger'], {x:me.loc.x,y:me.loc.y}, 'I saw a bandit!', emotion);
                    me.keyMemories.push(mem); 
                }
            }
        }

        //notice someone they want to kill nearby
        let hated = [];
        for (opinion of me.opinions){
            if (opinion.familiar == true && opinion.affinity<-59){
                hated.push(opinion.keyword);
            }
        }
        var enemyNear = false;
        for (near of nearby){
            for (bad of hated){
                if (near.name == bad){
                    me.actions.push(new Goal(bad, 'fight'));
                    enemyNear = true;
                }
            }
        }
        let hitlist = [];
        let alreadyfindingenemy = false;
        if (enemyNear = false){
            for (target of hated){
                for (g of me.goals){
                    if (g.keyword == target && g.action == 'find'){
                        alreadyfindingenemy = true;
                    }
                }
                if (alreadyfindingenemy == false){
                    hitlist.push(target);
                }
            }
        }
        for (dude of hitlist){
            char.goals.unshift(new Goal(dude,'kill'));
            char.goals.unshift(new Goal(dude,'find'));
        }

        //when you come here for player version, make sure to add checker if Orsted is nearby.
    }

    days = days + (yeers*100); //convert kiloyears to days
    let yearCounter = 0;

    

    for (dayz=0; dayz<days; dayz++){
        console.log('day '+day);
        big8 = getbig8();
        
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
                takeAction(char);

                //console.log(char);
                console.log(char.loc.x+','+char.loc.y);
                console.log('-----');

            }
            console.log(towns);
            console.log(Dungeons);
            

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
        day++;
        yearCounter++;
        if (yearCounter == 100){
            kiloyears++; 
            yearCounter = 0;
            for (character of characters){
                character.age++;
                //opinions of things slowly get less strong as the years go by
                for (opi of character.opinions){
                    if (opi.value < -23){opi.value = opi.value+3;}
                    if (opi.value > 23){opi.value = opi.value-3;}
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
            if (69 == getRand(0,100)){spawnCommoner(town, 18, undefined, undefined);}
            if (69 == getRand(0,100)){spawnMerchant(town, 18, undefined, undefined, undefined, undefined);}
            if (69 == getRand(0,100)){spawnMercenary(town, 18, undefined, undefined);}
            if (69 == getRand(0,100)){spawnAdventurer(town, 18, undefined, undefined);}
        }
        //die of old age
        for (character of characters){
            if (character.age > 75 && containsItem(legends, character.name)==false){
                if (69 == getRand(0,1000)){
                    //character dies of old age
                    killCharacter(character);
                }
            }
            if (character.age > 300 && character.name != 'ORSTED THE ANNIHILATOR'){
                if (69 == getRand(0,5000)){
                    //character dies of old age
                    killCharacter(character);
                }
            }
        }
        //new bandits
        if (1 == getRand(0,9)){
            let bandFlag = true;
            while (bandFlag){
                let i = getRand(1,sizeX-1);
                let j = getRand(1,sizeY-1);
                if (grid[i][j].road == true){
                    bandFlag = false;
                    spawnBandit(i,j, undefined, undefined);
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
                    spawnSuperiorM(dung.loc.x, dung.loc.y, undefined);
                    let artifact = new Artifact({x:dung.loc.x,y:dung.loc.y});
                    artifacts.push(artifact);
                    keywords.push(artifact.name);
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