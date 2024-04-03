import { Weather } from "../components/hooks/useWeather"

export type FormState = {
    country: string
    city: string
}

export type Country = {
    code: string
    name: string
}

export type useWeatherT = {
    weather: Weather
    isLoading: boolean
    notFound: boolean
    fetchWeather: (data: FormState) => Promise<void>
    weatherHasData: string
}

/* export type Weather = {
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
    }
} */