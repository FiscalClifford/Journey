// This is meant to simulate the world progress for a specified amount of time. I will have a seperate .js file for when the player can interact.
// The two files should be largely similar however.
//Basic(0-20) -> intermediate(20-60) -> advanced(60-120) -> expert(120-200) -> master(200-300) -> Queen(300-500) -> King(500-1000) -> God(1000+)
var big8 = [];

function simulate(yeers, days){
    days = days + (yeers*100); //convert kiloyears to days
    let yearCounter = 0;
    for (dayz=0; dayz<days; dayz++){
        console.log('day '+day);
        var big8 = getbig8();
        console.log(big8);
        //each day has 3 phase
        for (phase = 0; phase<3; phase++){
            
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ character logic ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            characters.shuffle();
            for (char of characters){
                //interact with characters or monsters on current tile. Talk, pick up artifacts, etc.
                interact(char);

                //act based on goal. move, fight, explore.
                enactGoal(char);

                //determine if new goal necessary or add extra 
                checkGoals(char);

            }

            //+++++++++++++++++++++++++++++++++++++++++++++++++++ monster logic +++++++++++++++++++++++++++++++++

            for (mon of monsters){
                enactGoal(mon);
                //check if too many monsters on tile and spread out if so
                spreadMonsters(mon);
            }

            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& things that happen at the end of the phase &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

            
            

            //as interesting things happen a list is populated with those occurances. clear it out and console log it here.
            reportEvents();

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
            if (character.age > 300){
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
        //replenish monsters and artifacts at dungeons after 30 days
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
                    dung.countdown = 30;
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












    }


enactGoal = function(char){
    //make sure you check if a character is still alive first before searching for them or anything

}

interact = function(char){
    //interact with characters or monsters on current tile. Talk, pick up artifacts, etc.
    famwith8(char);
    pickupArtifact(char);
    noticeNearby(char);
    talktoNearby(char);
    
}

checkGoals = function(char){
    
}

spreadMonsters = function(monster){
    
}

reportEvents = function(){
   //KeyMemory (time, people[], loc, takeaway, emotion) 
}

killCharacter = function(character, place, peopleNearby=[character.name]){
    //everyone that knows this person gets a key memory about their death 
    for (char of characters){
        for (rel of person.relations){
            if (rel.keyword == character.name){
                if (rel.familiar == true){
                    let reactionScore = undefined;
                    for (op of person.opinions){
                        if (rel.keyword == op.keyword){
                            reactionScore = op.affinity;
                        }
                    }
                    if (reactionScore >10){emotion = 'sad';}
                    else if (reactionScore <11 && reactionScore > -21){emotion = 'indifferent';}
                    else if (reactionScore <-20){emotion = 'happy';}
                    let takeAway = character.name+' died.'
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
}

transformToLegend = function(character){

    legends.push(character.name);
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
    let pickup = true;
    for (artifact of artifacts){
        if (artifact.loc.x == char.loc.x && artifact.loc.y == char.loc.y && artifact.loc.x != 0 && artifact.loc.y != 0){
            mem = new Keymemory(day, [char.name], {x:char.loc.x,y:char.loc.y}, 'I found the '+artifact.name, 'happy');
            char.keyMemories.push(mem);
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
                            
                        }
                        else {pickup=false;}
                    }
                }
                if (pickup == true){
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
                            }
                            else {pickup=false;}
                        }
                    }
                    if (pickup == true){
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
                            }
                            else {pickup=false;}
                        }
                    }
                    if (pickup == true){
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
                            }
                            else {pickup=false;}
                        }
                    }
                    if (pickup == true){
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
                            }
                            else {pickup=false;}
                        }
                    }
                    if (pickup == true){
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

talktoNearby = function(char){

}

getbig8 = function(){
    let big = [];
    
    for (c in characters){
        big.push(c);
        sortArr(big);
        if (big.length>8){big.pop();}
    }
    return big;
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
    //when people get in a fight i'll add the key memory within that function.
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
                    mem = new Keymemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name+' with the '+near.weapon, 'surprised');
                    me.keyMemories.push(mem);
                    for (op of char.opinions){
                        if (op.keyword == artifact.name){
                            op.familiar == true;
                            op.affinity = op.affinity + 2;
                        }
                    }
                }
                else{
                    mem = new Keymemory(day, [me.name, 'a stranger'], {x:me.loc.x,y:me.loc.y}, 'I saw a stranger with the '+near.weapon, 'surprised');
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
                    mem = new Keymemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name+' with the '+artifact.name, 'surprised');
                    me.keyMemories.push(mem);
                    for (op of char.opinions){
                        if (op.keyword == artifact.name){
                            op.familiar == true;
                            op.affinity = op.affinity + 2;
                        }
                    }
                }
                else{
                    mem = new Keymemory(day, [me.name, 'a stranger'], {x:me.loc.x,y:me.loc.y}, 'I saw a stranger with the '+artifact.name, 'surprised');
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
                let emtotion = getEmo(getAff(me, big.name));
                mem = new Keymemory(day, [me.name, big.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+big.name, emotion);
                me.keyMemories.push(mem); 
            }
        }
    }

    //notice someone they are familiar with
    for (near of nearby){
        if (isFamiliar(me, near.name)){
            let emtotion = getEmo(getAff(me, near.name));
            mem = new Keymemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name, emotion);
            me.keyMemories.push(mem); 
        }
        else {
            mem = new Keymemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw a stranger with '+near.clothing.toString()+' pass by.', 'indifferent');
            me.keyMemories.push(mem); 
        }
    }
    //notice a monster nearby
    for (monster of monsters){
        if (monster.loc.x == me.loc.x && monster.loc.y == me.loc.y){
            let emotion = getEmobyStrength(me, monster);
            mem = new Keymemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw a '+monster.name+'!', emotion);
            me.keyMemories.push(mem); 
        }
    }

    //notice a bandit nearby
    for (near of nearby){
        if (containsItem(bandits, near.name)){
            if (isFamiliar(me, near.name)){
                let emotion = getEmobyStrength(me, near);
                mem = new Keymemory(day, [me.name, near.name], {x:me.loc.x,y:me.loc.y}, 'I saw '+near.name+' the bandit!', emotion);
                me.keyMemories.push(mem); 
            }
            else {
                let emotion = getEmobyStrength(me, near);
                mem = new Keymemory(day, [me.name, 'a stranger'], {x:me.loc.x,y:me.loc.y}, 'I saw a bandit!', emotion);
                me.keyMemories.push(mem); 
            }
        }
    }
}

}