var wins=0;

function movieNightHangman() {
	// var movies = ["The Wizard of Oz","Citizen Kane","The Third Man","Mad Max: Fury Road","Inside Out","The Godfather","Singing in the Rain","Gravity","King Kong","The Adventures of Robin Hood","Spotlight","Taxi Driver","Selma","Toy Story","Zootopia","Up","Alien","Hell or High Water","The Night of the Hunter","Rebecca","Frankenstein","The Conformist","Vertigo","Finding Nemo","Touch of Evil","The Force Awakens","Annie Hall","The Wrestler","Manchester by the Sea","The Dark Knight","The Hurt Locker","La La Land","Arrival","Gone With the Wind","Pinocchio","Brooklyn","Logan","Man on Wire","Toy Story","The Jungle Book","Jaws","The Wrath of Khan", "The Undiscovered Country", "A New Hope", "Shawshank Redemption","The Last Jedi","Master and Commander: The Far Side of the World"];

	var movies = ["The Wizard of Oz","Citizen Kane","The Third Man","Mad Max: Fury Road","Inside Out","The Godfather","Singing in the Rain","The Empire Strikes Back", "Return of the Jedi","The Force Awakens","Skyfall","The Search for Spock","The Voyage Home","The Final Frontier","Harry Potter and the Deathly Hallows","Harry Potter and the Philosopher's Stone","The Last Jedi"];
	var lowerMovies = [];

	var soundtrack = ["WizardofOz-SomewhereOverTheRainbow.mp3","Overture_CitizenKane.mp3","TheThirdMan.mp3","Survive_MadMax.mp3","InsideOutBundleofJoy.mp3","TheGodfatherOriginalThemeSong.mp3","SingingInTheRain.mp3","SWThemeIntro.mp3","TheBattleofEndorIReturnoftheJedi.mp3","TheForceAwakensScherzoforXWings.mp3","Adele_Skyfall.mp3","StarTrek.mp3","StarTrek.mp3","StarTrek.mp3","HarryPotter.mp3","HarryPotter.mp3","SWThemeIntro.mp3"]

	game = {
		guessedWord	: movies[Math.floor(Math.random()*movies.length)].toLowerCase(),
		wordUI: [],
		guessedltr: [],
		rightltr: [],
		lives: 12,
		gamewin: false
	};

	for (var i=0; i<movies.length; i++) {
  		lowerMovies[i]=movies[i].toLowerCase();
	}

	playtrack = soundtrack[lowerMovies.indexOf(game.guessedWord)];
	winAudio = new Audio('assets/audio/'+playtrack);

	console.log(winAudio);
	console.log(game.guessedWord);

	showLives = document.getElementById('lives');
	showWord = document.getElementById('wordDisplay');
	showGuessed = document.getElementById('ltrGuessed');
	showStatus = document.getElementById('gameStatus');
	showLetterCheck = document.getElementById('letterStatus');
	newGame = document.getElementById('newGame');
	numOfWins = document.getElementById('numOfWins');

 	alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

 	// render movie UI, replace letters to guess with '_'
 	for (var i=0; i<game.guessedWord.length; i++) {
 		if (alphabet.indexOf(game.guessedWord[i]) == -1){
 			game.wordUI.push(game.guessedWord[i]);
 		} else {
 			game.wordUI.push("_");
 		}
 	}

 	// hide new game button
 	newGame.className = "hidden";

 	if(wins==0){
 		numOfWins.className = "hidden";
 	}

 	showWord.innerHTML = game.wordUI.join("");

 	// game play
 	document.onkeyup = function(event) {
 		var guess = String.fromCharCode(event.keyCode).toLowerCase();

 	if((game.lives > 0)&& (game.gamewin==false)){	
 		if(game.guessedltr.indexOf(guess) != -1){
 			showStatus.innerHTML = "<span class='text-warning'> Come on! You have already guess letter " + guess + ". Try again. </span>";
 		} else {
 			showStatus.innerHTML = "";
 			game.guessedltr.push(guess);
 			showGuessed.innerHTML = game.guessedltr.join("&middot; ");

 			if (game.guessedWord.indexOf(guess) == -1){
 				game.lives--;
 				showLives.innerHTML = game.lives;
 				showLetterCheck.innerHTML = "<span class='text-danger'> There is no " + guess +". </span>";
 				
 				// Disable letter status when game over	
	 			if (game.lives <= 0){
	 				showStatus.innerHTML = "<span class='text-danger'> Boo Hoo! Game over! Better luck next time! </span>";
	 				showLives.innerHTML = 0;
	 				showLetterCheck.innerHTML = "";
	 				showWord.innerHTML = game.guessedWord;
	 				newGame.className = "text-center";
	 				console.log("Game Over");
	 			}
	 		} else {
	 			showLives.innerHTML = game.lives;
	 			showLetterCheck.innerHTML = "<span class='text-success'> " + guess + " is a right letter! </span>";
	 			game.rightltr.push(guess);

	 			for(var i=0; i<game.guessedWord.length;i++) {
	 				if(game.guessedWord[i] === guess ) {
	 					game.wordUI[i] = guess;
	 				}
	 			}

				showWord.innerHTML = game.wordUI.join("");

				if(game.wordUI.indexOf("_") == -1) {
					showStatus.className = "btn btn-success btn-sm btnwin";
					showStatus.innerHTML = "You win! You sure know your movie! Couch potato!";
					wins++;
					showWord.innerHTML = game.guessedWord;
					newGame.className = "text-center";
					numOfWins.className = "text-center";
					numOfWins.innerHTML = "<span class='text-success'> NUMBER OF WINS: " +wins + "</span>";
					game.gamewin = true;
					winAudio.play();
					console.log(wins);
				} 				

	 		}

 		}
 		
	 }	
 	} // End of if(game.lives > 0)

// Reset 
document.getElementById('newGame').onclick = function() {
	console.log('clicked');
	game = {
		guessedWord	: movies[Math.floor(Math.random()*movies.length)].toLowerCase(),
		wordUI: [],
		guessedltr: [],
		rightltr: [],
		lives: 12
	};	

	showStatus.innerHTML = "";
	showLetterCheck.innerHTML  = "";
	showGuessed.innerHTML = "";
	showLives.innerHTML = game.lives;
	showStatus.className = "";
	winAudio.pause();

	movieNightHangman();	
}


}

movieNightHangman();

