import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react";

interface WeatherData {
  temperature: number;
  weathercode: number;
}

interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  weathercode: number;
}

export function WeatherWidget({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Flag to prevent state updates if component unmounts
    let isMounted = true;
    
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(false);
        // Using Open-Meteo free API with forecast data
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
        );
        if (!response.ok) throw new Error("Failed to fetch weather");
        
        const data = await response.json();
        
        if (isMounted) {
          setWeather({
            temperature: data.current_weather.temperature,
            weathercode: data.current_weather.weathercode,
          });
          
          // Process forecast data (next 5 days)
          const forecastDays = data.daily.time.slice(0, 5).map((date: string, idx: number) => ({
            date,
            minTemp: data.daily.temperature_2m_min[idx],
            maxTemp: data.daily.temperature_2m_max[idx],
            weathercode: data.daily.weather_code[idx],
          }));
          
          setForecast(forecastDays);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [lat, lng]);

  const getWeatherIcon = (code: number) => {
    // WMO Weather interpretation codes
    if (code === 0) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (code >= 1 && code <= 3) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 45 && code <= 48) return <CloudFog className="w-8 h-8 text-gray-500" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-blue-200" />;
    if (code >= 95 && code <= 99) return <CloudLightning className="w-8 h-8 text-yellow-600" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  const getWeatherString = (code: number) => {
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown";
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Live Weather: {name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex animate-pulse space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-sm text-destructive">Failed to load weather data.</div>
        ) : weather ? (
          <>
            {/* Current Weather */}
            <div className="flex items-center gap-4 pb-4 border-b">
              {getWeatherIcon(weather.weathercode)}
              <div>
                <div className="text-3xl font-bold">{weather.temperature}°C</div>
                <div className="text-sm text-muted-foreground">{getWeatherString(weather.weathercode)}</div>
              </div>
            </div>

            {/* Forecast */}
            <div>
              <h4 className="text-sm font-semibold mb-2">5-Day Forecast</h4>
              <div className="grid grid-cols-5 gap-2">
                {forecast.map((day, idx) => (
                  <div key={idx} className="rounded-lg bg-muted p-2 text-center text-xs">
                    <div className="font-semibold mb-1">{formatDate(day.date)}</div>
                    <div className="flex justify-center mb-1">
                      {getWeatherIcon(day.weathercode)}
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">{Math.round(day.maxTemp)}°</div>
                      <div className="text-muted-foreground">{Math.round(day.minTemp)}°</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
