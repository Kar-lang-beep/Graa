// Postacie i stwierdzenia (możesz dodawać kolejne!)
const characters = [
    {
        name: "Isaac Newton",
        statements: [
            { text: "Odkrył prawo grawitacji.", isTrue: true },
            { text: "Był królem Anglii.", isTrue: false },
            { text: "Zajmował się również optyką.", isTrue: true },
            { text: "Urodził się w starożytnym Egipcie.", isTrue: false },
            { text: "Napisał dzieło 'O powstawaniu gatunków'.", isTrue: false }
        ]
    },
    {
        name: "Kleopatra",
        statements: [
            { text: "Była ostatnią królową starożytnego Egiptu.", isTrue: true },
            { text: "Przyjaźniła się z Julią Cezarową.", isTrue: false },
            { text: "Była znana z wielkiej urody.", isTrue: true },
            { text: "Odkryła Amerykę.", isTrue: false },
            { text: "Mieszkała w XIX wieku.", isTrue: false }
        ]
    },
    {
        name: "Mikołaj Kopernik",
        statements: [
            { text: "Sformułował teorię heliocentryczną.", isTrue: true },
            { text: "Był średniowiecznym mnisiem z Japonii.", isTrue: false },
            { text: "Studiował w Krakowie.", isTrue: true },
            { text: "Urodził się w Toruniu.", isTrue: true },
            { text: "Publikował w XV wieku w języku francuskim.", isTrue: false }
        ]
    },
    {
        name: "Maria Skłodowska-Curie",
        statements: [
            { text: "Dwukrotna laureatka Nagrody Nobla.", isTrue: true },
            { text: "Odkryła polon i rad.", isTrue: true },
            { text: "Była księżniczką francuską.", isTrue: false },
            { text: "Zginęła w wypadku samochodowym.", isTrue: false },
            { text: "Prowadziła badania nad promieniotwórczością.", isTrue: true }
        ]
    },
    {
        name: "Leonardo da Vinci",
        statements: [
            { text: "Był renesansowym artystą i wynalazcą.", isTrue: true },
            { text: "Namalał Mona Lisę.", isTrue: true },
            { text: "Zaprojektował pierwszą drukarkę 3D.", isTrue: false },
            { text: "Pochodził z Włoch.", isTrue: true },
            { text: "Uczestniczył w powstaniu listopadowym.", isTrue: false }
        ]
    },
    {
        name: "Albert Einstein",
        statements: [
            { text: "Opracował teorię względności.", isTrue: true },
            { text: "Zdobył Nagrodę Nobla w dziedzinie fizyki.", isTrue: true },
            { text: "Był wybitnym kompozytorem muzyki klasycznej.", isTrue: false },
            { text: "Zmarł w XX wieku.", isTrue: true },
            { text: "Odkrył penicylinę.", isTrue: false }
        ]
    },
    {
        name: "Napoleon Bonaparte",
        statements: [
            { text: "Był cesarzem Francuzów.", isTrue: true },
            { text: "Został pokonany pod Waterloo.", isTrue: true },
            { text: "Pochodził z Grecji.", isTrue: false },
            { text: "Został zesłany na Wyspę Świętej Heleny.", isTrue: true },
            { text: "Kierował budową Wielkiego Muru Chińskiego.", isTrue: false }
        ]
    }
];

// DOM elements
const drawerBtns = document.querySelectorAll('.drawer-btn');
const gameArea = document.getElementById('game-area');
const drawerGrid = document.getElementById('drawer-grid');
const charName = document.getElementById('character-name');
const statementsList = document.getElementById('statements-list');
const showAnswersBtn = document.getElementById('show-answers-btn');
const backBtn = document.getElementById('back-btn');

let selectedCharacter = null;
let shuffledStatements = [];

// Fisher-Yates shuffle
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Kliknięcie szufladki = losowa postać
drawerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const character = characters[Math.floor(Math.random() * characters.length)];
        selectedCharacter = character;
        shuffledStatements = shuffleArray(character.statements);

        // Trigger opening animation and then show the character
        btn.classList.add('open');
        setTimeout(() => {
            showCharacter();
            btn.classList.remove('open');
        }, 400);
    });
});

function showCharacter() {
    drawerGrid.classList.add('hidden');
    gameArea.classList.remove('hidden');
    charName.textContent = selectedCharacter.name;
    statementsList.innerHTML = '';
    shuffledStatements.forEach((stmt, idx) => {
        const li = document.createElement('li');
        li.textContent = stmt.text;
        statementsList.appendChild(li);
    });
    showAnswersBtn.disabled = false;
    Array.from(statementsList.children).forEach(li => {
        li.innerHTML = li.textContent;
    });
}

// Pokaż odpowiedzi (prawda/fałsz)
showAnswersBtn.addEventListener('click', () => {
    Array.from(statementsList.children).forEach((li, idx) => {
        const isTrue = shuffledStatements[idx].isTrue;
        const resultSpan = document.createElement('span');
        resultSpan.classList.add('result');
        if (isTrue) {
            resultSpan.textContent = '✅ PRAWDA';
            resultSpan.classList.add('true');
        } else {
            resultSpan.textContent = '❌ FAŁSZ';
            resultSpan.classList.add('false');
        }
        li.appendChild(resultSpan);
    });
    showAnswersBtn.disabled = true;
});

// Powrót do szufladek
backBtn.addEventListener('click', () => {
    gameArea.classList.add('hidden');
    drawerGrid.classList.remove('hidden');
    statementsList.innerHTML = '';
    showAnswersBtn.disabled = false;
});
