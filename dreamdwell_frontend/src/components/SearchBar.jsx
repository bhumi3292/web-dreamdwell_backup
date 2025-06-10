// components/SearchBar.jsx
import React from "react";
import "../styles/SearchBar.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div className="input-group">
                    <FaMapMarkerAlt className="icon" />
                    <input type="text" placeholder="Location" />
                </div>

                <select>
                    <option>Property Type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Studio</option>
                </select>

                <select>
                    <option>Price Range</option>
                    <option>$500 - $1000</option>
                    <option>$1000 - $2000</option>
                    <option>$2000+</option>
                </select>

                <select>
                    <option>Bedrooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                </select>

                <button className="search-btn">
                    <FaSearch />
                    Search
                </button>
            </div>
        </div>
    );
}
