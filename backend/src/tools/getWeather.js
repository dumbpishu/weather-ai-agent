import axios from "axios";
import { getCoordinates } from "../utils/getCoordinates.js";

export async function getWeather(location) {
  const { lat, lon, name } = await getCoordinates(
    location
  );

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;

  const res = await axios.get(url);

  return {
    city: name,
    temp: res.data.main.temp,
    humidity: res.data.main.humidity,
    condition: res.data.weather[0].description,
  };
}