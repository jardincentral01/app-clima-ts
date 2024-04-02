import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import type { FormState, useWeatherT } from "../../types/types"
import Alert from "../Alert/Alert"

type FormProps = {
    fetchWeather: useWeatherT['fetchWeather']
}

function Form({fetchWeather}: FormProps) {

    const [form, setForm] = useState<FormState>({
        city: "",
        country: ""
    })
    const [alert, setAlert] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
        if(!Object.values(form).includes("")) setAlert("")
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(Object.values(form).includes("")) return setAlert("Todos los campos son obligatorios")
        setAlert("")
        fetchWeather(form)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.campo}>
                <label>Ciudad:</label>
                <input onChange={handleChange} value={form.city} type="text" id="city" name="city" placeholder="Ciudad"/>
            </div>

            <div className={styles.campo}>
                <label>País:</label>
                <select onChange={handleChange} value={form.country} id="country" name="country">
                    <option value="">-- Seleccione --</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value="Buscar clima"/>
        </form>
    )
}

export default Form