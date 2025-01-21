import React, { useState, useEffect } from 'react';

const LiveTracking = () => {
    const [mapImage, setMapImage] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const apiKey = "AlzaSyjC65tR83Ij8isSZU6q3S_pEfZOkcwmFKJ";

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });

                    // Get static map image from GoMaps
                    const mapUrl = `https://maps.gomaps.pro/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=800x800&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

                    try {
                        const response = await fetch(mapUrl);
                        if (response.ok) {
                            setMapImage(mapUrl);
                        }
                    } catch (error) {
                        console.error('Error loading map:', error);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    if (!currentPosition || !mapImage) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <p>Loading map...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <img
                src={mapImage}
                alt="Map"
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
                <p>Lat: {currentPosition.lat.toFixed(6)}</p>
                <p>Lng: {currentPosition.lng.toFixed(6)}</p>
            </div>
        </div>
    );
};

export default LiveTracking;