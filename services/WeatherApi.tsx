import axios from "axios";

const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const WeatherApi = {
  async fetchWeatherData(
    city: string,
    unitType: "metric" | "imperial" = "metric"
  ) {
    console.log(`Fetching weather data for ${city} with unit type ${unitType}`, EXPO_PUBLIC_BASE_URL);
    try {
      const url = `${EXPO_PUBLIC_BASE_URL}?q=${city}&units=${unitType}&appid=${EXPO_PUBLIC_API_KEY}`;
      const response = await axios.get(url);

      return response.data;
    } catch (err) {
      console.log("Failed to fetch weather data. Please try again.");
      return null;
    }
  },
};
