import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';

const Filters = ({ onSearch, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [amenities, setAmenities] = useState([]);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        onSearch(term);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        onFilterChange('price', event.target.value);
    };

    const handleBedroomsChange = (event) => {
        setBedrooms(event.target.value);
        onFilterChange('bedrooms', event.target.value);
    };

    const handleBathroomsChange = (event) => {
        setBathrooms(event.target.value);
        onFilterChange('bathrooms', event.target.value);
    };

    const handlePropertyTypeChange = (event) => {
        setPropertyType(event.target.value);
        onFilterChange('propertyType', event.target.value);
    };

    const handleAmenitiesChange = (event) => {
        const selectedAmenities = Array.from(event.target.selectedOptions, (option) => option.value);
        setAmenities(selectedAmenities);
        onFilterChange('amenities', selectedAmenities);
    };

    const handleCurrentLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                onSearch(newPosition);
            });
        }
    };

    return (
        <div className='flex items-center gap-2'>
            <div className="searchbar">
                <SearchBar height="h-10" placeholderText="Enter a city or address" onSearch={handleSearchChange} />
                <button onClick={handleCurrentLocationClick} className="ml-2 p-2 bg-blue-500 text-white rounded">Current Location</button>
            </div>
            <div className="filter">
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" value={price} onChange={handlePriceChange} />
            </div>
            <div className="filter">
                <label htmlFor="bedrooms">Bedrooms:</label>
                <input type="text" id="bedrooms" value={bedrooms} onChange={handleBedroomsChange} />
            </div>
            <div className="filter">
                <label htmlFor="bathrooms">Bathrooms:</label>
                <input type="text" id="bathrooms" value={bathrooms} onChange={handleBathroomsChange} />
            </div>
            <div className="filter">
                <label htmlFor="propertyType">Property Type:</label>
                <select id="propertyType" value={propertyType} onChange={handlePropertyTypeChange}>
                    <option value="">Any</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="amenities">Amenities:</label>
                <select id="amenities" multiple value={amenities} onChange={handleAmenitiesChange}>
                    <option value="pool">Pool</option>
                    <option value="gym">Gym</option>
                    <option value="parking">Parking</option>
                    <option value="pets">Pets Allowed</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
