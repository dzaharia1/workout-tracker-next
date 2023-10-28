import styles from './Button.module.scss'
import Image from 'next/image'

const Button = ({label, clickHandler, additionalClass, type, icon, id}) => {
    function click(e) {
        e.preventDefault();
        clickHandler()
    }

    return <button
        className={`${styles[`button--${type || `primary`}`]} ${additionalClass}`}
        onClick={click}
        id={id}>
            { icon && <Image src={icon} width="24px" height="24px" />}
            {/* <Image src="/img/add--white.svg" width="24px" height="24px" /> */}
            <p>{ label }</p>
    </button>
}

export default Button