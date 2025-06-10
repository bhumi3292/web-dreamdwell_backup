import React from 'react';
import { Heart, Star, MapPin, Users, Bed, Bath } from 'lucide-react';

export const PropertyCard = ({
                                 property,
                                 onFavorite,
                                 isFavorited = false,
                             }) => {
    return (
        <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-t-2xl">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                    onClick={() => onFavorite && onFavorite(property.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#5599cc] transition-colors duration-200"
                    aria-label="Favorite property"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${
                            isFavorited ? 'fill-[#002B5B] text-[#002B5B]' : 'text-gray-600'
                        }`}
                    />
                </button>
                <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#002B5B]">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-[#002B5B]">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center text-[#002B5B]">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{property.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({property.reviews})</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#002B5B] mb-2 line-clamp-2 group-hover:text-[#5599cc] transition-colors duration-200">
                    {property.title}
                </h3>

                {/* Property Details */}
                <div className="flex items-center space-x-4 text-[#002B5B] mb-4">
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.guests} guests</span>
                    </div>
                    <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.bathrooms} bath</span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                        <span
                            key={amenity}
                            className="bg-[#E5F0FF] text-[#002B5B] px-2 py-1 rounded-md text-xs font-medium"
                        >
              {amenity}
            </span>
                    ))}
                    {property.amenities.length > 3 && (
                        <span className="text-[#5599cc] text-xs font-semibold">
              +{property.amenities.length - 3} more
            </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-[#002B5B]">${property.price}</span>
                        <span className="text-[#5599cc] ml-1">/ night</span>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-[#002B5B] font-medium">
                            Host: {property.host.name}
                        </div>
                        {property.host.verified && (
                            <div className="text-xs text-[#5599cc] font-semibold">✓ Verified</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
