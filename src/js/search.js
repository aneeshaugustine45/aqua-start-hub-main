const engines = [
  { id: "google", label: "Google", url: "https://www.google.com/search?q=", icon: "G" },
  { id: "bing", label: "Bing", url: "https://www.bing.com/search?q=", icon: "B" },
  { id: "duck", label: "DuckDuckGo", url: "https://duckduckgo.com/?q=", icon: "D" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/results?search_query=", icon: "Y" },
];

export function initSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const toggle = document.getElementById("search-engine-toggle");
  const dropdown = document.getElementById("engine-dropdown");
  const currentIcon = document.getElementById("current-engine-icon");

  let engineIdx = 0;
  const saved = localStorage.getItem("aquastart-engine");
  if (saved) engineIdx = parseInt(saved) || 0;

  const updateEngine = (idx) => {
    engineIdx = idx;
    localStorage.setItem("aquastart-engine", engineIdx.toString());
    const eng = engines[engineIdx];
    currentIcon.textContent = eng.icon;
    input.placeholder = `Search with ${eng.label}...`;
  };

  updateEngine(engineIdx);

  // Toggle Dropdown
  toggle.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  // Click outside to close
  document.addEventListener("mousedown", (e) => {
    if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  // Render Dropdown Items
  engines.forEach((eng, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "w-full px-4 py-2.5 text-left text-sm flex items-center gap-3";
    btn.innerHTML = `<span class="engine-icon bg-primary-muted text-primary">${eng.icon}</span> <span class="text-foreground">${eng.label}</span>`;
    btn.addEventListener("click", () => {
      updateEngine(idx);
      dropdown.classList.add("hidden");
      input.focus();
    });
    dropdown.appendChild(btn);
  });

  // Handle Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      window.open(engines[engineIdx].url + encodeURIComponent(query), "_blank");
      input.value = "";
    }
  });

  // Keyboard shortcut '/'
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });
}
