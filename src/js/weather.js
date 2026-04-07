import { ICONS } from "./icons.js";

const getConditionIcon = (condition) => {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return ICONS.cloudRain;
  if (c.includes("snow")) return ICONS.cloudSnow;
  if (c.includes("thunder") || c.includes("storm")) return ICONS.cloudLightning;
  if (c.includes("cloud") || c.includes("overcast")) return ICONS.cloud;
  if (c.includes("wind")) return ICONS.wind;
  return ICONS.sun;
};

export function initWeather() {
  const container = document.getElementById("weather-content");
  
  const renderLoading = () => {
    container.innerHTML = `<div class="text-muted" style="animation: pulse 2s infinite;">Loading weather...</div>`;
  };

  const renderWeather = (data) => {
    container.innerHTML = `
      <div class="weather-main">
        ${getConditionIcon(data.condition)}
        <div>
          <div class="weather-temp">${data.temp}°C</div>
          <div class="weather-desc">${data.condition} • ${data.city}</div>
        </div>
      </div>
    `;
  };

  renderLoading();

  fetch("https://wttr.in/?format=j1")
    .then(r => r.json())
    .then(data => {
      const current = data.current_condition?.[0];
      const area = data.nearest_area?.[0];
      if (current) {
        renderWeather({
          temp: parseInt(current.temp_C),
          condition: current.weatherDesc?.[0]?.value || "Clear",
          city: area?.areaName?.[0]?.value || "Unknown",
        });
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      renderWeather({ temp: 22, condition: "Partly Cloudy", city: "Your City" });
    });
}
