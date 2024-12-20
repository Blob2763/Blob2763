const data = {
    'CSS': 10440,
    'HTML': 8459,
    'JavaScript': 17640,
    'Python': 15637,
};

const date = '1st Dec 2024';

let totalLines = 0;
for (let lines of Object.values(data)) {
    totalLines += lines;
}

function showData(language) {
    document.getElementById("language").innerText = language
    document.getElementById("line-count").innerText = `${data[language]}/${totalLines} lines (as of ${date})`
}

function hideData() {
    document.getElementById("language").innerText = "Hover over a part of the graph to get more info"
    document.getElementById("line-count").innerText = ""
}

const colours = {
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "JavaScript": "#f1e05a",
    "Python": "#3572a5",
}

function createBar(language, percentage, pos) {
    const chart = document.getElementById("code-chart");

    let bar = document.createElement("div");
    bar.className = `bar ${language} ${pos}`
    bar.style = `height: ${percentage}%; background-color: ${colours[language]}`
    bar.onmouseover = function(){showData(language)};
    bar.onmouseout = function(){hideData()};

    let label = document.createElement("span");
    label.className = "label"
    label.innerText = `${language} - ${Math.round(percentage)}%`
    bar.appendChild(label);

    chart.appendChild(bar);
}

const dataLanguages = Object.keys(data);
const dataLength = dataLanguages.length;
for (let i = 0; i < dataLength; i++) {
    const language = dataLanguages[i];
    const lines = data[language];
    const percentage = (lines / totalLines) * 100;

    let position = "middle";
    if (i === 0) {
        position = "top"
    } else if (i === dataLength - 1) {
        position = "bottom"
    }

    createBar(language, percentage, position);
}
