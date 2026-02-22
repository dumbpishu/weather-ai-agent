import axios from "axios";
import { getCoordinates } from "../utils/getCoordinates.js";

export async function getForecast(location) {
  const {lat, lon, name } = await getCoordinates(location);

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;

  const res = await axios.get(url);

  const forecasts = res.data.list.map((item) => ({
    date: item.dt_txt,
    temp: item.main.temp,
    condition: item.weather[0].description,
    rain: item.rain?.["3h"] || 0,
  }));

  return { city: name, forecasts };
}