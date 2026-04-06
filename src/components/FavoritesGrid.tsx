import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

interface Favorite {
  id: string;
  label: string;
  url: string;
}

const defaultFavorites: Favorite[] = [
  { id: "1", label: "YouTube", url: "https://youtube.com" },
  { id: "2", label: "GitHub", url: "https://github.com" },
  { id: "3", label: "Twitter", url: "https://twitter.com" },
  { id: "4", label: "Reddit", url: "https://reddit.com" },
  { id: "5", label: "Gmail", url: "https://mail.google.com" },
  { id: "6", label: "ChatGPT", url: "https://chat.openai.com" },
  { id: "7", label: "Spotify", url: "https://spotify.com" },
  { id: "8", label: "Netflix", url: "https://netflix.com" },
];

const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
};

const FavoritesGrid = () => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem("aquastart-favorites");
    return saved ? JSON.parse(saved) : defaultFavorites;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const save = (items: Favorite[]) => {
    setFavorites(items);
    localStorage.setItem("aquastart-favorites", JSON.stringify(items));
  };

  const addFavorite = () => {
    if (!newLabel || !newUrl) return;
    const url = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
    save([...favorites, { id: Date.now().toString(), label: newLabel, url }]);
    setNewLabel("");
    setNewUrl("");
    setShowAdd(false);
  };

  const removeFavorite = (id: string) => {
    save(favorites.filter((f) => f.id !== id));
  };

  return (
    <div className="glass rounded-2xl p-5 aqua-shadow">
      <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Favorites
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {favorites.map((fav) => (
          <a
            key={fav.id}
            href={fav.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-foreground/5 transition-all duration-200"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFavorite(fav.id);
              }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden">
              <img
                src={getFaviconUrl(fav.url)}
                alt={fav.label}
                className="w-6 h-6"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-body text-foreground/80 truncate max-w-full">
              {fav.label}
            </span>
          </a>
        ))}

        <button
          onClick={() => setShowAdd(true)}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-border hover:border-primary/40 hover:bg-foreground/5 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-xs font-body text-muted-foreground">Add</span>
        </button>
      </div>

      {showAdd && (
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="px-3 py-2 rounded-lg bg-input text-foreground text-sm font-body placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/40"
          />
          <input
            type="text"
            placeholder="URL (e.g. google.com)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="px-3 py-2 rounded-lg bg-input text-foreground text-sm font-body placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/40"
          />
          <div className="flex gap-2">
            <button
              onClick={addFavorite}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body font-medium hover:opacity-90 transition-opacity"
            >
              Add
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-body hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesGrid;
