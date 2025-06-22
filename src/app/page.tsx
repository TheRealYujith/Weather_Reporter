'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('Colombo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data = await res.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, [city]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-gray-900 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">🌤️ Weather App</h1>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Enter city name"
        />

        {loading && <p className="text-center text-blue-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {weather && !loading && (
          <div className="bg-white rounded-xl shadow-md p-5 text-center space-y-3 animate-fade-in">
            <h2 className="text-xl font-semibold">{weather.location.name}</h2>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="mx-auto"
            />
            <p className="text-lg">{weather.current.condition.text}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-left">
              <p>🌡️ Temp: <span className="font-medium">{weather.current.temp_c}°C</span></p>
              <p>💧 Humidity: <span className="font-medium">{weather.current.humidity}%</span></p>
              <p>💨 Wind: <span className="font-medium">{weather.current.wind_kph} km/h</span></p>
              <p>🌞 UV Index: <span className="font-medium">{weather.current.uv}</span></p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

