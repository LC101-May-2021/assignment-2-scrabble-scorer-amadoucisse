// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function initialPrompt() {
   console.log("Let's play some scrabble!" + "\n");
   word = input.question("Enter a word to score: ");
};

let simpleScore = function(word1) {
  word1 = word1.toLowerCase();
  let letterPoints = word1.length;
  return letterPoints;
}


let vowelBonusScore = function(word) {
  let word2 = word.toLowerCase();
  let vowels = 0;
  let consonants = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "a" || word[i] === "e" ||word[i] === "i" ||word[i] === "o" ||word[i] === "u") {
      vowels += 3;
    } else {
      consonants += 1;
    }
  }
  let totalPoints = vowels + consonants;
  return totalPoints;
};

let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let total = 0;
  for (let i = 0; i < word.length; i++) {
    total += newPointStructure[word[i]];
  }
  return total;
}

const scoringAlgorithms = [{
  name:"Simple Score",
  description:"Each letter is worth 1 point.",
  scoringFunction: simpleScore
},

{
  name:"Bonus Vowels",
  description:"Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
},

{
  name:"Scrabble",
  description:"The traditional scoring algorithm.",
  scoringFunction: scrabbleScore	
} ];

function scorerPrompt() {
//   let response=input.question(`Which scoring algorithm would you like to use?
// 0 - Simple: One point per character
// 1 - Vowel Bonus: Vowels are worth 3 points
// 2 - Scrabble: Uses scrabble point system
// Enter 0, 1, or 2: `);

  let userInput = input.question('Which scoring algorithm would you like to use?\n\n0 - Simple Score: Each letter is worth 1 point.\n1 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt. \n2 - Scrabble: The traditional scoring algorithm.\n\nEnter 0, 1, or 2: ');
  if (userInput == 0) {
    console.log(`Score for '${word}' is `+ scoringAlgorithms[0].scoringFunction(word));
  }
  if (userInput == 1) {
    console.log(`Score for '${word}' is `+ scoringAlgorithms[1].scoringFunction(word));
  }
  if (userInput == 2) {
    console.log(`Score for '${word}' is `+ scoringAlgorithms[2].scoringFunction(word));
  }
}

function transform(oldPointStructure) {
  let newObj = {};
  for (const[key,value] of Object.entries(oldPointStructure)) {
    for (const newValue of value) {
      newObj[newValue.toLowerCase()] = Number(key);
    }
  }
  return newObj;
}
console.log(transform(oldPointStructure));

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

