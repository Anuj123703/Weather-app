import SearchBar from "../components/ui/Searchbar";
import { fetchForecast } from "../services/weatherService";
import { useState } from "react";
import WeatherIcon from "../../src/components/ui/Wethericon";


function Forecast() {
    const [forecast, setForecast] = useState([]);
    const handleCitySelect = async (city) => {
        const data = await fetchForecast(city);
        const dailyData = data.list.filter((item, index) => index % 8 === 0);
        setForecast(dailyData);
    };
    return (
        <div>
            <SearchBar onSelectCity={handleCitySelect} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {forecast.map((item, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded">
                        <p>{new Date(item.dt_txt).toDateString()}</p>
                        <p>{item.main.temp}°C</p>
                        <p>{item.weather[0].main}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;