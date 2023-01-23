/**

    Hänga gubbe
    .: Keyboard eventlyssnare
    .: lista med alfabetet, ta bort för varje gissning och lägg i ny lista som ska renderas
    .: slumpa ut random ord
    .: lista med ord
    .: max antal gissningar vs antal gissningar anv gjort

    .: poängräknare 
    .: tidräknare? om vi vill

    Kvar att göra
    .: Kolla så att det är en bokstav som skickas in
    .: Spara poäng över omgångar?
    .: Ok att samma bokstav ska kunna gissas på flera gånger?
    .: Fixa rightGuess så den bara gör rätt grej en gång
    .: Förlänga ordlistan
    .: Någon typ av timer?
    .: Clean up
    .: Måste fixa så att man inte får "correctGuesses++" om man trycker på samma bokstav
*/
   
// Lista med ord och ta ut ord
const words = ['pizzamjöl', 'tomatsoppa', 'chorizogryta'];
let index = getRandomIndex();
let wordToGuess = words[index];

let correctGuesses = 0;
let points = 0;
let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];

// Hämta ul-elementet och restart button i dokumentet
let ulEl = document.querySelector('.word');
let restartBtnList = document.querySelectorAll('.restart-btn');

// Loopa och rendera ut box för varje bokstav i ordet
for (let i = 0; i < wordToGuess.length; i++) {
    let liEl = document.createElement('li');

    // ************************************
    // KAN TA BORT DENNA!!!! Behövs inte då vi inte jämför längre
    // ************************************

    // Addera class för att senare kunna jämföra
    // liEl.classList.add(wordToGuess[i]);
    
    ulEl.appendChild(liEl);
}

/** -.-.-.-.- FUNCTIONS -.-.-.-.- */
   
// Funktion som tar fram ett slumpat index
function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return randomIndex;
}

// Funktion för att jämföra bokstav och rendera UI -- fixa så det bara görs
// en gång!
function rightGuess(letter, placement) {

    // Hämta de element med class name guessedLetter
    let letterList = document.querySelectorAll('li');

    letterList[placement].innerHTML = letter.toUpperCase();

    // ************************************
    // KAN TA BORT DENNA!!!! Behövs inte, se ovan
    // ************************************

    // // Loopa över listan för att skriva ut på skärmen
    // for (let i = 0; i < letterList.length; i++) {
    //     letterList[i].innerHTML = letter.toUpperCase();
    // }
}

// Funktion för att rendera ut UI vid felgissning
function wrongGuess() {
    document.querySelector('figure').classList.add(bodyParts[0]);
    bodyParts.shift();
}

/** -.-.-.-.- EVENT LISTENERS -.-.-.-.- */

document.addEventListener('keypress', function(event) {

    // Kolla om det är en bokstav?

    let letterExists = false;
    let guessedLetter = event.key;

    for (let i = 0; i < wordToGuess.length; i++) {
        if (guessedLetter === wordToGuess[i]) {
            correctGuesses++;
            rightGuess(guessedLetter, i);
            letterExists = true;
        } 
    }

    if (!letterExists) {
        wrongGuess();
        document.querySelector('.nomatch').innerHTML += event.key;
    }

    if (correctGuesses === wordToGuess.length) {
        // Ju fler bodyParts kvar i arrayen, ju mer poäng
        points = bodyParts.length;
        document.querySelector('.winning').classList.add('show');
        document.querySelector('.points').innerHTML = points;
        
    } else if (bodyParts.length === 0) {
        document.querySelector('.game-over').classList.add('show');
        document.querySelector('.losing-word').innerHTML = wordToGuess.toUpperCase();
    }

});

restartBtnList.forEach(button => {
    button.addEventListener('click', () => {
        location.reload();
    });
});
