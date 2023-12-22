import React from 'react'
import SearchBar from '../SearchBar/SearchBar'

const Filters = () => {
    return (
        <div className='flex items-center gap-2'>
            <div className="searchbar">
                <SearchBar height="h-10" placeholderText="Enter a city or address" />
            </div>
            <div className="filters justify-center items-center">
                <button
                    type="button"
                    className=" px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default Filters
