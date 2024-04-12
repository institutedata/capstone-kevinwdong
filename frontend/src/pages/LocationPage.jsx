"use client";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box, useMediaQuery } from "@mui/material";



const LocationPage = () => {
  const { lat, lng } = useSelector((state) => state.location);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  console.log(lat, lng);

  const containerStyle = {
    width: "100%",
    height: "91vh",
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <Box
      width={isNonMobileScreens ? "80%" : "100%"}
      margin={isNonMobileScreens ? "2rem auto" : "0"}
    >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
    </Box>
  ) : (
    <></>
  );
};

export default LocationPage;
