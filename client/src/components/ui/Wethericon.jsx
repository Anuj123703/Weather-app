import Lottie from "lottie-react";
import sunny from "../../assets/Animations/sunny.json";
import rain from "../../assets/Animations/thunderstorms overcast-rain.json";
import cloud from "../../assets/Animations/weather.json"

function WeatherIcon({ type }) {

    const getAnimation = () => {
        switch (type) {
            case "Clear":
                return sunny;
            case "Rain":
                return rain;
            case "Clouds":
                return cloud;
            default:
                return cloud;
        }
    };

    return (
        <div className="w-20 mx-auto">
            <Lottie animationData={getAnimation()} loop={true} />
        </div>
    );
}

export default WeatherIcon;