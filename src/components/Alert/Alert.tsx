import { PropsWithChildren } from "react"
import styles from "./Alert.module.css"

function Alert({children}: PropsWithChildren) {
    return (
        <p className={styles.alert}>{children}</p>
    )
}

export default Alert