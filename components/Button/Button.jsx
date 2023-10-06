import styles from './Button.module.scss'

const Button = ({label, clickHandler, size, id}) => {
    function click(e) {
        e.preventDefault();
        clickHandler()
    }

    return <button className={styles["button"]} onClick={click} id={id}>
            { label }
    </button>
}

export default Button