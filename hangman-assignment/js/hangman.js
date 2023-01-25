
let approvedWordList = approvedWords(words);
let wordToGuess = '';

let correctGuesses = 0;
let guesses = [];
let points = 0;
let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
let rounds = 0;

// Hämta ul-elementet och restart button i dokumentet
let ulEl = document.querySelector('.word');
let restartBtnList = document.querySelectorAll('.restart-btn');

// Generera startord
wordToGuess = generateWord();
console.log(wordToGuess);

/* -.-.-.-.- FUNCTIONS -.-.-.-.- */

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
}

// Funktion som tar bort oanvändbara ord ur listan
function approvedWords(wordList) {
    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].includes("-") || wordList[i].includes(" ")) {
            wordList.splice(i, 1);
        } 
        wordList[i].toLowerCase();
    }
    return wordList;
}

// Funktion som tar fram ett slumpat index
function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * approvedWordList.length);
    return randomIndex;
}

// Funktion för att jämföra bokstav och rendera UI 
function rightGuess(letter, placement) {
    let letterList = document.querySelectorAll('li');
    letterList[placement].innerHTML = letter.toUpperCase();
}

// Funktion för att rendera ut UI vid felgissning
function wrongGuess() {
    document.querySelector('figure').classList.add(bodyParts[0]);
    bodyParts.shift();
}

/** -.-.-.-.- EVENT LISTENERS -.-.-.-.- */

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
            // Ju fler bodyParts kvar i arrayen, ju mer poäng
            points += bodyParts.length;
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
        document.getElementById('total-points').innerHTML = `Your points: ${points}`;
        rounds++;
        document.getElementById('rounds').innerHTML = `Rounds: ${rounds}`
    });
});