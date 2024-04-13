import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Typography, useTheme, Box, Divider } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import FlexBetween from "../components/FlexBetween.jsx";
import LocationSearch from "../components/LocationSearch.jsx";

const WeatherWidget = () => {
  const [location, setLocation] = useState({ name: "Christchurch", lat: "-43.532", lng: "172.6366" });
  const [feelsLike, setFeelsLike] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDegree, setWindDegree] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const lat = location.lat;
  const lon = location.lng;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;


  useEffect(() => {
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      if (!response.ok) {
        console.log(response);
        return;
      }
      const data = await response.json();
      setFeelsLike(Math.floor(data.main.feels_like - 273.15));
      setWindSpeed(Math.floor(data.wind.speed * 3.6));
      setWindDegree(data.wind.deg);
      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  handleSearch();
}, [lat, lon, apiKey]);

const windDirection = (windDegree) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((windDegree % 360) / 45);
  return directions[index];
};

  console.log(feelsLike, windSpeed, humidity, pressure);

  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween gap="1rem" m="1rem 0">
        <Typography color={main} variant="h3" fontWeight="500">
          Current Weather
        </Typography>
      </FlexBetween>

      <Box m="1rem 0">
        <LocationSearch setLocation={setLocation} />
      </Box>

      <Divider />

      <FlexBetween m="1rem 0">
        <FlexBetween gap="1rem">
          <ThermostatIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            Feels like
          </Typography>
        </FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          {feelsLike}°C
        </Typography>
      </FlexBetween>

      <Divider />

      <FlexBetween m="1rem 0">
        <FlexBetween gap="1rem">
          <AirIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            Wind
          </Typography>
        </FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          {windSpeed}km/h {windDirection(windDegree)}
        </Typography>
      </FlexBetween>

      <Divider />

      <FlexBetween m="1rem 0">
        <FlexBetween gap="1rem">
          <OpacityIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            Humidity
          </Typography>
        </FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          {humidity}%
        </Typography>
      </FlexBetween>

      <Divider />

      <FlexBetween m="1rem 0">
        <FlexBetween gap="1rem">
          <SpeedIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            Pressure
          </Typography>
        </FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          {pressure}hPa
        </Typography>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default WeatherWidget;
