import styles from './Button.module.scss'

const Button = ({label, clickHandler, additionalClass, size, id}) => {
    function click(e) {
        e.preventDefault();
        clickHandler()
    }

    return <button className={`${styles["button"]} ${additionalClass}`} onClick={click} id={id}>
            { label }
    </button>
}

export default Button