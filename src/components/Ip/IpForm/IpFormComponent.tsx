import React, { useRef } from "react";
import { useIp } from "@store/Context";
import fetchIpAndLocation, {
  IpLocationData,
} from "@services/fetchIpAndLocation";
import { isValidIp } from "@utils/isValidIp";
import Button from "@styles/Button";
import Input from "@styles/Input";
import { FormContainer } from "./IpFormComponent.styled";

const IpFormComponent: React.FC = () => {
  const ipRef = useRef<HTMLInputElement | null>(null);
  const { setIp, setIsp, setLocation } = useIp();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredIp = ipRef.current?.value || "";

    if (isValidIp(enteredIp)) {
      setLocation({
        lat: 0,
        lng: 0,
      });
      fetchIpAndLocation(enteredIp)
        .then((locationData: IpLocationData) => {
          setIp(locationData.ip);
          setIsp(locationData.isp);
          setLocation({
            lat: locationData.latitude,
            lng: locationData.longitude,
          });
        })
        .catch((error: Error) => {
          console.error("Error fetching location:", error);
        });
    } else {
      alert("Enter a valid IP address");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input type="text" ref={ipRef} placeholder="Enter IP address" />
      <Button type="submit">Find</Button>
    </FormContainer>
  );
};

export default IpFormComponent;
