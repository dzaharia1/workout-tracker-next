import styles from './IconButton.module.scss'
import Image from 'next/image'

const IconButton = ({icon, clickHandler, type, iconSize}) => {
    return <div className={styles['icon-button__container']}>
        <button 
            className={styles[`icon-button--${type || `primary`}`]}
            onClick={clickHandler}>
            <Image
                width={iconSize || `24`}
                height={iconSize || `24`}
                src={icon} />
        </button>
    </div>
}

export default IconButton