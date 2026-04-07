import { initSettings } from "./js/settings.js";
import { initTime } from "./js/time.js";
import { initSearch } from "./js/search.js";
import { initWeather } from "./js/weather.js";
import { initTodo } from "./js/todo.js";
import { initFavorites } from "./js/favorites.js";

const runSafe = (name, fn) => {
  try {
    fn();
    console.log(`[AquaStart] ${name} initialized.`);
  } catch (err) {
    console.error(`[AquaStart] Error initializing ${name}:`, err);
  }
};

const initAll = () => {
  runSafe("Settings", initSettings);
  runSafe("Time", initTime);
  runSafe("Search", initSearch);
  runSafe("Weather", initWeather);
  runSafe("Todo", initTodo);
  runSafe("Favorites", initFavorites);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
