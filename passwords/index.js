let passwords = null;

async function fetchPasswords() {
    if (passwords === null) {
        const response = await fetch('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/darkweb2017-top10000.txt');
        passwords = await response.text();
    }

    return passwords;
}

let badWords = null;

async function fetchBadWords() {
    if (badWords === null) {
        const response = await fetch('https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/refs/heads/master/en');
        badWords = await response.text();
    }

    return badWords;
}

// Indexes of bad passwords
const badIdx = [];

async function containsBadWord(word) {
    try {
        const text = await fetchBadWords();
        const badWordsList = text
            .split('\n')
            .map(badWord => badWord.trim()) // Remove extra whitespace
            .filter(badWord => badWord !== ''); // Filter out empty strings

        for (const badWord of badWordsList) {
            if (word.toLowerCase().includes(badWord.toLowerCase())) { // Case-insensitive substring match
                return true;
            }
        }
    } catch (error) {
        console.error('Error fetching bad words:', error);
    }

    return false; // Return false if no matches are found
}

async function fetchRandomPassword(except = '', attempts = 20) {
    if (attempts <= 0) throw new Error('Exceeded maximum attempts to find a password');
    
    const text = await fetchPasswords();
    const passwordsList = text.split('\n');

    const passwordIdx = Math.floor(Math.random() * passwordsList.length);
    const password = passwordsList[passwordIdx];

    const isException = password === except;
    const isBadWord = await containsBadWord(password);
    const isBadPass = badIdx.includes(password);

    if (isException || isBadWord || isBadPass) {
        if (isBadWord) { console.log("BAD WORD FILTER ACTIVATED"); }
        return fetchRandomPassword(except, attempts - 1);
    } else {
        console.log(password, passwordIdx);
        return { 'password': password, 'idx': passwordIdx };
    }
}

async function getUserGuess() {
    return new Promise(resolve => {
        document.getElementById('option1').addEventListener('click', () => resolve('option1'));
        document.getElementById('option2').addEventListener('click', () => resolve('option2'));
    });
}

function waitTwoSeconds() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

async function displayRound() {
    document.getElementById('password1').innerText = '';
    document.getElementById('password2').innerText = '';
    document.getElementById('rank1').innerText = '';
    document.getElementById('rank2').innerText = '';
    document.getElementById('option1').className = 'option';
    document.getElementById('option2').className = 'option';

    const password1 = await fetchRandomPassword();
    const password2 = await fetchRandomPassword(password1.password);

    document.getElementById('password1').innerText = password1.password;
    document.getElementById('password2').innerText = password2.password;

    const userGuess = await getUserGuess();
    const correctGuess = password1.idx < password2.idx ? 'option1' : 'option2';
    const isCorrect = userGuess === correctGuess;

    document.getElementById('rank1').innerText = '#' + password1.idx;
    document.getElementById('rank2').innerText = '#' + password2.idx;
    document.getElementById(userGuess).className = (isCorrect ? 'correct' : 'incorrect') + ' option';

    await waitTwoSeconds();

    return isCorrect ? 1 : -1;
}

async function playGame() {
    let score = 0;

    while (true) {
        score += await displayRound();
        document.getElementById('score').innerText = score;
    }
}

playGame();