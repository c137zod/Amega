import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useIp } from "@store/Context";
import defaultIcon from "@middleware/marker";
import Text from "@styles/Text";
import { Container, MapStyles } from "./MapComponent.styled";

const MapComponent: React.FC = () => {
  const { location } = useIp();
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  useEffect(() => {
    if (location.lat !== 0 || location.lng !== 0) {
      setIsLocationLoaded(true);
    } else {
      setIsLocationLoaded(false);
    }
  }, [location]);

  return (
    <Container>
      {isLocationLoaded ? (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          style={MapStyles}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]} icon={defaultIcon}>
            <Popup>Location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
};

export default MapComponent;
