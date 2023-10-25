async function getWordList(language) {
    const endpoint = `https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/${language}/${language}_50k.txt`

    return fetch(`https://corsproxy.io/?${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
}

let wordList;

const differenceRange = 500;

function newWord(difficulty) {
    difficulty = Math.max(difficulty, 0)

    const difference = Math.random() * differenceRange - (differenceRange / 2);
    difficulty += difference
    difficulty = Math.round(difficulty)

    difficulty = Math.max(0, difficulty)
    difficulty = Math.min(wordList.length - 2, difficulty)

    const wordData = wordList[difficulty];

    console.log('WORD DATA', wordData);
    console.log('DIFFICULTY', difficulty);

    const word = wordData.split(' ')[0];
    const frequency = wordData.split(' ')[1];


    if (!(/^[A-Za-z]+$/.test(word))) { return newWord(difficulty) }
    else { return [word, frequency, difficulty] }
}

function waitForAnswer() {
    const buttons = [
        document.getElementById('yes'),
        document.getElementById('no')
    ]

    return new Promise(resolve => {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                resolve(button.id);
            });
        });
    });
}

const testRepeats = 8;
const wordRepeats = 5;

async function testVocab(language) {
    await getWordList(language)
        .then(data => {
            wordList = data
            wordList = wordList.split('\n')

            console.log(wordList);
        })

    const maxDifficulty = wordList.length - 2

    let totalDifferences = 0;

    let difficultyScale = 0.5;
    for (let i = 1; i <= testRepeats; i++) {
        let differences = 0;
        let points = 0;

        for (let j = 0; j < wordRepeats; j++) {
            difficultyScale = Math.max(0, difficultyScale)
            difficultyScale = Math.min(1, difficultyScale)

            const difficulty = maxDifficulty * difficultyScale;

            let word = newWord(difficulty);
            console.log(word);

            const currentWord = word[0];
            const currentWordFrequency = word[1];
            const currentWordRanking = word[2];
            const difficultyDifference = difficulty - currentWordRanking;

            const wordElement = document.getElementById('word');
            wordElement.innerText = currentWord
            wordElement.title = `#${currentWordRanking}`
            wordElement.href = `https://en.wiktionary.org/wiki/${currentWord}`

            const answer = await waitForAnswer();

            console.log(answer);

            if (answer === 'yes') { points++; }
            differences += difficultyDifference
            totalDifferences += difficultyDifference
        }

        const averageDifference = differences / wordRepeats;
        const averagePoints = points / wordRepeats;

        console.log(averageDifference, averagePoints);

        difficultyScale += averageDifference / maxDifficulty
        difficultyScale += (averagePoints - 0.5) / (2 ** i)

        difficultyScale = Math.max(0, difficultyScale)
        difficultyScale = Math.min(1, difficultyScale)
        if (Number.isNaN(difficultyScale)) { difficultyScale = 0 }

        console.log('DIFFICULTY SCALE', difficultyScale);
        console.log(maxDifficulty * difficultyScale);
    }

    const overallAverageDifference = totalDifferences / (testRepeats * wordRepeats);

    const wordsKnown = Math.round(maxDifficulty * difficultyScale);
    document.getElementById('score').innerText = `You know around ${wordsKnown} words! (±${Math.abs(Math.round(overallAverageDifference)) + (differenceRange / 2)})`

    const twitterShare = document.createElement('a');
    twitterShare.className = 'button'
    twitterShare.id = 'twitter'
    twitterShare.href = `https://twitter.com/intent/tweet?text=I+know+${wordsKnown}+words%21+See+how+many+you+know+at+https%3A%2F%2Fblob2763.is-a.dev%2Fwords`
    twitterShare.innerText = 'Twitter'
    twitterShare.target = '_blank'

    const playAgain = document.createElement('a');
    playAgain.className = 'button'
    playAgain.id = 'again'
    playAgain.href = `/`
    playAgain.innerText = 'Play again'

    document.getElementById('share').appendChild(twitterShare);
    document.getElementById('share').appendChild(playAgain);
}

testVocab('en');