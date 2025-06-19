'use client';

import { useEffect, useState } from 'react';
import { fetchWeather } from '../lib/fetchWeather';

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
        const data = await fetchWeather(city);
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
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌤️ Weather in {city}</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 mb-4 w-full rounded"
        placeholder="Enter city name"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && !loading && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <p>🌡️ Temperature: {weather.current.temp_c}°C</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>💨 Wind Speed: {weather.current.wind_kph} km/h</p>
          <p>🌞 UV Index: {weather.current.uv}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
          <p>{weather.current.condition.text}</p>
        </div>
      )}
    </main>
  );
}

