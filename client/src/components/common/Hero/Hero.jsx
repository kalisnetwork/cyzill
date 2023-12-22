import React, { useState, useEffect } from 'react';
import SearchBar from '../../marketplace/SearchBar/SearchBar';

const Hero = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => setProperties(data))
            .catch((error) => console.error(error));
    }, []);

    const handleSearch = (searchParams) => {
        const results = properties.filter((property) => {
            if (
                (searchParams.location === '' || property.location.includes(searchParams.location)) &&
                (searchParams.minPrice === '' || property.price >= searchParams.minPrice) &&
                (searchParams.maxPrice === '' || property.price <= searchParams.maxPrice) &&
                (searchParams.bedrooms === '' || property.bedrooms >= searchParams.bedrooms)
            ) {
                return true;
            }
            return false;
        });

        setSearchResults(results);
    };


    return (
        <>
            <div
                className="relative bg-cover bg-center h-96 md:h-120 lg:h-4/5 z-10"
                style={{
                    backgroundImage: `url(/assets/images/hero.png)`
                }}
            >
                <div className="flex items-center justify-center h-96">
                    <div className="text-center text-white">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                            Find Your Dream Home
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl mb-6">
                            Search for properties that match your criteria.
                        </p>
                        <SearchBar onSearch={handleSearch} properties={properties} height="h-16" placeholderText="Enter a city, address or pincode" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
