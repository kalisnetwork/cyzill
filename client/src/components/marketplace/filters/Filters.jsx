import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { MdMyLocation } from 'react-icons/md';

const Filters = ({ onSearch, onFilterChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        searchTerm: searchParams.get('searchTerm') || '',
        price: [
            parseInt(searchParams.get('minPrice')) || 0,
            parseInt(searchParams.get('maxPrice')) || 1000000,
        ],
        bedrooms: searchParams.get('bedrooms') || 'Any',
        bathrooms: searchParams.get('bathrooms') || 'Any',
        propertyType: searchParams.get('propertyType') || '',
        amenities: searchParams.getAll('amenities') || [],
        saleOrRent: searchParams.get('saleOrRent') || 'rent',
    });

    useEffect(() => {
        setFilters({
            searchTerm: searchParams.get('searchTerm') || '',
            price: [
                parseInt(searchParams.get('minPrice')) || 0,
                parseInt(searchParams.get('maxPrice')) || 1000000,
            ],
            bedrooms: searchParams.get('bedrooms') || 'Any',
            bathrooms: searchParams.get('bathrooms') || 'Any',
            propertyType: searchParams.get('propertyType') || '',
            amenities: searchParams.getAll('amenities') || [],
            saleOrRent: searchParams.get('saleOrRent') || 'rent',
        });
    }, [searchParams]);


    const [showBedroomOptions, setShowBedroomOptions] = useState(false);
    const [showBathroomOptions, setShowBathroomOptions] = useState(false);

    const handleSearchChange = (term) => {
        setFilters((prevFilters) => ({ ...prevFilters, searchTerm: term }));
        onSearch(term);
    };

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        onFilterChange(name, value);
        setSearchParams({ [name]: value });
    };

    const handleBedroomClick = (value) => {
        setFilters((prevFilters) => ({ ...prevFilters, bedrooms: value }));
        onFilterChange('bedrooms', value);
    };

    const handleBathroomClick = (value) => {
        setFilters((prevFilters) => ({ ...prevFilters, bathrooms: value }));
        onFilterChange('bathrooms', value);
    };

    const handlePropertyTypeChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
        onFilterChange(name, value);
    };

    const handleAmenitiesChange = (event) => {
        const { value, checked } = event.target;
        setFilters((prevFilters) => {
            const { amenities } = prevFilters;
            const updatedAmenities = checked ? [...amenities, value] : amenities.filter((amenity) => amenity !== value);
            onFilterChange('amenities', updatedAmenities);
            const params = new URLSearchParams(searchParams);
            params.delete('amenities');
            updatedAmenities.forEach((amenity) => params.append('amenities', amenity));
            navigate({ search: params.toString() });

            return { ...prevFilters, amenities: updatedAmenities };
        });
    };


    const handlePriceChange = (newValue) => {
        handleFilterChange('price', newValue);
    };

    const handleSaleOrRentToggle = () => {
        const newSaleOrRent = filters.saleOrRent === 'rent' ? 'sell' : 'rent';
        handleFilterChange('saleOrRent', newSaleOrRent);
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

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <div className='flex items-center justify-center gap-4'>
            <div className="searchbar flex items-center">
                <SearchBar height="h-10" placeholderText="Enter a city or address" onSearch={handleSearchChange} />
                <button onClick={handleCurrentLocationClick} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    <MdMyLocation />
                </button>
            </div>
            <div className="filter">
                <label>For:</label>
                <div>
                    <button
                        className={`mx-1 py-1 px-3 rounded ${filters.saleOrRent === 'For Rent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={handleSaleOrRentToggle}
                    >
                        For Rent
                    </button>
                    <button
                        className={`mx-1 py-1 px-3 rounded ${filters.saleOrRent === 'For Sale' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={handleSaleOrRentToggle}
                    >
                        For Sale
                    </button>
                </div>
            </div>
            <div className="filter">
                <label htmlFor="price">Price:</label>
                <input
                    type="range"
                    id="price"
                    name="price"
                    min="0"
                    max="1000000"
                    value={filters.price[1]}
                    onChange={(e) => handlePriceChange([filters.price[0], e.target.value])}
                />
            </div>
            <div className="filter">
                <label onClick={() => setShowBedroomOptions(!showBedroomOptions)} className="cursor-pointer">Beds &nbsp;{showBedroomOptions ? '-' : '+'}</label>
                {showBedroomOptions && (
                    <div className="flex flex-col">
                        {['Any', '1', '2', '3', '4', '5', '5+'].map(option => (
                            <button key={option} className={`mx-1 py-1 px-3 rounded ${filters.bedrooms === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`} onClick={() => handleBedroomClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="filter">
                <label onClick={() => setShowBathroomOptions(!showBathroomOptions)} className="cursor-pointer">Baths &nbsp;{showBathroomOptions ? '-' : '+'}</label>
                {showBathroomOptions && (
                    <div className="flex flex-col">
                        {['Any', '1', '2', '3', '4', '5', '5+'].map(option => (
                            <button key={option} className={`mx-1 py-1 px-3 rounded ${filters.bathrooms === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`} onClick={() => handleBathroomClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="filter">
                <label htmlFor="propertyType">Property Type:</label>
                <select id="propertyType" name="propertyType" value={filters.propertyType} onChange={handlePropertyTypeChange}>
                    <option value="">Any</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                </select>
            </div>
            <div className="filter">
                <label>Amenities:</label>
            </div>
        </div>
    );
};

export default Filters;
