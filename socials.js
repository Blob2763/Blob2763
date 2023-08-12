const socials = {
    "discord": {
        "link": "https://discord.gg/NwXXhUAk67",
        "img": "discord.png",
    },
    "youtube": {
        "link": "https://www.youtube.com/channel/UCtQ-HwOxJU998QyYFreFRqg",
        "img": "youtube.png",
    },
    "github": {
        "link": "https://github.com/Blob2763/",
        "img": "github.png",
    },
    "scratch": {
        "link": "https://scratch.mit.edu/users/codecodcodecod/",
        "img": "scratch.png",
    },
    "postlit": {
        "link": "https://www.postlit.dev/users/blob2763/",
        "img": "postlit.png",
    },
    "snap": {
        "link": "https://snap.berkeley.edu/user?username=blob_2763",
        "img": "snap.png",
    },
    "duolingo": {
        "link": "https://www.duolingo.com/u/845145780",
        "img": "duolingo.png",
    },
    "tetrio": {
        "link": "https://ch.tetr.io/u/blob2763",
        "img": "tetrio.png",
    },
};

const socialsList = document.getElementById("socials");
for (site in socials) {
    const siteData = socials[site];
    console.log(siteData);

    let button = document.createElement("a");
    button.className = "grid-item social"
    button.style = `background-image: url(socials/${siteData["img"]}); background-size: 100% 100%;`
    button.href = siteData["link"]

    socialsList.appendChild(button);
}