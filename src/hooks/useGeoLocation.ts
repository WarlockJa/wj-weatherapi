// requesting access to the geolocation data for the user
// returns geolocation data
// returns undefined on error, access denied, or method is unsupported by the browser
// geolocation data may be delayed if user provides manual authorization
import { useEffect } from "react";
import { useGeoLocationUpdate } from "@context/GeolocationProvider";

export default function useGeoLocation() {
  const updateGeolocation = useGeoLocationUpdate();

  useEffect(() => {
    // checking if geolocation supported by the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateGeolocation(position.coords);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // display an error if geolocation is not supported
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
}
