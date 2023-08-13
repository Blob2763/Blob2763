function textColour(r, g, b, id) {
    if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) {
        document.getElementById(id).style.color = "#000000";
    } else {
        document.getElementById(id).style.color = "#ffffff";
    }
}

function getColour() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    textColour(r, g, b, "colour")

    const colourToGuess = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")"
    document.getElementById("colour-to-guess").style.backgroundColor = colourToGuess
    document.querySelector(':root').style.setProperty('--colour', colourToGuess);
}

window.onload = function () {
    document.getElementById("reset").style.display = "none"
    document.getElementById("submit").style.display = "inline"

    document.getElementById("r-slider").value = 0;
    document.getElementById("g-slider").value = 0;
    document.getElementById("b-slider").value = 0;

    getColour();

    var rSlider = document.getElementById("r-slider");
    var rGuess = document.getElementById("r-guess");

    var gSlider = document.getElementById("g-slider");
    var gGuess = document.getElementById("g-guess");

    var bSlider = document.getElementById("b-slider");
    var bGuess = document.getElementById("b-guess");

    rSlider.addEventListener("input", function () {
        rGuess.textContent = rSlider.value;
    });

    gSlider.addEventListener("input", function () {
        gGuess.textContent = gSlider.value;
    });

    bSlider.addEventListener("input", function () {
        bGuess.textContent = bSlider.value;
    });
}

function findValue(value, rgb) {
    var splitRgb = [];
    var commasSeen = 0;

    for (let i = 0; i < rgb.length; i++) {
        if (value === 0 && i === 0) {
            i += 4;
        }

        if (rgb[i] === "," || rgb[i] === ")") {
            commasSeen += 1;
            i += 2;
        }
        
        if (commasSeen === value) {
            splitRgb += rgb[i];
        }
    }

    return splitRgb.toString()
}

function submit() {
    document.getElementById("reset").style.display = "inline"
    document.getElementById("submit").style.display = "none"

    const r = document.getElementById("r-slider").value;
    const g = document.getElementById("g-slider").value;
    const b = document.getElementById("b-slider").value;

    document.getElementById("r-guess").innerHTML = r;
    document.getElementById("g-guess").innerHTML = g;
    document.getElementById("b-guess").innerHTML = b;

    document.getElementById("colour-guess").style.backgroundColor = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
    textColour(r, g, b, "guess");

    const trueColour = document.getElementById("colour-to-guess").style.backgroundColor;

    document.getElementById("colour").innerHTML = trueColour;

    const trueR = findValue(0, trueColour);
    const trueG = findValue(1, trueColour);
    const trueB = findValue(2, trueColour);

    var worstScore = 0;

    if (trueR > 127.5) {
        worstScore += trueR - 0;
    } else {
        worstScore += 255 - trueR;
    }

    if (trueG > 127.5) {
        worstScore += trueG - 0;
    } else {
        worstScore += 255 - trueG;
    }

    if (trueB > 127.5) {
        worstScore += trueB - 0;
    } else {
        worstScore += 255 - trueB;
    }

    const rError = Math.abs(r - trueR);
    const gError = Math.abs(g - trueG);
    const bError = Math.abs(b - trueB);

    var score = 0;
    
    score += rError;
    score += gError;
    score += bError;

    const percentageScore = 100 - Math.round((score / worstScore) * 100);

    document.getElementById("score").innerHTML = percentageScore.toString() + "%";
}

function reset() {
    getColour();

    document.getElementById("reset").style.display = "none";
    document.getElementById("submit").style.display = "inline";

    document.getElementById("guess").style.color = "#000000";

    document.getElementById("r-slider").value = 0;
    document.getElementById("g-slider").value = 0;
    document.getElementById("b-slider").value = 0;

    document.getElementById("r-guess").innerHTML = 0;
    document.getElementById("g-guess").innerHTML = 0;
    document.getElementById("b-guess").innerHTML = 0;

    document.getElementById("colour").innerHTML = "";

    document.getElementById("colour-guess").style.backgroundColor = "#ffffff";

    document.getElementById("score").innerHTML = "";
}