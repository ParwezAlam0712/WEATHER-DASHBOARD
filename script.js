const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const output = document.getElementById('output');

const API_KEY = 'f7ea9291f132d40f1f6e27c35f6cb54e';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    output.textContent = 'Please enter a city name.';
    return;
  }

  output.textContent = 'Loading...';

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);


    if (!res.ok) {
      throw new Error('City not found');
    }

    const data = await res.json();

    let weatherIcon = "🌤️";

    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon = "☀️";
        break;
      case "Clouds":
        weatherIcon = "☁️";
        break;
      case "Rain":
        weatherIcon = "🌧️";
        break;
      case "Thunderstorm":
        weatherIcon = "⛈️";
        break;
      case "Snow":
        weatherIcon = "❄️";
        break;
      case "Mist":
        weatherIcon = "🌫️";
        break;
    }

    output.innerHTML = `
     <h3>${data.name}, ${data.sys.country}</h3>


     <P><strong>🌡️ Temperature:</strong> ${data.main.temp} °C</p>
     <p><strong>🌤️ Weather:</strong> ${data.weather[0].description} ${weatherIcon}</p>
     <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
     <p><strong>🌬️ Wind Speed:</strong> ${data.wind.speed} m/s</p>
`;
  } catch (err) {
    output.textContent = `Error: ${err.message}`;
  }
});