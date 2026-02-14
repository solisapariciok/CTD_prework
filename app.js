const tempBtn = document.getElementById("tempNav");
const condBtn = document.getElementById("condNav");
const weatherDiv = document.getElementById("weather-data");
const title = document.getElementById("page-title");

// Example location: High Point, NC
const latitude = 35.9557;
const longitude = -80.0053;

function getWeatherDescription(code) {
  const codes = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    51: "Drizzle",
    61: "Rain",
    71: "Snow"
  };

  return codes[code] || "Unknown Condition";
}

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.current_weather;

  } catch (error) {
    weatherDiv.innerHTML = "Error retrieving weather data.";
    console.error(error);
  }
}

tempBtn.addEventListener("click", async () => {
  title.textContent = "Current Temperature";
  weatherDiv.textContent = "Loading...";

  const weather = await fetchWeather();
  if (weather) {
    weatherDiv.textContent = `Temperature: ${weather.temperature}°C`;
  }
});

condBtn.addEventListener("click", async () => {
  title.textContent = "Current Conditions";
  weatherDiv.textContent = "Loading...";

  const weather = await fetchWeather();
  if (weather) {
    const condition = getWeatherDescription(weather.weathercode);
    weatherDiv.textContent = `Condition: ${condition}`;
  }
});
