// WeatherForecast.js
import React from "react";

const WeatherForecast = ({ forecastData, onDayClick }) => {
  const forecastContainerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px 0",
    overflow: "auto",
  };

  const dayForecastStyle = {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: "0 10px",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const dayStyle = {
    fontSize: "0.85em",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const tempStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  const minMaxStyle = {
    fontSize: "0.75em",
    color: "#555",
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <div style={forecastContainerStyle}>
        {forecastData.map((forecast, index) => (
          <div
            key={index}
            style={dayForecastStyle}
            onClick={() => onDayClick(forecast)}
          >
            <div style={dayStyle}>{forecast.date}</div>
            <img
              style={{ height: "50px", margin: "10px 0" }}
              src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
              alt={forecast.weatherType}
            />
            <div style={tempStyle}>{forecast.temp}°C</div>
            <div style={minMaxStyle}>
              Min: {forecast.minTemp}°C | Max: {forecast.maxTemp}°C
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
