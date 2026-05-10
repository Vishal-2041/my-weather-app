const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => getWeather());
cityInput.addEventListener("keypress", (e) => { if (e.key === "Enter") getWeather(); });

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  // We pull the key from the CONFIG object created in config.js
  const apiKey = CONFIG.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&_=${Date.now()}`;

  try {
    weatherResult.innerHTML = "<p>Updating...</p>";
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherResult.innerHTML = `<p style="color: red;">${data.message}</p>`;
      return;
    }

    weatherResult.innerHTML = `
      <div style="padding: 10px;">
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h3 style="font-size: 2.5rem; margin: 0;">${data.main.temp.toFixed(1)}°C</h3>
        <p style="text-transform: capitalize;">${data.weather[0].description}</p>
        <div style="display: flex; justify-content: space-around; margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
          <span>Humidity: ${data.main.humidity}%</span>
          <span>Wind: ${data.wind.speed} m/s</span>
        </div>
      </div>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>Error loading data.</p>`;
  }
}
