import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import { debounce } from 'lodash';
import { OverlayView } from "@react-google-maps/api";
import { BASE_URL } from "../../../config";

const Map = ({ setSelectedProperties, setVisibleProperties }) => {
    const [properties, setProperties] = useState([]);
    const [map, setMap] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [initialCenter] = useState({ lat: 17.422, lng: 78.488 });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/property/properties`);
            const data = await response.json();
            setProperties(data);
            if (map) {
                map.fitBounds(map.getBounds());
            }
        };
        fetchData();
    }, [map]);

    const onMapLoad = useCallback((map) => {
        setMap(map);
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnBoundsChanged = useCallback(
        debounce(() => {
            if (map) {
                const bounds = map.getBounds();
                const visibleProperties = properties.filter(property => bounds.contains(property.location));
                setSelectedProperties(prevProperties => {
                    const uniqueVisibleProperties = visibleProperties.filter(property => {
                        return !prevProperties.some(prevProperty => prevProperty._id === property._id);
                    });
                    return [...prevProperties, ...uniqueVisibleProperties];
                });
                setVisibleProperties(visibleProperties);
            }
        }, 300),
        [map, properties, setSelectedProperties, setVisibleProperties]
    );

    const formatPrice = (price) => {
        if (price >= 10000000) {
            const crore = price / 10000000;
            return `₹ ${crore.toFixed(1)} cr`;
        } else if (price >= 100000) {
            const lakh = price / 100000;
            return `₹ ${lakh.toFixed(1)} lac`;
        } else {
            const thousand = price / 1000;
            return `₹ ${thousand.toFixed(1)} k`;
        }
    };

    return (
        <GoogleMap
            id="map"
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={8}
            center={initialCenter}
            options={{ scrollwheel: true, fullscreenControl: false, gestureHandling: "greedy" }}
            onLoad={onMapLoad}
            onBoundsChanged={debouncedOnBoundsChanged}
        >
            {properties.map((property, index) => (
                <OverlayView key={index} position={property.location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div
                        style={{
                            backgroundColor: property.forDetails === 'sell' ? '#A020F0' : '#FF0000',
                            color: '#ffffff',
                            borderRadius: '15px',
                            padding: '5px 10px',
                            width: '60px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        onClick={() => setSelectedProperty(property)}
                    >
                        {formatPrice(property.price)}
                    </div>
                </OverlayView>
            ))}

            {selectedProperty && (
                <InfoWindow
                    position={selectedProperty.location}
                    onCloseClick={() => setSelectedProperty(null)}
                >
                    <div>
                        <PropertyCard property={selectedProperty} smallSize={true} onPropertyClick={() => setSelectedProperty(selectedProperty)} />
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;
