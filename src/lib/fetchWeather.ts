export async function fetchWeather(city: string) {
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await res.json();
  return data;
}