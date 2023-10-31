function swapNoise(imageData, swapRate) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;

            let shouldSwap = Math.random() < swapRate;

            if (shouldSwap) {
                const randX = Math.floor(Math.random() * width);
                const randY = Math.floor(Math.random() * height);
                const randOffset = (randX * 4 + randY * width * 4);

                const oldPixelData = [
                    data[offset],
                    data[offset + 1],
                    data[offset + 2],
                    data[offset + 3]
                ];

                const newPixelData = [
                    data[randOffset],
                    data[randOffset + 1],
                    data[randOffset + 2],
                    data[randOffset + 3]
                ];

                data[offset] = newPixelData[0]
                data[offset + 1] = newPixelData[1]
                data[offset + 2] = newPixelData[2]
                data[offset + 3] = newPixelData[3]

                data[randOffset] = oldPixelData[0]
                data[randOffset + 1] = oldPixelData[1]
                data[randOffset + 2] = oldPixelData[2]
                data[randOffset + 3] = oldPixelData[3]
            }
        }
    }

    return new ImageData(data, width, height);
}

function adjustImage(imageData, contrast, brightness, range) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;

            const newContrast = contrast + (Math.random() - 0.5) * range;
            const newBrightness = brightness + (Math.random() - 0.5) * range;

            data[offset] = (data[offset] - 128) * newContrast + 128 + newBrightness
            data[offset + 1] = (data[offset + 1] - 128) * newContrast + 128 + newBrightness
            data[offset + 2] = (data[offset + 2] - 128) * newContrast + 128 + newBrightness
        }
    }

    return new ImageData(data, width, height);
}

function negativeNoise(imageData, negateRate) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;

            let shouldNegate = Math.random() < negateRate;

            if (shouldNegate) {
                data[offset] = 255 - data[offset]
                data[offset + 1] = 255 - data[offset + 1]
                data[offset + 2] = 255 - data[offset + 2]
            }
        }
    }

    return new ImageData(data, width, height);
}

function makeRed(imageData, redRate) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;

            let shouldMakeRed = Math.random() < redRate;

            if (shouldMakeRed) {
                data[offset] = Math.min(255, data[offset] + 140)
            }
        }
    }

    return new ImageData(data, width, height);
}

function nukeImage() {
    const image = document.getElementById('image');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const contrast = parseInt(document.getElementById('contrast').value);
    const brightness = parseInt(document.getElementById('brightness').value);
    const scatter = parseFloat(document.getElementById('scatter').value);
    const negative = parseFloat(document.getElementById('negative').value);
    const redness = parseFloat(document.getElementById('redness').value);

    console.log(contrast, brightness, scatter, negative, redness);

    let scaleFactor = 1;
    let newWidth = Math.floor(image.width * scaleFactor);
    let newHeight = Math.floor(image.height * scaleFactor);

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    imageData = adjustImage(imageData, contrast, brightness, 10);
    imageData = swapNoise(imageData, scatter);
    imageData = negativeNoise(imageData, negative);
    imageData = makeRed(imageData, redness);

    ctx.putImageData(imageData, 0, 0);
}

document.getElementById('imageInput').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    var preview = document.getElementById('image');

    reader.onload = function (e) {
        preview.src = e.target.result;
    }

    reader.readAsDataURL(file);

    preview.onload = function () {
        nukeImage();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to the sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(function (slider) {
        slider.addEventListener('input', function () {
            nukeImage();
        });
    });
});

const canvas = document.getElementById('canvas');
const saveButton = document.getElementById('save');
// Add a click event handler to the save button
saveButton.addEventListener('click', function () {
    // Get the data URL of the canvas
    const dataURL = canvas.toDataURL('image/png');

    // Create a download link for the image
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'awesome-nuke.png';

    // Simulate a click on the download link to trigger the download
    a.click();
});