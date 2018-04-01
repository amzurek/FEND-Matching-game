/*ADD: display the cards on the page, hold list*/
var card = document.getElementsByClassName('card');
var cards = [...card];
var counter = document.querySelector('.moves');
var deck = document.getElementById('deckCards');
var moves = 0;
var matchedCard = document.getElementsByClassName('match');
var modal = document.getElementById('showSlide');
var openedCards = [];
var stars = document.querySelectorAll('.fa-star');

/*ADD: shuffle cards*/
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

/*ADD: shuffles cards when page is refresh*/
document.body.onload = startGame();

/*ADD: start a new game, reset moves, rating, time*/
function startGame() {
    cards = shuffle(cards);
    for ( var i = 0; i < cards.length; i++ ) {
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
    moves = 0;
    counter.innerHTML = moves;
    for (var i= 0; i < stars.length; i++) {
        stars[i].style.visibility = 'visible';
    }
    second = 0;
    minute = 0;
    var timer = document.querySelector('.timer');
    timer.innerHTML = '0 min 0 sec';
    clearInterval(interval);
}

/*ADD: timer*/
var second = 0, minute = 0;
var timer = document.querySelector('.timer');
var interval;
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute+'min '+second+'sec';
        second++;
        if(second === 60) {
            minute++;
            second=0;
        }
    },1000);
}

/*ADD: show class to display cards*/
var displayCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};

/*ADD: opened cards list, check cards are match or not*/
function cardOpen() {
    openedCards.push(this);
    var long = openedCards.length;
    if(long === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

/*ADD: matched cards*/
function matched() {
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open', 'no-event');
    openedCards[1].classList.remove('show', 'open', 'no-event');
    openedCards = [];
}

/*ADD: cards didn't match*/
function unmatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
        setTimeout(function() {
            openedCards[0].classList.remove('show', 'open', 'no-event','unmatched');
            openedCards[1].classList.remove('show', 'open', 'no-event','unmatched');
            enable();
            openedCards = [];
    },1000);
}

/*ADD: disable cards*/
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

/*ADD: enable cards and disable matched cards*/
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add('disabled');
        }
    });
}

/*ADD: count moves, start timer after first click*/
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    if(moves === 1) {
        second = 0;
        minute = 0;
        startTimer();
    }
    if (moves > 10 && moves < 14) {
        for( i= 0; i < 3; i++) {
            if(i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if (moves > 15) {
        for(i= 0; i < 3; i++) {
            if(i > 0){
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}

/*ADD: congratulations popup*/
function congratulations() {
    if (matchedCard.length === 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add('show');

        var starRating = document.querySelector('.stars').innerHTML;
        document.getElementById('finalMove').innerHTML = moves;
        document.getElementById('starRating').innerHTML = starRating;
        document.getElementById('totalTime').innerHTML = finalTime;
    }
}

/*ADD: event listeners to cards*/
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
}

/*ADD: play again function*/
function playAgain() {
    modal.classList.remove("show");
    startGame();
}


