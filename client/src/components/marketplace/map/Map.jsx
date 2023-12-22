import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const Map = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const locations = [
        { name: "Location 1", position: { lat: 17.422, lng: 78.488 }, icon: "https://static.vecteezy.com/system/resources/thumbnails/014/615/035/small/red-basic-shape-for-new-product-stickers-special-offer-label-png.png" },
        { name: "Location 2", position: { lat: 17.422, lng: 78.488 }, icon: "URL_OF_YOUR_CUSTOM_MARKER_2" },
        // Add more locations as needed
    ];

    return (
        <GoogleMap
            id="map"
            mapContainerStyle={{
                height: "100%",
                width: "100%"
            }}
            zoom={8}
            center={{
                lat: 17.422,
                lng: 78.488
            }}
            options={{
                scrollwheel: true,
                fullscreenControl: false
            }}
        >
            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={location.position}
                    onClick={() => {
                        setSelectedLocation(location);
                    }}
                    icon={location.icon}
                    title={location.name}
                    zIndex={1}
                />
            ))}

            {selectedLocation && (
                <InfoWindow
                    position={selectedLocation.position}
                    onCloseClick={() => {
                        setSelectedLocation(null);
                    }}
                >
                    <div>
                        <h2>{selectedLocation.name}</h2>
                        <p>This is your selected location!</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;
