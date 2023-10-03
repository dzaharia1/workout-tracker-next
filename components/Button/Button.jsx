import styles from './Button.module.scss'

const Button = ({label, clickHandler, size}) => {
    return <button
        className={styles["button"]}
        onClick={clickHandler}>
            { label }
    </button>
}

export default Button