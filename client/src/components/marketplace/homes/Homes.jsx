import React, { useEffect, useState } from "react";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import Map from '../map/Map';
import Filters from '../filters/Filters';
import { BASE_URL } from "../../../config";
import ContactForm from "./ContactForm";

const Homes = () => {
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [visibleProperties, setVisibleProperties] = useState([]);
    const [propertyData, setPropertyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({
        searchTerm: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: '',
        amenities: [],
    });
    const [mapIsVisible, setMapIsVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/property/properties`);
                const data = await response.json();
                console.log('propertyData:', data);
                setPropertyData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const modalTimeout = setTimeout(() => {
            setShowModal(true);
        }, 7000);

        return () => clearTimeout(modalTimeout);
    }, []);

    useEffect(() => {
        if (!propertyData) {
            return;
        }

        const filteredProperties = propertyData.filter(property => {
            return (
                (!filters.price || property.price <= filters.price[1]) &&
                (!filters.bedrooms || (filters.bedrooms === '5+' ? property.bedrooms >= 5 : property.bedrooms == filters.bedrooms)) &&
                (!filters.bathrooms || (filters.bathrooms === '5+' ? property.bathrooms >= 5 : property.bathrooms == filters.bathrooms)) &&
                (!filters.propertyType || property.propertyType === filters.propertyType) &&
                (!filters.amenities.length || filters.amenities.every(amenity => property.amenities.includes(amenity))) &&
                property.location.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
                (property.forDetails === filters.saleOrRent)
            );
        });

        setVisibleProperties(filteredProperties.slice(0, displayCount));
    }, [filters, propertyData, displayCount, mapIsVisible]);



    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleSearch = (term) => {
        setFilters(prevFilters => ({ ...prevFilters, searchTerm: term }));
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setDisplayCount(prevCount => prevCount + 6);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!propertyData) {
        return null;
    }

    return (
        <div onScroll={handleScroll} style={{ height: '100vh', overflow: 'auto' }}>
            <div className="w-full h-screen flex flex-col">
                <div className="flex items-center justify-start p-2 border border-gray-200">
                    <Filters onSearch={handleSearch} onFilterChange={handleFilterChange} />
                </div>
                <div className="flex-grow overflow-auto">
                    <div className="flex flex-row h-full overflow-auto">
                        <div className="w-1/2 h-full overflow-auto lg:block hidden">
                            <Map setSelectedProperties={setSelectedProperties} setVisibleProperties={setVisibleProperties} />
                        </div>
                        <div className="w-full lg:w-1/2 h-full overflow-auto p-2">
                            <div className="py-4">
                                <p className="text-lg font-semibold text-gray-700">Real Estate & Homes For Sale</p>
                            </div>
                            {mapIsVisible && visibleProperties.length === 0 && (
                                <div className="no-properties-found-message text-lg">
                                    We couldn't find any property
                                </div>
                            )}
                            {showModal && (
                                <ContactForm onClose={() => setShowModal(false)} />
                            )}
                            <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-3 sm:grid-cols-2 ">
                                {visibleProperties.map(property => (
                                    <div className="property-card" key={property._id}>
                                        <PropertyCard property={property} />
                                    </div>
                                ))}
                            </div>
                            {visibleProperties.length >= propertyData.length && (
                                <div className="all-properties-loaded flex justify-center items-center">
                                    All properties have been loaded.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homes;