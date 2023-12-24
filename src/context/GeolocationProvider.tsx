import { createContext, useContext, useState } from "react";

const Geolocation = createContext<GeolocationCoordinates | null>(null);
const GeolocationUpdate = createContext<
  (newGeolocation: GeolocationCoordinates) => void
>(null!);

export function useGeolocation() {
  return useContext(Geolocation);
}

export function useGeoLocationUpdate() {
  return useContext(GeolocationUpdate);
}

export default function GeolocationProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [geo, setGeo] = useState<GeolocationCoordinates | null>(null);

  function updateGeolocation(newGeolocation: GeolocationCoordinates) {
    setGeo(newGeolocation);
  }

  return (
    <Geolocation.Provider value={geo}>
      <GeolocationUpdate.Provider value={updateGeolocation}>
        {children}
      </GeolocationUpdate.Provider>
    </Geolocation.Provider>
  );
}
