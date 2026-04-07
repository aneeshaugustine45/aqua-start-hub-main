import { initSettings } from "./js/settings.js?v=2";
import { initTime } from "./js/time.js?v=2";
import { initSearch } from "./js/search.js?v=2";
import { initWeather } from "./js/weather.js?v=2";
import { initTodo } from "./js/todo.js?v=2";
import { initFavorites } from "./js/favorites.js?v=2";

const runSafe = (name, fn) => {
  try {
    fn();
    console.log(`[AquaStart] ${name} initialized.`);
  } catch (err) {
    console.error(`[AquaStart] Error initializing ${name}:`, err);
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:40px;left:0;right:0;background:orange;color:white;z-index:99999;padding:10px;';
    el.innerText = 'Init Error [' + name + ']: ' + err.message;
    document.body.appendChild(el);
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
