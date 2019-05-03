/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
cardsList = ['fa fa-diamond',
'fa fa-paper-plane-o',
'fa fa-anchor',
'fa fa-bolt',
'fa fa-cube',
'fa fa-anchor',
'fa fa-leaf',
'fa fa-bicycle',
'fa fa-diamond',
'fa fa-bomb',
'fa fa-leaf',
'fa fa-bomb',
'fa fa-bolt',
'fa fa-bicycle',
'fa fa-paper-plane-o',
'fa fa-cube'];

var shuffledCards = [];
var openedCard = null;
var numberOfOpenCards = 0;
var matchingPairs = 0;
var moves = 0;
var firstCardOpened = false;
var time = 0;
var timer;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createButtons () {

	shuffledCards = shuffle(cardsList);

	var ul = document.querySelector('.deck');
	var fragment = document.createDocumentFragment();

	for (var x=0; x<shuffledCards.length; x++){
		
		var li = document.createElement("LI");
		li.setAttribute("class", "card");

		var i = document.createElement("I");
		i.setAttribute("class", shuffledCards[x]);

		li.appendChild(i);
		fragment.appendChild(li);
	}

	ul.appendChild(fragment);
}

function createMovesSpan () {

	var span = document.querySelector('.moves');
	span.innerHTML = moves;
}

function openCard (c) {
	c.setAttribute("class", "card open show");
}

function closeCard (c) {
	c.setAttribute("class", "card");

}

function displayCard (card) {
	if (card.getAttribute("class") == "card") {
		openCard(card);
	}
}

function setOpenedCardsStyle (card1, card2) {
	card1.setAttribute("class", "card match show");
	card2.setAttribute("class", "card match show");

}

function setOpenedCard(card) {
	openedCard = card;
}

function checkCards(card1, card2) {

	openCard(card2);

	setTimeout(function() {

		numberOfOpenCards = 0;

		if (card1.childNodes[0].getAttribute("class") == card2.childNodes[0].getAttribute("class")) {
			console.log("match");
			setOpenedCardsStyle (card1, card2);
			matchingPairs++;
		} else {
			console.log("do not");
			closeCard(card1);
			closeCard(card2);
		}
	openedCard = null;

	if (matchingPairs ==8) {
		console.log("congrats");
		var end =  document.querySelector('.ending');
		end.style.visibility = 'visible';
		clearInterval(timer);
	}

	}, 1000);
	
}

function removeStars (m) {

	if (m > 11) {
		var li = document.querySelector('.stars').childNodes[5];
		li.setAttribute('style', 'visibility: hidden');
	} 
	if (m > 16) {
		var li = document.querySelector('.stars').childNodes[3];
		li.setAttribute('style', 'visibility: hidden');
	} 
	if (m > 19) {
		var li = document.querySelector('.stars').childNodes[1];
		li.setAttribute('style', 'visibility: hidden');
	}
}

function minSecs (t) {
	var min = Math.floor(t / 60);
	var sec = time - min * 60;

	if (sec<10) {
		sec = "0" +  sec;
	}

	return min + " : " + sec;
}

function set () {
	time++;
	//var span = document.querySelector('.timer');
	var spans = document.querySelectorAll(".timer");

	for (var i=0; i<spans.length; i++){
	spans[i].innerHTML = minSecs(time);
}

	if (time == 180) {
		clearInterval(timer);

	}
}

function setTimer () {
	if (firstCardOpened == false) {
		timer = setInterval(set, 1000);
	}
	firstCardOpened = true;

}

function incrementMoves () {
	moves++;

	

	//var span = document.querySelector('.moves');
	var spans = document.getElementsByClassName("moves");
	for (var i=0; i<spans.length; i++){
	spans[i].innerHTML = moves;
}
}

function initializeGame () {

	const cardDeck = document.querySelector('.deck');

	cardDeck.addEventListener("click", function() {

		if (numberOfOpenCards<2) { 

			if (event.target.nodeName == "LI" && openedCard == null && event.target.getAttribute("class") !== "card open show" && event.target.getAttribute("class") !== "card match show") {
				console.log(event.target.childNodes[0].getAttribute("class"));
				setTimer();
				displayCard(event.target);
				setOpenedCard(event.target);
				numberOfOpenCards++;
			} else if (event.target.nodeName == "LI" && openedCard != null && event.target.getAttribute("class") !== "card open show" && event.target.getAttribute("class") !== "card match show") {
				console.log(event.target.childNodes[0].getAttribute("class"));
				checkCards(openedCard,event.target);
				incrementMoves();
				removeStars(moves);
				numberOfOpenCards++;
			}
		}
	});
}

function game() {

	createButtons();
	createMovesSpan();
	initializeGame();

}

function resetCards () {

	var ul = document.querySelector('.deck');

	for (var i=1; i<ul.childNodes.length; i++) {

		//console.log(ul.childNodes[i]);
		ul.childNodes[i].setAttribute("class", "card");
	}

}

function resetGame () {
	
	clearInterval(timer);
	shuffledCards = [];
	openedCard = null;
	numberOfOpenCards = 0;
	matchingPairs = 0;
	moves = 0;
	firstCardOpened = false;
	time = 0;
	timer = 0;
	resetCards();

}


document.addEventListener("DOMContentLoaded", game);

var reset = document.querySelector('.restart');
reset.addEventListener("click",resetGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
