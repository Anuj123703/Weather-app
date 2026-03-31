import { useState } from "react";
import { fetchCitySuggestions } from "../../services/weatherService";

function SearchBar({ onSelectCity }) {

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            const data = await fetchCitySuggestions(value);
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="relative">

            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search city..."
                className="border p-2 w-full"
            />

            {suggestions.length > 0 && (
                <ul className="absolute bg-white w-full shadow mt-1">

                    {suggestions.map((city, index) => (

                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onSelectCity(city.name);
                                setQuery(city.name);
                                setSuggestions([]);
                            }}
                        >
                            {city.name}, {city.country}
                        </li>

                    ))}

                </ul>
            )}

        </div>
    );
}

export default SearchBar;