import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import WeatherForecast from "./WeatherForecast";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("Toronto");
  const apiKey = "c4b3f4c0400e40d2a6f0a299ce885d7a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setCurrentWeather({
          ...weatherResponse.data,
          date: formatDate(weatherResponse.data.dt * 1000),
          windSpeed: weatherResponse.data.wind.speed,
          icon: weatherResponse.data.weather[0].icon,
        });

        const forecastResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        setForecastData(processForecastData(forecastResponse.data.list));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, apiKey]);

  const processForecastData = (forecastList) => {
    return forecastList
      .filter((_, index) => index % 8 === 0)
      .map((item) => ({
        date: formatDate(item.dt * 1000),
        temp: Math.round(item.main.temp),
        minTemp: Math.round(item.main.temp_min),
        maxTemp: Math.round(item.main.temp_max),
        weatherType: item.weather[0].main,
        icon: item.weather[0].icon,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      }));
  };

  const handleDayClick = (dayData) => {
    setSelectedWeather(dayData);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <WeatherCard
        day={selectedWeather ? selectedWeather.date : currentWeather?.date}
        temperature={
          selectedWeather
            ? `${selectedWeather.temp}°C`
            : `${Math.round(currentWeather?.main.temp)}°C`
        }
        weatherType={
          selectedWeather
            ? selectedWeather.weatherType
            : currentWeather?.weather[0].main
        }
        additionalInfo={[
          {
            label: "Humidity",
            value: `${
              selectedWeather
                ? selectedWeather.humidity
                : currentWeather?.main.humidity
            }%`,
          },
          {
            label: "Wind",
            value: `${
              selectedWeather
                ? selectedWeather.windSpeed
                : currentWeather?.wind?.speed ?? "N/A"
            } km/h`,
          },
          {
            label: "Pressure",
            value: `${
              selectedWeather
                ? selectedWeather.pressure
                : currentWeather?.main.pressure
            } hPa`,
          },
          {
            label: "Min Temp",
            value: `${
              selectedWeather
                ? selectedWeather.minTemp
                : Math.round(currentWeather?.main.temp_min)
            }°C`,
          },
          {
            label: "Max Temp",
            value: `${
              selectedWeather
                ? selectedWeather.maxTemp
                : Math.round(currentWeather?.main.temp_max)
            }°C`,
          },
        ]}
        icon={selectedWeather ? selectedWeather.icon : currentWeather?.icon}
      />
      <WeatherForecast
        forecastData={forecastData}
        onDayClick={handleDayClick}
      />
    </div>
  );
};

export default WeatherApp;
