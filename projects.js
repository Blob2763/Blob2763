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
    "colour": {
        "link": "/colour",
        "img": "colour.png",
    },
    "utils": {
        "link": "https://utils.is-a.dev/",
        "img": "utils.png",
    },
    "code": {
        "link": "/code",
        "img": "code.png",
    },
    "blocks": {
        "link": "/blocks",
        "img": "blocks.png",
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
