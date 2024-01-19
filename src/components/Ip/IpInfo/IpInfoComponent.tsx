import React, { useEffect, useState } from "react";
import { useIp } from "@store/Context";
import fetchIpAndLocation from "@services/fetchIpAndLocation";
import Text from "@styles/Text";
import { InfoContainer } from "./IpInfoComponent.styled";

const IpInfoComponent: React.FC = () => {
  const { ip, isp, setIp, setIsp, setLocation } = useIp();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIpAndLocation()
      .then(({ ip, isp, latitude, longitude }) => {
        setIp(ip);
        setIsp(isp);
        setLocation({ lat: latitude, lng: longitude });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("Error during IP and location fetch:", error.message);
          setError(error.message);
        } else {
          console.error(
            "An unknown error occurred during IP and location fetch"
          );
          setError("An unknown error occurred");
        }
      });
  }, [setIp, setIsp, setLocation]);

  return (
    <InfoContainer>
      <Text>IP: {ip}</Text>
      <Text>ISP: {isp}</Text>
      {error && <Text>Error: {error}</Text>}
    </InfoContainer>
  );
};

export default IpInfoComponent;
