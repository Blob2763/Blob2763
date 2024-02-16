fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ipv4').innerText = data.ip;
    })
    .catch(error => console.error('Error fetching IP address:', error));

fetch('https://api6.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ipv6').innerText = data.ip;
    })
    .catch(error => console.error('Error fetching IP address:', error));

fetch('https://ip-api.com/json/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('country').innerText = data.country;
        document.getElementById('region').innerText = data.regionName;
        document.getElementById('city').innerText = data.city;
        document.getElementById('coords').innerText = `${data.lat}, ${data.lon}`;
        document.getElementById('postcode').innerText = data.zip;
    })
    .catch(error => console.error('Error fetching location:', error));


function locateIP() {
    const ipToLocate = document.getElementById('geo-ip').value;

    fetch(`https://ip-api.com/json/${ipToLocate}/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('geo-country').innerText = data.country;
            document.getElementById('geo-region').innerText = data.regionName;
            document.getElementById('geo-city').innerText = data.city;
            document.getElementById('geo-coords').innerText = `${data.lat}, ${data.lon}`;
            document.getElementById('geo-postcode').innerText = data.zip;
        })
        .catch(error => console.error('Error fetching location:', error));
}


function showSnowflakeInformation() {
    const snowflake = document.getElementById('snowflake').value;
    const snowflakeBigInt = BigInt(snowflake);

    // Extracting components
    const timestamp = Number((snowflakeBigInt >> BigInt(22)) + 1420070400000n);
    const date = new Date(timestamp);
    const dateString = date.toUTCString();
    const workerId = Number((snowflakeBigInt >> BigInt(17)) & BigInt(0x1F));
    const processId = Number((snowflakeBigInt >> BigInt(12)) & BigInt(0x1F));
    const increment = Number(snowflakeBigInt & BigInt(0xFFF));

    // Displaying information
    document.getElementById('date').innerText = dateString;
    document.getElementById('unix').innerText = timestamp.toString();
    document.getElementById('worker-id').innerText = workerId.toString();
    document.getElementById('process-id').innerText = processId.toString();
    document.getElementById('increment').innerText = increment.toString();
}


function deleteWebhook() {
    fetch(document.getElementById('webhook').value, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle successful response
            document.getElementById('result').innerText = 'Webhook deleted!';
            document.getElementById('result').style.color = 'rgb(74, 222, 128)';
        })
        .catch(error => {
            document.getElementById('result').innerText = `An error occurred when trying to delete the webhook\n${error}`
            document.getElementById('result').style.color = 'red';
        });
}

function sendWebhook() {
    fetch(document.getElementById('webhook-send').value, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: document.getElementById('webhook-message').value
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle successful response
            document.getElementById('result-send').innerText = 'Message sent!';
            document.getElementById('result-send').style.color = 'rgb(74, 222, 128)';
        })
        .catch(error => {
            document.getElementById('result-send').innerText = `An error occurred when trying to send the message\n${error}`
            document.getElementById('result-send').style.color = 'red';
        });
}

function fetchData() {
    const corsProxy = document.getElementById('cors').checked ? 'https://corsproxy.io/?' : '';
    fetch(corsProxy + document.getElementById('path').value)
        .then(response => {
            document.getElementById('body').innerHTML = '';

            console.log('Response:', response);
            document.getElementById('status').innerText = `${response.ok ? '✓' : '✗'} ${response.status} ${response.statusText}`;
            if (response.ok) {
                return response.json(); // Convert response to JSON
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            console.log('Data:', data);
            document.getElementById('body').innerText = JSON.stringify(data, null, 2); // Update body with JSON data
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            document.getElementById('body').innerText = 'Error: ' + error.message; // Display error message in body
        });
}
