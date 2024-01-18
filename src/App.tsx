import React from "react";
import IpFormComponent from "@components/Ip/IpForm/IpFormComponent";
import IpInfoComponent from "@components/Ip/IpInfo/IpInfoComponent";
import MapComponent from "@components/Map/MapComponent";
import { IpProvider } from "@store/Context";
import GlobalStyle from "@styles/GlobalStyle";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <IpProvider>
        <GlobalStyle />
        <IpFormComponent />
        <IpInfoComponent />
        <MapComponent />
      </IpProvider>
    </>
  );
}

export default App;
