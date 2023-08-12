const projects = {
    "code": {
        "link": "https://blob2763.github.io/code/",
        "img": "code.png",
    },
    "colour": {
        "link": "https://blob2763.github.io/guess-the-colour/",
        "img": "colour.png",
    },
    "stopwatch": {
        "link": "https://blob2763.github.io/stopwatch-website/",
        "img": "stopwatch.png",
    },
    "the infinite lab": {
        "link": "https://blob2763.github.io/infinite/",
        "img": "til.png",
    },
    "utils": {
        "link": "https://utils.is-a.dev/",
        "img": "utils.png",
    },
};

const projectsList = document.getElementById("projects");
for (projectName in projects) {
    const projectData = projects[projectName];
    console.log(projectData);

    let button = document.createElement("a");
    button.className = "grid-item project"
    button.style = `
    background-image: url(projects/${projectData["img"]}); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    `
    button.target = "_blank"

    button.href = projectData["link"]

    projectsList.appendChild(button);
}