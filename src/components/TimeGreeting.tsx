import { useState, useEffect } from "react";

interface Props {
  name: string;
}

const getGreeting = (hour: number) => {
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const getEmoji = (hour: number) => {
  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "🌊";
  if (hour >= 17 && hour < 21) return "🌊";
  return "🌙";
};

const TimeGreeting = ({ name }: Props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const seconds = time.toLocaleTimeString([], { second: "2-digit" }).slice(-2);

  return (
    <div className="flex flex-col items-center gap-2 animate-float">
      <div className="font-display text-7xl md:text-8xl font-bold tracking-tight text-foreground text-glow">
        {timeStr}
        <span className="text-3xl md:text-4xl text-muted-foreground ml-1">{seconds}</span>
      </div>
      <p className="text-xl md:text-2xl font-body font-light text-foreground/80">
        {getGreeting(hour)}, {name} {getEmoji(hour)}
      </p>
    </div>
  );
};

export default TimeGreeting;
