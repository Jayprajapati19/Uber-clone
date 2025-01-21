import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        // Initialize GoMaps
        const initMap = () => {
            const mapInstance = new gomaps.Map(document.getElementById('map'), {
                center: { lat: 23.0225, lng: 72.5714 }, // Default to Ahmedabad
                zoom: 15,
                mapTypeControl: false,
                fullscreenControl: false
            });
            setMap(mapInstance);
        };

        // Load GoMaps script
        const script = document.createElement('script');
        script.src = 'https://maps.gomaps.pro/maps/api/js?key=AlzaSyjC65tR83Ij8isSZU6q3S_pEfZOkcwmFKJ';
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (navigator.geolocation && map) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newPosition = { lat: latitude, lng: longitude };
                    setCurrentPosition(newPosition);

                    // Update marker position
                    if (marker) {
                        marker.setPosition(newPosition);
                    } else {
                        const newMarker = new gomaps.Marker({
                            position: newPosition,
                            map: map,
                            icon: {
                                url: 'path_to_your_vehicle_icon.png',
                                scaledSize: new gomaps.Size(32, 32)
                            }
                        });
                        setMarker(newMarker);
                    }

                    // Center map on new position
                    map.setCenter(newPosition);
                },
                (error) => {
                    console.error("Error watching location:", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [map]);

    return (
        <div id="map" className="w-full h-full">
            {!map && (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <p>Loading map...</p>
                </div>
            )}
        </div>
    );
};

export default LiveTracking;