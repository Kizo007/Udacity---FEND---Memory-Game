

const deck = document.querySelector(".deck");
let showedCards = [];
let counterOfMoves = document.getElementsByClassName("moves")[0].innerHTML;
let numOfMatchedPairs = 0;
const seconds = document.querySelector(".second");
const minutes = document.querySelector(".minute");
let second = 0;
let minute = 0;
let firstClick = true;
const numStars = document.querySelectorAll(".stars li");
const restartBtn = document.querySelector(".restart");
const popupWindow = document.querySelector(".popup-content");
const finalMoves = document.querySelector(".movesToShow");
const finalStars = document.querySelector(".num-stars");
const finalMinutes = document.querySelector(".minutesToShow");
const finalSeconds = document.querySelector(".secondsToShow");
let counterOfStars = 3;


shuffleDeck();

//Shuffle cards and adding them to deck
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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


//Handle restart button click
restartBtn.addEventListener("click", restartBtnClicked);

function restartBtnClicked() {
    restartGame();
}

//Reload whole game
function restartGame() {
    location.reload();
}


deck.addEventListener("click", cardClicked);

//Handle card click
function cardClicked() {

    const clickTarget = event.target;

    if (firstClick && clickTarget.classList.contains("card")) {
        startClock();
        firstClick = false;
    }
    
    
    if (isClickValid(clickTarget)) {
        showCard(clickTarget);
        addCardToArray(clickTarget);
    }
}

function isClickValid(clickTarget) {
    return (clickTarget.classList.contains("card") && showedCards.length < 2 
    && !clickTarget.classList.contains("match") && !showedCards.includes(clickTarget));
}

//Start timer
function startClock() {
    startTimer = setInterval(function() {
        secMin();
    }, 1000);
}

//Display seconds and minutes in browser
function secMin() {
    if (second < 59) {
        second++;
        seconds.textContent = second.toLocaleString(undefined, {minimumIntegerDigits: 2});
    } else {
        second = 0;
        minute++;
        seconds.textContent = second.toLocaleString(undefined, {minimumIntegerDigits: 2});
        minutes.textContent = minute.toLocaleString(undefined, {minimumIntegerDigits: 2});
    }
}

//Show card after click
function showCard(clickTarget) {
    clickTarget.classList.toggle("open");
    clickTarget.classList.toggle("show");
}

//Add card to array after click
function addCardToArray(clickTarget) {
    showedCards.push(clickTarget);
    if (showedCards.length === 2) {
        if (numOfMatchedPairs != 8) {
            counterOfMoves++;
            document.getElementsByClassName("moves")[0].innerHTML = " " + counterOfMoves;
            numOfStars();
            compareCards(showedCards);
        }
    }
}


//Remove number of stars
function numOfStars() { 
    if (counterOfMoves <= 12) {
        
    } else if (counterOfMoves == 13){
        counterOfStars = 2;
        numStars[0].parentNode.removeChild(numStars[0]);
    } else if (counterOfMoves == 20){
        counterOfStars = 1;
        numStars[1].parentNode.removeChild(numStars[1]);
    }

}

//Compare cards
function compareCards(showedCards) {
    if (showedCards[0].firstElementChild.className === showedCards[1].firstElementChild.className) {
        numOfMatchedPairs++;
        showedCards[0].classList.toggle("match");
        showedCards[1].classList.toggle("match");
        checkEndOfGame();
        showedCards.length = 0;

    } else {
        setTimeout(function() {
        showCard(showedCards[0]);
        showCard(showedCards[1]);
        showedCards.length = 0;
        }, 500);
    }
}

//Check end of game
function checkEndOfGame() {
    if (numOfMatchedPairs == 8) {
        stopTimer();
        showResult();
    }
}

//Stop timer
function stopTimer() {
    clearInterval(startTimer);
}

//Final results
function showResult() {
    popupWindow.classList.toggle("hide");
    finalMoves.textContent = counterOfMoves.toLocaleString(undefined, {minimumIntegerDigits: 1});
    finalStars.textContent = counterOfStars.toLocaleString(undefined, {minimumIntegerDigits: 1});
    finalMinutes.textContent = minute.toLocaleString(undefined, {minimumIntegerDigits: 2});
    finalSeconds.textContent = second.toLocaleString(undefined, {minimumIntegerDigits: 2});
}


//Handle click on play again button in popup window
document.querySelector(".play-again").addEventListener("click", playAgain);

function playAgain() {
    popupWindow.classList.toggle("hide");
    restartGame();
}


