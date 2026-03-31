import { useState } from "react";
import { fetchCurrentWeather } from "../services/weatherService";

export const useWeather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getWeather = async (city) => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchCurrentWeather(city);
            setWeather(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, getWeather };
};