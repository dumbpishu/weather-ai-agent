import axios from "axios";

function simplifyLocation(location) {
  const parts = location.split(",");

  const attempts = [];

  attempts.push(location.trim());

  if (parts.length > 1) {
    attempts.push(
      parts.slice(1).join(",").trim()
    );
  }

  if (parts.length > 2) {
    attempts.push(parts[1].trim());
  }

  attempts.push(parts[parts.length - 1].trim());

  return [...new Set(attempts)];
}

export async function getCoordinates(location) {
  const attempts = simplifyLocation(location);

  for (const attempt of attempts) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      attempt
    )}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`;

    const res = await axios.get(url);

    if (res.data && res.data.length > 0) {
      return {
        lat: res.data[0].lat,
        lon: res.data[0].lon,
        name: res.data[0].name,
      };
    }
  }

  throw new Error("Location not found");
}