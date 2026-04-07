const defaultSettings = {
  name: "Explorer",
  theme: "dark",
  bgUrl: "",
};

const bgPresets = [
  { label: "Ocean", url: "" },
  { label: "Mountains", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
  { label: "Forest", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" },
  { label: "Night Sky", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80" },
  { label: "Aurora", url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80" },
  { label: "Desert", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&q=80" },
];

let currentSettings = { ...defaultSettings };
const listeners = [];

export function initSettings() {
  const saved = localStorage.getItem("aquastart-settings");
  if (saved) {
    try {
      currentSettings = { ...defaultSettings, ...JSON.parse(saved) };
    } catch {}
  }
  
  applyTheme();
  applyBackground();
  
  // UI Bindings
  const toggleBtn = document.getElementById("settings-toggle");
  const closeBtn = document.getElementById("settings-close");
  const modal = document.getElementById("settings-modal");
  const backdrop = document.getElementById("settings-backdrop");

  const openModal = () => modal.classList.remove("hidden");
  const closeModal = () => modal.classList.add("hidden");

  toggleBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  // Name Input
  const nameInput = document.getElementById("setting-name");
  nameInput.value = currentSettings.name;
  nameInput.addEventListener("input", (e) => {
    updateSettings({ name: e.target.value });
  });

  // Theme Buttons
  const themeDark = document.getElementById("theme-dark");
  const themeLight = document.getElementById("theme-light");
  
  const updateThemeButtons = () => {
    themeDark.classList.toggle("active", currentSettings.theme === "dark");
    themeLight.classList.toggle("active", currentSettings.theme === "light");
  };
  updateThemeButtons();

  themeDark.addEventListener("click", () => {
    updateSettings({ theme: "dark" });
    updateThemeButtons();
  });
  themeLight.addEventListener("click", () => {
    updateSettings({ theme: "light" });
    updateThemeButtons();
  });

  // Background Presets
  const bgContainer = document.getElementById("bg-presets-container");
  const renderPresets = () => {
    bgContainer.innerHTML = "";
    bgPresets.forEach(bg => {
      const btn = document.createElement("button");
      btn.textContent = bg.label;
      if (currentSettings.bgUrl === bg.url) btn.classList.add("active");
      btn.addEventListener("click", () => {
        updateSettings({ bgUrl: bg.url });
        renderPresets();
      });
      bgContainer.appendChild(btn);
    });
  };
  renderPresets();

  // Custom Background
  const customBgUrl = document.getElementById("setting-bg-url");
  const customBgSet = document.getElementById("btn-set-bg");
  customBgSet.addEventListener("click", () => {
    const val = customBgUrl.value.trim();
    if (val) {
      updateSettings({ bgUrl: val });
      renderPresets();
    }
  });
}

function updateSettings(partial) {
  currentSettings = { ...currentSettings, ...partial };
  localStorage.setItem("aquastart-settings", JSON.stringify(currentSettings));
  
  if (partial.theme) applyTheme();
  if (partial.bgUrl !== undefined) applyBackground();
  
  listeners.forEach(fn => fn(currentSettings));
}

export function subscribeSettings(fn) {
  listeners.push(fn);
  fn(currentSettings); // initial call
}

function applyTheme() {
  const html = document.documentElement;
  if (currentSettings.theme === "dark") {
    html.classList.add("dark");
    html.classList.remove("light");
  } else {
    html.classList.add("light");
    html.classList.remove("dark");
  }
}

function applyBackground() {
  const bgImg = document.getElementById("bg-img");
  // Default ocean background image if none
  bgImg.src = currentSettings.bgUrl || "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80";
}

export function getSettings() {
  return currentSettings;
}
