/* Global Variables */
const generate = document.querySelector('.generate');
const description = document.querySelector('textarea');
const zipcode = document.querySelector('input');

const KELVIN = 273;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const key = '303c83a51e0001c3b44e42cefb0f0b62';

//------------------------------------------------------------------//
//check the server for latest values of the page
getServerData();

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', press);

/* Function called by event listener */

function press() {
    let desValue = description.value;
    let zipValue = zipcode.value;

    getWeather(zipValue, desValue).then(() => {
        getServerData();
    });
}

/* Function to GET Web API Data*/
function getWeather(zip, des) {
    //check if the zip is empty
    if (zip == '') {
        return;
    }
    //api
    let api = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;
    console.log(api);
    //fetch api
    return fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            const temperature = Math.floor(data.main.temp - KELVIN);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const city = data.name;
            const country = data.sys.country;
            const userText = des; //add the user description
            postData('/add', {
                temperature,
                description,
                icon,
                city,
                country,
                userText,
                newDate,
            });
        });
}

/* Function to POST data */
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
}

// get project data and update the UI
async function getServerData() {
    const response = await fetch('/return');
    const latestEntry = await response.json();
    // checking if there is a temperature attribute
    if (latestEntry && latestEntry.temperature) {
        updateUI(latestEntry);
    }
}

const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const place = document.getElementById('location');
const content = document.getElementById('content');

function updateUI(weather) {
    console.log(weather);

    icon.innerHTML = `<img src="svg/${weather.icon}.svg" alt="nothing yet" />`;
    temp.innerHTML = `${weather.temperature}°C`;
    date.innerHTML = weather.newDate ? weather.newDate : '';
    place.innerHTML = weather.city ? weather.city : '';
    content.innerHTML = weather.userText ? weather.userText : '';
}
