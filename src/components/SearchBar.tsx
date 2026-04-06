import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

const engines = [
  { id: "google", label: "Google", url: "https://www.google.com/search?q=", icon: "G" },
  { id: "bing", label: "Bing", url: "https://www.bing.com/search?q=", icon: "B" },
  { id: "duck", label: "DuckDuckGo", url: "https://duckduckgo.com/?q=", icon: "D" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/results?search_query=", icon: "Y" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [engineIdx, setEngineIdx] = useState(() => {
    const saved = localStorage.getItem("aquastart-engine");
    return saved ? parseInt(saved) : 0;
  });
  const [showEngines, setShowEngines] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const engine = engines[engineIdx];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowEngines(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`${engine.url}${encodeURIComponent(query)}`, "_blank");
      setQuery("");
    }
  };

  const selectEngine = (idx: number) => {
    setEngineIdx(idx);
    localStorage.setItem("aquastart-engine", idx.toString());
    setShowEngines(false);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative group flex">
        {/* Engine selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowEngines(!showEngines)}
            className="h-full px-4 rounded-l-2xl glass border-r border-border flex items-center gap-1.5 text-sm font-body font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all"
          >
            <span className="w-5 h-5 rounded-md bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
              {engine.icon}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          {showEngines && (
            <div className="absolute top-full left-0 mt-2 glass-strong rounded-xl py-1 min-w-[160px] aqua-shadow z-50">
              {engines.map((eng, idx) => (
                <button
                  key={eng.id}
                  type="button"
                  onClick={() => selectEngine(idx)}
                  className={`w-full px-4 py-2.5 text-left text-sm font-body flex items-center gap-3 hover:bg-foreground/5 transition-colors ${
                    idx === engineIdx ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                    {eng.icon}
                  </span>
                  {eng.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search with ${engine.label}…`}
            className="w-full pl-12 pr-14 py-4 rounded-r-2xl glass border-l-0 text-foreground placeholder:text-muted-foreground text-lg font-body outline-none focus:ring-2 focus:ring-primary/40 transition-all aqua-shadow"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md font-mono">
            /
          </kbd>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
