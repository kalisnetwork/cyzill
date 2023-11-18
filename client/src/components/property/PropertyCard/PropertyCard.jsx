import React, { useState, useEffect } from 'react';
import './PropertyCard.css';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = () => {
    const [propertyData, setPropertyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                setPropertyData(data); // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="property-cards">
            {propertyData &&
                propertyData.map((property) => (
                    <div className="property-card" key={property.id}>
                        <div className="property-info">
                            <div className="posted-on">{property.postedOn}</div>
                            <div className="property-image">
                                <img src={property.image} alt={`Property ${property.id}`} />
                            </div>
                            <div className="property-details">
                                <span className="sale-label property-type">{property.type}</span>
                                <div className="listing-details">
                                    <div className="listing-short-detail">
                                        <h4 className="property-title">
                                            <a href="#" className="property-link">{property.title}</a>
                                        </h4>
                                        <div className="listing-price">
                                            <div className="price-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                                </svg>
                                            </div>
                                            <div className="property-price">
                                                {property.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="property-features">
                                    <div className="features-list">
                                        <div className="feature">
                                            <div className="icon">
                                                <FaBed />
                                            </div>
                                            {property.bedrooms}
                                        </div>
                                        <div className="features-list">
                                            <div className="icon">
                                                <FaBath />
                                            </div>
                                            {property.bathrooms}
                                        </div>
                                        <div className="features-list">
                                            <div className="icon">
                                                <FaRulerCombined />
                                            </div>
                                            {property.sqfoot} sqft
                                        </div>
                                    </div>
                                </div>
                                <div className="location-details">
                                    <div className="location-icon">
                                        <FaMapMarkerAlt />
                                    </div>
                                    &ensp; {property.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PropertyCard;
