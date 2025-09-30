import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.API_BASE_URL;

export const WeatherApi = {
  async fetchWeatherData(
    city: string,
    unitType: "metric" | "imperial" = "metric"
  ) {
    console.log(BASE_URL);
    try {
      const url = `${BASE_URL}?q=${city}&units=${unitType}&appid=${API_KEY}`;
      const response = await axios.get(url);

      return response.data;
    } catch (err) {
      console.log("Failed to fetch weather data. Please try again.");
      return null;
    }
  },
};
