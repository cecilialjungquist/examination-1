let approvedWordList = approvedWords(words);
let wordToGuess = '';

let playerOne = {
    id: 1,
    points: 0,
    round: 0,
    isActive: true
}

let playerTwo = {
    id: 2,
    points: 0,
    round: 0,
    isActive: false
}

let correctGuesses = 0;
let guesses = [];
let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
let turns = 1;

let ulEl = document.querySelector('.word');
let restartBtnList = document.querySelectorAll('.restart-btn');
let startBtn = document.getElementById('start-btn');
let resetBtn = document.getElementById('reset-btn');

/* -.-.-.-.- FUNCTIONS -.-.-.-.- */

// Funktion som startar spelet
function startGame() {
    // Tar bort antal-spelare-vyn och lägger till "press key" text
    document.querySelector('form').classList.remove('show');
    document.querySelector('footer p').classList.add('show');
    resetBtn.classList.add('show');

    wordToGuess = generateWord();

    // Kollar om en eller två spelare
    playerTwo.isActive = document.getElementById('two-players').checked;

    playerOne.round++;
    getPlayerInfo(playerOne);
};

// Funktion som skriver ut info för spelare
function getPlayerInfo(player) {
    document.getElementById('player-info').innerHTML = `Round ${player.round} - Player ${player.id}`;
    document.getElementById('total-points').innerHTML = `Player ${player.id} has ${player.points} points`;
};

// Funktion som genererar nytt ord och nollställer
function generateWord() {
    let index = getRandomIndex();
    let word = approvedWordList[index];
    approvedWordList.splice(index,1);
    correctGuesses = 0;
    guesses = [];
    bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];

    // Rensar UI
    document.querySelector('figure').className = '';
    document.querySelector('.nomatch').innerHTML = '';
    ulEl.innerHTML = '';

    // Loopa och rendera ut box för varje bokstav i ordet
    for (let i = 0; i < word.length; i++) {
        let liEl = document.createElement('li');
        ulEl.appendChild(liEl);
    }

    return word;
};


// Funktion som tar bort oanvändbara ord ur listan
function approvedWords(wordList) {
    for (let i = 0; i < wordList.length; i++) {
        wordList[i] = wordList[i].toLowerCase();

        if (wordList[i].includes("-") || wordList[i].includes(" ")) {
            wordList.splice(i, 1);
            i--;
        } 
    }
    return wordList;
};

// Funktion som tar fram ett slumpat index
function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * approvedWordList.length);
    return randomIndex;
};

// Funktion för att jämföra bokstav och rendera UI 
function rightGuess(letter, placement) {
    let letterList = document.querySelectorAll('li');
    letterList[placement].innerHTML = letter.toUpperCase();
};

// Funktion för att rendera ut UI vid felgissning
function wrongGuess() {
    document.querySelector('figure').classList.add(bodyParts[0]);
    bodyParts.shift();
};

/** -.-.-.-.- EVENT LISTENERS -.-.-.-.- */

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    startGame();
});

document.addEventListener('keypress', function (event) {
    
    let letterExists = false;
    const guessedLetter = event.key;
    const alphabetRegExp = new RegExp('[a-zåäö]');

    // Kolla om event.key är en bokstav
    if (alphabetRegExp.test(guessedLetter)) {
        
        // Om bokstaven inte är gissad på förut
        if (guesses.indexOf(guessedLetter) === -1) {
            for (let i = 0; i < wordToGuess.length; i++) {
                if (guessedLetter === wordToGuess[i]) {
                    correctGuesses++;
                    rightGuess(guessedLetter, i);
                    letterExists = true;
                }
            }
        } else {
            letterExists = true;
        }
    
        // Lägger till bokstaven i gissningar
        guesses.push(guessedLetter);
    
        if (!letterExists) {
            wrongGuess();
            document.querySelector('.nomatch').innerHTML += event.key;
        }
        
        if (correctGuesses === wordToGuess.length) {
            // Om två spelare och jämn runda
            if (playerTwo.isActive && turns % 2 === 0) {
                // Ju fler bodyParts kvar i arrayen, ju mer poäng
                playerTwo.points += bodyParts.length;
            } else {
                playerOne.points += bodyParts.length;
            }
            document.querySelector('.winning').classList.add('show');
            document.querySelector('.winning .right-word').innerHTML = wordToGuess.toUpperCase();
            document.querySelector('.points').innerHTML = bodyParts.length;
    
        } else if (bodyParts.length === 0) {
            document.querySelector('.game-over').classList.add('show');
            document.querySelector('.game-over .right-word').innerHTML = wordToGuess.toUpperCase();
        } 
    }
});

restartBtnList.forEach(button => {
    button.addEventListener('click', () => {
        wordToGuess = generateWord();
        document.querySelector('.show').classList.remove('show');
        turns++;

        // Om två spelare och jämn runda
        if (playerTwo.isActive && turns % 2 === 0) {
            playerTwo.round++;
            getPlayerInfo(playerTwo)
        } else {
            playerOne.round++;
            getPlayerInfo(playerOne);
        }
    });
});

resetBtn.addEventListener('dblclick', () => {
    location.reload();
});
