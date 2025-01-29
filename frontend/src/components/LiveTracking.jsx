import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState, useRef, useCallback } from "react";
import { loadGoogleMapsApi } from "../utils/loadGoogleMapsApi";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const defaultPosition = {
  lat: 23.0225, // Default to Ahmedabad
  lng: 72.5714
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const mapRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported");
      return;
    }

    const getPositionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationError(null);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setLocationError(error.message);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000, // Increased timeout
          maximumAge: 10000,
        }
      );
    });

    try {
      const position = await getPositionPromise;
      setCurrentPosition(position);
    } catch (error) {
      // If location fails, retry after delay
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = setTimeout(() => {
        getLocation();
      }, 5000);
    }
  }, []);

  useEffect(() => {
    getLocation();
    const intervalId = setInterval(getLocation, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(retryTimeoutRef.current);
    };
  }, [getLocation]);

  useEffect(() => {
    loadGoogleMapsApi(import.meta.env.VITE_GOOGLE_MAPS_API)
      .then(() => setMapLoaded(true))
      .catch((error) => console.error("Error loading Google Maps API:", error));

    return () => clearTimeout(retryTimeoutRef.current);
  }, []);

  if (!mapLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {locationError && (
        <div style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '8px 16px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Using default location. Error: {locationError}
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          draggable: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
        }}
        onLoad={(map) => (mapRef.current = map)}
      >
        <MarkerF
          position={currentPosition}
          icon={{
            url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
            scaledSize: { width: 25, height: 37 },
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default LiveTracking;
