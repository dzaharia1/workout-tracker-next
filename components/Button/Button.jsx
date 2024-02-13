import styles from './Button.module.scss'
import Image from 'next/image'

const Button = ({label, clickHandler, additionalClass, iconSize, type, icon, id}) => {
    function click(e) {
        e.preventDefault();
        clickHandler()
    }

    return <div className={styles['button__container']}>
        <button
            className={`${styles[`button--${type || `primary`}`]} ${additionalClass}`}
            onClick={click}
            id={id}>
                { icon && <Image src={icon} width={iconSize || `24`} height={iconSize || `24`} />}
                <p style={{height: iconSize}}>{ label }</p>
        </button>
    </div>
}

export default Button