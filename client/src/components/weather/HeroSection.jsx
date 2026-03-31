import { useState } from "react";
import { Search } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import WeatherCard from "./WetherCard";
import { fetchCitySuggestions } from "../../services/weatherService";

function HeroSection() {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const { weather, loading, error, getWeather } = useWeather();

    // 🔍 Search weather
    const handleSearch = (e) => {
        e.preventDefault();
        if (!city.trim()) return;
        getWeather(city);
        setSuggestions([]);
    };

    // ✍️ Input change (suggestions)
    const handleChange = async (e) => {
        const value = e.target.value;
        setCity(value);

        if (value.length > 2) {
            const data = await fetchCitySuggestions(value);
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="text-center max-w-2xl w-full">
            <h1 className="text-4xl font-bold mb-4">
                Check Weather Instantly 🌍
            </h1>
            <form
                onSubmit={handleSearch}
                className="relative flex items-center bg-white shadow-lg rounded-full "
            >
                <input
                    type="text"
                    placeholder="Enter city name..."
                    className="flex-1 px-6 py-4 outline-none"
                    value={city}
                    onChange={handleChange}
                />
                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-50">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className="p-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setCity(item.name);
                                    setSuggestions([]);
                                    getWeather(item.name); // direct fetch
                                }}
                            >
                                {item.name}, {item.country}
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-4 rounded-full"
                >
                    <Search size={20} />
                </button>
            </form>
            {loading && <p className="mt-4 text-blue-600">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {weather && <WeatherCard data={weather} />}
        </div>
    );
}

export default HeroSection;