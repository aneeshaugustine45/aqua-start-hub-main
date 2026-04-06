import { useState, useEffect } from "react";
import { Settings, Sun, Moon, Image, User, X } from "lucide-react";

interface SettingsData {
  name: string;
  theme: "dark" | "light";
  bgUrl: string;
}

const defaultSettings: SettingsData = {
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

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData>(() => {
    const saved = localStorage.getItem("aquastart-settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const update = (partial: Partial<SettingsData>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    localStorage.setItem("aquastart-settings", JSON.stringify(next));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    document.documentElement.classList.toggle("light", settings.theme === "light");
  }, [settings.theme]);

  return { settings, update };
};

interface Props {
  settings: SettingsData;
  onUpdate: (partial: Partial<SettingsData>) => void;
}

const SettingsPanel = ({ settings, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 right-5 z-50 w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-foreground/10 transition-all"
      >
        <Settings className="w-5 h-5 text-foreground/70" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative glass-strong rounded-2xl p-6 w-full max-w-md aqua-shadow space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Settings</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4" /> Your Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-lg bg-input text-foreground text-sm font-body placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <label className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                {settings.theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Theme
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate({ theme: "dark" })}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${
                    settings.theme === "dark"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:opacity-80"
                  }`}
                >
                  <Moon className="w-4 h-4 inline mr-2" />Dark
                </button>
                <button
                  onClick={() => onUpdate({ theme: "light" })}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${
                    settings.theme === "light"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:opacity-80"
                  }`}
                >
                  <Sun className="w-4 h-4 inline mr-2" />Light
                </button>
              </div>
            </div>

            {/* Background */}
            <div className="space-y-2">
              <label className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Image className="w-4 h-4" /> Background
              </label>
              <div className="grid grid-cols-3 gap-2">
                {bgPresets.map((bg) => (
                  <button
                    key={bg.label}
                    onClick={() => onUpdate({ bgUrl: bg.url })}
                    className={`py-2 px-3 rounded-lg text-xs font-body font-medium transition-all ${
                      settings.bgUrl === bg.url
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:opacity-80"
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="Custom image URL…"
                  className="flex-1 px-3 py-2 rounded-lg bg-input text-foreground text-xs font-body placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/40"
                />
                <button
                  onClick={() => {
                    if (customUrl.trim()) onUpdate({ bgUrl: customUrl.trim() });
                  }}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-body font-medium hover:opacity-90 transition-opacity"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;
