function CharacterCard(name, cuteness, strength, clumsiness, stank, image) {
  this.name = name;
  this.cuteness = cuteness;
  this.strength = strength;
  this.clumsiness = clumsiness;
  this.stank = stank;
  this.image = image;
}
// Card Variables
var card1 = new CharacterCard("Bernie", 100, 20, 50, 100, "images/catimg1.jpeg");
var card2 = new CharacterCard("Biscuits", 100, 80, 90, 0, "images/catimg2.jpeg");
var card3 = new CharacterCard("Suki", 60, 40, 70, 50, "images/catimg3.jpeg");
var card4 = new CharacterCard("Nacho", 60, 10, 90, 20, "images/catimg4.jpeg");
var card5 = new CharacterCard("Momo", 85, 90, 40, 90, "images/catimg5.jpeg");
var card6 = new CharacterCard("Sal", 99, 20, 60, 30, "images/catimg6.jpeg");
var card7 = new CharacterCard("Pibbles", 80, 75, 30, 70, "images/catimg7.jpeg");
var card8 = new CharacterCard("Ginger", 95, 45, 65, 25, "images/catimg8.jpeg");
var card9 = new CharacterCard("Alan", 85, 70, 80, 70, "images/catimg8.jpeg");
var card10 = new CharacterCard("Cookie", 60, 85, 20, 40, "images/catimg8.jpeg");
var card11 = new CharacterCard("Angel", 90, 20, 60, 20, "images/catimg8.jpeg");
var card12 = new CharacterCard("Pepe", 55, 100, 80, 75, "images/catimg8.jpeg");
var cardArray = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
];

// Player Variables
var player1Deck = [];
var player2Deck = [];
var alreadyAssigned = [];
var winnerDeck = [];
var result = "";
var p2Stats = document.querySelectorAll(".p2-hide");

// Returns random num 0-11
function randomNum() {
        return Math.floor(Math.random() * cardArray.length);
      }


// Displays the values from Player 2 Card
  function showPlayer1Card() {
    document.querySelector("#p1-img").src = player1Deck[0].image;
    console.log(document.querySelector("#p1-img").src);
    document.querySelector(".card-name-value").innerHTML = player1Deck[0].name;
    document.querySelector(".card-cuteness-value").innerHTML =
      player1Deck[0].cuteness;
    document.querySelector(".card-strength-value").innerHTML =
      player1Deck[0].strength;
    document.querySelector(".card-clumsiness-value").innerHTML =
      player1Deck[0].clumsiness;
    document.querySelector(".card-stank-value").innerHTML =
      player1Deck[0].stank;
  }
function showPlayer2Card() {
  document.querySelector("#p2-img").src = player2Deck[0].image;
  document.querySelector(".player2-name-value").innerHTML = player2Deck[0].name;
  document.querySelector(".player2-cuteness-value").innerHTML =
    player2Deck[0].cuteness;
  document.querySelector(".player2-strength-value").innerHTML =
    player2Deck[0].strength;
  document.querySelector(".player2-clumsiness-value").innerHTML =
    player2Deck[0].clumsiness;
  document.querySelector(".player2-stank-value").innerHTML =
    player2Deck[0].stank;

  
  for (i=0; i<p2Stats.length;i++) {
    p2Stats[i].style.visibility = "visible";
  }
}

// Randomly splits cardArray between 2 players' decks, and reveals player1 card.
function cardCounter() {
  document.querySelector(".p1-info").innerHTML = "Player 1 - Cards: " + player1Deck.length;
  document.querySelector(".p2-info").innerHTML = "Player 2 - Cards: " + player2Deck.length;
}

function newGame() {
  function deal() {


      for (i = 0; i < cardArray.length; i++) {
        let card = cardArray[randomNum()];
        while(player1Deck.includes(card) || player2Deck.includes(card)) {
          card = cardArray[randomNum()];
        }
        i<cardArray.length/2 ? player1Deck.push(card) : player2Deck.push(card);
        }
    }
    console.log(player1Deck);
    console.log(player2Deck);

  deal();
  showPlayer1Card();
  cardCounter();
}
document.querySelector(".deal-btn").addEventListener("click", newGame);



// Uses input from radio buttons to compare selected value and output winner.
function showDown() {
  var choice = "";
  var player1Card = player1Deck[0];
  var player2Card = player2Deck[0];

  var player1Score = "";
  var player2Score = "";

  function getScores() {
    if (document.getElementById("cuteness").checked) {
      choice = "Cuteness";
      player1Score = player1Card.cuteness;
      player2Score = player2Card.cuteness;
      return choice + player1Score + player2Score;
    } else if (document.getElementById("strength").checked) {
      choice = "Strength";
      player1Score = player1Card.strength;
      player2Score = player2Card.strength;
      return choice + player1Score + player2Score;
    } else if (document.getElementById("clumsiness").checked) {
      choice = "Clumsiness";
      player1Score = player1Card.clumsiness;
      player2Score = player2Card.clumsiness;
      return choice + player1Score + player2Score;
    } else if (document.getElementById("stank").checked) {
      choice = "Stank";
      player1Score = player1Card.stank;
      player2Score = player2Card.stank;
      return choice + player1Score + player2Score;
    }
  }

  function whoWins() {
    if (player1Score > player2Score) {
      result = "Player 1 Wins!";
    } else if (player1Score < player2Score) {
      result = "Player 2 Wins!";
    } else {
      result =  "It's a draw!";
    }
    return result;
  }
  getScores();
  whoWins();
  showPlayer2Card();
  document.getElementById("results-text").innerHTML = result;
  document.getElementById("scores-text").innerHTML =
    "Player 1: " +
    choice +
    ": " +
    player1Score +
    ". Player 2: " +
    choice +
    ": " +
    player2Score +
    ". ";
  document.querySelector(".results").style.visibility = "visible";
}

// Removes card from loser's deck and pushes onto winners.
function moveCards() {
  if (result === "Player 1 Wins!") {
    player1Deck.push(player2Deck.shift());
    player1Deck.push(player1Deck.shift());
  } else if (result === "Player 2 Wins!") {
    player2Deck.push(player1Deck.shift());
    player2Deck.push(player2Deck.shift());
  } else if (result === "It's a draw!") {
    player1Deck.push(player1Deck.shift());
    player2Deck.push(player2Deck.shift());
  }
  cardCounter();
  showPlayer1Card();
  console.log(player1Deck + player2Deck);
  document.querySelector(".results").style.visibility = "hidden";
  for (i=0; i<p2Stats.length;i++) {
    p2Stats[i].style.visibility = "hidden";
  }
  if (player1Deck.length === 0) {
    alert("Game Over! You lost all your cards! Player 2 wins the game!");
  } else if (player2Deck.length === 0) {
    alert("Congratulations! Player 2 has run out of cards! You are the champion!");
  }
}

document.getElementById("skill-submit").addEventListener("click", showDown);
document.querySelector(".next-btn").addEventListener("click", moveCards);
