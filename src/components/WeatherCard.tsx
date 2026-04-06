import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
}

const conditionIcon = (condition: string) => {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return <CloudRain className="w-8 h-8 text-primary" />;
  if (c.includes("snow")) return <CloudSnow className="w-8 h-8 text-foreground/80" />;
  if (c.includes("thunder") || c.includes("storm")) return <CloudLightning className="w-8 h-8 text-accent" />;
  if (c.includes("cloud") || c.includes("overcast")) return <Cloud className="w-8 h-8 text-muted-foreground" />;
  if (c.includes("wind")) return <Wind className="w-8 h-8 text-primary" />;
  return <Sun className="w-8 h-8 text-accent" />;
};

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use a free weather API (wttr.in) - no API key needed
    fetch("https://wttr.in/?format=j1")
      .then((r) => r.json())
      .then((data) => {
        const current = data.current_condition?.[0];
        const area = data.nearest_area?.[0];
        if (current) {
          setWeather({
            temp: parseInt(current.temp_C),
            condition: current.weatherDesc?.[0]?.value || "Clear",
            city: area?.areaName?.[0]?.value || "Unknown",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback
        setWeather({ temp: 22, condition: "Partly Cloudy", city: "Your City" });
        setLoading(false);
      });
  }, []);

  return (
    <div className="glass rounded-2xl p-5 aqua-shadow">
      <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Weather
      </h3>
      {loading ? (
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="w-16 h-4 bg-muted rounded" />
            <div className="w-24 h-3 bg-muted rounded" />
          </div>
        </div>
      ) : weather ? (
        <div className="flex items-center gap-4">
          {conditionIcon(weather.condition)}
          <div>
            <p className="text-3xl font-display font-bold text-foreground">{weather.temp}°C</p>
            <p className="text-sm font-body text-muted-foreground">
              {weather.condition} · {weather.city}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherCard;
