import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";

export interface ContextType {
  ip: string;
  isp: string;
  location: {
    lat: number;
    lng: number;
  };
  setIp: (ip: string) => void;
  setIsp: (isp: string) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
}

const defaultState = {
  ip: "",
  isp: "",
  location: { lat: 0, lng: 0 },
  setIp: () => {},
  setIsp: () => {},
  setLocation: () => {},
};

const Context = createContext<ContextType>(defaultState);

export const useIp = () => useContext(Context);

export const IpProvider = ({ children }: { children: ReactNode }) => {
  const [ip, setIp] = useState<string>(defaultState.ip);
  const [isp, setIsp] = useState<string>(defaultState.isp);
  const [location, setLocation] = useState<{ lat: number; lng: number }>(
    defaultState.location
  );

  const contextValue = useMemo(() => {
    return { ip, isp, location, setIp, setIsp, setLocation };
  }, [ip, isp, location]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
