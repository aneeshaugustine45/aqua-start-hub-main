import { subscribeSettings } from "./settings.js";

const getGreeting = (hour) => {
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const getEmoji = (hour) => {
  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "🌊";
  if (hour >= 17 && hour < 21) return "🌊";
  return "🌙";
};

export function initTime() {
  const container = document.getElementById("time-greeting-container");
  let currentName = "Explorer";

  subscribeSettings((s) => {
    currentName = s.name;
    render();
  });

  function render() {
    const now = new Date();
    const hour = now.getHours();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const seconds = now.toLocaleTimeString([], { second: "2-digit" }).slice(-2);

    container.innerHTML = `
      <div class="time-display">
        ${timeStr}<span class="time-seconds">${seconds}</span>
      </div>
      <p class="greeting-text">
        ${getGreeting(hour)}, ${currentName} ${getEmoji(hour)}
      </p>
    `;
  };

  render();
  setInterval(render, 1000);
}
