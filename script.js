document.getElementById('searchBtn').addEventListener('click', function () {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (!city) {
        document.getElementById('weatherData').innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const apiKey = 'aea6331c293a2e38ee7ec8f5ceb870c5'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('weatherData').innerHTML = '<p>Loading...</p>';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].main.toLowerCase();
                let backgroundClass;

                switch (weatherDescription) {
                    case 'clear':
                        backgroundClass = 'sunny';
                        break;
                    case 'rain':
                    case 'drizzle':
                        backgroundClass = 'rainy';
                        break;
                    case 'clouds':
                        backgroundClass = 'cloudy';
                        break;
                    default:
                        backgroundClass = 'sunny'; // Default background
                }

                document.body.className = backgroundClass;

                const weatherInfo = `
                    <p>City: ${data.name}</p>
                    <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}"> ${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp} °C</p>
                `;
                document.getElementById('weatherData').innerHTML = weatherInfo;
            } else {
                document.getElementById('weatherData').innerHTML = '<p>City not found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('weatherData').innerHTML = '<p>Error fetching the weather data. Please try again.</p>';
            console.error('Error fetching the weather data:', error);
        });
});

// Dark mode toggle
document.getElementById('themeToggle').addEventListener('change', function () {
    document.body.classList.toggle('dark-theme');
});
