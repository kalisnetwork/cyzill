import React, { useState } from 'react';
import SearchBar from '../../marketplace/SearchBar/SearchBar';
import './Hero.css';

const Hero = () => {
    const [, setSearchResults] = useState([]);
    const [properties,] = useState([]);

    const handleSearch = () => {
        setSearchResults([]);
    };

    return (
        <>
            <div className="hero-container">
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(/assets/images/hero.png)`
                    }}
                >
                    <div className="content-container">
                        <h1 className="title">Find Your Dream Home</h1>
                        <p className="subtitle">Search for properties that match your criteria.</p>
                        <SearchBar onSearch={handleSearch} properties={properties} height="search-bar-height" placeholderText="Enter a city, address, or pin code" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
