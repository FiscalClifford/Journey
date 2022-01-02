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

            for (char of characters){
                //act based on goal
                enactGoal(char);

                //interact with characters or monsters on current tile. Fight, talk, etc.
                interact(char);

                //determine if new goal necessary or add extra 
                checkGoals(char);

            }

            //+++++++++++++++++++++++++++++++++++++++++++++++++++ monster logic +++++++++++++++++++++++++++++++++

            for (mon of monsters){
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
            if (69 == getRand(0,100)){spawnCommoner(town, 18);}
            if (69 == getRand(0,100)){spawnMerchant(town, 18);}
            if (69 == getRand(0,100)){spawnMercenary(town, 18);}
            if (69 == getRand(0,100)){spawnAdventurer(town, 18);}
        }
        //die of old age
        for (character of characters){
            if (character.age > 82 && containsItem(legends, character.name)==false){
                if (69 == getRand(0,100)){
                    //character dies of old age
                    killCharacter(character);
                }
            }
            if (character.age > 300){
                if (69 == getRand(0,1000)){
                    //character dies of old age
                    killCharacter(character);
                }
            }




        }
    }


enactGoal = function(char){

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

killCharacter = function(character){

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