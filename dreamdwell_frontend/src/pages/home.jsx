import Navbar from "../layouts/navbar.jsx";
import Footer from "../layouts/footer.jsx";
import Newsletter from "./Newsletter.jsx";
import bkg from "../assets/2Q.png";
// Import all necessary icons
import { FaSearch, FaUsers, FaKey, FaCheckCircle, FaClock, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { properties } from "../data/property_data.js";

// Component to display a single property card
function PropertyCard({ imageUrl, title, location, price }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm mb-2">{location}</p>
                <div className="text-lg font-bold text-[#002B5B]">${price}/night</div>
            </div>
        </div>
    );
}

function SearchBar() {
    return (
        <form className="flex w-full max-w-4xl mx-auto rounded-full overflow-hidden shadow-lg border border-white/30 bg-white/90">
            <input
                type="text"
                placeholder="Search for locations, properties..."
                className="flex-grow px-6 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-[#002B5B] hover:bg-[#5599cc] text-white px-6 flex items-center justify-center transition"
            >
                <FaSearch />
            </button>
        </form>
    );
}

export default function Home() {
    // Take the first 3 properties from your imported data to display as featured
    const featuredProperties = properties.slice(0, 3);

    return (
        <div className="w-full overflow-x-hidden flex flex-col min-h-screen">
            {/* NAVBAR */}
            <header className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </header>

            {/* HERO SECTION */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-[65px]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={bkg}
                        alt="DreamDwell background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Find Your Perfect
                        <span className="block text-[#002B5B]">Dream Dwelling</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Discover unique places to stay around the world. From cozy cabins to luxury villas,
                        your next adventure awaits.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto">
                        <SearchBar />
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">1M+</div>
                            <div className="text-white/80 text-sm">Properties</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">195</div>
                            <div className="text-white/80 text-sm">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">5M+</div>
                            <div className="text-white/80 text-sm">Happy Guests</div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </section>

            {/* FEATURED PROPERTIES */}
            <div className="px-4 md:px-20 mt-12 mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Featured Properties</h2>
                    {/* The "See All" button using Link to navigate to /properties */}
                    <Link to="/properties" className="text-[#002B5B] hover:text-[#5599cc] font-semibold text-lg flex items-center group">
                        See All
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                            &rarr;
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map(property => (
                        <PropertyCard
                            key={property.id}
                            imageUrl={property.images[0]} // Using the first image from the 'images' array
                            title={property.title}
                            location={property.location}
                            price={property.price}
                        />
                    ))}
                </div>
            </div>

            {/* HOW IT WORKS / WHY CHOOSE US Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* How It Works */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-[#002B5B] mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Simple steps to find your dream rental
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-6">
                                <FaSearch className="text-4xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Search</h3>
                            <p className="text-gray-600 max-w-xs">
                                Browse through thousands of verified properties using our advanced filters
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-6">
                                <FaUsers className="text-4xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Connect</h3>
                            <p className="text-gray-600 max-w-xs">
                                Get in touch with property owners and schedule viewings at your convenience
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-6">
                                <FaKey className="text-4xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Rent</h3>
                            <p className="text-gray-600 max-w-xs">
                                Complete secure booking and move into your perfect space hassle-free
                            </p>
                        </div>
                    </div>

                    {/* Why Choose DreamDwell */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-[#002B5B] mb-4">
                            Why Choose DreamDwell
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Experience the difference with our premium service
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center pb-8">
                        <div className="flex flex-col items-center p-4">
                            <div className="w-16 h-16 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-4">
                                <FaCheckCircle className="text-3xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Verified Listings</h3>
                            <p className="text-sm text-gray-600">
                                All properties are thoroughly verified for authenticity and quality
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-16 h-16 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-4">
                                <FaClock className="text-3xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">24/7 Support</h3>
                            <p className="text-sm text-gray-600">
                                Round-the-clock customer support for all your rental needs
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-16 h-16 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-4">
                                <FaShieldAlt className="text-3xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Easy Booking</h3>
                            <p className="text-sm text-gray-600">
                                Streamlined booking process with instant confirmations
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-16 h-16 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-4">
                                <FaCreditCard className="text-3xl text-[#002B5B]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Secure Payments</h3>
                            <p className="text-sm text-gray-600">
                                Safe and secure payment processing with multiple options
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
            <Footer />
        </div>
    );
}