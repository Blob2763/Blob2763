async function blockCounts() {
    return fetch('/blocks/blockCount.json')
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

async function varCounts() {
    return fetch('/blocks/varCount.json')
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

async function listCounts() {
    return fetch('/blocks/listCount.json')
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

const projectsSearched = 678995;
const projectsFound = 32946;

document.getElementById('projects-searched').innerText = projectsSearched
document.getElementById('projects-shared').innerText = projectsFound

function mergeDicts(dict1, dict2) {
    // Create an empty result object to store the merged values
    const result = {};

    // Merge values from dict1 into the result object
    for (const key in dict1) {
        const mainKey = key.split('_')[0];
        if (!result[mainKey]) {
            result[mainKey] = {};
        }
        if (!result[mainKey][key]) {
            result[mainKey][key] = 0;
        }
        result[mainKey][key] += dict1[key];
    }

    // Merge values from dict2 into the result object
    for (const key in dict2) {
        if (!result[key]) {
            result[key] = {};
        }
        for (const subKey in dict2[key]) {
            if (!result[key][subKey]) {
                result[key][subKey] = 0;
            }
            result[key][subKey] += dict2[key][subKey];
        }
    }

    console.log(JSON.stringify(result));

    return result
}

blockCounts()
    .then(data => {
        const jsonData = data

        let frequencyByCategory = {}
        let dataList = [];
        for (let category in jsonData) {
            const categoryData = jsonData[category];
            const categoryEntries = Object.entries(categoryData);

            let frequencyInCategory = 0
            for (let i in categoryEntries) {
                const blockInCategory = categoryEntries[i];
                frequencyInCategory += blockInCategory[1];
            }
            frequencyByCategory[category] = frequencyInCategory

            dataList = dataList.concat(categoryEntries);
        }
        dataList.sort((a, b) => b[1] - a[1])

        let frequencyByCategoryList = Object.entries(frequencyByCategory);
        frequencyByCategoryList.sort((a, b) => b[1] - a[1])
        frequencyByCategory = {}
        console.log(frequencyByCategoryList);

        let totalBlockCount = 0
        for (const item of dataList) {
            totalBlockCount += item[1];
        }
        document.getElementById('blocks-counted').innerText = totalBlockCount

        let topTenList = document.getElementById('top-blocks-list');
        const highestPercentage = (dataList[0][1] / totalBlockCount) * 100;
        for (let i = 0; i < 10; i++) {
            const block = dataList[i];
            const category = block[0].split('_')[0];
            const percentage = (block[1] / totalBlockCount) * 100;

            let entry = document.createElement('li');
            entry.innerText = `${block[0]} - ${block[1]} uses (${percentage.toPrecision(3)}%). ${(block[1] / projectsFound).toPrecision(4)} times per project`
            entry.className = category
            entry.style.width = `${percentage * (95 / highestPercentage)}%`

            topTenList.appendChild(entry);
        }

        let topCategoriesList = document.getElementById('top-categories-list');

        const highestCategoryPercentage = (frequencyByCategoryList[0][1] / totalBlockCount) * 100;
        for (let i in frequencyByCategoryList) {
            const categoryData = frequencyByCategoryList[i];
            const category = categoryData[0];
            const percentage = (categoryData[1] / totalBlockCount) * 100;

            let entry = document.createElement('li');
            entry.innerText = `${category} - ${categoryData[1]} uses (${percentage.toPrecision(3)}%)`
            entry.className = category
            entry.style.width = `${percentage * (95 / highestCategoryPercentage)}%`

            topCategoriesList.appendChild(entry);
        }
    })
    .catch(error => {
        console.error(error.message); // Access the error message using error.message
    });

varCounts()
    .then(data => {
        const jsonData = data
        console.log(jsonData)

        let dataList = Object.entries(jsonData);
        dataList.sort((a, b) => b[1] - a[1])
        console.log(dataList);

        let totalVarCount = 0
        for (const item of dataList) {
            totalVarCount += item[1];
        }
        document.getElementById('vars-counted').innerText = totalVarCount

        let topTenList = document.getElementById('top-vars-list');
        const highestPercentage = (dataList[0][1] / totalVarCount) * 100;
        for (let i = 0; i < 10; i++) {
            const variable = dataList[i];
            const percentage = (variable[1] / totalVarCount) * 100;

            let entry = document.createElement('li');
            entry.innerText = `${variable[0]} - ${variable[1]} uses (${percentage.toPrecision(3)}%)`
            entry.className = 'variable'
            entry.style.width = `${percentage * (95 / highestPercentage)}%`

            topTenList.appendChild(entry);
        }
    })
    .catch(error => {
        console.error(error.message); // Access the error message using error.message
    });

listCounts()
    .then(data => {
        const jsonData = data

        let dataList = [];
        for (let category in jsonData) {
            const categoryData = jsonData[category];
            const categoryEntries = Object.entries(categoryData);

            dataList = dataList.concat(categoryEntries);
        }
        dataList.sort((a, b) => b[1] - a[1])
        console.log(dataList);

        let totalListCount = 0
        for (const item of dataList) {
            totalListCount += item[1];
        }
        document.getElementById('lists-counted').innerText = totalListCount

        let topTenList = document.getElementById('top-lists-list');
        const highestPercentage = (dataList[0][1] / totalListCount) * 100;
        for (let i = 0; i < 10; i++) {
            const list = dataList[i];
            const percentage = (list[1] / totalListCount) * 100;

            let entry = document.createElement('li');
            entry.innerText = `${list[0]} - ${list[1]} uses (${percentage.toPrecision(3)}%)`
            entry.className = 'list'
            entry.style.width = `${percentage * (95 / highestPercentage)}%`
            topTenList.appendChild(entry);
        }
    })
    .catch(error => {
        console.error(error.message); // Access the error message using error.message
    });

