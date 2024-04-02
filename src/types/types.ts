export type FormState = {
    country: string
    city: string
}

export type Country = {
    code: string
    name: string
}

export type useWeatherT = {
    fetchWeather: (data: FormState) => Promise<void>
}