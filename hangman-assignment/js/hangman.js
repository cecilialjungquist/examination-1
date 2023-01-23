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

// Funktion som tar fram ett slumpat index
function getRandomIndex() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return randomIndex;
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
let correctGuesses = 0;

document.addEventListener('keypress', function(event) {
    let guessedLetter = event.key;

    for (let i = 0; i < wordToGuess.length; i++) {
        if(guessedLetter === wordToGuess[i]) {
            console.log(guessedLetter);
            correctGuesses++;
        } else {
            console.log('nä');
        }
    }

    if (correctGuesses === wordToGuess.length) {
        // Får poäng, omgången slut
    }

});
