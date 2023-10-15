async function getToken(id) {
    return fetch(`https://corsproxy.io/?https://api.scratch.mit.edu/projects/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .catch(error => {
            throw new Error('Error: ' + error); // Concatenate error message
        });
}

async function getCode(id) {
    try {
        // First fetch request
        const firstResponse = await fetch(`https://corsproxy.io/?https://api.scratch.mit.edu/projects/${id}`);
        if (!firstResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const projectData = await firstResponse.json();

        // Use the data from the first request to make a second request
        const secondEndpoint = `https://corsproxy.io/?https://projects.scratch.mit.edu/${id}?token=${projectData['project_token']}`;

        // Second fetch request
        const secondResponse = await fetch(secondEndpoint);
        if (!secondResponse.ok) {
            throw new Error('Network response was not ok');
        }
        let projectJSON = await secondResponse.json();

        // Handle the data from the second request
        console.log(projectJSON);

        // loop through sprites
        let blocks = [];

        let targets = projectJSON['targets'];
        for (let sprite in targets) {
            const spriteData = targets[sprite];
            const spriteBlocks = spriteData['blocks'];

            for (let blockId in spriteBlocks) {
                const blockData = spriteBlocks[blockId];
                const opCode = blockData['opcode'];

                blocks.push(opCode);
            }
        }

        const blocksCounted = blocks.length;

        // make a dictionary for the frequency of blocks
        let blockFrequencies = {};

        blocks.forEach(item => {
            if (blockFrequencies[item]) {
                blockFrequencies[item]++;
            } else {
                blockFrequencies[item] = 1;
            }
        });

        // sort dictionary
        const sortedArray = Object.entries(blockFrequencies).sort((a, b) => b[1] - a[1]);
        const sortedBlockFrequencies = Object.fromEntries(sortedArray);

        console.log(sortedBlockFrequencies);

        // show graph
        let blockGraph = document.getElementById('top-blocks-list');
        blockGraph.innerHTML = ''

        const dataList = Object.entries(sortedBlockFrequencies);
        const highestPercentage = (dataList[0][1] / blocksCounted) * 100;
        for (let i in dataList) {
            const block = dataList[i];
            const category = block[0].split('_')[0];
            const percentage = (block[1] / blocksCounted) * 100;

            let entry = document.createElement('li');
            entry.innerText = `${block[0]} - ${block[1]} uses (${percentage.toPrecision(3)}%)`
            entry.className = category
            entry.style.width = `${percentage * (95 / highestPercentage)}%`

            blockGraph.appendChild(entry);
        }

        // add some other stats
        document.getElementById('blocks-counted').innerText = blocksCounted
        document.getElementById('project-views').innerText = projectData['stats']['views']
        document.getElementById('project-loves').innerText = projectData['stats']['loves']
        document.getElementById('project-favourites').innerText = projectData['stats']['favorites']

    } catch (error) {
        console.error('Error:', error);
    }
}


// Select the button element by its id
const button = document.getElementById("search");

// Add a click event listener to the button
button.addEventListener("click", function () {
    const idInput = document.getElementById('project-id');
    const projectId = idInput.value;

    getCode(projectId)
        .then(data => {
            const code = data
            console.log(code);
        })
        .catch(error => {
            console.error(error.message); // Access the error message using error.message
        });
});
