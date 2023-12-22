import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';

const Location = ({ formData, saveFormData }) => {
    const [mapPosition, setMapPosition] = useState({
        lat: formData.location?.lat || 17.406498,
        lng: formData.location?.lng || 78.47724389999999,
    });
    const [selectedPlace, setSelectedPlace] = useState(mapPosition);
    const [center, setCenter] = useState(mapPosition);
    const [isSaved, setIsSaved] = useState(false);

    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const newPosition = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    };
                    setSelectedPlace(newPosition);
                    setMapPosition(newPosition);
                    saveFormData((prevFormData) => ({
                        ...prevFormData,
                        location: newPosition,
                    }));
                    mapRef.current.panTo(newPosition);
                    markerRef.current.setPosition(newPosition);
                }
            });
        }
    }, [saveFormData]);

    useEffect(() => {
        setIsSaved(false);
    }, [selectedPlace]);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        markerRef.current = new window.google.maps.Marker({
            position: selectedPlace,
            map: mapRef.current,
            title: "Selected Location",
            icon: {
                url: 'https://img.icons8.com/color/48/000000/marker.png',
                scaledSize: new window.google.maps.Size(30, 30),
            },
        });
    }, [selectedPlace]);

    const handleLatitudeChange = (e) => {
        const newLat = parseFloat(e.target.value);
        const newPosition = { ...mapPosition, lat: newLat };
        setMapPosition(newPosition);
        setSelectedPlace(newPosition);
    };

    const handleLongitudeChange = (e) => {
        const newLng = parseFloat(e.target.value);
        const newPosition = { ...mapPosition, lng: newLng };
        setMapPosition(newPosition);
        setSelectedPlace(newPosition);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        setIsSaved(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input ref={inputRef} type="text" placeholder="Search for a location" className="w-full p-2 mb-4 border border-gray-300 rounded-md " />
            <div className="w-full h-1/2 mb-4">
                <GoogleMap
                    zoom={10}
                    center={center}
                    onLoad={onMapLoad}
                    onClick={(e) => {
                        const newPosition = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        };
                        setSelectedPlace(newPosition);
                        setMapPosition(newPosition);
                        saveFormData((prevFormData) => ({
                            ...prevFormData,
                            location: newPosition,
                        }));
                        markerRef.current.setPosition(newPosition);
                    }}
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    options={{
                        scrollwheel: true,
                        fullscreenControl: false,
                        mapTypeControl: true,
                        disableDefaultUI: true,
                        clickableIcons: false,
                    }}
                />
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex mb-4">
                    <label className="w-1/2 mr-2">
                        Latitude:
                        <input type="number" value={selectedPlace.lat} onChange={handleLatitudeChange} placeholder="Latitude" className="w-full p-2 border border-gray-300 rounded-md " />
                    </label>
                    <label className="w-1/2">
                        Longitude:
                        <input type="number" value={selectedPlace.lng} onChange={handleLongitudeChange} placeholder="Longitude" className="w-full p-2 border border-gray-300 rounded-md " />
                    </label>
                </div>
                <button type="submit" className={`w-full p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isSaved ? 'bg-green-500 hover:bg-green-600 focus:ring-green-600' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'}`} >
                    {isSaved ? 'Saved Successfully' : 'Save Location'}
                </button>
            </form>
        </div>
    );
};

export default Location;
