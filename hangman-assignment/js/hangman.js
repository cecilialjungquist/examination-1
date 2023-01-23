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
const words = ['Pizzamjöl', 'Tomatsoppa', 'Chorizogryta'];

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


for (let i = 0; i < wordToGuess.length; i++) {
    let liEl = document.createElement('li');
    
}
