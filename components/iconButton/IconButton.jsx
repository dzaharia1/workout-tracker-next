import styles from './IconButton.module.scss'

const IconButton = ({icon, clickHandler, size}) => {
    return <button 
        className={styles["icon-button"]}
        style={{
            backgroundImage: `url(${icon})`,
            width: `${size}px` || "24px",
            heigth: `${size}px` || "24px"
        }}
        onClick={clickHandler} />
}

export default IconButton