// This is meant to simulate the world progress for a specified amount of time. I will have a seperate .js file for when the player can interact.
// The two files should be largely similar however.
//Basic(0-20) -> intermediate(20-60) -> advanced(60-120) -> expert(120-200) -> master(200-300) -> Queen(300-500) -> King(500-1000) -> God(1000+)


function simulate(yeers, days){
    days = days + (yeers*100); //convert kiloyears to days
    let yearCounter = 0;
    for (dayz=0; dayz<days; dayz++){
        //each day has 3 phase
        for (phase = 0; phase<3; phase++){
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ character logic ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            characters.shuffle();
            for (char of characters){
                //interact with characters or monsters on current tile. Talk, pick up artifacts, etc.
                interact(char);

                //act based on goal. move, fight, explore.
                enactGoal(char);

                //interact with characters or monsters on current tile. Fight, talk, etc.
                interact(char);

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
                    artifacts.push(artifact.name);
                    keywords.push(artifact.name);
                }  
            }
        }












    }


enactGoal = function(char){
    //make sure you check if a character is still alive first before searching for them or anything

}

interact = function(char){

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

}