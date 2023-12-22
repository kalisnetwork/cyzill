import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, height, placeholderText, googleMapsApiKey }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                setSearchQuery(place.formatted_address);
            });
        }
    }, []);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div className="relative mx-auto text-gray-600">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        ref={inputRef}
                        className={`border-2 bg-white px-5 pr-12 rounded-md text-gray-600 focus:outline-none w-full ${height}`}
                        type="search"
                        name="search"
                        placeholder={placeholderText}
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full"
                    >
                        <svg
                            className="text-black h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 56.966 56.966"
                        >
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
