import { toCelsius } from "../helpers"
import { Weather } from "../hooks/useWeather"
import styles from "./WeatherDetail.module.css"

type WeatherDetailProps = {
    weather: Weather
}

function WeatherDetail({weather}: WeatherDetailProps) {
    return (
        <div className={styles.container}>
            <h2>Clima de: {weather.name}</h2>
            <p className={styles.current}>{toCelsius(weather.main.temp)}&deg;C</p>
            <div className={styles.temperatures}>
                <p>Min: <span>{toCelsius(weather.main.temp_min)}&deg;C</span></p>
                <p>Max: <span>{toCelsius(weather.main.temp_max)}&deg;C</span></p>
            </div>
        </div>
    )
}

export default WeatherDetail