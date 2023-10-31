const projects = {
    "stopwatch": {
        "link": "/stopwatch",
        "img": "stopwatch.png",
    },
    "the infinite lab": {
        "link": "https://blob2763.github.io/infinite/",
        "img": "til.png",
    },
    "noughts and crosses": {
        "link": "https://blob2763.github.io/os-and-xs/",
        "img": "os-and-xs.png",
    },
    "colour game": {
        "link": "/colour",
        "img": "colour.png",
    },
    "utils": {
        "link": "https://utils.is-a.dev/",
        "img": "utils.png",
    },
    "my code": {
        "link": "/code",
        "img": "code.png",
    },
    "scratch block counts": {
        "link": "/blocks",
        "img": "blocks.png",
    },
    "count words": {
        "link": "/words",
        "img": "words.png",
    },
    "make images explode": {
        "link": "/nuker",
        "img": "nuker.png",
    },
};

const projectsList = document.getElementById("projects");
for (projectName in projects) {
    const projectData = projects[projectName];
    console.log(projectData);

    let button = document.createElement("a");
    button.className = "grid-item project item"
    button.style = `
    background-image: url(imgs/projects/${projectData["img"]}); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    `
    button.target = "_blank"
    button.title = projectName

    button.href = projectData["link"]

    projectsList.appendChild(button);
}
