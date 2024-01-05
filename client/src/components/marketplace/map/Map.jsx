import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import { debounce } from 'lodash';
import { OverlayView } from "@react-google-maps/api";
import { BASE_URL } from "../../../config";

const Map = ({ setSelectedProperties, setVisibleProperties, onPropertyClick }) => {
    const [properties, setProperties] = useState([]);
    const [map, setMap] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [initialCenter, setInitialCenter] = useState({ lat: 17.422, lng: 78.488 });
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/property/properties`);
            const data = await response.json();
            setProperties(data);
        };
        fetchData();
    }, []);

    const onMapLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const debouncedFunction = debounce((map, properties, setSelectedProperties, setVisibleProperties) => {
        if (map) {
            const bounds = map.getBounds();
            const visibleProperties = properties.filter(property => bounds.contains({ lat: property.location.lat, lng: property.location.lng }));
            setSelectedProperties(prevProperties => {
                const uniqueVisibleProperties = visibleProperties.filter(property => {
                    return !prevProperties.some(prevProperty => prevProperty._id === property._id);
                });
                return [...prevProperties, ...uniqueVisibleProperties];
            });
            setVisibleProperties(visibleProperties);
        }
    }, 300);

    const debouncedOnBoundsChanged = useCallback(() => debouncedFunction(map, properties, setSelectedProperties, setVisibleProperties), [map, properties, setSelectedProperties, setVisibleProperties]);

    function formatPrice(price) {
        if (price >= 10000000) {
            const crore = price / 10000000;
            return `${crore.toFixed(1)} cr`;
        } else if (price >= 100000) {
            const lakh = price / 100000;
            return `${lakh.toFixed(1)} lac`;
        } else {
            return `${price}`;
        }
    }

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
                <OverlayView
                    key={index}
                    position={{ lat: property.location.lat, lng: property.location.lng }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div style={{
                        backgroundColor: '#A020F0',
                        color: '#ffffff',
                        borderRadius: '15px',
                        padding: '5px 10px',
                        width: '50px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {formatPrice(property.price)}
                    </div>
                </OverlayView>
            ))}

            {selectedProperty && (
                <InfoWindow
                    position={{ lat: selectedProperty.location.lat, lng: selectedProperty.location.lng }}
                    onCloseClick={() => setSelectedProperty(null)}
                >
                    <div>
                        <PropertyCard property={selectedProperty} smallSize={true} onPropertyClick={() => setSelectedProperty(selectedProperty)}
                        />
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;