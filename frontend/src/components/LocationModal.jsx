
import PropType from "prop-types";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton, Modal, useMediaQuery } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

export const LocationModal = ({ gameId }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { token } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const handleClose = () => setOpen(false);

  const handleOpen = async () => {
    try {
      const response = await fetch(`http://localhost:8080/games/${gameId}`, {
        method: "GET",
        headers: {
          Authorisation: token,
        },
      });
      const game = await response.json();
      setLat(game.locationLat);
      setLng(game.locationLng);
      setOpen(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [center]);


  return (
    <>
      <IconButton onClick={handleOpen}>
        <FmdGoodOutlinedIcon fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoaded && lat && lng ? (
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
            >
              <Marker position={center} />
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </Box>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

LocationModal.propTypes = {
  gameId: PropType.string,
};
