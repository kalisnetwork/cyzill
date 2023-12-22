import React from 'react'
import PropertyCard from '../../property/PropertyCard/PropertyCard'
import Map from '../map/Map'
import Filters from '../filters/Filters'
import './homes.css'

const Homes = () => {
    return (
        <div className="w-full h-screen flex flex-col ">
            <div className="flex items-center justify-start p-2 border border-gray-200" >
                <Filters />
            </div>
            <div className="flex-grow overflow-auto">
                <div className="flex flex-row h-full overflow-auto">
                    <div className="w-1/2 h-full overflow-auto">
                        <Map />
                    </div>
                    <div className="w-1/2 h-full overflow-auto p-2">
                        <div className=" py-4">
                            <p className="text-lg font-semibold text-gray-700">Real Estate & Homes For Sale</p>
                        </div>
                        <PropertyCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homes