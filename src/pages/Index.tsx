import oceanBg from "@/assets/ocean-bg.jpg";
import TimeGreeting from "@/components/TimeGreeting";
import SearchBar from "@/components/SearchBar";
import FavoritesGrid from "@/components/FavoritesGrid";
import WeatherCard from "@/components/WeatherCard";
import TodoList from "@/components/TodoList";
import SettingsPanel, { useSettings } from "@/components/SettingsPanel";

const Index = () => {
  const { settings, update } = useSettings();
  const bgSrc = settings.bgUrl || oceanBg;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <img
        src={bgSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/60" />

      {/* Settings */}
      <SettingsPanel settings={settings} onUpdate={update} />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        {/* Time + Greeting */}
        <div className="flex justify-center pt-8 pb-6">
          <TimeGreeting name={settings.name} />
        </div>

        {/* Search */}
        <div className="py-6">
          <SearchBar />
        </div>

        {/* Weather + Todo Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <WeatherCard />
          <TodoList />
        </div>

        {/* Favorites */}
        <div className="mt-6">
          <FavoritesGrid />
        </div>
      </div>
    </div>
  );
};

export default Index;
