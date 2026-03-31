import WeatherIcon from "../ui/Wethericon";
function WeatherCard({ data }) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    return (
        <div className="mt-10 bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md mx-auto">

            {/* City Name */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">
                {data.name}
            </h2>

            {/* Weather Icon + Temp */}
            <div className="flex items-center justify-center mt-6">
                <WeatherIcon type={data.weather[0].main} />
                <span className="text-5xl font-bold text-gray-900">
                    {Math.round(data.main.temp)}°C
                </span>
            </div>

            {/* Description */}
            <p className="text-center text-gray-600 capitalize mt-2">
                {data.weather[0].description}
            </p>

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-6 mt-6 text-gray-700">
                <div className="bg-white/50 p-4 rounded-xl text-center">
                    <p className="font-semibold">Feels Like</p>
                    <p>{Math.round(data.main.feels_like)}°C</p>
                </div>

                <div className="bg-white/50 p-4 rounded-xl text-center">
                    <p className="font-semibold">Humidity</p>
                    <p>{data.main.humidity}%</p>
                </div>

                <div className="bg-white/50 p-4 rounded-xl text-center col-span-2">
                    <p className="font-semibold">Wind Speed</p>
                    <p>{data.wind.speed} m/s</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;