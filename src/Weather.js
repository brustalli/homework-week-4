import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function handleSearch(event) {
    event.preventDefault();
    let apiKey = `9c9113d065806620d583cdfa492f9ff6`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Enter a city here"
        onChange={updateCity}
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );

  let defaultCity = (
    <div>
      <p>Rio de Janeiro</p>
      <ul>
        <li>Temperature: 19°C</li>
        <li>Wind:5 km/h</li>
        <li>Humidity: 20%</li>
      </ul>
    </div>
  );
  if (city) {
    return (
      <div>
        {form}
        {defaultCity}
      </div>
    );
  } else {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature:{Math.round(weather.temperature)}°C</li>
          <li>Wind:{weather.wind}km/h</li>
          <li>Humidity:{weather.humidity}%</li>
          <li>
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
      </div>
    );
  }
}
