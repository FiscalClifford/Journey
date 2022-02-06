var maleNames = ['Aamir','Aaron','Abbot','Abbott','Abdel','Abdul','Abdulkarim','Abdullah','Abe','Abel','Abelard','Abner','Abraham','Abram','Ace','Adair','Adam','Adams','Addi','Adger','Aditya',
'Adlai','Adnan','Adolf','Adolfo','Adolph','Adolphe','Adolpho','Adolphus','Adrian','Adrick','Adrien','Agamemnon','Aguinaldo','Aguste','Agustin','Aharon','Ahmad','Ahmed','Ahmet','Ajai','Ajay',
'Al','Alaa','Alain','Alan','Alasdair','Alastair','Albatros','Albert','Alberto','Albrecht','Alden','Aldis','Aldo','Aldric','Aldrich','Aldus','Aldwin','Alec','Aleck','Alejandro','Aleks','Aleksandrs',
'Alessandro','Alex','Alexander','Alexei','Alexis','Alf','Alfie','Alfonse','Alfonso','Alfonzo','Alford','Alfred','Alfredo','Algernon','Ali','Alic','Alister','Alix','Allah','Allen','Allin','Allyn',
'Alonso','Alonzo','Aloysius','Alphonse','Alphonso','Alston','Alton','Alvin','Alwin','Amadeus','Ambros','Ambrose','Ambrosi','Ambrosio','Ambrosius','Amery','Amory','Amos','Anatol','Anatole',
'Anatollo','Anatoly','Anders','Andie','Andonis','Andre','Andrea','Andreas','Andrej','Andres','Andrew','Andrey','Andri','Andros','Andrus','Andrzej','Andy','Angelo','Angie','Angus','Ansel',
'Ansell','Anselm','Anson','Anthony','Antin','Antoine','Anton','Antone','Antoni','Antonin','Antonino','Antonio','Antonius','Antony','Anurag','Apollo','Apostolos','Aram','Archibald','Archibold',
'Archie','Archon','Archy','Arel','Ari','Arie','Ariel','Aristotle','Arlo','Armand','Armando','Armond','Armstrong','Arne','Arnie','Arnold','Arnoldo','Aron','Arron','Art','Arther','Arthur','Artie',
'Artur','Arturo','Arvie','Arvin','Arvind','Arvy','Ash','Ashby','Ashish','Ashton','Aub','Aube','Aubert','August','Augustin','Augustine','Augusto','Augustus','Austen','Austin','Ave','Averell',
'Averil','Averill','Avi','Avraham','Avram','Avrom','Axel','Aylmer','Aziz','Bailey','Baily','Baird','Baldwin','Bancroft','Barbabas','Barclay','Bard','Barde','Barnabas','Barnaby','Barnard','Barnett',
'Barney','Barnie','Barny','Baron','Barr','Barret','Barrett','Barri','Barrie','Barris','Barron','Barry','Bart','Bartel','Barth','Barthel','Bartholomeo','Bartholomew','Bartie','Bartlet','Bartlett',
'Bartolemo','Bartolomei','Bartolomeo','Barton','Barty','Bary','Basil','Batholomew','Baxter','Bay','Bayard','Beale','Bear','Bearnard','Beau','Beaufort','Beck','Ben','Benedict','Bengt','Benito',
'Benjamen','Benjamin','Benji','Benjie','Benjy','Benn','Bennet','Bennett','Bennie','Benny','Benson','Bentley','Benton','Beowulf','Berchtold','Berk','Berke','Berkeley','Berkie','Berkley','Bernard',
'Bernardo','Bernd','Bernhard','Bernie','Bert','Bertie','Bertram','Bertrand','Bharat','Biff','Bill','Billie','Billy','Bing','Binky','Bishop','Bjorn','Bjorne','Blaine','Blair','Blake','Blare',
'Blayne','Bo','Bob','Bobbie','Bobby','Bogart','Bogdan','Boniface','Boris','Boyce','Boyd','Brad','Braden','Bradford','Bradley','Bradly','Brady','Brandon','Brandy','Brant','Brendan','Brent','Bret',
'Brett','Brewer','Brewster','Brian','Brice','Briggs','Brinkley','Britt','Brock','Broddie','Broddy','Broderic','Broderick','Brodie','Brody','Bronson','Brook','Brooke','Brooks','Bruce','Bruno',
'Bryan','Bryant','Bryce','Bryn','Bryon','Bubba','Buck','Bucky','Bud','Buddy','Burgess','Burke','Burl','Burnaby','Burt','Burton','Buster','Butch','Butler','Byram','Byron','Caesar','Cain','Cal',
'Caldwell','Caleb','Calhoun','Calvin','Cam','Cameron','Carl','Carleigh','Carlin','Carlo','Carlos','Carlton','Carson','Carsten','Carter','Cary','Case','Casey','Caspar','Casper','Cass','Cecil',
'Cesar','Chad','Chadd','Chaddie','Chaddy','Chadwick','Chaim','Chalmers','Chan','Chance','Chancey','Chanderjit','Chandler','Chane','Chariot','Charles','Charleton','Charley','Charlie','Charlton',
'Chas','Chase','Chaunce','Chauncey','Chelton','Chen','Chester','Cheston','Chet','Chev','Chevalier','Chevy','Chip','Chris','Christ','Christian','Christiano','Christof','Christofer','Christoph',
'Christophe','Christopher','Christorpher','Christos','Christy','Chrisy','Chuck','Churchill','Clancy','Clarance','Clare','Clarence','Clark','Clarke','Claude','Claudio','Claus','Clay','Clayborne',
'Clayton','Cleland','Clem','Clemens','Clement','Clemente','Clemmie','Cletus','Cleveland','Cliff','Clifford','Clifton','Clint','Clinten','Clinton','Clive','Clyde','Cob','Cobb','Cobbie','Cobby',
'Cody','Colbert','Cole','Coleman','Colin','Collin','Collins','Conan','Connie','Connolly','Connor','Conrad','Conroy','Constantin','Constantine','Constantinos','Conway','Cooper','Corbin','Corby',
'Corey','Corky','Cornelius','Cornellis','Corrie','Cortese','Corwin','Cory','Costa','Craig','Crawford','Creighton','Cris','Cristopher','Curt','Curtice','Curtis','Cy','Cyril','Cyrill','Cyrille',
'Cyrillus','Cyrus','Dabney','Daffy','Dale','Dallas','Dalton','Damian','Damien','Damon','Dan','Dane','Dani','Danie','Daniel','Dannie','Danny','Dante','Darby','Darcy','Daren','Darian','Darien',
'Darin','Dario','Darius','Darrel','Darrell','Darren','Darrick','Darrin','Darryl','Darth','Darwin','Daryl','Daryle','Dave','Davey','David','Davidde','Davide','Davidson','Davie','Davin','Davis',
'Davon','Davoud','Davy','Dawson','Dean','Deane','Del','Delbert','Dell','Delmar','Demetre','Demetri','Demetris','Demetrius','Demosthenis','Denis','Dennie','Dennis','Denny','Derby','Derek','Derick',
'Derk','Derrek','Derrick','Derrin','Derrol','Derron','Deryl','Desmond','Desmund','Devin','Devon','Dewey','Dewitt','Dexter','Dick','Dickey','Dickie','Diego','Dieter','Dietrich','Dillon','Dimitri',
'Dimitrios','Dimitris','Dimitrou','Dimitry','Dino','Dion','Dionis','Dionysus','Dirk','Dmitri','Dom','Domenic','Domenico','Dominic','Dominick','Dominique','Don','Donal','Donald','Donn','Donnie',
'Donny','Donovan','Dorian','Dory','Doug','Douggie','Dougie','Douglas','Douglass','Douglis','Dov','Doyle','Drake','Drew','Dru','Dryke','Duane','Dudley','Duffie','Duffy','Dugan','Duke','Dunc',
'Duncan','Dunstan','Durand','Durant','Durante','Durward','Dustin','Dwain','Dwaine','Dwane','Dwayne','Dwight','Dylan','Dyson','Earl','Earle','Easton','Eben','Ebeneser','Ebenezer','Eberhard','Ed',
'Eddie','Eddy','Edgar','Edgardo','Edie','Edmond','Edmund','Edouard','Edsel','Eduard','Eduardo','Edward','Edwin','Efram','Egbert','Ehud','Elbert','Elden','Eldon','Eli','Elias','Elihu','Elijah',
'Eliot','Eliott','Elisha','Elliot','Elliott','Ellis','Ellsworth','Ellwood','Elmer','Elmore','Elnar','Elric','Elroy','Elton','Elvin','Elvis','Elwin','Elwood','Elwyn','Ely','Emanuel','Emerson',
'Emery','Emil','Emile','Emilio','Emmanuel','Emmery','Emmet','Emmett','Emmit','Emmott','Emory','Ender','Englebart','Enoch','Enrico','Enrique','Ephraim','Ephram','Ephrayim','Ephrem','Erasmus',
'Erastus','Erek','Erhard','Erhart','Eric','Erich','Erick','Erik','Erin','Erl','Ernest','Ernesto','Ernie','Ernst','Erny','Errol','Ervin','Erwin','Esau','Esme','Esteban','Ethan','Ethelbert','Ethelred',
'Etienne','Euclid','Eugen','Eugene','Eustace','Ev','Evan','Everard','Everett','Ewan','Ewart','Ez','Ezechiel','Ezekiel','Ezra','Fabian','Fabio','Fairfax','Farley','Fazeel','Federico','Felice','Felicio',
'Felipe','Felix','Ferd','Ferdie','Ferdinand','Ferdy','Fergus','Ferguson','Ferinand','Fernando','Fidel','Filbert','Filip','Filipe','Filmore','Finley','Finn','Fitz','Fitzgerald','Flem','Fleming',
'Flemming','Fletch','Fletcher','Flin','Flinn','Flint','Flipper','Florian','Floyd','Flynn','Fons','Fonsie','Fonz','Fonzie','Forbes','Ford','Forest','Forester','Forrest','Forrester','Forster','Foster',
'Fowler','Fox','Fran','Francesco','Francis','Francisco','Francois','Frank','Frankie','Franklin','Franklyn','Franky','Frans','Franz','Fraser','Frazier','Fred','Freddie','Freddy','Frederic','Frederich',
'Frederick','Frederico','Frederik','Fredric','Fredrick','Freeman','Freemon','Fremont','French','Friedric','Friedrich','Friedrick','Fritz','Fulton','Fyodor','Gabe','Gabriel','Gabriele','Gabriell',
'Gabriello','Gail','Gale','Galen','Gallagher','Gamaliel','Garcia','Garcon','Gardener','Gardiner','Gardner','Garey','Garfield','Garfinkel','Garold','Garp','Garret','Garrett','Garrot','Garrott','Garry',
'Garth','Garv','Garvey','Garvin','Garvy','Garwin','Garwood','Gary','Gaspar','Gasper','Gaston','Gav','Gaven','Gavin','Gavriel','Gayle','Gearard','Gene','Geo','Geof','Geoff','Geoffrey','Geoffry','Georg',
'George','Georges','Georgie','Georgy','Gerald','Geraldo','Gerard','Gere','Gerhard','Gerhardt','Geri','Germaine','Gerold','Gerome','Gerrard','Gerri','Gerrit','Gerry','Gershom','Gershon','Giacomo',
'Gian','Giancarlo','Giavani','Gibb','Gideon','Giff','Giffard','Giffer','Giffie','Gifford','Giffy','Gil','Gilbert','Gilberto','Gilburt','Giles','Gill','Gilles','Ginger','Gino','Giordano','Giorgi',
'Giorgio','Giovanne','Giovanni','Giraldo','Giraud','Giuseppe','Glen','Glenn','Glynn','Godard','Godart','Goddard','Goddart','Godfree','Godfrey','Godfry','Godwin','Gomer','Gonzales','Gonzalo','Goober',
'Goose','Gordan','Gordie','Gordon','Grace','Grady','Graehme','Graeme','Graham','Graig','Grant','Granville','Greg','Gregg','Greggory','Gregor','Gregorio','Gregory','Gretchen','Griff','Griffin',
'Griffith','Griswold','Grove','Grover','Guido','Guillaume','Guillermo','Gunner','Gunter','Gunther','Gus','Gustaf','Gustav','Gustave','Gustavo','Gustavus','Guthrey','Guthrie','Guthry','Guy','Hadleigh',
'Hadley','Hadrian','Hagan','Hagen','Hailey','Hakeem','Hakim','Hal','Hale','Hall','Hallam','Halvard','Ham','Hamel','Hamid','Hamil','Hamilton','Hamish','Hamlen','Hamlet','Hamlin','Hammad','Hamnet','Han',
'Hanan','Hanford','Hank','Hannibal','Hans','Hans-Peter','Hansel','Hanson','Harald','Harcourt','Hari','Harlan','Harland','Harley','Harlin','Harman','Harmon','Harold','Harris','Harrison','Harrold',
'Harry','Hart','Hartley','Hartwell','Harv','Harvard','Harvey','Harvie','Harwell','Hasheem','Hashim','Haskel','Haskell','Hassan','Hastings','Hasty','Haven','Hayden','Haydon','Hayes','Hayward','Haywood',
'Hazel','Heath','Heathcliff','Hebert','Hector','Heinrich','Heinz','Helmuth','Henderson','Hendrick','Hendrik','Henri','Henrie','Henrik','Henrique','Henry','Herb','Herbert','Herbie','Herby','Hercules',
'Herman','Hermann','Hermon','Hermy','Hernando','Herold','Herrick','Herrmann','Hersch','Herschel','Hersh','Hershel','Herve','Hervey','Hew','Hewe','Hewet','Hewett','Hewie','Hewitt','Heywood','Hezekiah',
'Higgins','Hilbert','Hill','Hillard','Hillel','Hilliard','Hilton','Hiralal','Hiram','Hiro','Hirsch','Hobart','Hodge','Hogan','Hollis','Homer','Horace','Horacio','Horatio','Horatius','Horst','Howard',
'Howie','Hoyt','Hubert','Hudson','Huey','Hugh','Hugo','Humbert','Humphrey','Hunt','Hunter','Huntington','Huntlee','Huntley','Hurley','Husain','Husein','Hussein','Hy','Hyatt','Hyman','Hymie','Iago',
'Iain','Ian','Ibrahim','Ichabod','Iggie','Iggy','Ignace','Ignacio','Ignacius','Ignatius','Ignaz','Ignazio','Igor','Ike','Ikey','Immanuel','Ingamar','Ingelbert','Ingemar','Inglebert','Ingmar','Ingram',
'Inigo','Ira','Irvin','Irvine','Irving','Irwin','Isa','Isaac','Isaak','Isador','Isadore','Isaiah','Ishmael','Isidore','Ismail','Israel','Istvan','Ivan','Ivor','Izaak','Izak','Izzy','Jabez','Jack',
'Jackie','Jackson','Jacob','Jacques','Jae','Jaime','Jake','Jakob','James','Jameson','Jamey','Jamie','Janos','Janus','Jared','Jarrett','Jarvis','Jason','Jasper','Javier','Jay','Jean','Jean-Christophe',
'Jean-Francois','Jean-Lou','Jean-Luc','Jean-Marc','Jean-Paul','Jean-Pierre','Jeb','Jed','Jedediah','Jef','Jeff','Jefferey','Jefferson','Jeffery','Jeffie','Jeffrey','Jeffry','Jefry','Jehu','Jennings',
'Jens','Jerald','Jeramie','Jere','Jereme','Jeremiah','Jeremias','Jeremie','Jeremy','Jermain','Jermaine','Jermayne','Jerold','Jerome','Jeromy','Jerri','Jerrie','Jerrold','Jerrome','Jerry','Jervis',
'Jerzy','Jessey','Jesus','Jeth','Jethro','Jim','Jimbo','Jimmie','Jimmy','Jo','Joab','Joachim','Joao','Joaquin','Job','Jock','Jodi','Jodie','Jody','Joe','Joel','Joey','Johan','Johann','Johannes',
'John','John-David','John-Patrick','Johnathan','Johnathon','Johnnie','Johnny','Johny','Jon','Jonah','Jonas','Jonathan','Jonathon','Jonny','Jordan','Jordon','Jordy','Jorge','Jory','Jose','Josef',
'Joseph','Josephus','Josh','Joshua','Joshuah','Josiah','Jotham','Juan','Jud','Judah','Judas','Judd','Judson','Judy','Juergen','Jule','Jules','Julian','Julie','Julio','Julius','Justin','Justis',
'Kaiser','Kaleb','Kalil','Kalle','Kalman','Kalvin','Kam','Kane','Kareem','Karel','Karim','Karl','Karsten','Kaspar','Keefe','Keenan','Keene','Keil','Keith','Kellen','Kelley','Kelly','Kelsey','Kelvin',
'Kelwin','Ken','Kendrick','Kenn','Kenneth','Kenny','Kent','Kenton','Kenyon','Kermie','Kermit','Kerry','Kevan','Kevin','Kim','Kimball','Kimmo','Kin','Kincaid','King','Kingsley','Kingsly','Kingston',
'Kip','Kirby','Kirk','Kit','Klaus','Klee','Knox','Konrad','Konstantin','Kory','Kostas','Kraig','Kris','Krishna','Kristian','Kristopher','Kristos','Kurt','Kurtis','Kyle','Laird','Lamar','Lambert',
'Lamont','Lance','Lancelot','Lane','Langston','Lanny','Larry','Lars','Laurance','Lauren','Laurence','Laurens','Laurent','Laurie','Lawerence','Lawrence','Lawson','Lawton','Lay','Layton','Lazar',
'Lazare','Lazaro','Lazarus','Lazlo','Lee','Lefty','Leif','Leigh','Leighton','Leland','Lem','Lemar','Lemmie','Lemmy','Lemuel','Len','Lenard','Lennie','Lenny','Leo','Leon','Leonard','Leonardo',
'Leonerd','Leonhard','Leonid','Leonidas','Leopold','Leroy','Les','Lester','Lev','Levi','Levin','Levon','Levy','Lew','Lewis','Lex','Liam','Lin','Lincoln','Lind','Linoel','Linus','Lion','Lionel',
'Lionello','Llewellyn','Lloyd','Locke','Lockwood','Logan','Lon','Lonnie','Lonny','Loren','Lorenzo','Lorne','Lorrie','Lothar','Lou','Louie','Louis','Lovell','Lowell','Lucas','Luce','Lucian','Luciano',
'Lucien','Lucio','Lucius','Ludvig','Ludwig','Luigi','Luis','Lukas','Luke','Luther','Lyle','Lyndon','Mac','Mace','Mack','Maddie','Maddy','Madison','Magnum','Magnus','Mahesh','Mahmoud','Mahmud',
'Maison','Major','Malcolm','Manfred','Manish','Manny','Manuel','Marc','Marcel','Marcello','Marcellus','Marcelo','Marchall','Marcio','Marco','Marcos','Marcus','Marietta','Marilu','Mario','Marion',
'Marius','Mark','Marko','Markos','Markus','Marlin','Marlo','Marlon','Marlow','Marlowe','Marmaduke','Marsh','Marshal','Marshall','Mart','Martainn','Marten','Martie','Martin','Martino','Marty',
'Martyn','Marv','Marve','Marven','Marvin','Marwin','Mason','Mateo','Mathew','Mathias','Matias','Matt','Matteo','Matthaeus','Mattheus','Matthew','Matthias','Matthiew','Matthus','Mattias','Mattie',
'Matty','Maurice','Mauricio','Maurie','Maurise','Maurits','Mauritz','Maury','Max','Maxfield','Maxie','Maxim','Maximilian','Maximilien','Maxwell','Mayer','Maynard','Maynord','Mayor','Mead','Meade',
'Meier','Meir','Mel','Melvin','Melvyn','Menard','Mendel','Mendie','Merell','Merill','Merle','Merlin','Merrel','Merrick','Merril','Merrill','Merry','Merv','Mervin','Merwin','Meryl','Meyer','Mic',
'Micah','Michael','Michail','Michal','Michale','Micheal','Micheil','Michel','Michele','Mick','Mickey','Mickie','Micky','Miguel','Mika','Mikael','Mike','Mikel','Mikey','Mikhail','Miles','Milo','Milt',
'Milton','Mischa','Mitch','Mitchael','Mitchel','Mitchell','Moe','Mohamad','Mohamed','Mohammed','Mohan','Moise','Moises','Moishe','Monroe','Montague','Monte','Montgomery','Monty','Moore','Mordecai',
'Morgan','Morlee','Morley','Morly','Morrie','Morris','Morry','Morse','Mort','Morten','Mortie','Mortimer','Morton','Morty','Mose','Moses','Moshe','Moss','Mugsy','Muhammad','Munmro','Munroe','Murdoch',
'Murdock','Murphy','Murray','Mustafa','Myke','Myles','Mylo','Myron','Nahum','Napoleon','Nat','Nate','Nathan','Nathanael','Nathanial','Nathaniel','Nathanil','Neal','Neale','Neall','Nealon','Nealson',
'Nealy','Ned','Neddie','Neddy','Neel','Neil','Nels','Nelsen','Nelson','Nero','Neron','Nester','Nestor','Nev','Nevil','Nevile','Neville','Nevin','Nevins','Newton','Niall','Niccolo','Nicholas',
'Nichole','Nichols','Nick','Nickey','Nickie','Nickolas','Nicky','Nico','Nicolas','Niels','Nigel','Niki','Nikita','Nikki','Nikolai','Nikos','Niles','Nils','Nilson','Niven','Noach','Noah','Noam',
'Noble','Noe','Noel','Nolan','Noland','Norbert','Norm','Norman','Normand','Normie','Norris','Northrop','Northrup','Norton','Norwood','Nunzio','Obadiah','Obadias','Oberon','Obie','Octavius','Odell',
'Odie','Odin','Odysseus','Olaf','Olag','Ole','Oleg','Olin','Oliver','Olivier','Olle','Ollie','Omar','Oral','Oran','Orazio','Orbadiah','Oren','Orin','Orion','Orlando','Orren','Orrin','Orson','Orton',
'Orville','Osbert','Osborn','Osborne','Osbourn','Osbourne','Oscar','Osgood','Osmond','Osmund','Ossie','Oswald','Oswell','Otes','Othello','Otho','Otis','Otto','Owen','Ozzie','Ozzy','Pablo','Pace',
'Paco','Paddie','Paddy','Padraig','Page','Paige','Pail','Palmer','Paolo','Park','Parke','Parker','Parnell','Parrnell','Parry','Parsifal','Partha','Pascal','Pascale','Pasquale','Pat','Pate','Patel',
'Paten','Patin','Paton','Patric','Patrice','Patricio','Patrick','Patrik','Patsy','Pattie','Patty','Paul','Paulo','Pavel','Pearce','Pedro','Peirce','Pembroke','Pen','Penn','Penny','Penrod','Pepe',
'Pepillo','Pepito','Perceval','Percival','Percy','Perry','Pete','Peter','Petey','Petr','Peyter','Peyton','Phil','Philbert','Philip','Phillip','Phillipe','Phineas','Phip','Pierce','Pierre','Pierson',
'Piet','Pieter','Pietro','Pincas','Pinchas','Pincus','Piotr','Pip','Plato','Pooh','Porter','Poul','Powell','Praneetf','Prasad','Prasun','Prent','Prentice','Prentiss','Prescott','Preston','Price',
'Prince','Pryce','Puff','Purcell','Putnam','Pyotr','Quent','Quentin','Quiggly','Quigman','Quill','Quillan','Quincey','Quincy','Quinlan','Quinn','Quint','Quintin','Quinton','Quintus','Rab','Rabbi',
'Rabi','Rad','Radcliffe','Rafael','Rafe','Ragnar','Raimund','Rainer','Raj','Rajeev','Raleigh','Ralf','Ralph','Ram','Ramesh','Ramon','Ramsay','Ramsey','Rand','Randal','Randall','Randell','Randi',
'Randie','Randolf','Randolph','Randy','Ransell','Ransom','Raoul','Raphael','Raul','Ravi','Ravil','Rawley','Ray','Raymond','Raymund','Raymundo','Raynard','Rayner','Raynor','Reagan','Red','Redford',
'Redmond','Reece','Reed','Rees','Reese','Reg','Regan','Regen','Reggie','Reggis','Reggy','Reginald','Reginauld','Reid','Reilly','Reinhard','Reinhold','Rem','Remington','Remus','Renado','Renaldo',
'Renard','Renato','Renaud','Renault','Rene','Reube','Reuben','Reuven','Rex','Rey','Reynard','Reynold','Reynolds','Reza','Rhett','Ric','Ricard','Ricardo','Riccardo','Rice','Rich','Richard','Richardo',
'Richie','Richmond','Richy','Rick','Rickard','Rickey','Ricki','Rickie','Ricky','Rik','Rikki','Riley','Rinaldo','Ripley','Ritch','Ritchie','Roarke','Rob','Robb','Robbert','Robbie','Robert','Roberto',
'Robin','Robinson','Rochester','Rock','Rockwell','Rocky','Rod','Rodd','Roddie','Roddy','Roderic','Roderich','Roderick','Roderigo','Rodge','Rodger','Rodney','Rodolfo','Rodolph','Rodolphe','Rodrick',
'Rodrigo','Rodrique','Rog','Roger','Rogers','Roice','Roland','Rolando','Rolf','Rolfe','Rolland','Rollin','Rollins','Rollo','Rolph','Romain','Roman','Romeo','Ron','Ronald','Ronen','Roni','Ronnie',
'Ronny','Roosevelt','Rory','Roscoe','Ross','Roth','Rourke','Rowland','Roy','Royal','Royce','Rube','Ruben','Rubin','Rudd','Ruddie','Ruddy','Rudie','Rudiger','Rudolf','Rudolfo','Rudolph','Rudy',
'Rudyard','Rufe','Rufus','Rupert','Ruperto','Russ','Russel','Russell','Rustie','Rustin','Rusty','Rutger','Rutherford','Rutledge','Rutter','Ryan','Sal','Salem','Salim','Salman','Salomo','Salomon',
'Salomone','Salvador','Salvatore','Salvidor','Sam','Sammie','Sammy','Sampson','Samson','Samuel','Samuele','Sancho','Sander','Sanders','Sanderson','Sandor','Sandro','Sanford','Sanson','Sansone',
'Sarge','Sargent','Sascha','Saul','Sauncho','Saunder','Saunders','Saunderson','Saw','Sawyer','Sawyere','Sax','Saxe','Saxon','Say','Sayer','Sayers','Sayre','Sayres','Schroeder','Schuyler','Scot',
'Scott','Scotti','Scottie','Scotty','Seamus','Sean','Sebastian','Sebastiano','Sebastien','See','Selby','Selig','Serge','Sergeant','Sergei','Sergent','Sergio','Seth','Seymour','Shadow','Shaine',
'Shalom','Shamus','Shanan','Shane','Shannan','Shannon','Shaughn','Shaun','Shaw','Shawn','Shay','Shayne','Shea','Sheff','Sheffie','Sheffield','Sheffy','Shelby','Shelden','Sheldon','Shell','Shelley',
'Shelton','Shem','Shep','Shepard','Shepherd','Sheppard','Shepperd','Sheridan','Sherlock','Sherlocke','Sherman','Sherwin','Sherwynd','Shimon','Shlomo','Sholom','Shorty','Shurlock','Shurlocke',
'Shurwood','Si','Sibyl','Sid','Siddhartha','Sidnee','Sidney','Siegfried','Siffre','Sig','Sigfrid','Sigfried','Sigmund','Silas','Silvain','Silvan','Silvano','Silvanus','Silvester','Silvio','Sim',
'Simeon','Simmonds','Simon','Simone','Sinclair','Sinclare','Sivert','Siward','Skell','Skelly','Skip','Skipp','Skipper','Skippie','Skippy','Skipton','Sky','Skye','Skylar','Skyler','Slade','Slim',
'Sloan','Sloane','Sly','Smith','Smitty','Socrates','Sol','Sollie','Solly','Solomon','Somerset','Sonnie','Sonny','Sparky','Spence','Spencer','Spense','Spenser','Spike','Spiro','Spiros','Spud',
'Srinivas','Stacy','Staffard','Stafford','Staford','Stan','Standford','Stanfield','Stanford','Stanislaw','Stanleigh','Stanley','Stanly','Stanton','Stanwood','Stavros','Stearn','Stearne','Stefan',
'Stefano','Steffen','Stephan','Stephanus','Stephen','Sterling','Stern','Sterne','Steve','Steven','Stevie','Stevy','Stew','Steward','Stewart','Stig','Stillman','Stillmann','Sting','Stinky','Stirling',
'Stu','Stuart','Sturgis','Sullivan','Sully','Sumner','Sunny','Sutherland','Sutton','Sven','Swen','Syd','Sydney','Sylvan','Sylvester','Tab','Tabb','Tabbie','Tabby','Taber','Tabor','Tad','Tadd',
'Taddeo','Taddeus','Tadeas','Tailor','Tait','Taite','Talbert','Talbot','Tallie','Tally','Tam','Tamas','Tammie','Tammy','Tan','Tann','Tanner','Tanney','Tannie','Tanny','Tarrance','Tarrant','Tarzan',
'Tate','Taylor','Teador','Ted','Tedd','Teddie','Teddy','Tedie','Tedman','Tedmund','Tedrick','Temple','Templeton','Teodoor','Teodor','Teodorico','Teodoro','Terence','Terencio','Terrance','Terrel',
'Terrell','Terrence','Terri','Terrill','Terry','Thacher','Thad','Thaddeus','Thaddius','Thaddus','Thadeus','Thain','Thaine','Thane','Tharen','Thatch','Thatcher','Thaxter','Thayne','Thebault','Thedric',
'Thedrick','Theo','Theobald','Theodor','Theodore','Theodoric','Theophyllus','Thibaud','Thibaut','Thom','Thomas','Thor','Thorn','Thorndike','Thornie','Thornton','Thorny','Thorpe','Thorstein','Thorsten',
'Thorvald','Thurstan','Thurston','Tibold','Tiebold','Tiebout','Tiler','Tim','Timmie','Timmy','Timothee','Timotheus','Timothy','Tirrell','Tito','Titos','Titus','Tobe','Tobiah','Tobias','Tobie','Tobin',
'Tobit','Toby','Tod','Todd','Toddie','Toddy','Tom','Tomas','Tome','Tomkin','Tomlin','Tommie','Tommy','Tonnie','Tony','Tore','Torey','Torin','Torr','Torrance','Torre','Torrence','Torrey','Torrin',
'Torry','Town','Towney','Townie','Townsend','Towny','Trace','Tracey','Tracie','Tracy','Traver','Travers','Travis','Tray','Tremain','Tremaine','Tremayne','Trent','Trenton','Trev','Trevar','Trever',
'Trevor','Trey','Trip','Tristan','Troy','Truman','Tuck','Tucker','Tudor','Tull','Tulley','Tully','Turner','Ty','Tybalt','Tye','Tyler','Tymon','Tymothy','Tynan','Tyrone','Tyrus','Tyson','Udale',
'Udall','Udell','Ugo','Ulberto','Uli','Ulick','Ulises','Ulric','Ulrich','Ulrick','Ulysses','Umberto','Upton','Urbain','Urban','Urbano','Urbanus','Uri','Uriah','Uriel','Urson','Vachel','Vaclav',
'Vail','Val','Valdemar','Vale','Valentin','Valentine','Van','Vance','Vasili','Vasilis','Vasily','Vassili','Vassily','Vaughan','Vaughn','Venkat','Verge','Vergil','Vern','Verne','Vernen','Verney',
'Vernon','Vernor','Vic','Vick','Victor','Vijay','Vilhelm','Vin','Vince','Vincent','Vincents','Vinnie','Vinny','Vinod','Virge','Virgie','Virgil','Virgilio','Vite','Vito','Vlad','Vladamir','Vladimir',
'Voltaire','Von','Wade','Wadsworth','Wain','Waine','Wainwright','Wait','Waite','Waiter','Wake','Wakefield','Wald','Waldemar','Walden','Waldo','Waldon','Waleed','Walker','Wallace','Wallache','Wallas',
'Wallie','Wallis','Wally','Walsh','Walt','Walter','Walther','Walton','Wang','Ward','Warde','Warden','Ware','Waring','Warner','Warren','Washington','Wat','Waverley','Waverly','Way','Waylan','Wayland',
'Waylen','Waylin','Waylon','Wayne','Web','Webb','Weber','Webster','Weidar','Weider','Welbie','Welby','Welch','Wells','Welsh','Wendall','Wendel','Wendell','Werner','Wes','Wesley','Weslie','West',
'Westbrook','Westbrooke','Westleigh','Westley','Weston','Weylin','Wheeler','Whit','Whitaker','Whitby','Whitman','Whitney','Whittaker','Wiatt','Wilber','Wilbert','Wilbur','Wilburn','Wilburt','Wilden',
'Wildon','Wilek','Wiley','Wilfred','Wilfrid','Wilhelm','Will','Willard','Willdon','Willem','Willey','Willi','William','Willie','Willis','Willmott','Willy','Wilmar','Wilmer','Wilson','Wilt','Wilton',
'Win','Windham','Winfield','Winford','Winfred','Winifield','Winn','Winnie','Winny','Winslow','Winston','Winthrop','Winton','Wit','Witold','Wittie','Witty','Wojciech','Wolf','Wolfgang','Wolfie',
'Wolfram','Wolfy','Woochang','Woodie','Woodman','Woodrow','Woody','Worden','Worth','Worthington','Worthy','Wright','Wyatan','Wyatt','Wye','Wylie','Wyn','Wyndham','Wynn','Wynton','Xavier','Xenos',
'Xerxes','Xever','Ximenes','Ximenez','Xymenes','Yaakov','Yacov','Yale','Yanaton','Yance','Yancey','Yancy','Yank','Yankee','Yard','Yardley','Yehudi','Yigal','Yule','Yuri','Yves','Zach','Zacharia',
'Zachariah','Zacharias','Zacharie','Zachary','Zacherie','Zachery','Zack','Zackariah','Zak','Zalman','Zane','Zared','Zary','Zeb','Zebadiah','Zebedee','Zebulen','Zebulon','Zechariah','Zed','Zedekiah',
'Zeke','Zelig','Zerk','Zeus','Zippy','Zollie','Zolly','Zorro','Rahul','Shumeet','Vibhu'];

var femaleNames = ['Mary','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan','Margaret','Dorothy','Lisa','Nancy','Karen','Betty','Helen','Sandra','Donna','Carol','Ruth','Sharon',
'Michelle','Laura','Sarah','Kimberly','Deborah','Jessica','Shirley','Cynthia','Angela','Melissa','Brenda','Amy','Anna','Rebecca','Virginia','Kathleen','Pamela','Martha','Debra','Amanda','Stephanie',
'Carolyn','Christine','Marie','Janet','Catherine','Ann','Joyce','Diane','Alice','Julie','Heather','Teresa','Doris','Gloria','Evelyn','Jean','Cheryl','Katherine','Joan','Ashley','Judith','Rose',
'Janice','Kelly','Nicole','Judy','Christina','Kathy','Theresa','Beverly','Denise','Tammy','Irene','Jane','Lori','Rachel','Marilyn','Andrea','Kathryn','Louise','Sara','Anne','Jacqueline','Wanda',
'Bonnie','Julia','Ruby','Lois','Tina','Phyllis','Norma','Paula','Diana','Annie','Lillian','Emily','Robin','Peggy','Crystal','Gladys','Rita','Dawn','Connie','Florence','Tracy','Edna','Tiffany',
'Carmen','Rosa','Cindy','Grace','Wendy','Victoria','Edith','Kim','Sherry','Sylvia','Josephine','Thelma','Shannon','Sheila','Ethel','Ellen','Elaine','Marjorie','Carrie','Charlotte','Monica','Esther',
'Pauline','Emma','Juanita','Anita','Rhonda','Hazel','Amber','Eva','Debbie','April','Leslie','Clara','Lucille','Jamie','Joanne','Eleanor','Valerie','Danielle','Megan','Alicia','Suzanne','Michele',
'Gail','Bertha','Darlene','Veronica','Jill','Erin','Geraldine','Lauren','Cathy','Joann','Lorraine','Lynn','Sally','Regina','Erica','Beatrice','Dolores','Bernice','Audrey','Yvonne','Annette','June',
'Samantha','Marion','Dana','Stacy','Ana','Renee','Ida','Vivian','Roberta','Holly','Brittany','Melanie','Loretta','Yolanda','Jeanette','Laurie','Katie','Kristen','Vanessa','Alma','Sue','Elsie','Beth',
'Jeanne','Vicki','Carla','Tara','Rosemary','Eileen','Terri','Gertrude','Lucy','Tonya','Ella','Stacey','Wilma','Gina','Kristin','Jessie','Natalie','Agnes','Vera','Willie','Charlene','Bessie','Delores',
'Melinda','Pearl','Arlene','Maureen','Colleen','Allison','Tamara','Joy','Georgia','Constance','Lillie','Claudia','Jackie','Marcia','Tanya','Nellie','Minnie','Marlene','Heidi','Glenda','Lydia','Viola',
'Courtney','Marian','Stella','Caroline','Dora','Jo','Vickie','Mattie','Terry','Maxine','Irma','Mabel','Marsha','Myrtle','Lena','Christy','Deanna','Patsy','Hilda','Gwendolyn','Jennie','Nora','Margie',
'Nina','Cassandra','Leah','Penny','Kay','Priscilla','Naomi','Carole','Brandy','Olga','Billie','Dianne','Tracey','Leona','Jenny','Felicia','Sonia','Miriam','Velma','Becky','Violet','Kristina','Toni',
'Misty','Mae','Shelly','Daisy','Ramona','Sherri','Erika','Katrina','Claire','Lindsey','Lindsay','Geneva','Guadalupe','Belinda','Margarita','Sheryl','Cora','Faye','Ada','Natasha','Sabrina','Isabel',
'Marguerite','Hattie','Harriet','Molly','Cecilia','Kristi','Brandi','Blanche','Sandy','Rosie','Joanna','Iris','Eunice','Angie','Inez','Lynda','Madeline','Amelia','Alberta','Genevieve','Monique',
'Jodi','Janie','Maggie','Kayla','Sonya','Jan','Lee','Kristine','Candace','Fannie','Maryann','Opal','Alison','Yvette','Melody','Luz','Susie','Olivia','Flora','Shelley','Kristy','Mamie','Lula','Lola',
'Verna','Beulah','Antoinette','Candice','Juana','Jeannette','Pam','Kelli','Hannah','Whitney','Bridget','Karla','Celia','Latoya','Patty','Shelia','Gayle','Della','Vicky','Lynne','Sheri','Marianne',
'Kara','Jacquelyn','Erma','Blanca','Myra','Leticia','Pat','Krista','Roxanne','Angelica','Johnnie','Robyn','Francis','Adrienne','Rosalie','Alexandra','Brooke','Bethany','Sadie','Bernadette','Traci',
'Jody','Kendra','Jasmine','Nichole','Rachael','Chelsea','Mable','Ernestine','Muriel','Marcella','Elena','Krystal','Angelina','Nadine','Kari','Estelle','Dianna','Paulette','Lora','Mona','Doreen',
'Rosemarie','Angel','Desiree','Antonia','Hope','Ginger','Janis','Betsy','Christie','Freda','Mercedes','Meredith','Lynette','Teri','Cristina','Eula','Leigh','Meghan','Sophia','Eloise','Rochelle',
'Gretchen','Cecelia','Raquel','Henrietta','Alyssa','Jana','Kelley','Gwen','Kerry','Jenna','Tricia','Laverne','Olive','Alexis','Tasha','Silvia','Elvira','Casey','Delia','Sophie','Kate','Patti',
'Lorena','Kellie','Sonja','Lila','Lana','Darla','May','Mindy','Essie','Mandy','Lorene','Elsa','Josefina','Jeannie','Miranda','Dixie','Lucia','Marta','Faith','Lela','Johanna','Shari','Camille','Tami',
'Shawna','Elisa','Ebony','Melba','Ora','Nettie','Tabitha','Ollie','Jaime','Winifred','Kristie','Marina','Alisha','Aimee','Rena','Myrna','Marla','Tammie','Latasha','Bonita','Patrice','Ronda','Sherrie',
'Addie','Francine','Deloris','Stacie','Adriana','Cheri','Shelby','Abigail','Celeste','Jewel','Cara','Adele','Rebekah','Lucinda','Dorthy','Chris','Effie','Trina','Reba','Shawn','Sallie','Aurora',
'Lenora','Etta','Lottie','Kerri','Trisha','Nikki','Estella','Francisca','Josie','Tracie','Marissa','Karin','Brittney','Janelle','Lourdes','Laurel','Helene','Fern','Elva','Corinne','Kelsey','Ina',
'Bettie','Elisabeth','Aida','Caitlin','Ingrid','Iva','Eugenia','Christa','Goldie','Cassie','Maude','Jenifer','Therese','Frankie','Dena','Lorna','Janette','Latonya','Candy','Morgan','Consuelo','Tamika',
'Rosetta','Debora','Cherie','Polly','Dina','Jewell','Fay','Jillian','Dorothea','Nell','Trudy','Esperanza','Patrica','Kimberley','Shanna','Helena','Carolina','Cleo','Stefanie','Rosario','Ola','Janine',
'Mollie','Lupe','Alisa','Lou','Maribel','Susanne','Bette','Susana','Elise','Cecile','Isabelle','Lesley','Jocelyn','Paige','Joni','Rachelle','Leola','Daphne','Alta','Ester','Petra','Graciela','Imogene',
'Jolene','Keisha','Lacey','Glenna','Gabriela','Keri','Ursula','Lizzie','Kirsten','Shana','Adeline','Mayra','Jayne','Jaclyn','Gracie','Sondra','Carmela','Marisa','Rosalind','Charity','Tonia','Beatriz',
'Marisol','Clarice','Jeanine','Sheena','Angeline','Frieda','Lily','Robbie','Shauna','Millie','Claudette','Cathleen','Angelia','Gabrielle','Autumn','Katharine','Summer','Jodie','Staci','Lea','Christi',
'Jimmie','Justine','Elma','Luella','Margret','Dominique','Socorro','Rene','Martina','Margo','Mavis','Callie','Bobbi','Maritza','Lucile','Leanne','Jeannine','Deana','Aileen','Lorie','Ladonna','Willa',
'Manuela','Gale','Selma','Dolly','Sybil','Abby','Lara','Dale','Ivy','Dee','Winnie','Marcy','Luisa','Jeri','Magdalena','Ofelia','Meagan','Audra','Matilda','Leila','Cornelia','Bianca','Simone','Bettye',
'Randi','Virgie','Latisha','Barbra','Georgina','Eliza','Leann','Bridgette','Rhoda','Haley','Adela','Nola','Bernadine','Flossie','Ila','Greta','Ruthie','Nelda','Minerva','Lilly','Terrie','Letha',
'Hilary','Estela','Valarie','Brianna','Rosalyn','Earline','Catalina','Ava','Mia','Clarissa','Lidia','Corrine','Alexandria','Tia','Sharron','Rae','Dona','Ericka','Jami','Elnora','Chandra','Lenore',
'Neva','Marylou','Melisa','Tabatha','Serena','Allie','Sofia','Jeanie','Odessa','Nannie','Harriett','Loraine','Penelope','Milagros','Emilia','Benita','Allyson','Ashlee','Tania','Tommie','Esmeralda',
'Karina','Eve','Pearlie','Zelma','Malinda','Noreen','Tameka','Saundra','Hillary','Amie','Althea','Rosalinda','Jordan','Lilia','Alana','Gay','Clare','Alejandra','Elinor','Michael','Lorrie','Jerri',
'Darcy','Earnestine','Carmella','Taylor','Noemi','Marcie','Liza','Annabelle','Louisa','Earlene','Mallory','Carlene','Nita','Selena','Tanisha','Katy','Julianne','John','Lakisha','Edwina','Maricela',
'Margery','Kenya','Dollie','Roxie','Roslyn','Kathrine','Nanette','Charmaine','Lavonne','Ilene','Kris','Tammi','Suzette','Corine','Kaye','Jerry','Merle','Chrystal','Lina','Deanne','Lilian','Juliana',
'Aline','Luann','Kasey','Maryanne','Evangeline','Colette','Melva','Lawanda','Yesenia','Nadia','Madge','Kathie','Eddie','Ophelia','Valeria','Nona','Mitzi','Mari','Georgette','Claudine','Fran','Alissa',
'Roseann','Lakeisha','Susanna','Reva','Deidre','Chasity','Sheree','Carly','James','Elvia','Alyce','Deirdre','Gena','Briana','Araceli','Katelyn','Rosanne','Wendi','Tessa','Berta','Marva','Imelda',
'Marietta','Marci','Leonor','Arline','Sasha','Madelyn','Janna','Juliette','Deena','Aurelia','Josefa','Augusta','Liliana','Young','Christian','Lessie','Amalia','Savannah','Anastasia','Vilma','Natalia',
'Rosella','Lynnette','Corina','Alfreda','Leanna','Carey','Amparo','Coleen','Tamra','Aisha','Wilda','Karyn','Cherry','Queen','Maura','Mai','Evangelina','Rosanna','Hallie','Erna','Enid','Mariana','Lacy',
'Juliet','Jacklyn','Freida','Madeleine','Mara','Hester','Cathryn','Lelia','Casandra','Bridgett','Angelita','Jannie','Dionne','Annmarie','Katina','Beryl','Phoebe','Millicent','Katheryn','Diann','Carissa',
'Maryellen','Liz','Lauri','Helga','Gilda','Adrian','Rhea','Marquita','Hollie','Tisha','Tamera','Angelique','Francesca','Britney','Kaitlin','Lolita','Florine','Rowena','Reyna','Twila','Fanny','Janell',
'Ines','Concetta','Bertie','Alba','Brigitte','Alyson','Vonda','Pansy','Elba','Noelle','Letitia','Kitty','Deann','Brandie','Louella','Leta','Felecia','Sharlene','Lesa','Beverley','Robert','Isabella',
'Herminia','Terra','Celina','Tori','Octavia','Jade','Denice','Germaine','Sierra','Michell','Cortney','Nelly','Doretha','Sydney','Deidra','Monika','Lashonda','Judi','Chelsey','Antionette','Margot',
'Adelaide','Nan','Leeann','Elisha','Dessie','Libby','Kathi','Gayla','Latanya','Mina','Mellisa','Kimberlee','Jasmin','Renae','Zelda','Justina','Gussie','Emilie','Camilla','Abbie','Rocio','Kaitlyn','Jesse',
'Edythe','Ashleigh','Selina','Lakesha','Geri','Allene','Pamala','Michaela','Dayna','Caryn','Rosalia','Sun','Jacquline','Rebeca','Marybeth','Krystle','Iola','Dottie','Bennie','Belle','Aubrey','Ernestina',
'Elida','Adrianne','Demetria','Delma','Jaqueline','Destiny','Arleen','Virgina','Retha','Fatima','Tillie','Eleanore','Cari','Treva','Birdie','Wilhelmina','Rosalee','Maurine','Latrice','Yong',
'Jena','Taryn','Elia','Debby','Maudie','Jeanna','Delilah','Catrina','Shonda','Hortencia','Theodora','Teresita','Robbin','Danette','Maryjane','Delphine','Brianne','Nilda','Danna','Cindi','Bess','Iona',
'Hanna','Ariel','Winona','Vida','Rosita','Marianna','William','Racheal','Guillermina','Eloisa','Celestine','Caren','Malissa','Lona','Chantel','Shellie','Marisela','Leora','Agatha','Soledad','Migdalia',
'Ivette','Christen','Athena','Janel','Chloe','Veda','Pattie','Tessie','Tera','Marilynn','Lucretia','Karrie','Dinah','Daniela','Alecia','Adelina','Vernice','Shiela','Portia','Merry','Lashawn','Devon',
'Dara','Tawana','Oma','Verda','Christin','Alene','Zella','Sandi','Rafaela','Maya','Kira','Candida','Alvina','Suzan','Shayla','Lyn','Lettie','Alva','Samatha','Oralia','Matilde','Madonna','Larissa','Vesta',
'Renita','India','Delois','Shanda','Phillis','Lorri','Erlinda','Cruz','Cathrine','Barb','Zoe','Isabell','Ione','Gisela','Charlie','Valencia','Roxanna','Mayme','Kisha','Ellie','Mellissa','Dorris','Dalia',
'Bella','Annetta','Zoila','Reta','Reina','Lauretta','Kylie','Christal','Pilar','Charla','Elissa','Tiffani','Tana','Paulina','Leota','Breanna','Jayme','Carmel','Vernell','Tomasa','Mandi','Dominga','Santa',
'Melodie','Lura','Alexa','Tamela','Ryan','Mirna','Kerrie','Venus','Noel','Felicita','Cristy','Carmelita','Berniece','Annemarie','Tiara','Roseanne','Missy','Cori','Roxana','Pricilla','Kristal','Jung',
'Elyse','Haydee','Aletha','Bettina','Marge','Gillian','Filomena','Charles','Zenaida','Harriette','Caridad','Vada','Una','Aretha','Pearline','Marjory','Marcela','Flor','Evette','Elouise','Alina','Trinidad',
'David','Damaris','Catharine','Carroll','Belva','Nakia','Marlena','Luanne','Lorine','Karon','Dorene','Danita','Brenna','Tatiana','Sammie','Louann','Loren','Julianna','Andria','Philomena','Lucila','Leonora',
'Dovie','Romona','Mimi','Jacquelin','Gaye','Tonja','Misti','Joe','Gene','Chastity','Stacia','Roxanne','Micaela','Nikita','Mei','Velda','Marlys','Johnna','Aura','Lavern','Ivonne','Hayley','Nicki','Majorie',
'Herlinda','George','Alpha','Yadira','Perla','Gregoria','Daniel','Antonette','Shelli','Mozelle','Mariah','Joelle','Cordelia','Josette','Chiquita','Trista','Louis','Laquita','Georgiana','Candi','Shanon',
'Lonnie','Hildegard','Valentina','Stephany','Magda','Karol','Gerry','Gabriella','Tiana','Roma','Richelle','Ray','Oleta','Idella','Alaina','Suzanna','Jovita','Tosha','Raven','Nereida','Marlyn','Kyla',
'Joseph','Delfina','Tena','Stephenie','Sabina','Nathalie','Marcelle','Gertie','Darleen','Thea','Sharonda','Shantel','Belen','Venessa','Rosalina','Ona','Genoveva','Corey','Clementine','Rosalba','Renate',
'Ivory','Georgianna','Floy','Dorcas','Ariana','Tyra','Theda','Mariam','Juli','Jesica','Donnie','Vikki','Verla','Roselyn','Melvina','Jannette','Ginny','Debrah','Corrie','Asia','Violeta','Myrtis','Latricia',
'Collette','Charleen','Anissa','Viviana','Twyla','Precious','Nedra','Latonia','Hellen','Fabiola','Annamarie','Adell','Sharyn','Chantal','Niki','Maud','Lizette','Lindy','Kia','Kesha','Jeana','Danelle',
'Charline','Chanel','Carrol','Valorie','Lia','Dortha','Cristal','Sunny','Leone','Leilani','Gerri','Debi','Andra','Keshia','Ima','Dulce','Linnie','Kami','Georgie','Catina','Brook','Alda','Sharla','Ruthann',
'Meaghan','Magdalene','Lissette','Adelaida','Venita','Trena','Shirlene','Shameka','Elizebeth','Dian','Shanta','Mickey','Latosha','Carlotta','Windy','Soon','Rosina','Mariann','Leisa','Jonnie','Dawna',
'Cathie','Billy','Astrid','Sidney','Laureen','Janeen','Holli','Fawn','Vickey','Teressa','Shante','Rubye','Marcelina','Chanda','Cary','Terese','Scarlett','Marnie','Lulu','Lisette','Jeniffer','Elenor',
'Carmen','Bernita','Altagracia','Aleta','Adrianna','Zoraida','Ronnie','Nicola','Lyndsey','Kendall','Janina','Chrissy','Ami','Starla','Phylis','Phuong','Kyra','Charisse','Blanch','Rona','Nanci','Marilee',
'Maranda','Cory','Brigette','Sanjuana','Marita','Kassandra','Joycelyn','Ira','Felipa','Chelsie','Bonny','Mireya','Lorenza','Kyong','Ileana','Candelaria','Sherie','Lucie','Leatrice','Lakeshia','Gerda',
'Bambi','Marylin','Lavon','Garnet','Evie','Tressa','Shayna','Lavina','Kyung','Jeanetta','Sherrill','Shara','Phyliss','Mittie','Anabel','Alesia','Thuy','Tawanda','Joanie','Tiffanie','Lashanda','Karissa',
'Enriqueta','Daria','Daniella','Corinna','Alanna','Abbey','Roxane','Roseanna','Magnolia','Lida','Kyle','Joellen','Era','Coral','Carleen','Tresa','Peggie','Novella','Nila','Maybelle','Jenelle','Carina',
'Nova','Melina','Marquerite','Margarette','Josephina','Evonne','Devin','Cinthia','Albina','Toya','Tawnya','Sherita','Myriam','Lizabeth','Lise','Keely','Jenni','Giselle','Cheryle','Ardith','Ardis','Alesha',
'Adriane','Shaina','Linnea','Karolyn','Felisha','Dori','Darci','Artie','Armida','Zola','Xiomara','Vergie','Shamika','Nena','Nannette','Maxie','Lovie','Jeane','Jaimie','Farrah','Elaina','Caitlyn','Starr',
'Felicitas','Cherly','Caryl','Yolonda','Yasmin','Teena','Prudence','Pennie','Nydia','Mackenzie','Orpha','Marvel','Lizbeth','Laurette','Jerrie','Hermelinda','Carolee','Tierra','Mirian','Meta','Melony',
'Kori','Jennette','Jamila','Ena','Anh','Yoshiko','Susannah','Salina','Rhiannon','Joleen','Cristine','Ashton','Aracely','Tomeka','Shalonda','Marti','Lacie','Kala','Jada','Ilse','Hailey','Brittani','Zona',
'Syble','Sherryl','Nidia','Kandice','Kandi','Deb','Alycia','Ronna','Norene','Mercy','Giovanna','Gemma','Christel','Audry','Zora','Vita','Van','Trish','Stephaine','Shirlee','Shanika','Melonie','Mazie',
'Jazmin','Inga','Hoa','Hettie','Geralyn','Fonda','Estrella','Adella','Su','Sarita','Rina','Milissa','Maribeth','Golda','Evon','Ethelyn','Enedina','Cherise','Chana','Velva','Tawanna','Sade','Mirta','Li',
'Karie','Jacinta','Elna','Davina','Cierra','Ashlie','Albertha','Tanesha','Stephani','Nelle','Mindi','Lu','Lorinda','Larue','Florene','Demetra','Dedra','Ciara','Chantelle','Suzy','Rosalva','Noelia','Lyda',
'Leatha','Krystyna','Kristan','Karri','Darline','Darcie','Cinda','Cheyenne','Cherrie','Awilda','Almeda','Rolanda','Lanette','Jerilyn','Gisele','Evalyn','Cyndi','Cleta','Zina','Zena','Velia','Tanika',
'Charissa','Talia','Margarete','Lavonda','Kaylee','Kathlene','Jonna','Irena','Ilona','Idalia','Candis','Candance','Brandee','Anitra','Alida','Sigrid','Nicolette','Maryjo','Linette','Hedwig','Christiana',
'Cassidy','Alexia','Tressie','Modesta','Lupita','Lita','Gladis','Evelia','Davida','Cherri','Cecily','Annabel','Agustina','Wanita','Shirly','Rosaura','Hulda','Eun','Bailey','Yetta','Verona','Sibyl',
'Shannan','Mechelle','Lue','Leandra','Lani','Kylee','Kandy','Jolynn','Ferne','Eboni','Corene','Alysia','Zula','Nada','Moira','Lyndsay','Lorretta','Jammie','Cameron','Adria','Vina','Vicenta','Tangela',
'Stephine','Norine','Nella','Liana','Leslee','Kimberely','Iliana','Glory','Felica','Elfriede','Eden','Eartha','Carma','Bea','Ocie','Marry','Lennie','Kiara','Jacalyn','Carlota','Arielle','Yu','Star',
'Otilia','Kirstin','Kacey','Jeraldine','Elana','Dorthea','Cami','Amada','Adelia','Vernita','Siobhan','Renea','Rashida','Ouida','Odell','Nilsa','Meryl','Kristyn','Julieta','Danica','Breanne','Aurea',
'Anglea','Sherron','Odette','Malia','Lorelei','Lin','Leesa','Kenna','Kathlyn','Fiona','Charlette','Suzie','Shantell','Sabra','Racquel','Myong','Mira','Martine','Lucienne','Lavada','Juliann','Johnie',
'Elvera','Delphia','Clair','Christiane','Charolette','Carri','Augustine','Asha','Angella','Paola','Nina','Leda','Lai','Eda','Sunshine','Stefani','Shanell','Palma','Machelle','Lissa','Kecia','Kathryne',
'Karlene','Julissa','Jettie','Jenniffer','Hui','Corrina','Carolanne','Alena','Tess','Rosaria','Myrtice','Marylee','Liane','Kenyatta','Judie','Janey','Elmira','Eldora','Denna','Cristi','Cathi','Zaida',
'Vonnie','Viva','Vernie','Rosaline','Mariela','Luciana','Lesli','Karan','Felice','Deneen','Adina','Wynona','Tarsha','Sheron','Shasta','Shanita','Shani','Shandra','Randa','Pinkie','Paris','Nelida',
'Marilou','Lyla','Laurene','Laci','Joi','Janene','Dorotha','Daniele','Dani','Carolynn','Carlyn','Berenice','Ayesha','Anneliese','Alethea','Thersa','Tamiko','Rufina','Olivia','Mozell','Marylyn','Madison',
'Kristian','Kathyrn','Kasandra','Kandace','Janae','Gabriel','Domenica','Debbra','Dannielle','Chun','Buffy','Arcelia','Aja','Zenobia','Sharen','Sharee','Page','Lavinia','Kum','Kacie','Jackeline','Huong',
'Felisa','Emilia','Eleanora','Cythia','Cristin','Clyde','Claribel','Caron','Anastacia','Zulma','Zandra','Yoko','Tenisha','Susann','Sherilyn','Shay','Shawanda','Sabine','Romana','Linsey','Keiko','Joana'];

var townNames = ['Sherwwod', 'Kingsbridge', 'Aerilon', 'Aquarin', 'Aramoor', 'Azmar', 'Begger’s Hole', 'Black Hollow', 'Blue Field', 'Briar Glen', 
'Brickelwhyte', 'Broken Shield', 'Bullmar', 'Carran', 'Coalfell', 'Cullfield', 'Darkwell', 'Doonatel', 'Dry Gulch', 'Easthaven', 'Ecrin', 'Erast', 'Far Water',
'Firebend', 'Fool’s March', 'Frostford', 'Goldcrest', 'Goldenleaf', 'Greenflower', 'Garen’s Well', 'Haran', 'Hillfar', 'Hogsfeet', 'Hollyhead', 'Hull Hwen', 'Icemeet',
'Ironforge', 'Irragin', 'Jarren’s Outpost', 'Jongvale', 'Kara’s Vale', 'Knife’s Edge', 'Lakeshore', 'Leeside', 'Lullin', 'Marren’s Eve', 'Millstone', 'Moonbright',
'Mountmend', 'Nearon', 'New Cresthill', 'Northpass', 'Nuxvar', 'Oakheart', 'Oar’s Rest', 'Old Ashton', 'Orrinshire', 'Ozryn', 'Pavv', 'Pella’s Wish', 'Pinnella Pass',
'Queenstown', 'Ramshorn', 'Red Hawk', 'Rivermouth', 'Saker Keep', 'Seameet', 'Oakenkeep', 'The Warren', 'Snowmelt', 'Squall’s End', 'Swordbreak',
'Tarrin', 'Three Streams', 'Trudid', 'Ubbin Falls', 'Ula’ree', 'Veritas', 'Violl’s Garden', 'Wavemeet', 'Whiteridge', 'Willowdale', 'Windrip', 'Wintervale', 'Wellspring',
'Westwend', 'Wolfden', 'Snake Canyon', 'Orkney', 'Pendleland', 'Aethelney', 'Kincardine', 'Cappadocia', 'Duncaster', 'Lindow', 'Goldcrest', 'Solime', 'Nortown', 'Farnworth',
'Garthram', 'Llyne', 'Hartlepool', 'Westwend', 'Brickelwhyte', 'Ruthorham', 'Bleakburn', 'Taedmorden', 'Kineallen', 'Troutbeck', 'Aramoor', 'Swinford', 'Hampstead', 'Sharpton',
'Calmarnock', 'Chesterland', 'Auchendale', 'Cherrytown', 'Kirkwall', 'Linemell', 'Peltragow', 'Fanfoss', 'Easthallow', 'Bredon', 'Exeter', 'Haran', 'Garrigill', 'Ritherhithe',
'Queenstown', 'Harnsey', 'Arcton', 'Leefside', 'Larkinge', 'Hampstead', 'Mountmend', 'Murrayfield', 'Aysgarth', 'Ormkirk', 'Furness', 'Firebend', 'Kamouraska', 'Willowdale', 'Dalmellington',
'Auctershire', 'Greenflower', 'Ballatersville', 'Venzor', 'Sheepsland', 'Grasmere', 'Northon', 'Favorsham', 'Farncombe', 'Balmoral', 'Swindlecote', 'Barmwich', 'Briars patch',
'Ravaryn', 'Ywain', 'Orioch', 'Khisland', 'Reichladden', 'Sarithin', 'Gwendollihn', 'Reikand', 'Kikoro'];

var titles = ['The Nightingale', 'The Majestic', 'The Brave', 'The Swift', 'The Executioner', 'The Enforcer', 'The Prophet', 'The Lone Stalker', 'The Nimble', 'The Exalted', 'The Vengeful', 'The Grim Reaper', 
'Mooncrusher', 'Manslayer', 'Dragonslayer', 'Void Wanderer', 'Wolfsbane',  'The Blade of Storms', 'Nightmare Reaver', 'Paragon of Steel', 'Stormfang', 'Apostle of Shadow', 
'The Bloodseeker', 'The Punisher', 'The Sentinel of Realms',  'The Champion', 'Master of the Horizon', 'The Guardian', 'Eternal Sovereign', 'Devourer of Evil',
'The Avenger',  'The Vanquisher', 'The Bloodstained', 'The Starkindler', 'The Adjuticator', 'The Legendary', 'The Northstrider', 'The Bladmaster', 'The Golden Reverend', 
'The Eastern Seer', 'The Western Force', 'The Will of the South', 'The Sage of the Desert', 'The Shrouded Shaman', 'Emperor of Ash', 'Skullbreaker', 'The Blessed Captain', 'The Virtuous', 'Dreamcatcher'];

var dungeonNames = ['The Castle of Doom', 'The Hall of Souls', "The Spire of Reckoning", 'The Pit of Dispair', 'The Citadel of Madness', 'The Tower of Rust', 'The Caves of the prophet', 'The Jungle of despair', 'The Abyss',
'The Chamber of the Forsaken', 'The Labyrinth of the Lost', "Orsted's Abandoned Throne", 'The Vault of Wonders', 'The Grim Grotto', 'The Cliffs of Ire', 'The Kingslayer Keep', 'The Jagged Ruins',
'Catacombs of the Fallen', 'The Beacon of Darkness', 'The Garden of Weeping Statues', 'The Black Lair', 'The Crypt of shadows', 'The Twilight Caverns',
'The Black Tower', 'The Grim Graveyard', 'The Sinister Spire', 'The Haunted Garden', 'The Realm of Regrets', 'The Mysterious Maze', 'The Foggy Moore', 'The Wailing Castle', 'The Haunted Battlefield',
'The Haunted Mine', 'The Fortress of the Sun', 'The Fortress of the Moon', 'Dungeon of the Eclipse', 'Dungeon of Despair', "Liar's Labrynth"];

var landmarkNames = ['Defunct World Portal', 'Ruins of a Lost City', 'Stonehenge', 'The Ivory Tower', 'The Forest of Fallen Giants', 'The Spirit Temple', 'The Crystal Palace', 'Garden of Giant Orchids',
'Abandoned Temple', "Orsted's Tree", 'The Golden Doors', 'Statue of a Hero', 'The Twilight Gate', 'The Infinite Waterfall', 'Giant Ribcage', 'The Ultra Sword', 'The Forest Temple', 'The Dream Sphere', 
'Ancient Battlefield', 'Dragon Skull', 'The Golden Pyramid', 'The Diamond Pillar'];

var battlemarkNames = ['Massive crater', 'scorched remnants', 'scattered bones', 'scar in the landscape', 'shredded hillside'];

var artifactNames = ['Erolith','Uritris','Elphine','Aywin','Grequinal','Folduin','Yesjyre','Delmuth','Glynlana','Aiduin','Caicaryn','Aolis','Xyrrora','Giullis','Venris','Yesanith','Reystina','Shyrrik',
'Elasandoral','Ariawyn','Bryvalur','Zylyarus','Haldir','Gentoris','Ruvyn','Carnala','Eldrin','Kelzeiros','Bellas','Nerijeon','Vamir','Ilinala','Eldaerenth','Balren','Elion','Wynharice','Riluaneth',
'Dacan','Sylvar','Ilitoris','Tarathiel','Caiberos','Folre','Farbanise','Ryo','Ilibalar','Halueth','Bryynore','Navarre','Wrangwyn','Saevel','Helenorin','Filaurel','Keybalar','Rolim','Kelbanise','Halaema',
'Miratumal','Malonne','Ilixidor','Faelyn','Yeldan','Estelar ','Zumgolor','Lathlaeril','Yelthana','Nelaeryn','Magleth','Navarre','Heirel','Cyran','Crarora','Khidell','Balleth','Feno','Daewynn','Myriil',
'Presbella','Sylvar','Wranxalim','Naesala','Yingwyn','Alanis','Crayarus','Tarathiel','Ralowarin','Mirthal','Waessalor','Avourel','Keyleth','Sylmare','Keyven','Paeral','Keymaris','Hamon','Miasalor',
'Ithronel','Glyndithas','Faelyn','Wranmenor','Lazziar','Lorabanise','Ehlark','Reylee','Lethonel','Gilceran','Sinaht','Krisvalur','Amrynn','Fenceran','Sylmare','Valrora','Rolim','Wynbella','Rhalyf',
'Sharel','Vulwin','Trisgolor','Gaelira','Yelquinal','Eshenesra','Zylcan','Delsanra','Faera','Leena','Nerimyar','Tanulia','Umesys','Immianthe','Elwenys','Jeardra','Beilamin','Zaleria','Raloynore',
'Yrathea','Magcyne','Ariawyn','Umegeiros','Illithor','Uriphine','Jhaan','Ralojeon','Arathorn','Neribella','Ailre','Lurieth','Afamrail','Oridi','Vulen','Zinhana','Malon','Origeiros','Rilitar',
'Sarjyre','Elkhazel','Ellana','Airdan','Qivalur', 'Oziro', 'Rhugen', 'Bezral', 'Vemron', 'Milvyr', 'Marketh', 'Marfurion', 'Nokzek', 'Ghirahn'];

var artifactDesc = ['Hungering','Sealing','Liberty','Shade','Flames','Mystery','TrueSight','Revitilization','Gluttony','Anarchy','Tenacity','Animated Ice','Echoes','Foresight','Silence',
'Light','Darkness','Destruction','Venom','Mending','Dominion','Prosperity','Ruination','Spiritualism','Decay','Desire','Hollowing','Temptation','Protection','Lunacy','Death','Life',
'Grace','Vice','Peace','Sanctity','Oblivion','Fortune','Black Magic','Apathy','Mania','Fate','Auroras','Skulls','Paradise','Depravity','Storms','Truth','Divinity','Gold','Serendipity',
'Chaos','Strength','Luck','The Occult','Passion','Anguish','Eternity'];

var eyeColors = ['light blue', 'blue', 'dark blue', 'gray', 'stormy blue', 'blue-gray', 'green', 'hazel', 'amber', 'light brown', 'brown', 'dark brown', 'chestnut',
'brown','brown','brown','brown','brown','light-brown','light-brown'];

var hairColors = ['brown', 'black', 'grey', 'light brown', 'dark brown', 'blonde', 'brown', 'black', 'jet black', 'black', 'black', 'black', 'dark brown', 'dark brown'];

var armorUpper = ['studded leather', 'iron curiass', 'full iron plate', 'iron chainmail', 'bronze curiass', 'full bronze plate', 'bronze chainmail', 'iron armor with fur lining the edges',
'iron breastplate', 'iron armor', 'dirty chainmail', 'the shredded remnants of chainmail', 'dirty gambeson', 'worn leather gear', 'steel plate with tall gorget',
'iron armor with tall pauldrons', 'metal hauberk', 'durable steel breastplate', 'sturdy iron breastplate', 'laminar armor', 'scale armor', 'brigandine'];

var headgear = ['hood', 'half helm', 'barbute helmet', 'full helm with horns', 'Lamellar helmet', 'turban', 'wool cap', 'huge floppy hat', 'templar helmet', 'face wrappings', 'eyepatch', 'Bandana',
'crusader great helm', 'knights helmet', 'centurion helmet', 'kettle helmet', 'basinet with grill visor', 'corinthian style barbuta', 'visored sallet helm', 'houndskull helmet', 'klappvisier bascinet helmet',
'leather studded helmet', 'rugged leather cowboy hat', 'cap with feather'];

var merchHats = ['hood', 'turban', 'wool cap', 'coif', 'fur hat', 'wool scarf'];

var miscClothing = ['gloves', 'fingerless gloves', 'sturdy boots', 'reliable boots', 'wooden clogs', 'sandals', 'leather belt', 'skirt', 'huge magicians hat', 'monocle', 'bandana', 'eyepatch', 'ginormous clown shoes',
'medal for heroism', 'steel gauntlets', 'iron gauntlets', 'leather backpack', 'top hat', 'wizard staff', 'shroud', 'tinted sunglasses', 'aviators', 'sheathe', 'golden necklace', 'silver necklace',
'ruby necklace', 'emerald neckalce', 'saphhire necklace'];

var upperClothes = ['shirt', 'vest', 'tunic', 'doublet', 'jerkin', 'wool coat', 'unbuttoned shirt', 'dirty shirt', 'ripped tunic', 'dirty tunic', 'worn coat', 'worn jerkin', 'ripped cloak'];

var niceUpper = ['shirt', 'vest', 'fine tunic', 'doublet', 'buttoned shirt', 'fine shirt', 'buttoned vest', 'fine vest', 'high collared jacket', 'extravagant coat', 'exquisitely made coat'];

var niceLower = ['breeches', 'hose', 'pants', 'fine pants', 'well made pants', 'sturdy pants', 'padded pants', 'durable pants'];

var lowerClothes = ['breeches', 'hose', 'pants', 'shorts', 'dirty pants', 'worn pants', 'worn shorts', 'frayed pants', 'ripped pants', 'faded pants'];

var capes = ['cape', 'long flowing cape', 'majestic cape', 'shoulder cape', 'capelet', 'poncho cape', 'fur-lined cape', 'cape embellished with intricate designs', 'rugged cape', 'tattered cape', 'shredded cape', 'ripped cape'];

var colors = ['pink', 'crimson', 'red', 'maroon', 'brown', 'rose', 'salmon', 'orange-red', 'orange','gold', 'ivory', 'yellow', 'olive', 'lime-green', 'green', 'dark green', 'aquamarine',
'turquoise', 'azure', 'cyan', 'teal', 'lavender', 'blue', 'navy', 'violet', 'indigo', 'plum', 'magenta', 'purple','white', 'silver'];

var mutedColors = ['tan', 'brown', 'grey', 'dark-grey', 'light-grey', 'light-brown','dark-brown', 'beige'];

var emotions = ['sad', 'disgusted', 'surprised', 'angry', 'happy', 'scared', 'indifferent'];

var swords = ['longsword', 'flyssa', 'sabre', 'scimitar', 'katana', 'golok', 'falx', 'gladius', 'falchion', 'claymore', 'rapier', 'zweihander', 'longsword', 'longsword', 'longsword', 'longsword', 'spear', 'spear', 
'halberd', 'crescent sword', 'two-handed axe', 'axe', 'polearm', 'greatsword', 'longsword'];

var monsterMinor = ['Goblin', 'Kobold', 'Giant Spider','Starving Bear'];

var monsterMiddle = ['Animated Skeleton', 'Minotaur', 'Orc', 'Great Wolf'];

var monsterSuperior = ['Reaper', 'Griffon', 'Titan', 'Vampire'];

var monsterLegend = ['Dragon', 'Hydra', 'Chimera', 'Demon King']; //Ultra Serpent

var creature = ['Guardian Owl', 'Lost Spirit', 'Curious Faerie', 'Noble Wyvern', 'Wise Stag', 'Pesky Gnome'];

var legCreature = ['Giant Turtle', 'Wild Pheonix', 'Great Fox', 'Wild Pegasus', 'Sprit Wolf', 'Lightning Hawk']

var monsterTitles = ['The Undying', 'The Deathbringer', 'The Horrible', 'The Agent of Doom', 'The Widowmaker', 'Evil Incarnate', 'The Manslayer', 'The Arcane Slayer', 'The Blood Seeker', 'The Doombringer', 'Wrath Incarnate', 'The Lord of Suffering',
'The Flayer', 'The Consumer of Heroes', 'The Forgotten One', 'The Soul Reaper', 'The Apostle of Death', 'The Husk of Nightmares', 'The Hollow Beast', 'The Lord of Hatred', 'Vengeance Incarnate', 'The Corrupted', 'The Lord of Flies', 'The Foul King',
'The Sage of Suffering', 'The Dark One',  'The Furious', 'The Enraged', 'The Bloodthirster', 'The Heart Eater', 'The Lord of Graves', 'The Shadow Hunter', 'The Spirit Snatcher', 'The Harbringer of Decay', 'The Insidious'];

var maims = ['missing left arm', 'missing right arm', 'missing left hand', 'missing right hand', 'missing left ear', 'missing right ear', 'missing left eye', 'missing right eye', 'missing nose', 'missing left foot',
'missing right foot', 'missing left fingers'];

var scars = ['scar across the left eye', 'scar across the right eye', 'scar across the nose', 'scar across the face', 'scar across the chest', 'scar across the left shoulder', 'scar across the right shoulder',
'scar across the waist', 'scar across the back', 'scar across the left leg', 'scar across the right leg', 'scar across the chin', 'scar across the mouth', 'scar across the left eyebrow', 'scar across the right eyebrow',
'scar across the forehead', 'scar across the neck', 'scar across the collarbone'];
// list of actions i've used so far:
// rest between trips
// live peacefully
// help character.name (for bodyguards or people in your party)
// wait for mercenary work
// travel to town.name or Dungeon.name
// rob weak passerby
// prowl for prey (monsters use this)
// find information about character.name
// hunt down character.name
// kill character.name