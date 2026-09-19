const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const themeButton = document.querySelector("#theme-button");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");

const spotlightContainer =
    document.querySelector("#spotlight-container");


/* =========================================
   NAVIGATION
   ========================================= */

menuButton.addEventListener("click", () => {

    const isOpen =
        navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    menuButton.textContent =
        isOpen ? "✕" : "☰";
});


/* =========================================
   DARK MODE
   ========================================= */

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    themeButton.setAttribute(
        "aria-label",
        darkModeEnabled
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    themeButton.textContent =
        darkModeEnabled ? "☀" : "◐";
});


/* =========================================
   FOOTER
   ========================================= */

currentYear.textContent =
    new Date().getFullYear();

lastModified.textContent =
    document.lastModified;


/* =========================================
   WEATHER SETTINGS
   ========================================= */

/*
    Replace YOUR_API_KEY with your actual
    OpenWeatherMap API key.
*/

const API_KEY = "294e1607271a1005ed7a75d60fd46604";

const WEATHER_URL =
    `https://api.openweathermap.org/data/2.5/weather?lat=10.5105&lon=7.4165&units=metric&appid=${API_KEY}`;

const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=10.5105&lon=7.4165&units=metric&appid=${API_KEY}`;


/* =========================================
   WEATHER
   ========================================= */

async function getWeather() {

    try {

        const [weatherResponse, forecastResponse] =
            await Promise.all([
                fetch(WEATHER_URL),
                fetch(FORECAST_URL)
            ]);


        if (!weatherResponse.ok) {
            throw new Error(
                `Weather error: ${weatherResponse.status}`
            );
        }


        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast error: ${forecastResponse.status}`
            );
        }


        const weatherData =
            await weatherResponse.json();

        const forecastData =
            await forecastResponse.json();


        displayCurrentWeather(weatherData);

        displayForecast(forecastData);


    } catch (error) {

        console.error(
            "Unable to load weather data:",
            error
        );

        currentWeather.innerHTML = `
            <p>
                Weather information is currently unavailable.
            </p>
        `;

        forecastContainer.innerHTML = `
            <p>
                Forecast information is currently unavailable.
            </p>
        `;
    }
}


/* =========================================
   CURRENT WEATHER
   ========================================= */

function displayCurrentWeather(data) {

    const temperature =
        Math.round(data.main.temp);

    const description =
        data.weather[0].description;

    const icon =
        data.weather[0].icon;

    currentWeather.innerHTML = `

        <div class="weather-main">

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="80"
                height="80"
            >

            <div>

                <p class="weather-temperature">
                    ${temperature}&deg;C
                </p>

                <p class="weather-description">
                    ${description}
                </p>

            </div>

        </div>

    `;
}


/* =========================================
   THREE-DAY FORECAST
   ========================================= */

function displayForecast(data) {

    const dailyForecasts = {};

    data.list.forEach((forecast) => {

        const date =
            new Date(
                forecast.dt * 1000
            ).toLocaleDateString(
                "en-NG",
                {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                }
            );

        if (!dailyForecasts[date]) {

            dailyForecasts[date] = {
                temperature: forecast.main.temp,
                description:
                    forecast.weather[0].description,
                icon:
                    forecast.weather[0].icon
            };
        }
    });


    const forecastDays =
        Object.entries(dailyForecasts)
            .slice(1, 4);


    forecastContainer.innerHTML = "";


    forecastDays.forEach(
        ([date, forecast]) => {

            const card =
                document.createElement("article");

            card.classList.add(
                "forecast-card"
            );

            card.innerHTML = `

                <h3>
                    ${date}
                </h3>

                <img
                    src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png"
                    alt="${forecast.description}"
                    width="60"
                    height="60"
                >

                <p class="forecast-temperature">
                    ${Math.round(
                        forecast.temperature
                    )}&deg;C
                </p>

                <p>
                    ${forecast.description}
                </p>

            `;

            forecastContainer.appendChild(card);
        }
    );
}


/* =========================================
   MEMBER LEVEL
   ========================================= */

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}


/* =========================================
   RANDOM SPOTLIGHT SELECTION
   ========================================= */

function getRandomMembers(members, number) {

    const shuffled =
        [...members].sort(
            () => Math.random() - 0.5
        );

    return shuffled.slice(0, number);
}


/* =========================================
   DISPLAY SPOTLIGHTS
   ========================================= */

function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach((member) => {

        const card =
            document.createElement("article");

        card.classList.add(
            "spotlight-card"
        );


        card.innerHTML = `

            <div class="spotlight-header">

                <h3>
                    ${member.name}
                </h3>

                <p>
                    ${member.tagline}
                </p>

            </div>


            <div class="spotlight-body">

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="100"
                    height="100"
                >


                <div class="spotlight-details">

                    <p>
                        <strong>Address:</strong>
                        ${member.address}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${member.phone}
                    </p>

                    <p>
                        <strong>Website:</strong>
                        <a
                            href="${member.website}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website
                        </a>
                    </p>

                    <span class="membership-level">
                        ${getMembershipLevel(
                            member.membershipLevel
                        )}
                    </span>

                </div>

            </div>
        `;


        spotlightContainer.appendChild(card);
    });
}


/* =========================================
   FETCH MEMBERS
   ========================================= */

async function getSpotlights() {

    try {

        const response =
            await fetch("data/members.json");


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );
        }


        const members =
            await response.json();


        /*
            Only Gold and Silver members
            are eligible for spotlights.
        */

        const eligibleMembers =
            members.filter(
                (member) =>
                    member.membershipLevel === 2 ||
                    member.membershipLevel === 3
            );


        /*
            Randomly select 2 or 3 members.
        */

        const numberOfSpotlights =
            Math.random() < 0.5 ? 2 : 3;


        const selectedMembers =
            getRandomMembers(
                eligibleMembers,
                numberOfSpotlights
            );


        displaySpotlights(
            selectedMembers
        );


    } catch (error) {

        console.error(
            "Unable to load member spotlights:",
            error
        );


        spotlightContainer.innerHTML = `

            <p class="error-message">
                Sorry, member spotlights could not
                be loaded at this time.
            </p>

        `;
    }
}


/* =========================================
   INITIALIZE HOME PAGE
   ========================================= */

getWeather();

getSpotlights();