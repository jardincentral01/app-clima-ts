import axios from "axios"
import { FormState, useWeatherT } from "../../types/types"

export default function useWeather(): useWeatherT{

    const fetchWeather = async (form: FormState) => {
        const APIkey = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${form.city},${form.country}&appid=${APIkey}`
            const { data } = await axios(geoUrl)

            const lon = data[0].lon
            const lat = data[0].lat
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
            const {data: weather} = await axios(weatherUrl)
            console.log(weather)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}