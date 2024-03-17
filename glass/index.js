const startTime = Date.now();

const glass1 = document.getElementById('glass1');
const cursor = document.getElementById('cursor');

positionObjects();

function positionObjects() {
    const time = Date.now() - startTime;

    glass1.style.left = `calc(${Math.sin(time / 1000) / 2 + 0.5} * calc(100% - 400px)`;

    setTimeout(positionObjects, 10);
}

document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX - 100}px`;
    cursor.style.top = `${event.clientY - 100}px`;
});