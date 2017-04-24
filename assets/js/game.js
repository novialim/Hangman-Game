var wins=0;

function movieNightHangman() {
	var movies = ["The Wizard of Oz","Citizen Kane","The Third Man","Mad Max: Fury Road","All About Eve","Inside Out","The Godfather","Singing in the Rain","Casablanca","Boyhood","Snow White and the Seven Dwarfs","Moonlight","La Grande illusion","Gravity","The Maltese Falcon","Sunset Boulevard","King Kong","The Adventures of Robin Hood","Spotlight","Taxi Driver","Selma","Toy Story","Zootopia","Up","Alien","Hell or High Water","The Night of the Hunter","Rebecca","Frankenstein","The Conformist","Vertigo","Finding Nemo","Touch of Evil","The Force Awakens","Annie Hall","The Wrestler","Manchester by the Sea","The Dark Knight","The Hurt Locker","La La Land","Arrival","Skyfall","Gone With the Wind","Pinocchio","Brooklyn","Star Trek","Logan","Harry Potter and the Deathly Hallows","Man on Wire","Toy Story","The Jungle Book","Jaws","The Wrath of Khan", "The Undiscovered Country", "The Search of Spock", "A New Hope","The Empire Strikes Back", "Return of the Jedi", "Shawshank Redemption","The Force Awakens","The Last Jedi","Master and Commander: The Far Side of the World"];

	game = {
		guessedWord	: movies[Math.floor(Math.random()*movies.length)].toLowerCase(),
		wordUI: [],
		guessedltr: [],
		rightltr: [],
		lives: 12,
		gamewin: false
	};

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

	movieNightHangman();	
}


}

movieNightHangman();
