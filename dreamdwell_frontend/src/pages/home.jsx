
import Navbar from "../layouts/navbar.jsx";
import Footer from "../layouts/footer.jsx";
import PopularDestinations from "../pages/destination.jsx";
import Newsletter from "./Newsletter.jsx";
import bkg from "../assets/2Q.png";
import { FaSearch } from "react-icons/fa";

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

            {/* POPULAR DESTINATIONS */}
            <div className="px-4 md:px-20 mt-12">
                <PopularDestinations />
            </div>

            {/* NEWSLETTER */}
            <Newsletter />

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
