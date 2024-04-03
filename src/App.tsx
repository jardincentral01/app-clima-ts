import useWeather from "./components/hooks/useWeather"
import Form from "./components/Form/Form"
import styles from "./App.module.css"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import Spinner from "./components/Spinner/Spinner"
import Alert from "./components/Alert/Alert"

function App() {

    const { weather, isLoading, notFound, fetchWeather, weatherHasData } = useWeather()
    return (
        <>
            <h1 className={styles.title}>App Clima API</h1>

            <div className={styles.container}>
                <Form fetchWeather={fetchWeather}/>
                {isLoading ? <Spinner/> : (
                    weatherHasData && (
                        <WeatherDetail
                            weather={weather}
                        />
                    )
                )}
                {notFound && <Alert>Ciudad No Encontrada</Alert>}
            </div>
        </>
    )
}

export default App
