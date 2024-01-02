import React, { useState } from 'react';
import SearchBar from '../../marketplace/SearchBar/SearchBar';

const Hero = () => {
    const [, setSearchResults] = useState([]);
    const [properties,] = useState([]);


    const handleSearch = () => {
        setSearchResults([]);
    };

    return (
        <>
            <div
                className="relative bg-cover bg-center h-96 md:h-120 lg:h-4/5 z-0"
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
