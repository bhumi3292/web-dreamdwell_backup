import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { PropertyCard } from '../properties/PropertyCard.jsx'; // Correct: import component from here
import { properties } from '../data/property_data.js';           // Correct: import data from here



// ✅ The main page component MUST export a default component
const PropertyPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    const filteredProperties = properties.filter((property) => {
        if (filter === 'all') return true;
        return property.type === filter;
    });

    const filterOptions = [
        { value: 'all', label: 'All Properties' },
        { value: 'villa', label: 'Villas' },
        { value: 'apartment', label: 'Apartments' },
        { value: 'house', label: 'Houses' },
        { value: 'cabin', label: 'Cabins' },
        { value: 'condo', label: 'Condos' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-[#002B5B] mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-lg text-[#5599cc] max-w-2xl mx-auto">
                        Handpicked exceptional stays curated by our travel experts
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4 md:gap-0">
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center space-x-2 px-5 py-3 bg-[#002B5B] text-white rounded-lg hover:bg-[#5599cc] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5599cc]"
                        >
                            <Filter className="w-5 h-5" />
                            <span className="font-semibold">{filterOptions.find(opt => opt.value === filter)?.label}</span>
                            <ChevronDown className="w-5 h-5" />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilter(option.value);
                                            setIsFilterOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-[#002B5B] hover:bg-[#5599cc] hover:text-white transition-colors duration-150"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-[#002B5B] font-medium">
                        {filteredProperties.length} properties found
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onFavorite={handleFavorite}
                            isFavorited={favorites.includes(property.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyPage;
