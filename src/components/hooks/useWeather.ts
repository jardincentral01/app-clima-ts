import axios from "axios"
import { z } from "zod"
//import { object, string, number, Output, parse } from "valibot"
import { FormState, useWeatherT } from "../../types/types"
import { useMemo, useState } from "react"

//! Type Guard
/* function isWeatherResponse(weather: unknown): weather is Weather{
    return (
        Boolean(weather) &&
        typeof weather == 'object' &&
        typeof (weather as Weather).name == 'string' &&
        typeof (weather as Weather).main.temp == 'number' &&
        typeof (weather as Weather).main.temp_max == 'number' &&
        typeof (weather as Weather).main.temp_min == 'number'
    )
} */

// Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})
export type Weather = z.infer<typeof Weather>

//Valibot
/* const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})
type Weather = Output<typeof WeatherSchema> */

const initialState = {
    name: "",
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    }
}

export default function useWeather(): useWeatherT{

    const [weather, setWeather] = useState<Weather>(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (form: FormState) => {
        setWeather(initialState)
        setIsLoading(true)
        setNotFound(false)
        const APIkey = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${form.city},${form.country}&appid=${APIkey}`
            const { data } = await axios(geoUrl)

            if(data.length == 0) return setNotFound(true)

            const lon = data[0].lon
            const lat = data[0].lat
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

            // Castear el type (no es recomendable)
            /* const {data: weatherResult} = await axios<Weather>(weatherUrl)
            console.log(weatherResult.main.temp)
            console.log(weatherResult.name) */

            //! Type Guards
            /* const {data: weatherResult} = await axios(weatherUrl)
            const result = isWeatherResponse(weatherResult);
            if(result){
                console.log(weatherResult.main)
            } */

            // Zod
            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
            }

            // Valibot
            /* const {data: weatherResult} = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherResult);
            console.log(result) */
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }

    const weatherHasData = useMemo(() => weather.name , [weather])

    return {
        weather,
        isLoading,
        notFound,
        fetchWeather,
        weatherHasData
    }
}