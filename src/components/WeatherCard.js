// WeatherCard.js
import React from "react";

const WeatherCard = ({
  day,
  date,
  temperature,
  weatherType,
  additionalInfo,
  icon,
}) => {
  // Inline styles
  const cardStyle = {
    borderRadius: "20px",
    background: "linear-gradient(to bottom right, #3399ff, #66ccff)",
    padding: "20px",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    margin: "10px auto",
    textAlign: "center",
  };

  const dateInfoStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
  };

  const temperatureInfoStyle = {
    fontSize: "2.5em",
    fontWeight: "bold",
    margin: "10px 0",
  };

  const additionalInfoStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px 0",
  };

  return (
    <div style={cardStyle}>
      <div style={dateInfoStyle}>
        {day}, {date}
      </div>
      <div style={temperatureInfoStyle}>{temperature}</div>

      <div>{weatherType}</div>
      {icon && (
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather icon"
        />
      )}

      <div style={additionalInfoStyle}>
        {additionalInfo.map((info) => (
          <p key={info.label}>
            {info.label}: {info.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
