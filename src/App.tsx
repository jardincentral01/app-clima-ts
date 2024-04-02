import useWeather from "./components/hooks/useWeather"
import Form from "./components/Form/Form"
import styles from "./App.module.css"

function App() {

    const { fetchWeather } = useWeather()
    return (
        <>
            <h1 className={styles.title}>App Clima API</h1>

            <div className={styles.container}>
                <Form fetchWeather={fetchWeather}/>
                <p></p>
            </div>
        </>
    )
}

export default App
