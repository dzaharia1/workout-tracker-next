import styles from './Button.module.scss'

const Button = ({label, clickHandler, size, id}) => {
    return <button className={styles["button"]} onClick={clickHandler} id={id}>
            { label }
    </button>
}

export default Button