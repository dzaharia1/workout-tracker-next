import styles from './IconButton.module.scss'
import Image from 'next/image'

const IconButton = ({icon, clickHandler, type}) => {
    return <button 
        className={styles[`icon-button--${type || `primary`}`]}
        onClick={clickHandler}>
            <Image width="24px" height="24px" src={icon}></Image>
        </button>
}

export default IconButton