/**
     För att toggla SVG:en
    document.querySelector('figure').classList.add('scaffold')
    document.querySelector('figure').classList.add('head')
    document.querySelector('figure').classList.add('body')
    document.querySelector('figure').classList.add('arms')
    document.querySelector('figure').classList.add('legs')

    Hänga gubbe
    .: Keyboard eventlyssnare
    .: lista med alfabetet, ta bort för varje gissning och lägg i ny lista som ska renderas
    .: slumpa ut random ord
    .: lista med ord
    .: max antal gissningar vs antal gissningar anv gjort

    .: poängräknare 
    .: tidräknare? om vi vill
    
    */
   
// Lista med ord
const words = ['pizzamjöl', 'tomatsoppa', 'chorizogryta'];

let correctGuesses = 0;
let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
   
// Funktion som tar fram ett slumpat index
function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return randomIndex;
}

// Funktion för att jämföra bokstav och rendera UI -- fixa så det bara görs
// en gång!
function rightGuess(letter) {

    // Hämta de element med class name guessedLetter
    let letterList = document.getElementsByClassName(letter);

    // Loopa över listan för att skriva ut på skärmen
    for (let i = 0; i < letterList.length; i++) {
        letterList[i].innerHTML = letter.toUpperCase();
    }
}

// Funktion för att rendera ut UI vid felgissning
function wrongGuess() {

    document.querySelector('figure').classList.add(bodyParts[0]);
    bodyParts.shift();
}

// Hämta ord ur listan words med hjälp av random index
let index = getRandomIndex();
let wordToGuess = words[1];

// Hämta ul-elementet i dokumentet
let ulEl = document.querySelector('.word');

// Loopa och rendera ut box för varje bokstav i ordet
for (let i = 0; i < wordToGuess.length; i++) {
    let liEl = document.createElement('li');

    // Addera class för att senare kunna jämföra
    liEl.classList.add(wordToGuess[i]);
    
    ulEl.appendChild(liEl);

}



document.addEventListener('keypress', function(event) {

    // Kolla om det är en bokstav?

    let letterExists = false;
    let guessedLetter = event.key;

    for (let i = 0; i < wordToGuess.length; i++) {
        if (guessedLetter === wordToGuess[i]) {
            correctGuesses++;
                            // addera i argument
            rightGuess(guessedLetter);
            letterExists = true;
        } 
    }

    if (!letterExists) {
        wrongGuess();
        document.querySelector('.nomatch').innerHTML += event.key;
    }

    if (correctGuesses === wordToGuess.length) {
        document.querySelector('.winning').classList.add('show');
        document.querySelector('.winning-word').innerHTML = wordToGuess.toUpperCase();
        // Får poäng, omgången slut
    } else if (bodyParts.length === 0) {
        document.querySelector('.game-over').classList.add('show');
        document.querySelector('.losing-word').innerHTML = wordToGuess.toUpperCase();
    }

});


let restartBtnList = document.querySelectorAll('.restart-btn');
restartBtnList.forEach(button => {
    button.addEventListener('click', () => {
        location.reload();
        
    });
});

// Funktion 