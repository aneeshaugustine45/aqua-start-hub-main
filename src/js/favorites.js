import { ICONS } from "./icons.js";

const defaultFavorites = [
  { id: "1", label: "YouTube", url: "https://youtube.com" },
  { id: "2", label: "GitHub", url: "https://github.com" },
  { id: "3", label: "Twitter", url: "https://twitter.com" },
  { id: "4", label: "Reddit", url: "https://reddit.com" },
  { id: "5", label: "Gmail", url: "https://mail.google.com" },
  { id: "6", label: "ChatGPT", url: "https://chat.openai.com" },
  { id: "7", label: "Spotify", url: "https://spotify.com" },
  { id: "8", label: "Netflix", url: "https://netflix.com" },
];

const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
};

export function initFavorites() {
  const grid = document.getElementById("favorites-grid");
  const addForm = document.getElementById("favorites-add-form");
  const labelInput = document.getElementById("fav-label");
  const urlInput = document.getElementById("fav-url");
  const btnAdd = document.getElementById("btn-fav-add");
  const btnCancel = document.getElementById("btn-fav-cancel");

  let favorites = [...defaultFavorites];
  const saved = localStorage.getItem("aquastart-favorites");
  if (saved) {
    try { favorites = JSON.parse(saved); } catch {}
  }

  const save = () => {
    localStorage.setItem("aquastart-favorites", JSON.stringify(favorites));
    render();
  };

  const showAddForm = () => {
    addForm.classList.remove("hidden");
  };

  const hideAddForm = () => {
    addForm.classList.add("hidden");
    labelInput.value = "";
    urlInput.value = "";
  };

  const render = () => {
    grid.innerHTML = "";

    favorites.forEach((fav) => {
      const a = document.createElement("a");
      a.href = fav.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "fav-item";

      const delBtn = document.createElement("button");
      delBtn.className = "fav-delete";
      delBtn.innerHTML = ICONS.x;
      delBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        favorites = favorites.filter((f) => f.id !== fav.id);
        save();
      });

      const iconDiv = document.createElement("div");
      iconDiv.className = "fav-icon";
      const img = document.createElement("img");
      img.src = getFaviconUrl(fav.url);
      img.alt = fav.label;
      img.loading = "lazy";
      iconDiv.appendChild(img);

      const span = document.createElement("span");
      span.className = "fav-label";
      span.textContent = fav.label;

      a.appendChild(delBtn);
      a.appendChild(iconDiv);
      a.appendChild(span);
      grid.appendChild(a);
    });

    const addBtn = document.createElement("button");
    addBtn.className = "fav-add-btn";
    addBtn.innerHTML = `<div class="fav-add-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></div><span class="fav-add-label">Add</span>`;
    addBtn.addEventListener("click", showAddForm);
    grid.appendChild(addBtn);
  };

  btnAdd.addEventListener("click", () => {
    const label = labelInput.value.trim();
    const rawUrl = urlInput.value.trim();
    if (label && rawUrl) {
      const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
      favorites.push({ id: Date.now().toString(), label, url });
      hideAddForm();
      save();
    }
  });

  btnCancel.addEventListener("click", hideAddForm);

  render();
}
